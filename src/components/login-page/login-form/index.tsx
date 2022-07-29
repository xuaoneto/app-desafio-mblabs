import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Logo } from "components/vectors/logo";
import { useApplicationContext } from "contexts/application-context";
import NextLink from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FieldError } from "./field-error";

export function LoginForm() {
  const [login, setLogin] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [pass, setPass] = useState("");
  const [isPassError, setIsPassError] = useState(false);
  const { setIsLogged } = useApplicationContext();
  const [incorrectLogin, setIncorrectLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoginError(false);
  }, [login]);

  useEffect(() => {
    setIsPassError(false);
  }, [pass]);

  useEffect(() => {
    setIncorrectLogin("");
  }, [pass, login]);

  async function handleSubmit() {
    const loginData = { login, pass };

    if (!login) setIsLoginError(true);
    else setIsLoginError(false);
    if (!pass) setIsPassError(true);
    else setIsPassError(false);

    if (!login || !pass) return;
    setIsLoading(true);
    const response = axios
      .post("/api/login-account", loginData)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          window.localStorage.setItem("userToken", response.data);
          setIsLogged(true);
          Router.push("/");
        }
      })
      .catch((response) => {
        setIncorrectLogin(response.data);
        setIsLoading(false);
      });
  }

  return (
    <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
      <Flex
        maxW="400px"
        w="100%"
        as="form"
        alignItems="center"
        flexDir="column"
      >
        <Box mb="80px">
          <Logo />
        </Box>
        <Box w="100%">
          <Text mb="10px">Login:</Text>
          <Input
            size="sm"
            mb="10px"
            bg="transparent"
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
            onChange={(e) => setPass(e.target.value)}
            _focus={{ outline: "none", boxShadow: "none", borderColor: "#fff" }}
            isInvalid={isPassError}
            type="password"
          />
          <FieldError isError={isPassError}>
            Senha é um campo obrigatório.
          </FieldError>
          <FieldError isError={incorrectLogin !== ""}>
            Login ou senha incorretos
          </FieldError>

          {/* FIM FORM */}
          <Button
            isLoading={isLoading}
            variant="custom"
            onClick={() => handleSubmit()}
            mt="25px"
          >
            Login
          </Button>
          <Text mt="25px">
            Ainda não é membro?{" "}
            <NextLink passHref href="/create-account">
              <Link textDecor="underline">Crie uma conta.</Link>
            </NextLink>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
