import { useProduct } from "../../../../hooks/useProduct";
import { Offer, OrderBump } from "../../../../services/product";
import { formatPriceCents } from "../../../../utils/format-price";
import Cart from "../../../Icons/Cart";
import * as S from "./styles";

type OptionCardProps = {
  isLoading?: boolean;
  orderBump?: OrderBump;
};

function OptionCard({ isLoading = false, orderBump }: OptionCardProps) {
  const { product, selectedOrderBump, setSelectedOrderBump, setOffer, offer } =
    useProduct();
  const isSelectedOption = selectedOrderBump?.code === orderBump?.code;

  const handleSelectOption = () => {
    if (!orderBump) return;

    setOffer({ ...offer, chargeShipping: orderBump.chargeShipping, thankYouPage: orderBump.thankYouPage  } as Offer);
    setSelectedOrderBump(orderBump);
  };

  if (isLoading) {
    return (
      <S.Container isSelected={false}>
        <S.Heading>
          <S.Skeleton height="95px" width="95px" />

          <S.Content>
            <S.Skeleton height="20px" width="215px" />
            <div>
              <S.Description>
                <div className="row">
                  De:
                  <S.Skeleton height="18px" width="60px" />
                </div>
                <div className="row">
                  Por:
                  <S.Skeleton
                    style={{ marginLeft: -4, marginTop: 6 }}
                    height="18px"
                    width="60px"
                  />
                </div>
                <S.Skeleton
                  style={{ marginTop: 8 }}
                  height="18px"
                  width="80px"
                />
              </S.Description>
            </div>
          </S.Content>
        </S.Heading>

        <S.AddButton type="button" disabled>
          <Cart />
          Adicionar
        </S.AddButton>
      </S.Container>
    );
  }

  return (
    <S.Wrapper>
      <S.Container isSelected={isSelectedOption}>
        <S.Heading>
          <S.Image
            src={product?.coverImage}
            alt={orderBump?.title}
            loading="lazy"
          />

          <S.Content>
            <S.Title>{orderBump?.title}</S.Title>
            <div>
              <S.Description>
                {/* <div className="row">
                  De:
                  <p className="oldPrice">
                    {formatPriceCents(orderBump?.priceFrom)}
                  </p>
                </div>
                <div className="row">
                  Por:
                  <p className="newPrice">
                    {formatPriceCents(orderBump?.price)}
                  </p>
                </div> */}

                <small>{orderBump?.textPrice}</small>
              </S.Description>
            </div>
          </S.Content>
        </S.Heading>

        {isSelectedOption ? (
          <strong className="addedOffer">Adicionado</strong>
        ) : (
          <S.AddButton
            className="btn_orderbump_add"
            type="button"
            onClick={handleSelectOption}
          >
            <Cart />
            {orderBump?.textButton}
          </S.AddButton>
        )}
      </S.Container>
      <strong className="offerCall">{orderBump?.description}</strong>
    </S.Wrapper>
  );
}

export default OptionCard;
