import { Box, Button, Container, Flex, useDisclosure } from "@chakra-ui/react";
import { Logo } from "components/vectors/logo";
import { useApplicationContext } from "contexts/application-context";
import NextLink from "next/link";
import Router from "next/router";
import { supabaseClient } from "services/db/supabase";
import { MenuSubItem } from "types";
import { HumbMenuButton } from "./humb-menu-button";
import { MyAccountButton } from "./my-account-button";
import { SideMenu } from "./side-menu";

export function Navbar() {
  const { isLogged, isMobile, userLogged, setUserLogged, setIsLogged } =
    useApplicationContext();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const myAccountArray: MenuSubItem[] = [
    {
      name: "Criar Evento",
      onClick: () => {
        Router.push("/create-event");
      },
      condition: userLogged?.user_metadata.premium_account,
    },
    {
      name: "Meus Ingressos",
      onClick: () => {
        Router.push("/my-tickets");
      },
      condition: isLogged,
    },
    {
      name: "Meus Eventos",
      onClick: () => {
        Router.push("/my-events");
      },
      condition: userLogged?.user_metadata.premium_account,
    },
    {
      name: "Sair",
      onClick: async () => {
        const { error } = await supabaseClient.auth.signOut();
        setIsLogged(false);
        setUserLogged(null);
      },
      condition: isLogged,
    },
  ];

  return (
    <>
      <Box
        borderBottom="1px solid var(--chakra-colors-primary-500)"
        h={"navbar-height"}
        bg="rgba(26, 26, 26, 0.8)"
        backdropFilter="blur(6px)"
        pos="sticky"
        top="0"
        zIndex="100"
      >
        <Container
          display="flex"
          justifyContent="space-between"
          h="100%"
          alignItems="center"
        >
          <Logo
            width={{ base: "159px", md: "212px" }}
            height={{ base: "15px", md: "20px" }}
          />
          {isMobile ? (
            <HumbMenuButton onToggle={onToggle} />
          ) : (
            <Flex alignItems="center">
              <NextLink passHref href="/">
                <Button as="a" variant="ghost" fontWeight="300">
                  Home
                </Button>
              </NextLink>

              {isLogged ? (
                <MyAccountButton myAccountArray={myAccountArray} />
              ) : (
                <NextLink passHref href="/login">
                  <Button as="a" ml="15px" variant="custom">
                    Login
                  </Button>
                </NextLink>
              )}
            </Flex>
          )}
        </Container>
      </Box>
      <SideMenu
        isOpen={isOpen}
        onClose={onClose}
        myAccountArray={myAccountArray}
      />
    </>
  );
}
