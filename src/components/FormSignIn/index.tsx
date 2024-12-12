import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as S from './styles'

import { useAuth } from '../../context/AuthContext'
import IconPassword from '../IconPassword'
import Input from '../Input'
import ButtonV2 from '../ButtonV2'

type Inputs = {
  email: string
  password: string
}

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .max(20, 'Senha deve ter no máximo 20 caracteres')
})

const FormSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) })

  const { signIn, loading } = useAuth()

  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')

  const passwordType = visible ? 'text' : 'password'

  const handleVisiblePawsword = () => {
    setVisible((oldState) => !oldState)
  }

  const handleLogin = handleSubmit(async ({ email, password }: Inputs) => {
    setError('')
    try {
      await signIn({ email, password })
    } catch (err: any) {
      if (err.response.status === 401) {
        setError('E-mail ou senha incorretos')
        return
      }
      // err.response.data.message
      // translateError && setError(translateError)
    }
  })

  return (
    <S.Form onSubmit={handleLogin}>
      {error && <S.Error>{error}</S.Error>}
      <S.WrapperInputs>
        <Input
          placeholder="E-mail"
          type="email"
          {...register('email')}
          error={errors.email}
        />
        <Input
          placeholder="Senha"
          type={passwordType}
          icon={
            <IconPassword
              visible={visible}
              onChangeVisible={handleVisiblePawsword}
            />
          }
          iconPosition="right"
          maxLength={20}
          {...register('password')}
          error={errors.password}
        />
      </S.WrapperInputs>

      <ButtonV2 size={'contain'} isLoading={loading}>
        Entrar
      </ButtonV2>
      <S.Link to="/esqueceu-senha">Esqueci minha senha</S.Link>
      <S.LinkBlue to="/cadastrar">Ainda não tem conta? Clique aqui</S.LinkBlue>
    </S.Form>
  )
}

export default FormSignIn
