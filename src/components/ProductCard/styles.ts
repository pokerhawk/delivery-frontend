import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;

  border-radius: 12px;
  border: 1px solid #D0D5DD;

  > .heading {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
`;

export const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 6px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  > strong {
    color: #344054;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  > span {
    color: #475467;
    font-size: 12px;
    line-height: 18px;

    display: flex;
    align-items: center;
    column-gap: 5px;

    > strong {
      color: #039855;
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
    }
  }
`;

export const RemoveOrderBumpButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;

  border-radius: 8px;
  border: 1px solid #98A2B3;
  background: #D0D5DD;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  cursor: pointer;
`;
