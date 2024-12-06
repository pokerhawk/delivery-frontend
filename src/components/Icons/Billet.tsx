import { SVGProps } from "react"

const Billet = (props: SVGProps<SVGSVGElement>) => (
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
      <rect
        width={3.333}
        height={12.667}
        x={11.336}
        y={11.336}
        fill="#2E90FA"
        rx={1.667}
      />
      <rect
        width={3.333}
        height={12.667}
        x={21.336}
        y={11.336}
        fill="#2E90FA"
        rx={1.667}
      />
      <rect width={2} height={12.667} x={16} y={11.336} fill="#2E90FA" rx={1} />
      <rect
        width={1.333}
        height={12.667}
        x={18.672}
        y={11.336}
        fill="#2E90FA"
        rx={0.667}
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

export default Billet;
