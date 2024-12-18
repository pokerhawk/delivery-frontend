import { SVGProps } from "react"

interface SVGRProps {
  title?: string;
  titleId?: string;
  active?: boolean;
}

const CardPix = ({
  title,
  titleId,
  active,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width={30}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M23.82 16.226a3.947 3.947 0 0 1-1.357-.234 3.588 3.588 0 0 1-1.15-.675l-3.62-3.184a.742.742 0 0 0-.476-.168.741.741 0 0 0-.475.168l-3.633 3.192c-.328.29-.719.52-1.149.677-.43.156-.891.236-1.357.235h-.708l4.587 4.032c.688.604 1.62.943 2.592.943s1.904-.34 2.592-.943l4.597-4.04-.444-.003ZM10.604 4.973c.466-.001.927.079 1.357.235.43.157.82.387 1.15.677l3.632 3.193c.126.11.297.173.475.173.179 0 .35-.062.476-.173l3.62-3.181a3.58 3.58 0 0 1 1.148-.677c.43-.157.892-.237 1.358-.236h.435L19.66.944c-.34-.3-.745-.537-1.19-.699A4.107 4.107 0 0 0 17.067 0c-.482 0-.959.083-1.403.245-.445.162-.85.4-1.19.699l-4.58 4.029h.71Z"
      fill={active ? "#FFFFFF" : "#BDBDBD"}
    />
    <path
      d="M28.058 8.327 25.28 5.886a.6.6 0 0 1-.197.035H23.82a2.678 2.678 0 0 0-1.753.638l-3.62 3.18a1.867 1.867 0 0 1-1.228.446c-.46 0-.902-.16-1.228-.447l-3.633-3.191a2.678 2.678 0 0 0-1.754-.64h-1.55a.61.61 0 0 1-.187-.032L6.072 8.327C5.386 8.932 5 9.751 5 10.606c0 .854.386 1.673 1.072 2.278l2.79 2.452a.585.585 0 0 1 .186-.033h1.556a2.68 2.68 0 0 0 1.754-.64l3.632-3.192c.657-.577 1.801-.577 2.457 0l3.62 3.18a2.679 2.679 0 0 0 1.753.639h1.263c.068 0 .135.012.197.035l2.778-2.441c.34-.3.61-.655.795-1.046.184-.39.279-.81.279-1.233 0-.423-.095-.842-.28-1.233a3.229 3.229 0 0 0-.794-1.045"
      fill={active ? "#FFFFFF" : "#BDBDBD"}
    />
    <path fill={active ? "#BDBDBD" : "#FFFFFF"} d="M3 9h18v12H3z" />
    <path
      d="M7 17h3a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2ZM19 7H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6h16v6Zm0-8H4v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z"
      fill={active ? "#FFFFFF" : "#BDBDBD"}
    />
  </svg>
)

export default CardPix
