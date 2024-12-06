import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
`;

export const Step = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: #90cfff;
  cursor: pointer;
  border: none;
`;
