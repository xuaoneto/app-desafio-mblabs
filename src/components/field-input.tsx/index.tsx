import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Text,
} from "@chakra-ui/react";
import { FieldError } from "components/field-error";
import { ReactNode } from "react";

export function FieldInput({
  fieldName,
  error,
  icon,
  ...rest
}: {
  fieldName?: string;
  error?: string;
  icon?: ReactNode | JSX.Element;
} & InputProps) {
  const input = (
    <Input
      mb="10px"
      bg="transparent"
      borderColor="#343434"
      borderRadius="0.25rem"
      _focus={{
        outline: "4px solid #2e2e2e",
        boxShadow: "none",
        borderColor: "#343434",
      }}
      isInvalid={error !== ""}
      {...rest}
    />
  );
  return (
    <>
      {fieldName ? (
        <Text mb="10px" mt="10px">
          {fieldName}
        </Text>
      ) : null}
      {icon ? (
        <InputGroup>
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
          {input}
        </InputGroup>
      ) : (
        input
      )}
      {error !== undefined ? (
        <FieldError isError={error !== ""}>{error}</FieldError>
      ) : null}
    </>
  );
}
