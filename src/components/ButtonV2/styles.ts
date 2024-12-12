import styled, { css } from 'styled-components'

import { ButtonSizeVariantProps, ButtonVariantProps } from '.'

type WrapperProps = {
  variant: ButtonVariantProps
  size?: ButtonSizeVariantProps
}

const wrapperModifiers = {
  primary: () => css`
    background: #2e90fa;
    border: 1px solid #1570ef;
    color: #ffffff;

    &:hover {
      background-color: #1570ef;
    }

    &:disabled {
      background-color: #b2ddff;
      border: 1px solid #b2ddff;
      cursor: not-allowed;
    }
  `,

  secondary: () => css`
    background: #ffffff;
    border: 1px solid #d0d5dd;
    color: #344054;

    &:hover {
      background-color: #d0d5dd;
      color: #1d2939;
    }

    &:disabled {
      background-color: #eaecf0;
      border: 1px solid #eaecf0;
      cursor: not-allowed;
    }
  `,

  danger: () => css`
    background: #d92d20;
    border: 1px solid #d92d20;
    color: #ffffff;

    &:hover {
      background-color: #b42318;
    }

    &:disabled {
      border: 1px solid #fecdca;
      background-color: #fecdca;
      cursor: not-allowed;
    }
  `,

  small: () => css`
    height: 36px;
    width: 158px;
  `,

  medium: () => css`
    height: 40px;
    width: 179px;
  `,

  large: () => css`
    height: 44px;
    width: 205px;
  `,
  contain: () => css`
    height: 44px;
    width: 100%;
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ variant, size }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    gap: 16px;
    font-weight: 600;
    font-size: 14px;
    height: 44px;
    line-height: 20px;
    position: relative;

    transition: all 0.2s ease-in-out;

    ${!!variant && wrapperModifiers[variant]()}
    ${!!size && wrapperModifiers[size]()}
  `}
`
