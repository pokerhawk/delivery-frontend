import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  position: relative;
  padding: 20px;

  > img {
    position: absolute;
    top: -23px;
    left: 130px;
  }

  @media (max-width: 675px) {
    > img {
      left: 0;
    }

    height: 80px;
    padding: 16px 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 100px;
`;

export const Title = styled.strong`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1D2939;
`;

export const Description = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 18px;
  color: #667085;
`;
