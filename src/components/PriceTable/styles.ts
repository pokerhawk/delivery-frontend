import styled from "styled-components";

export const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #d0d5dd;
  padding: 10px 0;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #d0d5dd;
  padding: 12px 0;

  & svg {
    fill: #ee2222;
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #444444;
  margin: 4px 0;

  &:last-child {
    justify-self: end;
  }
`;

export const Heading = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 2;
  color: #444444;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:last-child {
    justify-self: end;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  ${Heading}, ${Text} {
    font-size: 12px;

    & span {
      font-weight: bold;
    }
  }
`;
