import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  row-gap: 16px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 14px;

  position: relative;
`;

export const Title = styled.strong`
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #84CAFF;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const Divider = styled.div`
  background: #84CAFF;
  height: 1px;
  width: 100%;
`;

