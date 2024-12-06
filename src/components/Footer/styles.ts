import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.footer`
  display: flex;
  align-items: center;
  column-gap: 5px;
  width: fit-content;
  margin: 0 auto 28px;
`;

export const Text = styled.div`
  font-weight: 600;
  font-size: 11px;
  line-height: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #8d8d8d;
`;

export const Term = styled.p`
  color: #6d6e70;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const Link = styled.span`
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
`;
