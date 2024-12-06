import styled, { css, keyframes } from "styled-components";

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

  > .offerCall {
    color: #F04438;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;

    @media (max-width: 775px) {
      max-width: 240px;
      align-self: center;
    }
  }
`;

export const Container = styled.article<{ isSelected: boolean }>`
  margin-top: 10px;

  padding: 16px;
  border-radius: 12px;
  background: #FFF;
  border-width: 1px;
  border-style: solid;

  display: flex;
  align-items: center;
  column-gap: 16px;

  .addedOffer {
    color: #2E90FA;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    align-self: flex-end;
    text-align: end;
  }

  ${({ isSelected }) => css`
    border-color: ${isSelected ? '#2E90FA' : '#F04438'};
  `}

  @media (max-width: 775px) {
    flex-direction: column;
    row-gap: 16px;
  }
`;

export const Heading = styled.header`
  display: flex;
  align-items: center;
  column-gap: 16px;
  width: 100%;
`;

export const Image = styled.img`
  border-radius: 6.712px;
  height: 94px;
  width: 94px;
  object-fit: cover;
`;

export const Content = styled.div`
  max-width: 310px;
  width: 100%;

  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const Title = styled.span`
  color: #344054;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

export const Description = styled.span`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;

  .row {
    display: flex;
    align-items: center;
    column-gap: 10px;

    > .oldPrice {
      color: #F04438;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      text-decoration: line-through;
    }

    > .newPrice {
      color: #039855;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 18px;
    }
  }

  > small {
    color: #475467;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
  }
`;

export const AddButton = styled.button`
  border-radius: 8px;
  border: 1px solid #027A48;
  background: #12B76A;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 8px 14px;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  color: #fff;

  display: flex;
  align-items: center;
  column-gap: 8px;
  align-self: flex-end;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.4;
  }

  @media (max-width: 775px) {
    align-self: center;
    width: 100%;
    justify-content: center;
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
