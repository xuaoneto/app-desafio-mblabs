import { Icon, IconProps } from "@chakra-ui/react";

export function LoadingIcon({ ...rest }: IconProps) {
  return (
    <Icon
      width="59px"
      height="19px"
      viewBox="0 0 59 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--chakra-colors-primary-500)"
      strokeWidth="1px"
      strokeDasharray="250"
      {...rest}
    >
      <animate
        attributeName="stroke-dashoffset"
        values="250;0"
        dur="2s"
        repeatCount="indefinite"
      />

      <path
        d="M59 0.58976L58.7085 0C27.93 15.5332 0.596045 0.166528 0.323456 0.00987281L0 0.581202C0.0639086 0.618062 1.61206 1.48822 4.33404 2.60324L4.97835 15.0395L12.7106 5.38024C13.5408 5.59679 14.4049 5.80545 15.3009 6.00291L14.8581 5.9338L13.085 17.5078L17.5905 14.769L21.0664 18.7532L22.8323 7.22258C23.581 7.30222 24.34 7.37331 25.1154 7.4286L29.5075 19L33.8865 7.46546C34.6913 7.41478 35.5038 7.35093 36.3262 7.268L38.0843 18.7545L41.5601 14.7703L46.065 17.5091L44.2926 5.94367C45.0092 5.7778 45.7292 5.59548 46.4531 5.39999L54.1723 15.0395L54.8192 2.54531L54.5134 2.64536C56.0002 2.0273 57.4949 1.34934 59 0.58976Z"
        fill="none"
      />
    </Icon>
  );
}
