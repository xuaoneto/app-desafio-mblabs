import { Box, Button, Checkbox, Flex, Link, Text } from "@chakra-ui/react";
import { FieldError } from "components/field-error";
import { FieldInput } from "components/field-input.tsx";
import { EmailIcon } from "components/vectors/email-icon";
import { Logo } from "components/vectors/logo";
import { UserIcon } from "components/vectors/user-icon";
import { PasswordIcon } from "components/vectors/password-icon";
import { PlaneIcon } from "components/vectors/plane-icon";
import NextLink from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { supabaseClient } from "services/db/supabase";
import * as yup from "yup";
import { SaveIcon } from "components/vectors/save-icon";

export function CreateAccountForm() {
  const [name, setName] = useState("");
  const [isNameError, setIsNameError] = useState("");
  const [login, setLogin] = useState("");
  const [isLoginError, setIsLoginError] = useState("");
  const [password, setPass] = useState("");
  const [isPassError, setIsPassError] = useState("");
  const [premium_account, setPremiumAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incorrectAccount, setIncorrectAccount] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState("");

  useEffect(() => {
    setIsLoginError("");
  }, [login]);

  useEffect(() => {
    setIsPassError("");
  }, [password]);

  useEffect(() => {
    setIsNameError("");
  }, [name]);

  useEffect(() => {
    setIsEmailError("");
  }, [email]);

  useEffect(() => {
    setIncorrectAccount("");
  }, [login, password, name]);

  async function handleSubmit() {
    const accountData = { login, password, name, premium_account, email };

    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Nome é um campo obrigatório")
        .min(5, "Nome tem que ter no mínimo 5 caracteres."),
      email: yup
        .string()
        .required("Email é um campo obrigatório")
        .email("Insira um Email válido"),
      password: yup
        .string()
        .required("Senha é um campo obrigatório")
        .min(8, "Senha tem que ter pelo menos 8 digitos"),
      premium_account: yup.boolean().required(),
    });

    schema
      .validate(accountData)
      .then(async () => {
        setIsLoading(true);
        const { data: user, error } = await supabaseClient.auth.api.createUser({
          email,
          password,
          user_metadata: { premium_account, name },
          email_confirm: true,
        });
        if (!error) {
          Router.push("/login");
        } else {
          setIncorrectAccount(error.message);
        }
        setIsLoading(false);
      })
      .catch((err: yup.ValidationError) => {
        const fields = [
          { isErrorRegex: /Nome/, errorState: setIsNameError },
          { isErrorRegex: /Login/, errorState: setIsLoginError },
          { isErrorRegex: /Email/, errorState: setIsEmailError },
          { isErrorRegex: /Senha/, errorState: setIsPassError },
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
        as="form"
        maxW="400px"
        w="100%"
        alignItems="center"
        flexDir="column"
      >
        <Box mb="60px" w="80%" h="auto">
          <Logo width="100%" height="auto" />
        </Box>

        <Box w="100%">
          <FieldInput
            fieldName="Nome:"
            error={isNameError}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nome"
            icon={<UserIcon />}
          />

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
            error={isPassError}
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Senha"
            icon={<PasswordIcon />}
          />

          <Box mt="20px">
            <Checkbox
              isChecked={premium_account}
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
            w="100%"
            lineHeight="24px"
            leftIcon={<SaveIcon />}
            loadingText="Criando Conta"
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
