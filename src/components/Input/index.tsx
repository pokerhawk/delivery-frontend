import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useEffect,
  useRef
} from 'react'
import { Controller, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import CurrencyInput from '@ericblade/react-currency-input'

import * as S from './styles'

import formatBornDate from '../../utils/format-born-date'
import formatCep from '../../utils/format-cep'
import formatValidity, {
  formatValidityWithFourNumberAfterSlash
} from '../../utils/format-validity'
import { cpfMask, maskCnpj, maskPhone } from '../../utils/mask'

export type InputPropsBase = {
  control?: any
  disabled?: boolean
  error?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Merge<
        FieldError,
        (FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined)[]
      >
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  label?: string
  mask?: MaskKeyProps
  prefix?: string
  handleChange?: any
  helpText?: string
  fullWidth?: boolean
  sufix?: string
}

const maskType = {
  Email: {
    value: (value: string) => value,
    type: 'email'
  },
  CPF: {
    value: (value = '') => (value ? cpfMask(value) : ''),
    type: 'text'
  },
  CNPJ: {
    value: (value = '') => (value ? maskCnpj(value) : ''),
    type: 'text',
    maxLength: 14
  },
  Telefone: {
    value: (value = '') => (value ? maskPhone(value) : ''),
    type: 'tel'
  },
  cep: {
    value: (value: string) => formatCep(value),
    maxLength: 8,
    type: 'text'
  },
  bornDate: {
    value: (value: string) => formatBornDate(value),
    maxLength: 10,
    type: 'text'
  },
  validity: {
    value: (value: string) => formatValidity(value),
    maxLength: 5,
    type: 'text'
  },
  validityWithFourNumberAfterSlash: {
    value: (value: string) => formatValidityWithFourNumberAfterSlash(value),
    maxLength: 7,
    type: 'text'
  }
} as MaskType

export type MaskKeyProps =
  | 'Email'
  | 'CPF'
  | 'CNPJ'
  | 'Telefone'
  | 'cep'
  | 'bornDate'
  | 'cardNumber'
  | 'validity'
  | 'validityWithFourNumberAfterSlash'

type MaskType = {
  [key in MaskKeyProps]: {
    value: (value: string) => string
    type: 'text' | 'email' | 'number' | 'tel'
  } & Omit<InputHTMLAttributes<HTMLInputElement>, 'mask'>
}

export type InputProps = InputPropsBase &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'mask'>
const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    control,
    disabled = false,
    error = null,
    icon,
    name,
    id = name,
    iconPosition = 'left',
    label,
    mask,
    prefix,
    handleChange,
    type = 'text',
    helpText,
    fullWidth,
    sufix,
    ...props
  },
  ref
) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (type === 'currency' && wrapperRef.current) {
      if (disabled) {
        const input = wrapperRef.current.querySelector('input')

        input?.setAttribute('disabled', 'true')
      }
    }
  }, [wrapperRef, type, disabled, props.value])

  return (
    <S.Wrapper
      fullWidth={fullWidth}
      disabled={disabled}
      error={!!error}
      ref={wrapperRef}
    >
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}

      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        {!!prefix && (
          <S.Prefix iconPosition={iconPosition} icon={!!icon}>
            {prefix}
          </S.Prefix>
        )}

        {type === 'currency' ? (
          <Controller
            name={name!}
            control={control}
            {...props}
            render={({ field: { onChange, onBlur, value: vv } }) => {
              const val = (vv / 100).toLocaleString('pt-br', {
                minimumFractionDigits: 2
              })

              return (
                <CurrencyInput
                  decimalSeparator=","
                  thousandSeparator="."
                  onBlur={onBlur}
                  {...(vv ? { value: val } : {})}
                  value={val}
                  onChangeEvent={(e, _, value) => {
                    onChange(Math.round(Number(value || 0) * 100))
                    if (typeof handleChange === 'function') {
                      handleChange(value)
                    }
                  }}
                />
              )
            }}
          />
        ) : (
          <>
            {!mask && (
              <S.Input
                {...props}
                id={id}
                type={type}
                iconPosition={iconPosition}
                disabled={disabled}
                icon={!!icon}
                name={name}
                ref={ref}
              />
            )}

            {!!mask && (
              <Controller
                name={name!}
                control={control}
                {...props}
                render={({ field }) => (
                  <S.Input
                    disabled={disabled}
                    id={id}
                    {...props}
                    {...field}
                    {...maskType[mask]}
                    value={maskType[mask].value(field.value)}
                  />
                )}
              />
            )}
          </>
        )}
        {!!sufix && (
          <S.Sufix iconPosition={iconPosition} icon={!!icon}>
            {sufix}
          </S.Sufix>
        )}
      </S.InputWrapper>
      {!!error && <S.Error>{error.message?.toString()}</S.Error>}
      {!!helpText && !error && <S.HelpText>{helpText}</S.HelpText>}
    </S.Wrapper>
  )
}

export default forwardRef(Input)
