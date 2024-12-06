import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes
} from 'react'
// import { FieldErrors } from 'react-hook-form'
import * as S from './styles'

type Option = {
  value: string
  label: string
}

export type SelectProps = {
  control?: any
  disabled?: boolean
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  label?: string
  mask?: string
  prefix?: string
  helpText?: string
  options: Option[]
} & InputHTMLAttributes<HTMLSelectElement>

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    disabled = false,
    error = null,
    icon,
    name,
    id = name,
    iconPosition = 'left',
    label,
    prefix,
    options,
    helpText,
    ...props
  },
  ref
) => (
  <S.Wrapper disabled={disabled} error={!!error}>
    {!!label && <S.Label htmlFor={name}>{label}</S.Label>}

    <S.InputWrapper>
      {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
      {!!prefix && (
        <S.Prefix iconPosition={iconPosition} icon={!!icon}>
          {prefix}
        </S.Prefix>
      )}

      <S.Input
        {...props}
        id={id}
        iconPosition={iconPosition}
        disabled={disabled}
        icon={!!icon}
        name={name}
        ref={ref}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </S.Input>
    </S.InputWrapper>
    {!!error && <S.Error>{error}</S.Error>}
    {!!helpText && !error && <S.HelpText>{helpText}</S.HelpText>}
  </S.Wrapper>
)

export default forwardRef(Select)
