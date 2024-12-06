import styled, { css } from 'styled-components'
import { SelectProps } from '.'

type IconPositionProps = Pick<SelectProps, 'iconPosition' | 'icon'>
type WrapperProps = Pick<SelectProps, 'disabled'> & { error?: boolean }

export const Label = styled.label`
  margin-bottom: 8px;
  display: inline-block;

  color: #344054;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`

export const baseInputStyles = ({
  iconPosition,
  icon
}: IconPositionProps) => css`
  padding: 10px 16px;
  width: 100%;
  font-size: 1.2rem;
  color: #5a5a5a;
  outline: 0;
  caret-color: #5a5a5a;
  border: 1px solid #d1d2d4;
  border-radius: 10px;

  ${icon &&
  css`
    padding-${iconPosition}: 1rem;
  `}

  &::placeholder {
    color: #6d6e70;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 40px #fff inset;
    -webkit-box-shadow: 0 0 0 40px #fff inset;
    filter: none;
    &::first-line {
      font-family: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
      font-size: 1.3rem;
    }
  }

  @media (max-width: 405px) {
    padding: 16px 0;
  }
`

export const InputWrapper = styled.div<IconPositionProps>`
  ${({ iconPosition, icon }) => css`
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 0;
    width: 100%;

    transition: border-color 0.3s ease-in-out;

    &:focus-within {
      border-color: #61abd8;
    }

    && select {
      ${baseInputStyles({ iconPosition, icon })}
    }
  `}
`

export const Icon = styled.div<IconPositionProps>`
  ${({ iconPosition }) => css`
    display: flex;
    color: #8F8F8F;
    order: ${iconPosition === 'right' ? 1 : 0};

    & > svg {
      width: 2rem;
      height: 100%;
      position: relative;
      top: -1px;
    }
  `}
`

export const Input = styled.select<IconPositionProps>`
  ${({ iconPosition, icon, disabled }) => css`
    ${baseInputStyles({ iconPosition, icon })}
    background-color: #fff;
    pointer-events: ${disabled ? 'none' : 'auto'};
  `}
`

export const Error = styled.p`
  color: #FF6347;
    font-size: 1.2rem;
`

const wrapperModifiers = {
  error: () => css`
    ${Icon}
  `,
  disabled: () => css`
    opacity: 0.6;

    ${InputWrapper}, ${Input} {
      background-color: #fafafa;
    }

    ${Label},
    ${Input},
    ${Icon} {
      cursor: not-allowed;

      &::placeholder {
        color: currentColor;
      }
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ error, disabled }) => css`
    width: 100%;

    ${error && wrapperModifiers.error()}
    ${disabled && wrapperModifiers.disabled()}

    input {
      outline: none;
    }
  `}
`

export const Prefix = styled.p<IconPositionProps>`
  ${({ iconPosition, icon }) => css`
    font-size: 12px;
    line-height: 14px;
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

export const HelpText = styled.p`
  font-weight: 500;
  font-size: 11px;
  line-height: 150%;
  color: #a1a1a1;
  margin-top: 5px;
`
