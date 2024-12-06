import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 100%;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 18px;
  color: #545454;
  letter-spacing: 1px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Prefix = styled.div`
  padding: 23px 20px;
  border-radius: 7px 0px 0px 7px;
  border: 1px solid #d1d2d4;
  background: #f2f4f7;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    color: #667085;
    font-size: 12px;
  }
`;

type InputModifier = {
  error: boolean;
};

export const Input = styled.input<InputModifier>`
  ${({ error }) => css`
    width: 100%;
    background: #ffffff;
    border: 1px solid ${error ? "#EE2233" : "#D1D2D4"};
    border-radius: 7px;
    padding: 16px 0;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #667085;

    display: flex;
    align-items: center;
    text-indent: 16px;
    color: #6d6e70;

    &::placeholder {
      color: #475467;
      font-size: 14px;
      letter-spacing: 1.5px;
    }

    &:disabled {
      background: #d9d9d9;
      cursor: not-allowed;
    }

    &.hasPrefix {
      border-radius: 0px 7px 7px 0px !important;
    }
  `}
`;

export const Error = styled.span`
  margin-top: 3px;

  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: red;
`;
