import { Icon, IconProps } from "@chakra-ui/react";

export function LockIcon({ ...rest }: IconProps) {
  return (
    <Icon
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M17.125 10.125H4.875C3.9085 10.125 3.125 10.9085 3.125 11.875V18C3.125 18.9665 3.9085 19.75 4.875 19.75H17.125C18.0915 19.75 18.875 18.9665 18.875 18V11.875C18.875 10.9085 18.0915 10.125 17.125 10.125Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.625 10.125V6.625C6.625 5.46468 7.08594 4.35188 7.90641 3.53141C8.72688 2.71094 9.83968 2.25 11 2.25C12.1603 2.25 13.2731 2.71094 14.0936 3.53141C14.9141 4.35188 15.375 5.46468 15.375 6.625V10.125"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
