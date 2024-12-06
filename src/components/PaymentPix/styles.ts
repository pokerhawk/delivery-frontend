import styled, { keyframes } from "styled-components";

const bouncing = keyframes`
  to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
`;

export const Container = styled.div`
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export const TotalPrice = styled.strong`
  font-weight: 700;
  font-size: 14px;
  line-height: 12px;

  display: flex;
  align-items: center;
  color: #444444;
`;

export const QrCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
`;

export const QrCode = styled.img`
  width: 170px;
  height: 165px;
  object-fit: cover;
`;

export const QrInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const Title = styled.b`
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #6d6e70;
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #6d6e70;

  max-width: 450px;
`;

export const PaymentConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const QrGenerationContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  justify-content: center;
  align-items: center;
`;

export const PaymentStatus = styled.span`
  color: #BDBDBD;
  text-align: center;
  /* Text md/Bold */
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

export const BouncingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;

  > div {
    width: 16px;
    height: 16px;
    margin: 3rem 0.2rem;
    background: #d9d9d9;
    border-radius: 50%;
    animation: ${bouncing} 0.8s infinite alternate;
  }

  > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }

  > div:nth-child(4) {
    animation-delay: 0.6s;
  }
`;

export const CopyPasteTitle = styled.b`
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #6d6e70;
  align-self: flex-start;
  width: auto;
`;

export const CopyPasteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CopyButton = styled.button`
  background: #6d6e70;
  border-radius: 7px;
  padding: 30px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  transition: filter 0.2s linear;

  &:hover {
    cursor: pointer;
    filter: brightness(0.8);
  }

  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ffffff;

  @media (max-width: 915px) {
    margin-top: 20px;
  }
`;

export const CopyPasteDescription = styled.p`
  margin-top: 20px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1px;
  color: #6d6e70;
`;

export const QrLink = styled.p`
  margin-top: 5px;

  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1px;
  color: #6d6e70;
  overflow-wrap: break-word;
  max-width: 100%;
`;

export const InstructionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InfoTitle = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 30px;

  font-weight: 800;
  font-size: 20px;
  line-height: 24px;

  text-align: center;
  letter-spacing: 0.1px;

  color: #6d6e70;
`;

export const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
`;

export const InstructionItem = styled.span`
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1px;
  color: #6d6e70;
  text-align: center;

  > strong {
    color: #6D6E70;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
  }
`;

export const TotalInfo = styled.p`
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 14px;
  line-height: 12px;

  color: #444444;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const CopyButtonContainer = styled.button`
  margin-top: 24px;
  outline: none;
  border: none;
`;
