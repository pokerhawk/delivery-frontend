import styled, { css, keyframes } from "styled-components";
import { ButtonVariant } from ".";

const loadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

type ButtonProps = {
  variant: ButtonVariant;
};

const buttonModifiers = {
  normal: () => css`
    padding: 16px 60px;
    border: none;
    border-radius: 7px;
    width: 100%;

    background: #12B76A;
    border: 1px solid #027A48;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;

    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 1.5px;
    font-size: 16px;
    line-height: 12px;
    line-height: normal;

    color: #ffffff;
    transition: filter 0.2s linear;

    &:hover {
      cursor: pointer;
      filter: brightness(0.8);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    svg {
      animation: ${loadingSpinner} 1s linear infinite;
    }
  `,
  new: () => css`
    cursor: pointer;
    font: normal 600 1.4rem Inter, "sans-serif";
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 1.4rem;
    gap: 8px;
    width: 100%;

    background: #2e90fa;
    border: 1px solid #1570ef;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
  `,
};

export const Button = styled.button<ButtonProps>`
  ${({ variant }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${!!variant && buttonModifiers[variant]}
  `}
`;
