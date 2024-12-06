import { useProduct } from '../../hooks/useProduct';
import OptionCard from './components/OptionCard';
import * as S from './styles';

function OrderBump() {
  const { isLoading, offer } = useProduct();

  if (isLoading) {
    return (
      <S.Wrapper>
        <S.Skeleton height="20px" width="215px" />

        <OptionCard isLoading />

        <S.Skeleton style={{ alignSelf: 'center', marginTop: 8 }} height="18px" width="300px" />
      </S.Wrapper>
    );
  }

  if (offer?.orderBump && offer?.orderBump?.length > 0) {
    return (
      <S.Wrapper>
        <strong className="title">Que tal levar mais por menos?</strong>

        <div className="offersContainer">
          {offer.orderBump.map(orderBump => <OptionCard key={orderBump.id} orderBump={orderBump} />)}
        </div>
      </S.Wrapper>
    );
  }

  return null;
}

export default OrderBump;
