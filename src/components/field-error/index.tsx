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
          borderRadius="0.25rem"
          fontSize="13"
          bg="secondary.300"
        >
          {children}
        </Box>
      ) : null}
    </>
  );
}
