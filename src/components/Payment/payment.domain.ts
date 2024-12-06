import { v4 } from "uuid";
import { Offer, OrderBump, Product } from "../../services/product";
import { PaymentMethod, SubmitData } from "../../services/sale";
import { removeNonDigitNumbers } from "../../utils/masks";
import { addDays, format } from "date-fns";
import { calculatePixDiscount } from "../../utils/format-price";
import { UTM } from "../../hooks/useProduct";

interface Customer {
  name: string;
  email: string;
  document: string;
  phone: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

export interface HandlePaymentData {
  paymentMethod: PaymentMethod;
  offer: Offer;
  product: Product;
  orderBump?: OrderBump;
  shippingPrice: number;
  customer: Customer;
  affiliationCode: string;
  utm: UTM;
}

type PartialSubmitData = Partial<SubmitData>;

function handleUtmData(utm: UTM): UTM | undefined {
  let _utm = {} as UTM;

  if (utm.campaign) _utm.campaign = utm.campaign;
  if (utm.data1) _utm.data1 = utm.data1;
  if (utm.data2) _utm.data2 = utm.data2;
  if (utm.medium) _utm.medium = utm.medium;
  if (utm.source) _utm.source = utm.source;

  console.log({ _utm });

  if (Object.keys(_utm).length <= 0) return undefined;

  return _utm;
}

export function handlePaymentData({
  paymentMethod,
  offer,
  product,
  orderBump,
  shippingPrice,
  customer,
  affiliationCode,
  utm,
}: HandlePaymentData): SubmitData {
  const referenceId = v4();
  const date = new Date();
  const expirationDate = format(addDays(date, 5), "yyyy-MM-dd");
  const formattedUtm = handleUtmData(utm);

  console.log({ formattedUtm });

  let submitData: PartialSubmitData = {
    sellerId: product?.user?.id ?? ``,
    shippingPrice: shippingPrice ?? 0,
    referenceId,
    description: "",
    products: [
      {
        id: product.id,
        price: product.priceSale,
      },
    ],
    customer: {
      name: customer.name,
      phone: removeNonDigitNumbers(customer.phone),
      document: removeNonDigitNumbers(customer.document),
      email: customer.email,
      address: {
        zipCode: removeNonDigitNumbers(customer.address.zipCode),
        street: customer.address.street,
        number: customer.address.number,
        complement: customer.address.complement,
        neighborhood: customer.address.neighborhood,
        city: customer.address.city,
        state: customer.address.state,
      },
    },
    transactions: [],
    affiliationId: affiliationCode,
    offerId: offer.code,
    ...(!!formattedUtm && { utm: formattedUtm }),
  };

  // Order bump validation
  if (orderBump) {
    submitData.offerOrderBumpId = orderBump.code;

    if (paymentMethod === PaymentMethod.pix) {
      if (offer?.pixDiscount > 0) {
        submitData.salePrice =
          orderBump.price -
          calculatePixDiscount(orderBump.price, offer?.pixDiscount);
      } else {
        submitData.salePrice = orderBump.price;
      }

      submitData.transactions?.push({
        paymentMethod,
        value: submitData.salePrice,
        expirationDate,
      });
    } else if (paymentMethod === PaymentMethod.creditCard) {
    } else if (paymentMethod === PaymentMethod.bankBillet) {
      submitData.salePrice = orderBump.price;

      submitData.transactions?.push({
        paymentMethod,
        value: submitData.salePrice,
        expirationDate,
      });
    }

    return submitData as SubmitData;
  }

  if (paymentMethod === PaymentMethod.pix) {
    if (offer?.pixDiscount > 0) {
      submitData.salePrice =
        product?.priceSale -
        calculatePixDiscount(product?.priceSale, offer?.pixDiscount);
    } else {
      submitData.salePrice = product?.priceSale;
    }

    submitData.transactions?.push({
      paymentMethod,
      value: submitData.salePrice,
      expirationDate,
    });
  } else if (paymentMethod === PaymentMethod.bankBillet) {
    submitData.salePrice = product?.priceSale;

    submitData.transactions?.push({
      paymentMethod,
      value: submitData.salePrice,
      expirationDate,
    });
  }

  return submitData as SubmitData;
}
