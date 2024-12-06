import Heart from "../../components/Icons/Heart";
import Logo from "../../components/Icons/Logo";
import NotFoundIcon from "../../components/Icons/NotFound";

import * as S from "./styles";

const ErrorPageTemplate = () => {
  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <NotFoundIcon />
      </S.ImageWrapper>

      <S.Heading>Esse produto foi desativado ou não encontrado.</S.Heading>
      <S.Subtitle>
        Entre em contato com o vendedor e solicite um novo link.
      </S.Subtitle>

      <S.FooterText>
        FEITO COM <Heart /> PELA <Logo />
      </S.FooterText>
    </S.Wrapper>
  );
};

export default ErrorPageTemplate;
