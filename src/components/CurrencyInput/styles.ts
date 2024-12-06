import styled, { css } from "styled-components";

import { InputProps } from ".";

type WrapperProps = Pick<InputProps, "disabled"> & { error?: boolean } & {
  fullWidth?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ fullWidth, disabled }) => css`
    width: 100%;
    max-width: 400px;

    ${fullWidth &&
    css`
      max-width: none;
    `}

    ${disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}

    display: flex;
    flex-direction: column;
    row-gap: 10px;

    input {
      outline: none;
      padding: 18px 0;
      border: none;
    }
  `}
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d1d2d4;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;

  transition: border-color 0.3s;

  &:focus-within {
    border-color: #61abd8;
  }

  input {
    flex: 1;
  }
`;

export const Prefix = styled.p`
  font-size: 12px;
  line-height: 14px;
  color: #d1d2d4;
  margin-right: 4px;
  top: 1px;
  position: relative;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.08em;
  text-indent: 15px;
  text-transform: uppercase;
  color: #acb5bd;
`;

export const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #d1d2d4;
  border-radius: 7px;
  padding: 18px 0;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  text-indent: 15px;
  color: #6d6e70;

  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const Error = styled.span`
  margin-top: 3px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-indent: 15px;
  color: red;
`;
