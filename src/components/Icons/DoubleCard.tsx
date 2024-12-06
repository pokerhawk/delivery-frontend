import { SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
  active?: boolean;
}

const DoubleCard = ({
  title,
  titleId,
  active,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M8 15h3a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2ZM20 5H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6h16v6Zm0-8H5V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z"
      fill={active ? "#fff" : "#BDBDBD"}
    />
    <path fill={active ? "#BDBDBD" : "#fff"} d="M1 9h18v13H1z" />
    <path
      d="M5 18h3a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2ZM17 8H3a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm1 12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6h16v6Zm0-8H2v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z"
      fill={active ? "#fff" : "#BDBDBD"}
    />
  </svg>
);

export default DoubleCard;
