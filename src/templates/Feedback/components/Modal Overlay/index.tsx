import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  z-index: 999;
  p {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.5;
  }
`;

const OKButton = styled.button`
  background: #0074d9;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

interface ClickModalProps {
  text: string;
}

const OverlayModal: React.FC<ClickModalProps> = ({
  text
}) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{text}</p>
      </ModalContent>
    </ModalWrapper>
  );
};

export default OverlayModal;
