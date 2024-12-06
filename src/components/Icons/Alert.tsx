import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const AlertIcon = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect width={48} height={48} x={4} y={4} fill="#FEE4E2" rx={24} />
    <path
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M28 24v4m0 4h.01M38 28c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z"
    />
    <rect
      width={48}
      height={48}
      x={4}
      y={4}
      stroke="#FEF3F2"
      strokeWidth={8}
      rx={24}
    />
  </svg>
);
export default AlertIcon;
