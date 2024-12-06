import { SVGProps } from "react"

const Cart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.125 8.75h8.21c.633 0 .95 0 1.201-.118a1.25 1.25 0 0 0 .537-.48c.145-.237.18-.552.25-1.181l.365-3.29c.022-.193.032-.289.001-.363a.312.312 0 0 0-.137-.154c-.07-.039-.167-.039-.36-.039H2.811M1.25 1.25h.78c.166 0 .248 0 .313.031a.313.313 0 0 1 .135.128c.036.062.041.145.051.31l.567 9.062c.01.165.015.248.05.31.032.056.079.1.136.128.065.031.147.031.313.031h8.28m-7.188 2.188h.007m5.619 0h.006m-5.319 0a.312.312 0 1 1-.625 0 .312.312 0 0 1 .625 0Zm5.625 0a.312.312 0 1 1-.625 0 .312.312 0 0 1 .625 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h15v15H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default Cart;
