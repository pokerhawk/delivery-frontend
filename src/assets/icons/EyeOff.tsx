import { SVGProps } from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  color?: string
}

const EyeOffIcon = ({
  title = 'EyeOff',
  titleId = 'eye-off-icon',
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
      d="M11.767 11.767a2.502 2.502 0 0 1-3.597.063 2.5 2.5 0 0 1 .063-3.597m6.717 6.717A8.391 8.391 0 0 1 10 16.667C4.167 16.667.833 10 .833 10A15.375 15.375 0 0 1 5.05 5.05l9.9 9.9ZM8.25 3.533a7.6 7.6 0 0 1 1.75-.2c5.833 0 9.167 6.667 9.167 6.667a15.414 15.414 0 0 1-1.8 2.658L8.25 3.533ZM.833.833l18.334 18.334"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default EyeOffIcon
