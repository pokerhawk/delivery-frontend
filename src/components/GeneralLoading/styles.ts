import styled, { keyframes } from 'styled-components'

export const SpinnerWrapper = styled.div`
  padding: 24px 32px 24px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  min-height: 100%;
`

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  &:after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 6px;
    border-radius: 50%;
    border: 6px solid #2e90fa;
    border-color: #2e90fa transparent #2e90fa transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`
