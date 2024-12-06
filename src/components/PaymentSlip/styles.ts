import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
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

export const InstructionItem = styled.p`
  margin-bottom: 14px;

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.1px;

  color: #6d6e70;
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
