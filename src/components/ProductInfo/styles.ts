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

export const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;

  @media (max-width: 915px) {
    flex-wrap: wrap;
  }
`;

export const ProductCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 15px 25px;

  width: 660px;
  width: 100%;

  display: flex;
  align-items: center;
  column-gap: 14px;

  @media (max-width: 915px) {
    width: 100%;
  }
`;

export const ProductImage = styled.img`
  backdrop-filter: blur(21.4754px);
  border-radius: 6px;
  width: 45px;
  height: 45px;
  object-fit: cover;
  background: gray;
`;

export const ProductName = styled.strong`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #6D6E70;
`;

export const ProductDescription = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;

  > p {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #6D6E70;
  }
`;
