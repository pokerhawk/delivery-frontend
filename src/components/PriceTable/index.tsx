import { useProduct } from "../../hooks/useProduct";
import formatPrice from "../../utils/format-price";
import * as S from "./styles";

type PaymentType = "pix" | "boleto" | "credit_card";

type PriceTable = {
  paymentType?: PaymentType;
};

const PriceTable = ({ paymentType = "credit_card" }: PriceTable) => {
  const {
    offer,
    totalPrice,
    shippingPrice,
    installmentTax,
    selectedOrderBump,
  } = useProduct();
  const currentOffer = selectedOrderBump || offer;

  const isPixPayment = paymentType === "pix";
  const isCreditCard = paymentType === "credit_card";
  const isFreeShipping =
    currentOffer?.chargeShipping !== "ChargeCustomerShipping";

  const productPrice = totalPrice / 100;
  const pixDiscount = ((offer?.pixDiscount ?? 0) / 100) * productPrice;

  const shipping = isFreeShipping ? 0 : shippingPrice / 100;
  const tax = isCreditCard ? installmentTax / 100 : 0;
  const discount = !!isPixPayment ? pixDiscount : 0;

  const totalValue = productPrice + shipping /* + tax */ - discount;

  return (
    <div>
      <S.PriceWrapper>
        <S.Text>Total produto:</S.Text>
        <S.Text>{formatPrice(productPrice)}</S.Text>
      </S.PriceWrapper>

      {currentOffer?.chargeShipping !== "ChargeCustomerShipping" && (
        <S.PriceWrapper>
          <S.Text>Frete:</S.Text>
          <S.Text>Grátis</S.Text>
        </S.PriceWrapper>
      )}

      {currentOffer?.chargeShipping === "ChargeCustomerShipping" &&
        !shippingPrice && (
          <S.TextWrapper>
            <S.Text>Cadastre um endereço acima para calcular o frete!</S.Text>
          </S.TextWrapper>
        )}

      {currentOffer?.chargeShipping === "ChargeCustomerShipping" &&
        !!shippingPrice && (
          <S.PriceWrapper>
            <S.Text>Frete:</S.Text>
            <S.Text>{formatPrice(shippingPrice / 100)}</S.Text>
          </S.PriceWrapper>
        )}

      {!!isPixPayment && !!pixDiscount && (
        <>
          <S.PriceWrapper>
            <S.Text>Desconto:</S.Text>
            <S.Text>{formatPrice(pixDiscount)}</S.Text>
          </S.PriceWrapper>
        </>
      )}

      <S.PriceWrapper>
        <S.Heading>Total:</S.Heading>
        <S.Heading>{formatPrice(totalValue)}</S.Heading>
      </S.PriceWrapper>
    </div>
  );
};

export default PriceTable;
