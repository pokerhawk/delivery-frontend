import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  padding: 2.4rem;
  background: #ffffff;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0 0 2px 0px #8a8a8a;
  border-radius: 12px;

  max-width: 530px;
`;

export const Title = styled.p`
  margin-top: 1.6rem;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  color: #101828;
`;

export const Description = styled.p`
  margin-top: 0.4rem;
  margin-bottom: 5.5rem;

  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: #475467;
`;

export const CloseContainer = styled.button`
  position: absolute;
  right: 25px;
  top: 20px;

  cursor: pointer;
  background: transparent;
  border: none;
`;
