import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import { getSaleStatus, PaymentMethod, postSale } from "../../services/sale";
import Button from "../Button";

import { useSale } from "../../hooks/useSale";
import FeedbackModal from "../FeedbackModal";
import AlertIcon from "../Icons/Alert";
import {
  HandlePaymentData,
  handlePaymentData,
} from "../Payment/payment.domain";
import PriceTable from "../PriceTable";
import * as S from "./styles";
import { useNavigateWithUtm } from "../../hooks/useNavigateWithUtm";
import { Props as PaymentProps } from "../Payment";

type Props = {
  state: CheckoutSchemaType;
  processPaymentSlipSubmit: PaymentProps["onPaymentSlipSubmit"];
};

function PaymentSlip({ state, processPaymentSlipSubmit }: Props) {
  const [fetching, setFetching] = useState(false);
  const {
    product,
    affiliationCode,
    offer,
    selectedOrderBump,
    shippingPrice,
    isOwner,
    utm,
  } = useProduct();
  const currentOffer = selectedOrderBump || offer;
  const { setSaleStatus, setSale } = useSale();
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

  const { goTo } = useNavigateWithUtm();

  const isPaymentDisabled =
    currentOffer?.chargeShipping === "ChargeCustomerShipping" && !shippingPrice;

  const handleToggleOpenFeedback = () => {
    setIsOpenFeedback((prev) => !prev);
  };

  const handleCheckSaleStatus = async (saleId: string) => {
    try {
      const saleStatus = await getSaleStatus(saleId);
      setSaleStatus(saleStatus);

      goTo({ affiliationCode, saleId });
    } catch (error) {
      console.error("PaymentSlip: ", error);
    }
  };

  const onHandlePaymentSubmit = async () => {
    setFetching(true);

    await processPaymentSlipSubmit(
      handleCheckSaleStatus,
      handleToggleOpenFeedback,
    );

    setFetching(false);
  };

  return (
    <S.Container>
      <FeedbackModal
        isOpen={isOpenFeedback}
        onRequestClose={handleToggleOpenFeedback}
        title="Pagamento não processado"
        description="Ocorreu um erro ao tentar processar a venda"
        button="Tentar novamente"
        icon={<AlertIcon />}
      />
      <S.InfoTitle>Instruções de pagamento por Boleto Bancário</S.InfoTitle>
      <S.InstructionsContainer>
        <S.InstructionItem>1- Boleto somente à vista;</S.InstructionItem>
        <S.InstructionItem>
          2- Pagamentos com Boleto Bancário levam até 3 dias úteis para serem
          compensados. Somente após a compensação que o produto será liberado.
        </S.InstructionItem>
        <S.InstructionItem>
          3- Após o pagamento, fique atento ao seu e-mail para receber a
          confirmação e as informações sobre o produto comprado.
        </S.InstructionItem>
      </S.InstructionsContainer>

      <PriceTable paymentType="boleto" />

      <S.ButtonContainer>
        <Button
          type="button"
          onClick={onHandlePaymentSubmit}
          isLoading={fetching}
          disabled={isPaymentDisabled}
        >
          comprar agora!
        </Button>
      </S.ButtonContainer>
    </S.Container>
  );
}

export default PaymentSlip;
