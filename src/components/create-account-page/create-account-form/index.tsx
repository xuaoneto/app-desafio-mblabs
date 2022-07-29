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
import { Logo } from "components/vectors/logo";
import NextLink from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FieldError } from "../../login-page/login-form/field-error";

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
          <Text mb="10px">Nome:</Text>
          <Input
            size="sm"
            mb="10px"
            bg="transparent"
            borderColor="primary.500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            _focus={{ outline: "none", boxShadow: "none", borderColor: "#fff" }}
            isInvalid={isNameError}
          />
          <FieldError isError={isNameError}>
            Nome é um campo obrigatório.
          </FieldError>
          <Text mb="10px">Login:</Text>
          <Input
            size="sm"
            mb="10px"
            bg="transparent"
            value={login}
            borderColor="primary.500"
            onChange={(e) => setLogin(e.target.value)}
            _focus={{ outline: "none", boxShadow: "none", borderColor: "#fff" }}
            isInvalid={isLoginError}
          />
          <FieldError isError={isLoginError}>
            Login é um campo obrigatório.
          </FieldError>
          <Text mb="10px">Senha:</Text>
          <Input
            size="sm"
            bg="transparent"
            borderColor="primary.500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            _focus={{ outline: "none", boxShadow: "none", borderColor: "#fff" }}
            isInvalid={isPassError}
            type="password"
          />
          <FieldError isError={isPassError}>
            Senha é um campo obrigatório.
          </FieldError>
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
