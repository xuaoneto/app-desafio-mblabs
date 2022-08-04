import { Container } from "@chakra-ui/react";
import { LoginForm } from "components/login-page/login-form";
import { useApplicationContext } from "contexts/application-context";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Router from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { isLogged } = useApplicationContext();

  useEffect(() => {
    if (isLogged) Router.push("/");
  }, [isLogged]);

  return (
    <>
      <NextSeo title="Login" />
      <Container variant="centered">
        <LoginForm />
      </Container>
    </>
  );
};

export default Login;
