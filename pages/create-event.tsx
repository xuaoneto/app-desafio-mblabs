import { Flex, Text } from "@chakra-ui/react";
import { CreateEventForm } from "components/create-event-page/event-form";
import { Navbar, navBarHeight } from "components/navbar";
import { useApplicationContext } from "contexts/application-context";

import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";

const CreateEvent: NextPage = () => {
  const { userLogged, isLogged } = useApplicationContext();
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (isLogged === false || userLogged?.premiumAccount === false) {
      setPermissionDenied(true);
      setTimeout(() => {
        Router.push("/");
      }, 2500);
    }
  }, [isLogged]);

  return (
    <>
      <Navbar />
      <Flex
        w="100%"
        h={`calc(100vh - ${navBarHeight})`}
        py="100px"
        justifyContent="center"
        alignItems="center"
        overflow="auto"
      >
        {permissionDenied ? (
          <Text>
            Você não tem permissão para acessar essa página
            <br />
            <br /> Redirecting...
          </Text>
        ) : (
          <CreateEventForm />
        )}
      </Flex>
    </>
  );
};

export default CreateEvent;
