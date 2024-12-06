import styled from "styled-components";
import media from "styled-media-query";
import { Button } from "../../components/Button/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  row-gap: 24px;
  padding: 50px 10px;

  border-radius: 8px;
  background: linear-gradient(180deg, #dae7f0 0%, #eeeeee 100%);
`;

export const WrapperStreet = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 750px;
  min-height: 365px;
  padding: 40px;
  row-gap: 20px;

  border-radius: 12px;
  background: #ffffff;

  ${
  media.lessThan('medium')`
      min-width: auto;
    `
  }
`;

export const Divider = styled.div`
  background: linear-gradient(90deg, #61abd8 0%, rgba(97, 171, 216, 0) 127.26%);
  height: 1px;
  width: 100%;
  margin: 60px 0;
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 546px;
`;

export const Title = styled.p`
  margin-top: 24px;
  margin-bottom: 8px;

  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.1px;

  color: #444444;
`;

export const MessageSubtitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 15px;

  color: #475467;
`;

export const Message = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;
  max-width: 35ch;

  color: #6d6e70;

  > span {
    display: block;

    font-weight: bold;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export const ProductBoxInfo = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 100%;
`;

export const ProductImage = styled.img`
  width: 85px;
  height: 80px;
  border: 1px solid #d0d5dd;

  background: gray;
  object-fit: cover;
  border-radius: 7.15846px;
  backdrop-filter: blur(21.4754px);
`;

export const ProductName = styled.strong`
  font: normal 400 14px/20px Inter, "sans-serif";
  color: #6d6e70;
`;

export const ProductDetails = styled.p`
  width: 100%;
  margin-top: 28px;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1px;

  color: #6d6e70;

  > span {
    display: block;
    font-weight: 700;
  }

  > b {
    display: block;
    margin-top: 12px;

    font-weight: 700;
    color: #d93f21;
  }
`;

export const ProductDetailsAddress = styled.p`
  max-width: 30ch;

  &:first-child {
    margin-top: 12px;
  }

  font: normal 400 14px/20px Inter, "sans-serif";
  text-align: center;
  margin: 0 auto;

  color: #6d6e70;
`;

export const ButtonWrapper = styled.div`
  padding-top: 24px;
  max-width: 300px;
  margin: 0 auto;

  ${Button} {
    display: block;
    padding: 14.5px 34.5px;
  }
`;

export const FooterText = styled.p`
  color: #2e6cb1;
  display: flex;
  align-items: center;
  gap: 4px;

  & svg path {
    fill: #2e6cb1;
  }
`;
