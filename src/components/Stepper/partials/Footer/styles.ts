import styled, { css } from "styled-components";

type OutlineButtonProps = {
  expanded?: boolean;
};

export const OutlineButton = styled.button<OutlineButtonProps>`
  ${({ expanded = false }) => css`
    border-radius: 8px;
    border: 1px solid #000;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    padding: 8px 14px;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    color: #000;

    ${expanded &&
    css`
      width: 100%;
      justify-content: center;
      background-color: #13b76a;
      color: #fff;
    `};

    display: flex;
    align-items: center;
    column-gap: 8px;
    align-self: flex-end;
    height: 100%;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    @media (max-width: 775px) {
      align-self: center;
      width: 100%;
      justify-content: center;
    }
  `};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
