import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useEffect,
  useRef
} from 'react'
import { Controller } from 'react-hook-form'

import CurrencyInput from '@ericblade/react-currency-input'

import * as S from './styles'

export type InputPropsBase = {
  control?: any
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  label?: string
  mask?: string
  prefix?: string
  handleChange?: any
  helpText?: string
  fullWidth?: boolean
}

export type InputProps = InputPropsBase & InputHTMLAttributes<HTMLInputElement>

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
    <S.Wrapper fullWidth={fullWidth} disabled={disabled} error={!!error} ref={wrapperRef}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}

      <S.InputWrapper>
        {!!prefix && (
          <S.Prefix>
            {prefix}
          </S.Prefix>
        )}
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
                value={val}
                onChangeEvent={(e, _, value) => {
                  onChange(Number(value || 0) * 100)
                  if (typeof handleChange === 'function') {
                    handleChange(value)
                  }
                }}
              />
            )
          }}
        />
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
}

export default forwardRef(Input)
