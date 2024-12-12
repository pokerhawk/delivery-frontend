import { darken } from 'polished'
import styled, { DefaultTheme, css } from 'styled-components'

import { ButtonProps } from '.'

export type WrapperProps = {
  hasIcon: boolean
} & Pick<ButtonProps, 'fullWidth' | 'minimal' | 'color'>

export const wrapperModifiers = {
  fullWidth: () => css`
    width: 100%;
  `,

  withIcon: (theme: DefaultTheme) => css`
    svg,
    img {
      width: 1.5rem;
      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `,

  minimal: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.aquaBlue};
    text-transform: none;
    letter-spacing: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    background: none;
    padding: 0;
    min-height: fit-content;
    &:hover {
      color: ${darken(0.1, theme.colors.aquaBlue)};
    }
  `,

  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      filter: saturate(30%);
    }
  `,

  primary: () => css`
    background-position: 100% 0%;
    background-size: 200% 1%;
    background: linear-gradient(273.49deg, #61abd8 -4.65%, #2e6cb1 104.76%);
    color: #ffffff;
  `,

  gray: () => css`
    background: #bdbdbd;
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, fullWidth, hasIcon, minimal, disabled, color }) => css`
    align-items: center;
    border-radius: 10px;
    border: 0;
    color: ${theme.colors.white};
    cursor: pointer;
    display: inline-flex;
    font-size: 12px;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 2px;
    line-height: 12px;
    min-height: 58px;
    padding: 15px 36px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: background 0.3s ease-in-out;
    position: relative;
    outline: none;
    &:hover {
      background-position: 0% 0%;
    }
    ${!!fullWidth && wrapperModifiers.fullWidth()};
    ${!!hasIcon && wrapperModifiers.withIcon(theme)};
    ${color && wrapperModifiers[color]};
    ${!!minimal && wrapperModifiers.minimal(theme)};
    ${disabled && wrapperModifiers.disabled()};
  `}
`

export const WrapperText = styled.div<{ isLoading: boolean }>`
  ${({ isLoading }) => css`
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition:
      transform 0.2s ease 0s,
      opacity 0.2s ease 0s;
    ${isLoading &&
    css`
      transform: translateY(12px) scale(0.75);
      opacity: 0;
    `}
  `}
`
