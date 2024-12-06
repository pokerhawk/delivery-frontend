import { SVGProps } from "react"

interface SVGRProps {
  title?: string;
  titleId?: string;
}

const Close = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      opacity={0.5}
      d="M7.55 1.776a.535.535 0 0 0-.711-.8L4 3.498 1.161.976a.535.535 0 0 0-.71.8l2.743 2.438L.45 6.652a.535.535 0 0 0 .711.8L4 4.93l2.839 2.523a.535.535 0 0 0 .71-.8L4.807 4.213 7.55 1.776Z"
      fill="#6D6E70"
    />
  </svg>
)

export default Close
