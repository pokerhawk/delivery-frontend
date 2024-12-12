import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import * as ButtonStyles from '../Button/styles'

import Input from '../Input'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #61abd8;
  box-shadow: 0px 14px 34px rgba(46, 108, 177, 0.2);
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 525px;
  max-height: 85vh;
  padding: 36px;
  z-index: 10;
  gap: 12px;

  &:focus {
    outline: none;
  }

  ${ButtonStyles.Wrapper} {
    height: 66px;
    margin-top: 27px;
  }
`

export const InputStyled = styled(Input)`
  width: auto;
`
export type TitleProps = {
  err?: boolean
}

export const Subtitle = styled.p<TitleProps>`
  ${({ err }) => css`
    margin: 0;
    font-weight: 700;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    color: ${!err ? '#1e1e1e' : 'red'};
  `}
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  text-align: center;

  color: #101828;
`

export const CloseButton = styled.div`
  ${({ theme }) => css`
    all: unset;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #6d6e70;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    transition: backgroung 0.3s ease-in-out;

    &:hover {
      background: ${lighten(0.5, theme.colors.navyBlue)};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${lighten(0.5, theme.colors.navyBlue)};
    }
  `}
`

export const SuccessMesssage = styled.p`
  ${({ theme }) => css`
    grid-column: 1/3;
    text-align: center;
    color: ${theme.colors.emeraldGreen};
    margin-top: -10px;
    margin-bottom: -10px;
  `}
`

export const ErrorMessage = styled(SuccessMesssage)`
  ${({ theme }) => css`
    color: ${theme.colors.red};
  `}
`
