import FormWrapper from "../FormWrapper";
import OrderBump from "../OrderBump";
import ProductCard from "../ProductCard";
import * as S from './styles';

function CartSection() {
  return (
    <section>
      <FormWrapper formId="buySummary" title="Resumo da Compra">
        <S.Title>Você está comprando:</S.Title>

        <ProductCard />
        <OrderBump />
      </FormWrapper>
    </section>
  );
}

export default CartSection;
