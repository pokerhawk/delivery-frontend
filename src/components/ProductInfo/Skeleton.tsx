import * as S from "./styles";

const Skeleton = () => (
  <S.Container>
    <S.ProductCard>
      <S.Skeleton width="45px" height="45px" />

      <div>
        <S.Skeleton width="180px" height="14px" />
        <S.ProductDescription>
          {/* <p>Vendedor:</p> */}
          <S.Skeleton width="125px" height="12px" />
        </S.ProductDescription>
      </div>
    </S.ProductCard>
  </S.Container>
);

export default Skeleton;
