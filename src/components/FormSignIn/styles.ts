import { Link as RouterLink } from 'react-router-dom'

import styled from 'styled-components'

import * as ButtonStyles from '../Button/styles'

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
  gap: 10px;
  width: 100%;
`

export const Link = styled(RouterLink)`
  font-size: 12px;
  color: #1570ef;
  text-decoration: underline;
`

export const LinkBlue = styled(RouterLink)`
  font-family: 'Inter';
  font-size: 14px;
  color: #1570ef;
  font-weight: 400;
  line-height: 18px;
  text-decoration: underline;
`

export const Error = styled.p`
  font-size: 12px;
  color: #d93f21;
  margin-bottom: -30px;
`
