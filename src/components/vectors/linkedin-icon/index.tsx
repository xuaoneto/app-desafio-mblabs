import { Icon, IconProps } from "@chakra-ui/react";

export function LinkedinIcon({ ...rest }: IconProps) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width={{ base: "35px" }}
      height={{ base: "35px" }}
      viewBox="0 0 25 25"
      {...rest}
    >
      <defs>
        <linearGradient
          id="psadlsxcld"
          y1="0.5"
          x2="1"
          y2="0.5"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="var(--chakra-colors-primary-500)" />
          <stop offset="1" stopColor="var(--chakra-colors-primary-400)" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0ZM8.865,19.079H6.138V10.294H8.865ZM7.5,9.1A1.587,1.587,0,1,1,9.081,7.5,1.587,1.587,0,0,1,7.5,9.1Zm11.579,9.984H16.354V14.8c0-1.02-.02-2.327-1.418-2.327s-1.645,1.109-1.645,2.253v4.35H10.576V10.294h2.617v1.2h.038a2.864,2.864,0,0,1,2.581-1.419c2.76,0,3.268,1.819,3.268,4.181Z"
          fill="url(#psadlsxcld)"
        ></path>
      </g>
    </Icon>
  );
}
