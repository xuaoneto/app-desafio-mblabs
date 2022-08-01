import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export function FieldError({
  children,
  isError,
}: {
  children: ReactNode;
  isError: boolean;
}) {
  return (
    <>
      {isError ? (
        <Box
          p="10px"
          my="10px"
          color="red.600"
          borderRadius="8"
          fontSize="13"
          bg="rgba(255,255,255, 0.05)"
        >
          {children}
        </Box>
      ) : null}
    </>
  );
}
