import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px 40px 35px;

  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;

  position: relative;
`;

export const Title = styled.strong`
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  color: #2e6cb2;
  width: 190px;
`;

export const Divider = styled.div`
  background: linear-gradient(90deg, #61abd8 0%, rgba(97, 171, 216, 0) 127.26%);
  height: 1px;
  width: 100%;
`;

export const ContainerBoxSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 267px);
  grid-gap: 16px;

  @media (max-width: 630px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
