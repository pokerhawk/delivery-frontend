// import { useCallback, useEffect, useState } from "react";
// import { useProduct } from "../../hooks/useProduct";
// import { calculateTotalPrice } from "../../utils/calculateInstallments";
// import formatPrice, { calculatePixDiscount } from "../../utils/format-price";
// import { transactionsHelper } from "../../utils/transactionsHelper";

// import * as S from "./styles";

type ProductPriceProps = {
  installmentOne: {
    installment: number;
    price: number;
  };
  installmentTwo?: {
    installment: number;
    price: number;
  };
  hasPix?: boolean;
  onlyPix?: boolean;
};

function ProductPrice({}: // installmentOne,
// installmentTwo,
// hasPix = false,
// onlyPix = false,
ProductPriceProps) {
  return null;

  // const { product, priceOrder, totalPrice, offer } = useProduct();
  // const [cardOnePrice, setCardOnePrice] = useState("");
  // const [cardTwoPrice, setCardTwoPrice] = useState("");

  // useEffect(() => {
  //   const transactionPrice = installmentOne.price / 100;
  //   const priceWithTaxes = calculateTotalPrice({
  //     installment: installmentOne.installment,
  //     installmentInterest: offer?.installmentInterest ?? 0,
  //     installmentsFreeInterest: offer?.installmentsFreeInterest ?? 0,
  //     total: transactionPrice,
  //   });

  //   if (onlyPix && offer?.pixDiscount && offer?.pixDiscount > 0) {
  //     const withDiscountPrice = calculatePixDiscount(
  //       transactionPrice,
  //       offer?.pixDiscount
  //     );
  //     const newPrice = transactionPrice - withDiscountPrice;

  //     setCardOnePrice(
  //       formatPrice(newPrice + (priceOrder?.lowPrice.price ?? 0))
  //     );

  //     return;
  //   }

  //   setCardOnePrice(formatPrice(priceWithTaxes));
  // }, [totalPrice, installmentOne, offer, onlyPix]);

  // useEffect(() => {
  //   if (!installmentTwo) return;

  //   const transactionPrice = installmentTwo.price / 100;
  //   const priceWithTaxes = calculateTotalPrice({
  //     installment: installmentTwo.installment,
  //     installmentInterest: offer?.installmentInterest ?? 0,
  //     installmentsFreeInterest: offer?.installmentsFreeInterest ?? 0,
  //     total: transactionPrice,
  //   });

  //   setCardTwoPrice(formatPrice(priceWithTaxes));
  // }, [totalPrice, installmentTwo, offer]);

  // return (
  //   <S.Container>
  //     <S.Text>
  //       Valor do produto:{" "}
  //       {formatPrice(
  //         transactionsHelper.getReplaceCentsPrice(product?.priceSale)
  //       )}
  //     </S.Text>
  //     {onlyPix && offer?.pixDiscount && offer?.pixDiscount > 0 && (
  //       <S.Text>
  //         <span>
  //           Desconto pix:&nbsp;
  //           {formatPrice(
  //             calculatePixDiscount(
  //               product?.priceSale ?? 0,
  //               offer?.pixDiscount
  //             ) / 100
  //           )}
  //         </span>
  //       </S.Text>
  //     )}
  //     {cardTwoPrice ? (
  //       <>
  //         {priceOrder && (
  //           <>
  //             <S.Text>Frete: {formatPrice(priceOrder.lowPrice.price)}</S.Text>

  //             <S.Text className="bold">
  //               Total (produto + frete): {formatPrice(totalPrice / 100)}
  //             </S.Text>
  //           </>
  //         )}
  //         <S.Text>Cartão 1: {cardOnePrice}</S.Text>
  //         <S.Text>
  //           {hasPix ? "Pix" : "Cartão 2"}: {cardTwoPrice}
  //         </S.Text>
  //       </>
  //     ) : (
  //       <>
  //         {priceOrder && (
  //           <S.Text>Frete: {formatPrice(priceOrder.lowPrice.price)}</S.Text>
  //         )}
  //         <S.TotalValue>
  //           Total a pagar:&nbsp;
  //           {cardOnePrice}
  //         </S.TotalValue>
  //       </>
  //     )}
  //   </S.Container>
  // );
}

export default ProductPrice;
