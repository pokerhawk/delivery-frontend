import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const BoletoIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={67}
    height={66}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect x={5.5} y={5} width={56} height={56} rx={28} fill="#B2DDFF" />
    <path
      d="M35.83 21.65v4.82c0 .653 0 .98.128 1.229.112.22.29.398.51.51.25.127.576.127 1.23.127h4.818m-12.519 9.333 2.334 2.334 5.25-5.25m-1.75-13.417h-6.067c-1.96 0-2.94 0-3.689.381a3.5 3.5 0 0 0-1.53 1.53c-.38.749-.38 1.729-.38 3.689v12.133c0 1.96 0 2.94.38 3.69a3.5 3.5 0 0 0 1.53 1.529c.749.381 1.729.381 3.69.381h7.466c1.96 0 2.94 0 3.689-.381a3.5 3.5 0 0 0 1.53-1.53c.38-.748.38-1.729.38-3.689V28.336l-7-7Z"
      stroke="#1570EF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x={5.5}
      y={5}
      width={56}
      height={56}
      rx={28}
      stroke="#D1E9FF"
      strokeWidth={10}
    />
  </svg>
);

export default BoletoIcon;
