import { GlobalStyles } from '../../styles/global'
import FormSignIn from '../../components/FormSignIn'
import * as S from './styles'

const Login = () => {
  return (
    <>
      <GlobalStyles />
      <div className="flex h-screen flex-col">
        <S.Header>
          {/* <Logo /> */}
        </S.Header>
        <div className="flex h-screen flex-row justify-between">
          <S.Left className="w-full md:w-1/2  md:items-center">
            <S.WrapperForm>
              <S.WrapperTitle>
                <h1>Seja bem-vindo(a)</h1>
                <h4>Entre com seus dados de login abaixo</h4>
              </S.WrapperTitle>

              <FormSignIn />
            </S.WrapperForm>
          </S.Left>

          <S.Right className="w-1/2">
            <S.WrapperBoxNotificationPage>
              <S.BoxNotificationPage>
                <S.Tag>
                  <S.Icon src="/images/alvo.svg" />
                  <span>Faça sua empresa performar ainda mais</span>
                </S.Tag>
                <S.BoxNotificationDescription>
                  Na 360Hub você encontra as soluções para o seu negócio,
                  integradas em um único lugar e de ponta a ponta.
                </S.BoxNotificationDescription>
              </S.BoxNotificationPage>
            </S.WrapperBoxNotificationPage>

            <S.Image src="/images/login-bg.png" />
          </S.Right>
        </div>
      </div>
    </>
  )
}

export default Login
