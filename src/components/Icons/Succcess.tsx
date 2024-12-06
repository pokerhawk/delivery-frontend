import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SuccessIcon = ({
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
    <rect x={5.5} y={5} width={56} height={56} rx={28} fill="#D1FADF" />
    <path
      d="m28.253 33.003 3.5 3.5 7-7m6.416 3.5c0 6.443-5.223 11.666-11.666 11.666-6.444 0-11.667-5.223-11.667-11.666 0-6.444 5.223-11.667 11.667-11.667 6.443 0 11.666 5.223 11.666 11.667Z"
      stroke="#039855"
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
      stroke="#ECFDF3"
      strokeWidth={10}
    />
  </svg>
);

export default SuccessIcon;
