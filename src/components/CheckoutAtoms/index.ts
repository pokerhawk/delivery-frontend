import styled from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  background: #eaecf0;
  display: flex;
  flex-direction: column;
  padding: 50px 10px;
  width: 100%;
  gap: 2rem;

  ${media.lessThan("medium")`
    padding: 0 0;
  `}
`;

export const TopBannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 359px;
  max-width: 994px;
  margin: 0 auto;
  padding: 0 10px;

  ${media.lessThan("medium")`
    max-width: 100%;
    padding: 0 0;
  `}
`;

export const SideBannerImage = styled.img`
  width: 100%;
  max-height: 100%;
  height: fit-content;
  position: relative;
  object-fit: contain;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 10px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
  row-gap: 24px;

  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  max-width: 630px;
  width: 100%;
`;

export const Side = styled.aside`
  background: #fff;
  max-width: 310px;
  width: 100%;
  height: 100vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 32px 0px;
  gap: 32px;

  ${media.lessThan("medium")`
    max-width: 100%;
  `}
`;

export const FooterWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;

  display: none;

  &#aside-footer {
    ${media.lessThan("medium")`display: block;`};
  }
  &#content-footer {
    ${media.greaterThan("medium")`display: block;`};
  }
`;
