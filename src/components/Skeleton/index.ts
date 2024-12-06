import styled, { css, keyframes } from "styled-components";

type SkeletonProps = {
  width?: string;
  height?: string;
  marginTop?: string;
};

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Skeleton = styled.div<SkeletonProps>`
  ${({ height = "14px", width = "80%", marginTop = "0" }) => css`
    display: inline-block;

    height: ${height};
    width: ${width};

    border-radius: 4px;
    margin-top: ${marginTop};

    background-color: #eee;
    background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200px 100%;
    background-repeat: no-repeat;

    animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  `};
`;
