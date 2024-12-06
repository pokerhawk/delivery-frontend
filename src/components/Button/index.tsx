import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'
import * as S from './styles'

export type ButtonVariant = 'normal' | 'new'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  variant?: ButtonVariant
}

function Button({ children, isLoading = false, variant = 'normal', ...props }: ButtonProps) {
  return (
    <S.Button disabled={isLoading} variant={variant} {...props}>
      {isLoading ? (
        <FaSpinner size={12} />
      ) : children}
    </S.Button>
  )
}

export default Button;
