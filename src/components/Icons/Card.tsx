import { SVGProps } from "react"

interface SVGRProps {
  title?: string;
  titleId?: string;
  color?: string;
}

const SvgComponent = ({
  title,
  titleId,
  color = '#BDBDBD',
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M7 15h3a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2ZM19 5H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6h16v6Zm0-8H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z"
      fill={color}
    />
  </svg>
)

export default SvgComponent
