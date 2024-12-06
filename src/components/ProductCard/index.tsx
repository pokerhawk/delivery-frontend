import { useProduct } from "../../hooks/useProduct";
import formatPrice from "../../utils/format-price";
import { Skeleton } from "../Skeleton";
import * as S from "./styles";

function ProductCard() {
  const {
    product,
    offer,
    isLoading,
    selectedOrderBump,
    setSelectedOrderBump,
    handleResetOffer
  } = useProduct();

  const price = offer?.price ?? 0 / 100;
  const hasSelectedOrderBump = !!selectedOrderBump;

  const handleRemoveOrderBump = () => {
    setSelectedOrderBump();
    handleResetOffer()
  };

  if (isLoading) {
    return (
      <S.Container>
        <Skeleton width="60px" height="60px" />

        <S.Content>
          <Skeleton height="20px" width="155px" />
          <Skeleton height="18px" width="100px" />
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <div className="heading">
        <S.Image src={product?.coverImage} loading="lazy" />
        <S.Content>
          <strong>{product?.name} ({offer?.title})</strong>
          <span>
            Por:
            <strong>{formatPrice(price / 100)}</strong>
          </span>
        </S.Content>
      </div>
      {hasSelectedOrderBump && (
        <S.RemoveOrderBumpButton type="button" onClick={handleRemoveOrderBump}>
          Voltar
        </S.RemoveOrderBumpButton>
      )}
    </S.Container>
  );
}

export default ProductCard;
