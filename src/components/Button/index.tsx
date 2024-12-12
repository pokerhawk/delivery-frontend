import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react'

import * as S from './styles'

import LoadingIcon from '../../assets/icons/Loading'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  fullWidth?: boolean
  minimal?: boolean
  icon?: JSX.Element
  isLoading?: boolean
  as?: React.ElementType
  color?: 'primary' | 'gray'
} & ButtonTypes

const Button: React.ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    children,
    icon,
    fullWidth = false,
    minimal = false,
    isLoading = false,
    color = 'primary',
    ...props
  },
  ref
) => (
  <S.Wrapper
    fullWidth={fullWidth}
    hasIcon={!!icon}
    minimal={minimal}
    isLoading={isLoading}
    color={color}
    ref={ref}
    {...props}
  >
    {isLoading && <LoadingIcon isLoading={isLoading} />}
    <S.WrapperText isLoading={isLoading}>
      {icon}
      {!!children && <span>{children}</span>}
    </S.WrapperText>
  </S.Wrapper>
)

export default forwardRef(Button)
