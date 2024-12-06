import Heart from "../Icons/Heart";
import Logo from "../Icons/Logo";
import * as S from "./styles";

function Footer() {
  const handleOpenTermsOfUse = () => {
    window.open("https://360hub.com.br/termos-de-uso/", "_blank");
  };

  const handleOpenPrivacyPolices = () => {
    window.open("https://360hub.com.br/politicas", "_blank");
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Text>FEITO COM</S.Text>
        <Heart />
        <S.Text>PELA</S.Text>
        <Logo />
      </S.Container>

      <S.Term>
        Esta compra será processada pela 360Hub. <br />* Taxas aplicadas em
        pagamentos parcelados com juros: de 2,99% a.m. <br />
        ** Descontos não cumulativos, prevalecendo o maior desconto ofertado.
        <br />
        Ao realizar essa compra, você concorda com os{" "}
        <S.Link onClick={handleOpenTermsOfUse}>Termos de Uso da 360Hub</S.Link>
        {" e com as "}
        <S.Link onClick={handleOpenPrivacyPolices}>
          Políticas de Privacidade
        </S.Link>
        .
      </S.Term>
    </S.Wrapper>
  );
}

export default Footer;
