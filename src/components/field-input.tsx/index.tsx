import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import { FieldError } from "components/field-error";

export function FieldInput({
  fieldName,
  isError,
  errorMessage,
  ...rest
}: {
  fieldName: string;
  isError?: boolean;
  errorMessage: string;
} & InputProps) {
  return (
    <>
      <Text mb="10px" mt="10px">
        {fieldName}
      </Text>
      <Box
        as={Input}
        size="sm"
        mb="10px"
        bg="transparent"
        borderColor="primary.500"
        _focus={{ outline: "none", boxShadow: "none", borderColor: "#fff" }}
        isInvalid={isError}
        {...rest}
      />
      {isError !== undefined ? (
        <FieldError isError={isError}>{errorMessage}</FieldError>
      ) : null}
    </>
  );
}
