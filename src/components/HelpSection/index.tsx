import { useProduct } from "../../hooks/useProduct";
import CryptoBadge from "../Icons/CryptoBadge";
import SecurityBadge from "../Icons/SecurityBadge";
import Support from "../Icons/Support";
import * as S from "./styles";

function HelpSection() {
  const { offer } = useProduct();
  const hasSupportCard = !!offer?.support?.emailSupport && offer?.support?.phoneSupport;

  return (
    <S.Container className={hasSupportCard ? '' : 'oneCardView'}>
      {hasSupportCard && (
        <S.SupportCard>
          <Support />
          <S.SupportContent>
            <strong>Suporte ao cliente:</strong>
            <br />
            {offer?.support?.emailSupport}
            <br />
            {offer?.support?.phoneSupport}
          </S.SupportContent>
        </S.SupportCard>
      )}

      <S.SecurityCard>
        <S.SecurityContent>
          <SecurityBadge />
          <strong>Ambiente de compra segura</strong>
        </S.SecurityContent>
        <S.SecurityContent>
          <CryptoBadge />
          <strong>Dados Criptografados</strong>
        </S.SecurityContent>
      </S.SecurityCard>
    </S.Container>
  );
}

export default HelpSection;
