import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 25px;

  display: flex;
  flex-direction: column;
  row-gap: 12px;
`

export const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 12px;
  color: #444444;
  margin-left: 15px;

  > span {
    color: #D93F21;
  }

  &.bold {
    font-weight: 700;
  }
`

export const TotalValue = styled.p`
  margin-top: 35px;
  margin-left: 15px;

  font-weight: 700;
  font-size: 14px;
  line-height: 12px;
  color: #444444;
`;
