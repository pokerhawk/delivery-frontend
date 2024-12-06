import styled, { css } from 'styled-components';
import media from 'styled-media-query';

const CardStyle = css`
  border-radius: 10px;
  background: #FFF;
  height: 105px;
`;

export const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  &.oneCardView {
    grid-template-columns: 1fr;
  }

  @media (max-width: 675px) {
    grid-template-columns: 1fr;
  }
`;

export const SupportCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  column-gap: 25px;
  max-width: 302px;
  width: 100%;

  ${CardStyle}

  ${
  media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
    justify-content: center;
  `
  }
`;

export const SupportContent = styled.span`
  font-size: 10px;
  font-weight: 400;
  line-height: 18px;

  > strong {
    font-weight: 700;
  }
`;

export const SecurityCard = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
  padding: 25px;

  ${CardStyle}

  ${
  media.lessThan('medium')`
    width: 100%;
    max-width: 100%;
    justify-content: center;
  `
  }
`;

export const SecurityContent = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  > strong {
    font-size: 10.124px;
    font-family: 'Montserrat';
    font-weight: 700;
    line-height: 10.967px;
    color: #2E90FA;
    max-width: 80px;

    &:last-child {
      color: #16B364;
    }
  }
`;
