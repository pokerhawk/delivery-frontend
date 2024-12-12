import { SVGProps } from 'react'

import styled, { css, keyframes } from 'styled-components'

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

const offset = keyframes({
  '50%': { strokeDashoffset: '96px' }
})

type LoadingProps = {
  isLoading?: boolean
}

const Wrapper = styled.div<LoadingProps>`
  ${({ isLoading }) => css`
    transition:
      transform 0.2s ease 0s,
      opacity 0.2s ease 0s;

    ${!isLoading &&
    css`
      transform: translateY(-12px) scale(0.75);
      opacity: 0;
    `}

    svg {
      opacity: 1;
      width: 20px;
      height: 20px;

      > g {
        animation: 1s linear 0s infinite normal none running ${rotate};
        transform-origin: 50% 50%;
      }

      .anima {
        stroke-dasharray: 38px;
        stroke-dashoffset: 114px;
        animation: 2s linear 0s infinite normal none running ${offset};
      }
    }
  `}
`

interface SVGRProps {
  color?: string
  isLoading?: boolean
}

const LoadingIcon = ({
  color = '#fff',
  isLoading = false,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <Wrapper isLoading={isLoading}>
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{
          stroke: color
        }}
      >
        <circle strokeOpacity={0.2} cx={8} cy={8} r={6} />
        <circle cx={8} cy={8} r={6} className="anima" />
      </g>
    </svg>
  </Wrapper>
)

export default LoadingIcon
