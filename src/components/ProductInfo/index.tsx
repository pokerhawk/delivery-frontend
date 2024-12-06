import { useProduct } from "../../hooks/useProduct";
import Skeleton from "./Skeleton";
import * as S from "./styles";

function ProductInfo() {
  const { product, offer, isLoading } = useProduct();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <S.Container>
      <S.ProductCard>
        {product?.coverImage && (
          <S.ProductImage src={product?.coverImage} alt="Product" />
        )}

        <div>
          <S.ProductName>{product?.name}</S.ProductName>
          <S.ProductDescription>
            <p>Oferta:</p>
            &nbsp;<p>{offer?.title}</p>
          </S.ProductDescription>
        </div>
      </S.ProductCard>
    </S.Container>
  );
}

export default ProductInfo;
