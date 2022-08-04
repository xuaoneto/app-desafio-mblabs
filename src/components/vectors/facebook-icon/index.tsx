import { Icon, IconProps } from "@chakra-ui/react";

export function FacebookIcon({ ...rest }: IconProps) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width={{ base: "35px" }}
      height={{ base: "35px" }}
      viewBox="0 0 24.914 24.915"
      {...rest}
    >
      <defs>
        <linearGradient
          id="sdkskadjvd"
          y1="0.5"
          x2="1"
          y2="0.5"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="var(--chakra-colors-primary-500)" />
          <stop offset="1" stopColor="var(--chakra-colors-primary-400)" />
        </linearGradient>
      </defs>
      <path
        d="M24.914,12.457A12.457,12.457,0,1,0,12.457,24.914c.073,0,.146,0,.219,0V15.216H10V12.1h2.676V9.8a3.748,3.748,0,0,1,4-4.112,21.741,21.741,0,0,1,2.4.122V8.594H17.44c-1.29,0-1.543.613-1.543,1.513v1.985h3.09l-.4,3.119H15.9v9.221A12.461,12.461,0,0,0,24.914,12.457Z"
        fill="url(#sdkskadjvd)"
      />
    </Icon>
  );
}
