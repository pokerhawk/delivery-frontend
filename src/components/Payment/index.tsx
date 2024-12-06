import { useEffect, useState } from "react";

import { useProduct } from "../../hooks/useProduct";
import PaymentCard from "../PaymentCard";
import PaymentPix from "../PaymentPix";
import PaymentSlip from "../PaymentSlip";
import PaymentTab from "./components/PaymentTab";
import FormWrapper from "../FormWrapper";
import * as S from "./styles";
import { useTrackUserLeavingEvents } from "../../hooks/useTrackUserLeavingEvents";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import { CreditCardFormSchema } from "../PaymentCard/misc";

export type MethodType = "payment_slip" | "payment_card" | "payment_pix";

export const DEFAULT_PAYMENT_METHOD: MethodType = "payment_card";

export type Props = {
  checkoutPaymentOption: {
    creditCard: boolean;
    bankBillet: boolean;
    pix: boolean;
  };
  state: CheckoutSchemaType;
  onCardSubmit: (
    data: CreditCardFormSchema,
    handleToggleProcessing: () => void,
    handleToggleFeedback: () => void,
    onFinish: (saleId: string) => void,
    onError: (msg: string) => void,
  ) => void;
  onPaymentPixSubmit: (onError: () => void) => void;
  onPaymentSlipSubmit: (
    onFinish: (saleId: string) => void,
    onError: () => void,
  ) => void;
};

function Payment({
  checkoutPaymentOption,
  state,
  onCardSubmit,
  onPaymentPixSubmit,
  onPaymentSlipSubmit,
}: Props) {
  const { handlePriceOrder, offer, setInstallmentTax } = useProduct();
  const [method, setMethod] = useState<MethodType>(DEFAULT_PAYMENT_METHOD);

  const { trackEvent } = useTrackUserLeavingEvents();

  const handleMethod = async (method: MethodType) => {
    setInstallmentTax(0);
    setMethod(method);

    if (method === "payment_slip")
      trackEvent({ ...state, paymentMethod: "bankSlip" });
    if (method === "payment_card")
      trackEvent({ ...state, paymentMethod: "creditCard" });
    if (method === "payment_pix")
      trackEvent({ ...state, paymentMethod: "pix" });
  };

  useEffect(() => {
    handlePriceOrder(state.addressData.uf, state.addressData.city);
  }, []);

  return (
    <FormWrapper formId="paymentData" title="Dados de Pagamento">
      <S.ContainerBoxSelection>
        {checkoutPaymentOption.creditCard && (
          <PaymentTab
            paymentType="payment_card"
            onSelect={handleMethod}
            selected={method === "payment_card"}
          />
        )}
        {(checkoutPaymentOption.bankBillet && offer?.paymentBankBillet) && (
          <PaymentTab
            paymentType="payment_slip"
            onSelect={handleMethod}
            selected={method === "payment_slip"}
          />
        )}
        {checkoutPaymentOption.pix && (
          <PaymentTab
            paymentType="payment_pix"
            onSelect={handleMethod}
            selected={method === "payment_pix"}
          />
        )}
      </S.ContainerBoxSelection>

      {method === "payment_card" && (
        <PaymentCard state={state} processCardSubmit={onCardSubmit} />
      )}
      {method === "payment_pix" && (
        <PaymentPix state={state} processPixSubmit={onPaymentPixSubmit} />
      )}
      {method === "payment_slip" && (
        <PaymentSlip
          state={state}
          processPaymentSlipSubmit={onPaymentSlipSubmit}
        />
      )}
    </FormWrapper>
  );
}

export default Payment;
