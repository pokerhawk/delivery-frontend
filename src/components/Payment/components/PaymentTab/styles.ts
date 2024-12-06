import styled from 'styled-components';

export const Container = styled.button`
  padding: 16px;
  background: #FFFFFF;
  outline: none;
  border: 1px solid #EAECF0;
  border-radius: 12px;
  position: relative;

  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 16px;
  }

  transition: opacity 0.1s linear;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export const Title = styled.strong`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #344054;
`;

export const Description = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #475467;
`;

export const Radio = styled.div`
  margin-left: 15px;
  border: 1px solid #D0D5DD;
  position: absolute;
  right: 16px;
  top: 16px;

  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: #FFFFFF;

  &.selected {
    border: none;
    background: #1570EF;
  }
`;
