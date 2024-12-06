import styled, { keyframes } from "styled-components";

type SkeletonProps = {
  width: string;
  height: string;
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
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  > .title {
    color: #6D6E70;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  > .offersContainer {
    display: flex;
    flex-direction: column;
  }
`;

export const Skeleton = styled.div<SkeletonProps>`
  display: inline-block;

  height: ${(props) => props.height || "14px"};
  width: ${(props) => props.width || "80%"};

  border-radius: 4px;
  margin-top: ${(props) => props.marginTop || "0"};

  background-color: #eee;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  background-repeat: no-repeat;

  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
`;
