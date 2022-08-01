import { Box, Button, Container, Flex, Link } from "@chakra-ui/react";
import { Logo } from "components/vectors/logo";
import { useApplicationContext } from "contexts/application-context";
import NextLink from "next/link";
import { menuArray } from "./menu-array";
import { MyAccountButton } from "./my-account-button";

export function Navbar() {
  const { isLogged } = useApplicationContext();

  return (
    <Box
      borderBottom="1px solid var(--chakra-colors-primary-500)"
      h={navBarHeight}
      bg="secondary.500"
      color="primary.500"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        h="100%"
        alignItems="center"
      >
        <Logo width="212px" height="20px" />
        <Flex alignItems="center">
          {menuArray.map((item, index) => (
            <NextLink passHref href={item.link} key={`menuitem-${index}`}>
              <Link>{item.name}</Link>
            </NextLink>
          ))}
          <NextLink passHref href="/login">
            {isLogged ? (
              <MyAccountButton />
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

export const navBarHeight = "100px";
