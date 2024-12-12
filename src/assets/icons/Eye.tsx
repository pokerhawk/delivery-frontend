import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  color?: string
}

const EyeIcon = ({
  title = 'Eye',
  titleId = 'eye-icon',
  color = '#61ABD8',
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M.833 10S4.167 3.333 10 3.333 19.167 10 19.167 10 15.833 16.667 10 16.667.833 10 .833 10Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default EyeIcon
