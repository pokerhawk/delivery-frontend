import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  height: 100%;

  display: grid;
  grid-template-areas:
    'header right'
    'left right';
  grid-template-rows: 122px 1fr;

  input {
    outline: none;
  }
  ${media.lessThan('medium')`
    grid-template-areas:
        'header'
        'left';
    grid-template-rows: 122px;
    grid-template-columns: 1fr;
    padding: 0 20px;
  `}
`
export const Right = styled.div`
  grid-area: right;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${media.lessThan('medium')`
    grid-area: left;
  `}
`

export const Left = styled.div`
  grid-area: left;
  height: 100vh;
  max-width: 672px;
  position: absolute;
  overflow: hidden;

  ${media.lessThan('medium')`
    display: none;
  `}
`

export const Header = styled.header`
  grid-area: header;
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  padding: 36px 48px;
  z-index: 10;

  ${media.lessThan('medium')`
    padding: 24px 0;
  `}
`

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  clip-path: polygon(0% 0%, 85% 0, 100% 100%, 75% 100%, 0% 100%);
  position: relative;
  z-index: 0;

  min-height: 100vh;
`

export const WrapperForm = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  position: absolute;
`
export const WrapperTitle = styled.div`
  ${({ theme }) => css`
    h1 {
      font-weight: 800;
      font-size: 28px;
      line-height: 44px;
      text-align: center;
      color: ${theme.colors.black};
    }

    h4 {
      margin-top: 6px;
      font-weight: 400;
      font-size: 16px;
      line-height: 29px;
      text-align: center;
      color: ${theme.colors.darkGray};
    }
  `}

  ${media.lessThan('medium')`
    h1 {
      font-size: 32px;
    }
  `}
`
