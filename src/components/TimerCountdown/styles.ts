import styled from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23px;
  background: #2E90FA;
  color: #FFFFFF;
  gap: 1.5rem;

  ${
  media.lessThan('medium')`
      padding: 8px
    `
  }
`

export const Message = styled.p`
  font-size: 1.25rem;
  font-family: Inter;
  line-height: 1.875rem;
`

export const Heading = styled.h3`
  font-size: 3rem;
  font-family: Inter;
  font-weight: 700;
  line-height: 3.75rem;
`
