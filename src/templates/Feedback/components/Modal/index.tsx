import React from "react";
import styled from "styled-components";
import { useProduct } from "../../../../hooks/useProduct";
import { Product } from "../../../../services/product";
import { SaleResponse } from "../../../../services/sale";
import { getPixelsIds, trackSingle } from "../../../../services/facebook_pixel";

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
  offerPrice: number;
  onClose: () => void;
  product?: Product;
  sale?: SaleResponse;
}

const ClickModal: React.FC<ClickModalProps> = ({
  text,
  offerPrice,
  onClose,
  product,
  sale,
}) => {
  const {
    offer,
    totalPrice,
    shippingPrice,
    installmentTax,
    selectedOrderBump,
  } = useProduct();

  return (
    <ModalWrapper>
      <ModalContent>
        <p>{text}</p>
        <OKButton
          onClick={() => {
            const pixels = getPixelsIds();

            trackSingle(pixels, "Purchase", {
              value: offerPrice,
              currency: "BRL",
            });

            trackSingle(pixels, "AddPayInfo", {
              ...product,
              ...sale,
              ...offer,
              totalPrice,
              shippingPrice,
              installmentTax,
              selectedOrderBump,
            });

            onClose();
          }}
        >
          OK
        </OKButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ClickModal;
