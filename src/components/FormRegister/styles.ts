import styled, { css } from 'styled-components'

import * as ButtonStyles from '../../components/Button/styles'

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  ${ButtonStyles.Wrapper} {
    width: 100%;
  }
`

export const WrapperInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`

export const Error = styled.p`
  font-size: 12px;
  color: #d93f21;
  margin-bottom: -30px;
`

export const Link = styled.a`
  max-width: 448px;
  font-size: 14px;
  line-height: 20px;
  color: #6d6e70;
`
export const LinkBlue = styled.span`
  ${({ theme }) => css`
    font-size: 14px;
    line-height: 20px;
    color: ${theme.colors.aquaBlue};
    font-weight: 400;
  `}
`
