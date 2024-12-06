import styled, { css } from "styled-components";
import { Props } from ".";

export const Backdrop = styled.div<Pick<Props, "isOpen">>`
  ${({ isOpen }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    transition: all 0.45s ease;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;

    ${Container} {
      opacity: 0;
    }

    ${!!isOpen &&
    css`
      opacity: 1;
      pointer-events: initial;
      visibility: visible;

      ${Container} {
        opacity: 1;
      }
    `}
  `}
`;

export const Container = styled.div<Pick<Props, "isOpen">>`
  background-color: transparent;
  border: none;
`;
