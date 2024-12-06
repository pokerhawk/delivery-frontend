import { SVGProps } from "react"

const CreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <g
      style={{
        mixBlendMode: "multiply",
      }}
    >
      <rect width={32} height={32} x={2} y={2} fill="#D1E9FF" rx={16} />
      <path
        stroke="#2E90FA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="M24.67 16.67H11.335m0-1.2v5.066c0 .747 0 1.12.145 1.405.128.251.332.455.583.583.285.145.659.145 1.405.145h9.067c.747 0 1.12 0 1.405-.145.251-.128.455-.332.583-.583.145-.285.145-.658.145-1.405v-5.067c0-.746 0-1.12-.145-1.405a1.333 1.333 0 0 0-.583-.583c-.285-.145-.658-.145-1.405-.145h-9.067c-.746 0-1.12 0-1.405.145-.25.128-.455.332-.583.583-.145.285-.145.659-.145 1.405Z"
      />
      <rect
        width={32}
        height={32}
        x={2}
        y={2}
        stroke="#EFF8FF"
        strokeWidth={4}
        rx={16}
      />
    </g>
  </svg>
)

export default CreditCard;
