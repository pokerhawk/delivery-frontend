import SuccessIcon from "../../../../components/Icons/Succcess";
import formatPrice from "../../../../utils/format-price";

import { Product } from "../../../../services/product";
import {
  EnumStatusSale,
  TGetSaleResponse,
  getSaleStatus,
} from "../../../../services/sale";

import { QRCodeSVG } from "qrcode.react"
import { useEffect } from "react"
import Button from "../../../../components/Button"
import Footer from "../../../../components/Footer"
import { useProduct } from "../../../../hooks/useProduct";
import { useSale } from "../../../../hooks/useSale";
import { copyToClipboard } from "../../../../utils/copyToClipboard";
import * as S from "../../styles";
import ClickModal from "../Modal";
import * as Q from "./styles";
import { useNavigateWithUtm } from "../../../../hooks/useNavigateWithUtm";

type ProcessingTemplateProps = {
  saleStatus?: TGetSaleResponse;
  product?: Product;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ProcessingTemplate = ({
  product,
  saleStatus,
  closeModal,
  isModalOpen,
}: ProcessingTemplateProps) => {
  const {
    offer,
    totalPrice,
    affiliationCode,
    shippingPrice,
    installmentTax,
    selectedOrderBump,
  } = useProduct();
  const { sale, setSaleStatus } = useSale();
  const isPixPayment = sale?.transactions[0]?.paymentMethod === `pix`;
  const isProcessingPix = isPixPayment && saleStatus?.status === "pending";
  const { goTo } = useNavigateWithUtm();

  const currentOffer = selectedOrderBump || offer;
  const isFreeShipping =
    currentOffer?.chargeShipping !== "ChargeCustomerShipping";

  const productPrice = totalPrice / 100;
  const shipping = isFreeShipping ? 0 : shippingPrice / 100;
  const tax = installmentTax / 100;
  const pixDiscount = isPixPayment
    ? ((offer?.pixDiscount ?? 0) / 100) * productPrice
    : 0;

  const price = productPrice + shipping + tax - pixDiscount;

  const handleCheckSaleStatus = async () => {
    if (!sale?.id) return;

    const saleId = sale.id;

    try {
      const saleStatus = await getSaleStatus(saleId);
      setSaleStatus(saleStatus);

      if (saleStatus.status === EnumStatusSale.paid) {
        if (!!offer?.thankYouPage) {
          goTo({ externalUrl: offer.thankYouPage, affiliationCode, saleId });
          return;
        }
      }
    } catch (error) {
      console.error("handleCheckSaleStatus", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleCheckSaleStatus();
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [sale]);

  if (isProcessingPix) {
    return (
      <S.Container>
        {isModalOpen && (
          <ClickModal
            text="Estamos quase lá, copie o código e efetue o pagamento!"
            onClose={closeModal}
            offerPrice={totalPrice}
            product={product}
            sale={sale}
          />
        )}
        <S.Box>
          <S.ContainerText>
            <SuccessIcon />
            <S.Title id="convert_sale">Obrigado!</S.Title>
          </S.ContainerText>

          <Q.Container>
            <Q.QrCodeContainer>
              {sale?.transactions[0].galaxPayTransaction?.Pix?.qrCode && (
                <QRCodeSVG
                  value={sale.transactions[0].galaxPayTransaction.Pix.qrCode}
                />
              )}

              <Q.QrInfoContainer>
                <Q.Title>Instruções de pagamento com PIX</Q.Title>
                <Q.Description>
                  Abra seu banco ou instituição financeira e acesse o ambiente
                  Pix. Escolha a opção de pagamento com QR Code e escaneie o
                  código ao lado.
                </Q.Description>
              </Q.QrInfoContainer>
            </Q.QrCodeContainer>

            <Q.CopyPasteContainer>
              <Q.CopyPasteTitle>Pix copia e cola</Q.CopyPasteTitle>
              <Q.CopyWrapper>
                <Q.CopyPasteDescription>
                  Se preferir, você pode copiar o código abaixo e colar em seu
                  aplicativo ou internet banking.
                </Q.CopyPasteDescription>
                <Q.QrLink>
                  {sale?.transactions[0]?.galaxPayTransaction?.Pix?.qrCode ??
                    "Nenhum código disponível"}
                </Q.QrLink>
              </Q.CopyWrapper>
              <Q.CopyButtonContainer>
                <Button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      sale?.transactions[0].galaxPayTransaction?.Pix?.qrCode ??
                        "",
                    )
                  }
                >
                  COPIAR
                </Button>
              </Q.CopyButtonContainer>
            </Q.CopyPasteContainer>
            <Q.QrGenerationContainer>
              <Q.BouncingContainer>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Q.BouncingContainer>
              <Q.PaymentStatus>Aguardando confirmação</Q.PaymentStatus>
            </Q.QrGenerationContainer>
          </Q.Container>

          <S.Divider />

          <S.ProductContainer>
            <S.MessageSubtitle>Você comprou:</S.MessageSubtitle>
            <S.ProductBoxInfo>
              <S.ProductImage src={product?.coverImage} />
              <S.ProductName>{product?.name}</S.ProductName>
              <S.MessageSubtitle>{formatPrice(price)}</S.MessageSubtitle>
            </S.ProductBoxInfo>

            <S.ProductDetails>
              <S.MessageSubtitle>Informações de entrega:</S.MessageSubtitle>

              <S.ProductDetailsAddress>
                {saleStatus?.customer.name}
              </S.ProductDetailsAddress>
              <S.ProductDetailsAddress>
                {saleStatus?.customer.address?.street} -{" "}
                {saleStatus?.customer.address?.number}
              </S.ProductDetailsAddress>
              <S.ProductDetailsAddress>
                {saleStatus?.customer.address?.neighborhood}
              </S.ProductDetailsAddress>
              <S.ProductDetailsAddress>
                {saleStatus?.customer.address?.city} -{" "}
                {saleStatus?.customer.address?.state}
              </S.ProductDetailsAddress>
              <S.ProductDetailsAddress>
                {saleStatus?.customer.address?.zipcode}
              </S.ProductDetailsAddress>
            </S.ProductDetails>
          </S.ProductContainer>
        </S.Box>
        <Footer />
      </S.Container>
    );
  }

  return (
    <S.Container>
      {isModalOpen && (
        <ClickModal
          text="Leia as informações a seguir com atenção!"
          onClose={closeModal}
          offerPrice={totalPrice}
          sale={sale}
          product={product}
        />
      )}
      <S.Box>
        <S.ContainerText>
          <SuccessIcon />
          <S.Title>Obrigado!</S.Title>
          <S.MessageSubtitle>
            Estamos processando seu pagamento.
          </S.MessageSubtitle>
          <S.Message>
            Em breve enviaremos a confirmação do pagamento em seu e-mail.
          </S.Message>
        </S.ContainerText>

        <S.Divider />

        <S.ProductContainer>
          <S.MessageSubtitle>Você comprou:</S.MessageSubtitle>
          <S.ProductBoxInfo>
            <S.ProductImage src={product?.coverImage} />
            <S.ProductName>{product?.name}</S.ProductName>
            <S.MessageSubtitle>{formatPrice(price)}</S.MessageSubtitle>
          </S.ProductBoxInfo>

          <S.ProductDetails>
            <S.MessageSubtitle>Informações de entrega:</S.MessageSubtitle>

            <S.ProductDetailsAddress>
              {saleStatus?.customer.name}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.street} -{" "}
              {saleStatus?.customer.address?.number}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.neighborhood}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.city} -{" "}
              {saleStatus?.customer.address?.state}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.zipcode}
            </S.ProductDetailsAddress>
          </S.ProductDetails>
        </S.ProductContainer>
      </S.Box>
      <Footer />
    </S.Container>
  );
};

export default ProcessingTemplate;
