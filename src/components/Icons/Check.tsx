import { SVGProps } from "react"

const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M8.33 2.5 3.748 7.083 1.664 5"
    />
  </svg>
)

export default Check
