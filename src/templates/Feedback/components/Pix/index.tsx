import SuccessIcon from "../../../../components/Icons/Succcess";
import formatPrice from "../../../../utils/format-price";

import { TGetSaleResponse } from "../../../../services/sale";
import { Product } from "../../../../services/product";

import * as S from "../../styles";
import { useProduct } from "../../../../hooks/useProduct";
import Footer from "../../../../components/Footer";

type PaidTemplateProps = {
  saleStatus?: TGetSaleResponse;
  product?: Product;
};

const PaidTemplate = ({ product, saleStatus }: PaidTemplateProps) => {
  const { offer, totalPrice, shippingPrice, selectedOrderBump } = useProduct();

  const currentOffer = selectedOrderBump || offer;
  const isFreeShipping =
    currentOffer?.chargeShipping !== "ChargeCustomerShipping";

  const productPrice = totalPrice / 100;
  const pixDiscount = ((offer?.pixDiscount ?? 0) / 100) * productPrice;
  const shipping = isFreeShipping ? 0 : shippingPrice / 100;

  const price = productPrice + shipping - pixDiscount;

  return !!product ? (
    <S.Container>
      <S.Box>
        <S.ContainerText>
          <SuccessIcon />
          <S.Title>Obrigado!</S.Title>
          <S.MessageSubtitle>Recebemos seu pagamento.</S.MessageSubtitle>
          <S.Message>
            Acompanhe em seu e-mail os detalhes de entrega da sua compra.
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
  ) : (
    <div></div>
  );
};

export default PaidTemplate;
