import { CreditCardFormSchema } from "../../components/PaymentCard/misc";
import { v4 } from "uuid";
import { useNavigateWithUtm } from "../../hooks/useNavigateWithUtm";
import { useProduct } from "../../hooks/useProduct";
import { useSale } from "../../hooks/useSale";
import { saleApi } from "../../services/axios";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import { addDays, format } from "date-fns";

export function useData(state: CheckoutSchemaType) {
  const { externalSale, affiliationCode, shippingPrice } = useProduct();

  const referenceId = v4();

  const { setSale } = useSale();

  const { goTo } = useNavigateWithUtm();

  const getPaymentBody = (
    paymentMethod: "pix" | "creditCard" | "bankBillet",
  ) => {
    const { name, phone, document, email } = state.userData;
    const { zipCode, street, number, complement, neighborhood, city, uf } =
      state.addressData;

    const orderBumpPrice =
      externalSale?.offerOrderBump?.reduce(
        (acc, orderBump) => acc + orderBump.price,
        0,
      ) ?? 0;
    const offerPrice = externalSale?.offer?.price ?? 0;

    const price = orderBumpPrice + offerPrice;

    return {
      saleId: externalSale?.id,
      affiliationCode,
      shippingPrice,
      referenceId,
      isPhysical: externalSale?.offer.product.type === `physical`,
      paymentMethod,
      salePrice: price,
      // TODO: checar assa quantity aqui
      offer: { id: externalSale?.offer.id, quantity: 1 },
      // TODO: checar essa quantity aqui
      offersOrderBump: externalSale?.offerOrderBump.map((orderBump) => ({
        id: orderBump.id,
        quantity: 1,
      })),
      customer: {
        name,
        phone: phone.replace(/\D/g, ""),
        document: document.replace(/\D/g, ""),
        email,
        address: {
          zipCode: zipCode.replace(/\D/g, ""),
          street,
          number,
          complement,
          neighborhood,
          city,
          state: uf,
        },
      },
    };
  };

  const onCardSubmit = async (
    data: CreditCardFormSchema,
    handleToggleProcessing: () => void,
    handleToggleFeedback: () => void,
    onFinish: (saleId: string) => void,
    onError: (msg: string) => void,
  ) => {
    try {
      handleToggleProcessing();

      const body = getPaymentBody("creditCard");

      const isProd = import.meta.env.VITE_NODE_ENV === "prod";
      const token = isProd
        ? import.meta.env.VITE_PUBLIC_TOKEN_GALAXY_PAY_PROD
        : import.meta.env.VITE_PUBLIC_TOKEN_GALAXY_PAY_DEV_AND_STAGING;
        const expirationDate = format(addDays(new Date(), 5), "yyyy-MM-dd");

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

      const response = await saleApi.post(`/sales/external`, {
        ...body,
        installments: data.installments,
        expirationDate,
        cardHash: hash
      });

      onFinish(response.data[0].sale.id);
    } catch (error: any) {
      handleToggleFeedback();
      onError(error.message);
      console.log("error", error);
    } finally {
      handleToggleProcessing();
    }
  };

  const onPaymentPixSubmit = async (onError: () => void) => {
    try {
      const body = getPaymentBody("pix");
      const response = await saleApi.post(`/sales/external`, body);

      setSale(response.data[0].sale);

      goTo({ saleId: response.data[0].sale.id });
    } catch (error: any) {
      onError();
      console.log("ERROR", error);
    }
  };

  const onPaymentSlipSubmit = async (
    onFinish: (saleId: string) => void,
    onError: () => void,
  ) => {
    try {
      const body = getPaymentBody('bankBillet')

      const response = await saleApi.post(`/sales/external`, body);

      setSale(response.data[0].sale);

      onFinish(response.data[0].sale.id);
    } catch (error: any) {
      onError();
      console.log("ERROR", error);
    }
  };

  return { onCardSubmit, onPaymentPixSubmit, onPaymentSlipSubmit };
}
