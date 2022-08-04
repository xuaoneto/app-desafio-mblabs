import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { FieldError } from "components/field-error";
import { FieldInput } from "components/field-input.tsx";
import { EmailIcon } from "components/vectors/email-icon";
import { LockIcon } from "components/vectors/lock-icon";
import { Logo } from "components/vectors/logo";
import { PasswordIcon } from "components/vectors/password-icon";
import { useApplicationContext } from "contexts/application-context";
import NextLink from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { supabaseClient } from "services/db/supabase";
import * as yup from "yup";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState("");
  const { setIsLogged, setUserLogged } = useApplicationContext();
  const [incorrectLogin, setIncorrectLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsEmailError("");
  }, [email]);

  useEffect(() => {
    setIsPasswordError("");
  }, [password]);

  useEffect(() => {
    setIncorrectLogin("");
  }, [password, email]);

  async function handleSubmit() {
    const loginData = { email, password };

    const schema = yup.object().shape({
      email: yup.string().required("Nome é um campo obrigatório"),
      password: yup.string().required("Email é um campo obrigatório"),
    });

    schema
      .validate(loginData)
      .then(async () => {
        setIsLoading(true);
        const { user, error } = await supabaseClient.auth.signIn({
          email,
          password,
        });
        if (!error) {
          setUserLogged(user);
          setIsLogged(true);
          Router.push("/");
        } else {
          setIncorrectLogin(error.message);
        }
        setIsLoading(false);
      })
      .catch((err: yup.ValidationError) => {
        const fields = [
          { isErrorRegex: /Email/, errorState: setIsEmailError },
          { isErrorRegex: /Senha/, errorState: setIsPasswordError },
        ];

        fields.map((field) => {
          err.errors.map((error) => {
            if (field.isErrorRegex.test(error)) field.errorState(error);
          });
        });
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
        <Box mb="60px" w="80%">
          <Logo width="100%" height="auto" />
        </Box>
        <Box w="100%">
          <FieldInput
            fieldName="Email:"
            error={isEmailError}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            icon={<EmailIcon />}
          />

          <FieldInput
            fieldName="Senha:"
            error={isPasswordError}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Senha"
            icon={<PasswordIcon />}
          />

          <FieldError isError={incorrectLogin !== ""}>
            {incorrectLogin || "Login ou senha incorretos"}
          </FieldError>

          {/* FIM FORM */}
          <Button
            isLoading={isLoading}
            variant="custom"
            onClick={() => handleSubmit()}
            mt="25px"
            w="100%"
            leftIcon={<LockIcon />}
            lineHeight="24px"
            loadingText="Entrando"
          >
            Entrar
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
