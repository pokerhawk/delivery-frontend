import styled from "styled-components";
import { Error } from "../Select/styles";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  column-gap: 40px;

  @media (max-width: 678px) {
    flex-wrap: wrap;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputsWrapper = styled.div`
  /* width: 350px; */
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  @media (max-width: 678px) {
    width: 100%;
  }
`;

export const FormContainer = styled.form`
  margin-top: 20px;
  width: 100%;

  @media (max-width: 678px) {
    width: 100%;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const CardValidationContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  justify-content: space-between;
`;

export const CardContainer = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  row-gap: 25px;

  @media (max-width: 678px) {
    display: none;
  }
`;

export const TotalValue = styled.p`
  margin-top: 35px;
  margin-left: 15px;

  font-weight: 700;
  font-size: 14px;
  line-height: 12px;
  color: #444444;
`;

export const SubmitContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`

export const BrandsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;

  .image-list {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`

export const BrandTitle = styled.strong`
  color: #6D6E70;
  font-size: 11.264px;
  font-weight: 600;
  line-height: 16.896px;
  text-align: center;
`

export const Divider = styled.div`
  border-top: 1px solid #EAECF0;
  margin: 30px 0;
`;

export const SpanError = styled(Error)``
