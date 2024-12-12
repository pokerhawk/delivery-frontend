import * as S from './styles'

import FormRegister from '../../components/FormRegister'

const Register = () => {
  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.customLogo />
        </S.Header>
        <S.Left>
          <S.Image src="/images/register-bg.png" />
        </S.Left>

        <S.Right>
          <S.WrapperForm>
            <S.WrapperTitle>
              <h1>Vamos criar a sua conta?</h1>
              <h4>Começar é simples e rápido!</h4>
            </S.WrapperTitle>
            <FormRegister />
          </S.WrapperForm>
        </S.Right>
      </S.Wrapper>
    </>
  )
}

export default Register
