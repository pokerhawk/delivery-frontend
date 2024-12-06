import formatPrice from "../../../../utils/format-price";

import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer";
import BoletoIcon from "../../../../components/Icons/Boleto";
import { useProduct } from "../../../../hooks/useProduct";
import { useSale } from "../../../../hooks/useSale";
import { Product } from "../../../../services/product";
import { TGetSaleResponse } from "../../../../services/sale";
import { copyToClipboard } from "../../../../utils/copyToClipboard";
import * as S from "../../styles";
import ClickModal from "../Modal";

type BoletoPaidTemplateProps = {
  saleStatus?: TGetSaleResponse;
  product?: Product;
  closeModal: () => void;
  isModalOpen: boolean;
};

const BoletoPaidTemplate = ({
  saleStatus,
  product,
  closeModal,
  isModalOpen,
}: BoletoPaidTemplateProps) => {
  const { offer, totalPrice, shippingPrice, selectedOrderBump } = useProduct();
  const { sale } = useSale();

  const currentOffer = selectedOrderBump || offer;
  const isFreeShipping =
    currentOffer?.chargeShipping !== "ChargeCustomerShipping";

  const productPrice = totalPrice / 100;

  const shipping = isFreeShipping ? 0 : shippingPrice / 100;
  const totalValue = productPrice + shipping;

  const onClickOpenSlip = () => {
    window.open(saleStatus?.transactions[0]?.pdfBankBillet, "_blank");
  };

  const onClickCopySlip = () => {
    const barCode = sale?.transactions[0]?.galaxPayTransaction?.Boleto?.barCode;

    copyToClipboard(barCode);
  };

  return !!product ? (
    <S.Container>
      {isModalOpen && (
        <ClickModal
          text="Estamos quase lá, copie o código e efetue o pagamento!"
          onClose={closeModal}
          offerPrice={totalValue}
          product={product}
          sale={sale}
        />
      )}
      <S.Box>
        <S.ContainerText>
          <BoletoIcon />
          <S.Title id="convert_sale">Obrigado!</S.Title>
          <S.MessageSubtitle>Boleto gerado com sucesso.</S.MessageSubtitle>

          <div>
            <S.Message>Copie o código de barras abaixo.</S.Message>

            <S.ButtonWrapper onClick={onClickCopySlip}>
              <Button type="button">COPIAR CÓDIGO DE BARRAS</Button>
            </S.ButtonWrapper>
          </div>

          <div>
            <S.Message style={{ marginTop: 20 }}>
              Ou faça o download do boleto clicando no botão abaixo.
            </S.Message>
            <S.ButtonWrapper onClick={onClickOpenSlip}>
              <Button type="button">ABRIR BOLETO</Button>
            </S.ButtonWrapper>
          </div>
        </S.ContainerText>

        <S.Divider />

        <S.ProductContainer>
          <S.MessageSubtitle>Você comprou:</S.MessageSubtitle>
          <S.ProductBoxInfo>
            <S.ProductImage src={product?.coverImage} />
            <S.ProductName>{product?.name}</S.ProductName>
            <S.MessageSubtitle>{formatPrice(totalValue)}</S.MessageSubtitle>
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
  ) : (
    <div></div>
  );
};

export default BoletoPaidTemplate;
