import { Link as RouterLink } from 'react-router-dom'

import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  background: #f2f6fb;
  display: flex;
`

export const Left = styled.div`
  grid-area: left;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Header = styled.header`
  grid-area: header;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36px 48px;

  ${media.lessThan('medium')`
    padding: 24px 24px;
  `}
`

export const WrapperForm = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  margin-top: -130px;
`

export const WrapperTitle = styled.div`
  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    color: #1e1e1e;
  }

  h4 {
    margin-top: 6px;
    font-weight: 400;
    font-size: 16px;
    line-height: 29px;
    text-align: center;
    color: #1e1e1e;
  }

  ${media.lessThan('medium')`
    h1 {
      font-size: 32px;
    }
  `}
`

export const Link = styled(RouterLink)`
  font-size: 12px;
  line-height: 14px;
  color: #6d6e70;
`

export const Right = styled.div`
  position: relative;
  overflow: hidden;

  ${media.lessThan('medium')`
    display: none;
  `}
`

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  clip-path: polygon(13% 0, 100% 0, 100% 100%, 0% 100%);
  position: relative;
  z-index: 0;

  min-height: 100%;
`

export const WrapperBoxNotificationPage = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;

  &::before {
    content: '';
    width: 353px;
    height: 353px;
    border-radius: 50%;
    background: #ea985c;
    opacity: 0.3;
    filter: blur(100px);
    display: block;
    position: absolute;
    top: -70px;
    z-index: 1;
    left: 80px;
  }
`

export const BoxNotificationPage = styled.div`
  position: relative;
  z-index: 5;
  background: rgba(255, 242, 242, 0.13);
  backdrop-filter: blur(100px);
  border-radius: 40px 40px 160px 40px;
  padding: 42px 55px 50px 38px;
  color: #fff;

  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const BoxNotificationDescription = styled.p`
  max-width: 470px;
  font-size: 20px;
  line-height: 36px;
  color: #ffffff;
`

export const Tag = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 10px 16px 12px;
  gap: 4px;
  background: #ea985c;
  border-radius: 110px 40px 160px 110px;

  span {
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }
`

export const Icon = styled.img``
