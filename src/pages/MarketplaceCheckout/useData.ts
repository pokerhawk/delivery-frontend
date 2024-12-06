import { addDays, format } from "date-fns";
import { CreditCardFormSchema } from "../../components/PaymentCard/misc";
import { useProduct } from "../../hooks/useProduct";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import { PaymentMethod, SubmitData, postSale } from "../../services/sale";
import { v4 } from "uuid";
import { removeNonDigitNumbers } from "../../utils/masks";
import { useSale } from "../../hooks/useSale";
import {
  HandlePaymentData,
  handlePaymentData,
} from "../../components/Payment/payment.domain";
import { useNavigateWithUtm } from "../../hooks/useNavigateWithUtm";

export function useData(state: CheckoutSchemaType) {
  const {
    product,
    offer,
    affiliationCode,
    selectedOrderBump,
    utm,
    isOwner,
    shippingPrice,
  } = useProduct();
  const { setSale } = useSale();

  const { goTo } = useNavigateWithUtm();

  const onCardSubmit = async (
    data: CreditCardFormSchema,
    handleToggleProcessing: () => void,
    handleToggleFeedback: () => void,
    onFinish: (saleId: string) => void,
    onError: (msg: string) => void,
  ) => {
    const referenceId = v4();

    const disableInstallmentSelect =
      offer?.chargeShipping === "ChargeCustomerShipping" && shippingPrice <= 0;

    if (disableInstallmentSelect) return;

    const { name, phone, document, email } = state.userData;
    const { zipCode, street, number, complement, neighborhood, city, uf } =
      state.addressData;
    const date = new Date();
    const expirationDate = format(addDays(date, 5), "yyyy-MM-dd");

    if (!product || !offer) return;

    try {
      handleToggleProcessing();

      const isProd = import.meta.env.VITE_NODE_ENV === "prod";
      const token = isProd
        ? import.meta.env.VITE_PUBLIC_TOKEN_GALAXY_PAY_PROD
        : import.meta.env.VITE_PUBLIC_TOKEN_GALAXY_PAY_DEV_AND_STAGING;

      const galaxyPay = new window.GalaxPay(token, isProd);

      const card = galaxyPay.newCard({
        holder: data.cardHolder,
        number: data.cardNumber,
        expiresAt: `${data.expiryYear}-${data.expiryMonth}`,
        cvv: data.cvv,
      });

      const hash = await new Promise((resolve, reject) =>
        galaxyPay.hashCreditCard(
          card,
          (hash) => resolve(hash),
          (error) => reject(error),
        ),
      ).then((resp) => resp as string);

      if (!hash) {
        throw new Error("Does not possible to get public key");
      }

      const formattedData: SubmitData = {
        sellerId: product?.user?.id ?? ``,
        shippingPrice,
        salePrice: selectedOrderBump?.price ?? product.priceSale,
        referenceId,
        description: "",
        customer: {
          name,
          phone: removeNonDigitNumbers(phone),
          document: removeNonDigitNumbers(document),
          email,
          address: {
            zipCode: removeNonDigitNumbers(zipCode),
            street,
            number,
            complement: complement ?? "",
            neighborhood,
            city: city ?? "",
            state: uf ?? "",
          },
        },
        products: [
          {
            id: product.id,
            price: product.priceSale,
          },
        ],
        transactions: [
          {
            paymentMethod: PaymentMethod.creditCard, // creditCard | bankBillet | pix
            value: selectedOrderBump?.price ?? product.priceSale,
            expirationDate,
            card: {
              hash,
              installments: data.installments,
            },
          },
        ],
        offerId: offer?.code,
        affiliationId: affiliationCode,
        utm: {
          campaign: utm?.campaign ?? undefined,
          data1: utm?.data1 ?? undefined,
          data2: utm?.data2 ?? undefined,
          medium: utm?.medium ?? undefined,
          source: utm?.source ?? undefined,
        },
      };

      const response = await postSale({
        data: {
          ...formattedData,
          offerOrderBumpId: selectedOrderBump?.code ?? undefined,
        },
        isOwner,
      });

      setSale(response);
      console.log("aqui?", response);
      onFinish(response.id);
    } catch (error: any) {
      handleToggleFeedback();
      if (error.message.includes("Não foi possível criptografar os dados")) {
        onError("Dados de cartão invalidos");
        return;
      }
      onError(error.message);
      console.log(error.message);
      console.error("onPaymentSubmit", error);
    } finally {
      handleToggleProcessing();
    }
  };

  const onPaymentPixSubmit = async (onError: () => void) => {
    const customer = state.userData;
    const address = state.addressData;

    if (!product || !offer) return;

    try {
      const paymentPayload = {
        affiliationCode,
        customer: {
          ...customer,
          address: {
            ...address,
            city: address?.city ?? "",
            state: address?.uf ?? "",
            complement: address?.complement ?? "",
          },
        },
        offer,
        paymentMethod: PaymentMethod.pix,
        shippingPrice,
        product,
        orderBump: selectedOrderBump,
        utm: {
          campaign: utm?.campaign ?? undefined,
          data1: utm?.data1 ?? undefined,
          data2: utm?.data2 ?? undefined,
          medium: utm?.medium ?? undefined,
          source: utm?.source ?? undefined,
        },
      };

      const formattedData = handlePaymentData(paymentPayload);

      const response = await postSale({ data: formattedData, isOwner });

      setSale(response);

      goTo({ affiliationCode, saleId: response.id });
    } catch (error) {
      onError();
    }
  };

  const onPaymentSlipSubmit = async (
    onFinish: (saleId: string) => void,
    onError: () => void,
  ) => {
    const customer = state.userData;
    const address = state.addressData;

    if (!product || !offer) return;

    try {
      const paymentPayload: HandlePaymentData = {
        affiliationCode,
        customer: {
          ...customer,
          address: {
            ...address,
            city: address.city ?? "",
            state: address.uf ?? "",
            complement: address.complement ?? "",
          },
        },
        offer,
        paymentMethod: PaymentMethod.bankBillet,
        shippingPrice,
        product,
        orderBump: selectedOrderBump,
        utm: {
          campaign: utm?.campaign ?? undefined,
          data1: utm?.data1 ?? undefined,
          data2: utm?.data2 ?? undefined,
          medium: utm?.medium ?? undefined,
          source: utm?.source ?? undefined,
        },
      };

      const formattedData = handlePaymentData(paymentPayload);

      const response = await postSale({ data: formattedData, isOwner });

      const transaction = response.transactions.find(
        (t) => t.paymentMethod === "bankBillet",
      );

      if (!transaction) return;

      setSale(response);
      // handleCheckSaleStatus(response.id);
      onFinish(response.id);
    } catch (error) {
      onError();
      // handleToggleOpenFeedback();
      console.error("onPaymentSlipSubmit: ", error);
    }
  };

  return {
    onCardSubmit,
    onPaymentPixSubmit,
    onPaymentSlipSubmit,
  };
}
