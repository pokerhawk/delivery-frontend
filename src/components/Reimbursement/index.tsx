import { useProduct } from '../../hooks/useProduct';
import medal from '../../assets/medal.png';
import * as S from './styles';

function Reimbursement() {
  const { offer } = useProduct();

  if (!offer?.deadlineForReimbursement) return null;

  return (
    <S.Container>
      <img src={medal} alt="Medalha garantia" />
      <S.Content>
        <S.Title>Compra garantida: {offer.deadlineForReimbursement} dias</S.Title>
        <S.Description>oferecida pelo produtor para devolução do dinheiro.</S.Description>
      </S.Content>
    </S.Container>
  );
}

export default Reimbursement;
