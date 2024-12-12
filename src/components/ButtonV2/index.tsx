import { PropsWithChildren } from 'react'

import * as S from './styles'

import LoadingIcon from '../../assets/icons/Loading'

export type ButtonVariantProps = 'primary' | 'secondary' | 'danger'

export type ButtonSizeVariantProps = 'small' | 'medium' | 'large' | 'contain'

export type ButtonIconSizeVariantProps = 'left' | 'right'

export type ButtonProps = {
  variant?: ButtonVariantProps
  size?: ButtonSizeVariantProps
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: ButtonIconSizeVariantProps
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const ButtonV2 = ({
  children,
  variant = 'primary',
  size,
  isLoading = false,
  icon,
  iconPosition = 'right',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const secondaryLoadingIcon = variant === 'secondary' && '#344054'
  return (
    <S.Wrapper variant={variant} size={size} {...props}>
      {icon && iconPosition === 'left' && icon}
      {!isLoading && children}
      {isLoading && (
        <LoadingIcon
          color={secondaryLoadingIcon || '#FFFFFF'}
          isLoading={isLoading}
        />
      )}
      {icon && iconPosition === 'right' && icon}
    </S.Wrapper>
  )
}

export default ButtonV2
