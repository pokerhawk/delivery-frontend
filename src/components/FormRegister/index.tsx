import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as S from './styles'

import Input from '../../components/Input'
import { signUpRequest } from '../../services/auth'
import { removeMask } from '../../utils/remove-mask'
import ModalAlertSucess from '../ModalAlertSucess'
import ButtonV2 from '../ButtonV2'

const loginSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
  comfirmEmail: yup
    .string()
    .required('Confirmação de email é obrigatória')
    .oneOf([yup.ref('email')], 'Emails não conferem'),
  phone: yup
    .string()
    .test('phone', 'Telefone é obrigatório', (value) => {
      if (removeMask(value!, 'onlyNumber').length === 0) return false
      return true
    })
    .test('phone', 'Telefone é inválido', (value) => {
      if (value && removeMask(value!, 'onlyNumber').length >= 11) return true
      return false
    })
})

type Inputs = yup.InferType<typeof loginSchema>

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleModalState = () => {
    setError((prev) => !prev)
  }

  async function registerUser({ name, email, password, phone }: Inputs) {
    setError(false)
    try {
      setLoading(true)
      await signUpRequest({
        name,
        email,
        password,
        phone: removeMask(phone, 'onlyNumber')
      })
      setValue('name', '')
      setValue('email', '')
      setValue('password', '')
      setValue('phone', '')
      navigate('/confirma')
    } catch (err: any) {
      console.log(err.response.data.message)
      // const translateErrors = errorTranslator(err.response.data.message)

      setError(true)
      // translateErrors && setMessage(translateErrors)
      // !translateErrors &&
      //   setMessage(
      //     'Não foi possível efetuar o cadastro, tente novamente mais tarde!'
      //   )
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {error && (
        <ModalAlertSucess
          err={error}
          message={message}
          handleModalState={handleModalState}
        />
      )}
      <S.Form onSubmit={handleSubmit(registerUser)}>
        {error && <S.Error>{error}</S.Error>}
        <S.WrapperInputs>
          <Input
            placeholder="Nome*"
            {...register('name')}
            control={control}
            error={errors.name}
          />
          <Input
            placeholder="E-mail*"
            type="email"
            {...register('email')}
            control={control}
            error={errors.email}
          />
          <Input
            placeholder="Confirmar e-mail*"
            type="email"
            {...register('comfirmEmail')}
            control={control}
            error={errors.comfirmEmail}
          />
          <Input
            placeholder="Password"
            type="password"
            {...register('password')}
            control={control}
            error={errors.password}
          />
          <Input
            control={control}
            name="phone"
            placeholder="Telefone*"
            type="tel"
            mask="Telefone"
            error={errors.phone}
          />
        </S.WrapperInputs>
        <ButtonV2 size="contain" isLoading={loading}>
          Criar conta
        </ButtonV2>
        <S.Link target="_blank" href="http://360hub.com.br/termos-de-uso">
          Ao clicar em <i>Criar Conta</i>, você estará aceitando os{' '}
          <S.LinkBlue>Termos de Uso</S.LinkBlue>
        </S.Link>
      </S.Form>
    </>
  )
}

export default FormRegister
