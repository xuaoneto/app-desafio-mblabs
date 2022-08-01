import {
  Box,
  Flex,
  FormControl,
  Input,
  Text,
  Link,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import { FieldError } from "components/field-error";
import { FieldInput } from "components/field-input.tsx";

import { Logo } from "components/vectors/logo";
import NextLink from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";

export function CreateAccountForm() {
  const [name, setName] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [login, setLogin] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [pass, setPass] = useState("");
  const [isPassError, setIsPassError] = useState(false);
  const [premiumAccount, setPremiumAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incorrectAccount, setIncorrectAccount] = useState("");

  useEffect(() => {
    setIsLoginError(false);
  }, [login]);

  useEffect(() => {
    setIsPassError(false);
  }, [pass]);

  useEffect(() => {
    setIsNameError(false);
  }, [name]);

  useEffect(() => {
    setIncorrectAccount("");
  }, [login, pass, name]);

  async function handleSubmit() {
    const accountData = { login, pass, name, premiumAccount };

    if (!login) setIsLoginError(true);
    else setIsLoginError(false);
    if (!pass) setIsPassError(true);
    else setIsPassError(false);
    if (!name) setIsNameError(true);
    else setIsNameError(false);

    if (!login || !pass || !name) return;
    setIsLoading(true);
    axios
      .post("/api/create-account", accountData)
      .then((response) => {
        setIsLoading(false);
        if (response.data === "conta criada com sucesso") {
          Router.push("/login");
        }
      })
      .catch((response) => {
        setIsLoading(false);
        setIncorrectAccount(response.data);
      });
  }

  return (
    <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
      <Flex
        as="form"
        maxW="400px"
        w="100%"
        alignItems="center"
        flexDir="column"
      >
        <Box mb="80px">
          <Logo />
        </Box>
        <Box w="100%">
          <FieldInput
            fieldName="Nome:"
            isError={isNameError}
            onChange={(e) => setName(e.target.value)}
            value={name}
            errorMessage="Nome é um campo obrigatório."
          />

          <FieldInput
            fieldName="Login:"
            isError={isLoginError}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            errorMessage="Login é um campo obrigatório."
          />

          <FieldInput
            fieldName="Senha:"
            isError={isPassError}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            errorMessage="Senha é um campo obrigatório."
            type="password"
          />

          <Box mt="20px">
            <Checkbox
              isChecked={premiumAccount}
              onChange={(e) => setPremiumAccount(e.target.checked)}
              colorScheme="green"
              borderColor="primary.500"
            >
              Conta Premium
            </Checkbox>
          </Box>
          <FieldError isError={incorrectAccount !== ""}>
            {incorrectAccount || "Algo deu errado."}
          </FieldError>

          {/* FIM FORM */}
          <Button
            isLoading={isLoading}
            variant="custom"
            onClick={() => handleSubmit()}
            mt="25px"
          >
            Criar Conta
          </Button>
          <Text mt="25px">
            Já é membro?{" "}
            <NextLink passHref href="/login">
              <Link textDecor="underline">Faça login.</Link>
            </NextLink>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
