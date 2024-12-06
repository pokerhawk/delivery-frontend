import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { useSale } from "../../hooks/useSale";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import { PaymentMethod, postSale } from "../../services/sale";
import Button from "../Button";
import FeedbackModal from "../FeedbackModal";
import AlertIcon from "../Icons/Alert";
import { handlePaymentData } from "../Payment/payment.domain";
import PriceTable from "../PriceTable";
import * as S from "./styles";
import { useNavigateWithUtm } from "../../hooks/useNavigateWithUtm";
import { Props as PaymentProps } from "../Payment";

type Props = {
  state: CheckoutSchemaType;
  processPixSubmit: PaymentProps["onPaymentPixSubmit"];
};

function PaymentPix({ state, processPixSubmit }: Props) {
  const {
    product,
    offer,
    affiliationCode,
    selectedOrderBump,
    isOwner,
    utm,
    shippingPrice,
  } = useProduct();
  const currentOffer = selectedOrderBump || offer;
  const { setSale } = useSale();
  const [fetching, setFetching] = useState(false);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);

  const isPaymentDisabled =
    currentOffer?.chargeShipping === "ChargeCustomerShipping" && !shippingPrice;

  const handleToggleFeedback = () => {
    setIsOpenFeedback((prev) => !prev);
  };

  // Payment by pix
  const handlePaymentSubmit = async () => {
    setFetching(true);

    await processPixSubmit(handleToggleFeedback);

    setFetching(false);
  };

  return (
    <S.InstructionsWrapper>
      <FeedbackModal
        isOpen={isOpenFeedback}
        onRequestClose={handleToggleFeedback}
        title="QR não processado"
        description="Ocorreu um erro ao processar o pix QRCode"
        button="Tentar novamente"
        icon={<AlertIcon />}
      />
      <S.InfoTitle>Instruções de pagamento com PIX</S.InfoTitle>
      <S.InstructionsContainer>
        <S.InstructionItem>
          Ao clicar em no botão “Comprar agora” você será direcionado para a
          página contendo os dados para pagamento com PIX. Não feche a página e
          realize o pagamento através do aplicativo do seu banco.
          <strong>
            &nbsp;Aguarde até que o pagamento seja e confirmado e você seja
            redirecionado para a página de “obrigado” para fechar o navegador.
          </strong>
        </S.InstructionItem>
      </S.InstructionsContainer>

      <PriceTable paymentType="pix" />

      <S.ButtonContainer>
        <Button
          type="button"
          onClick={handlePaymentSubmit}
          isLoading={fetching}
          disabled={isPaymentDisabled}
        >
          comprar agora!
        </Button>
      </S.ButtonContainer>
    </S.InstructionsWrapper>
  );
}

export default PaymentPix;
