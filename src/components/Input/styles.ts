import styled, { css, DefaultTheme } from 'styled-components'

import { InputProps } from '.'

type IconPositionProps = Pick<InputProps, 'iconPosition' | 'icon'>

type WrapperProps = {
  error?: boolean
  fullWidth?: boolean
} & Pick<InputProps, 'disabled'>

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, error, disabled, fullWidth }) => css`
    width: 100%;
    max-width: 400px;
    ${error && wrapperModifiers.error(theme)}
    ${disabled && wrapperModifiers.disabled(theme)}
    ${fullWidth &&
    css`
      max-width: none;
    `}
    input {
      outline: none;
      font-family: Inter;
    }
  `}
`

export const Label = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  font-size: 14px;
  line-height: 14px;
  color: #6d6e70;
`

export const baseInputStyles = ({
  iconPosition,
  icon
}: IconPositionProps) => css`
  ${({ theme }) => css`
    padding: 16px 0;
    width: 100%;
    font-size: 16px;
    color: black;
    outline: 0;
    caret-color: #5a5a5a;
    ::placeholder {
      color: ${theme.colors.gray};
    }
    ${icon &&
    css`
      padding-${iconPosition}: 1rem;
    `}
    &::placeholder {
      color: #6d6e70;
    }
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 40px #fff inset;
      filter: none;
      &::first-line {
        font-family: ${theme.font.family};
      }
    }
  `}
`

export const InputWrapper = styled.div<IconPositionProps>`
  ${({ theme, iconPosition, icon }) => css`
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1px solid #d1d2d4;
    border-radius: 10px;
    padding: 0 16px;
    width: 100%;
    transition: border-color ${theme.transition.default};
    &:focus-within {
      border-color: #61abd8;
    }
    && input {
      ${baseInputStyles({ iconPosition, icon })}
    }
  `}
`

export const Icon = styled.div<IconPositionProps>`
  ${({ theme, iconPosition }) => css`
    display: flex;
    color: ${theme.colors.gray};
    order: ${iconPosition === 'right' ? 1 : 0};
    & > svg {
      width: 2rem;
      height: 100%;
      position: relative;
      top: -1px;
    }
  `}
`

export const Input = styled.input<IconPositionProps>`
  ${({ iconPosition, icon }) => css`
    ${baseInputStyles({ iconPosition, icon })};
    ::placeholder {
      color: rgba(10, 10, 10, 0.3) !important;
    }
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`

const wrapperModifiers = {
  error: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.red};
    }
    ${Icon},
    ${Label} {
      color: ${theme.colors.red};
    }
  `,
  disabled: (theme: DefaultTheme) => css`
    opacity: 0.6;
    ${InputWrapper}, ${Input} {
      background-color: #fafafa;
    }
    ${Label},
    input,
    ${Icon} {
      cursor: not-allowed;
      color: ${theme.colors.darkGray};
      &::placeholder {
        color: currentColor;
      }
    }
  `
}

export const Prefix = styled.p<IconPositionProps>`
  ${({ iconPosition, icon }) => css`
    font-size: 12px;
    line-height: 14px;
    min-width: 40px;
    color: #d1d2d4;
    margin-right: 4px;
    top: 1px;
    position: relative;
    ${icon &&
    iconPosition === 'left' &&
    css`
      padding-${iconPosition}: 0.8rem;
    `}
  `}
`

export const Sufix = styled.p<IconPositionProps>`
  ${() => css`
    font-size: 12px;
    line-height: 14px;
    color: #101828;

    position: relative;
  `}
`

export const HelpText = styled.p`
  font-weight: 500;
  font-size: 11px;
  line-height: 150%;
  color: #a1a1a1;
  margin-top: 5px;
`
