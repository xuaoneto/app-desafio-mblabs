import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { Logo } from "components/vectors/logo";
import { useApplicationContext } from "contexts/application-context";
import NextLink from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { menuArray } from "./menu-array";

export function Navbar() {
  const { isLogged, setIsLogged, userLogged } = useApplicationContext();
  return (
    <Box borderBottom="1px solid var(--chakra-colors-primary-500)" h="100px">
      <Container
        display="flex"
        justifyContent="space-between"
        h="100%"
        alignItems="center"
      >
        <Logo />
        <Flex alignItems="center">
          {menuArray.map((item, index) => (
            <NextLink passHref href={item.link} key={`menuitem-${index}`}>
              <Link>{item.name}</Link>
            </NextLink>
          ))}
          <NextLink passHref href="/login">
            {isLogged ? (
              <Menu>
                <MenuButton
                  as={Link}
                  _hover={{ textDecor: "underline" }}
                  ml="15px"
                >
                  Minha Conta
                </MenuButton>
                <MenuList
                  bg="#1a1a1a"
                  border="1px solid var(--chakra-colors-primary-500)"
                  py="0"
                >
                  {userLogged?.premiumAccount ? (
                    <MenuItem
                      bg="transparent"
                      _hover={{ bg: "rgba(255,255,255,0.1)" }}
                      onClick={() => Router.push("/create-event")}
                      _focus={{}}
                    >
                      Criar Evento
                    </MenuItem>
                  ) : null}
                  <MenuItem
                    bg="transparent"
                    _hover={{ bg: "rgba(255,255,255,0.1)" }}
                    onClick={() => Router.push("/my-tickets")}
                    _focus={{}}
                  >
                    Meus Tickets
                  </MenuItem>
                  <MenuItem
                    bg="transparent"
                    _hover={{ bg: "rgba(255,255,255,0.1)" }}
                    onClick={() => {
                      window.localStorage.setItem("userToken", "");
                      setIsLogged(false);
                    }}
                    _focus={{}}
                  >
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button as="a" ml="15px" variant="custom">
                Login
              </Button>
            )}
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
}
