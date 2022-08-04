import { Container, Flex, Text } from "@chakra-ui/react";
import { CreateEventForm } from "components/create-event-page/event-form";
import { Navbar } from "components/navbar";
import { useApplicationContext } from "contexts/application-context";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Router from "next/router";
import { useEffect, useState } from "react";

const CreateEvent: NextPage = () => {
  const { userLogged, isLogged } = useApplicationContext();
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (isLogged === false || !userLogged?.user_metadata.premium_account) {
      setPermissionDenied(true);
      setTimeout(() => {
        Router.push("/");
      }, 2500);
    }
  }, [isLogged]);

  return (
    <>
      <NextSeo title="Criar Conta" />
      <Navbar />
      <Flex
        w="100%"
        minH={`calc(100vh - var(--chakra-sizes-navbar-height))`}
        py="100px"
        justifyContent="center"
        alignItems="center"
      >
        {permissionDenied ? (
          <Text>
            Você não tem permissão para acessar essa página
            <br />
            <br /> Redirecting...
          </Text>
        ) : (
          <Container variant="centered">
            <CreateEventForm />
          </Container>
        )}
      </Flex>
    </>
  );
};

export default CreateEvent;
