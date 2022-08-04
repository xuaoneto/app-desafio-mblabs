import {
  Accordion,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FacebookIcon } from "components/vectors/facebook-icon";
import { InstagramIcon } from "components/vectors/instagram-icon";
import { LinkedinIcon } from "components/vectors/linkedin-icon";
import { Logo } from "components/vectors/logo";
import { useApplicationContext } from "contexts/application-context";
import NextLink from "next/link";
import { MenuSubItem } from "types";
import { MenuItem } from "./menu-item";

export function SideMenu({
  isOpen,
  onClose,
  myAccountArray,
}: {
  isOpen: boolean;
  onClose: () => void;
  myAccountArray: MenuSubItem[];
}) {
  const { isLogged } = useApplicationContext();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay backdropFilter="blur(8px)" />
      <DrawerContent bg="secondary.400">
        <DrawerCloseButton />
        <Box mt="50px" px="45px" w="100%">
          <Logo width="100%" height="auto" />
        </Box>

        <DrawerBody
          mt="40px"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          overflow="auto"
        >
          <Accordion allowMultiple>
            <MenuItem link="/">Home</MenuItem>

            {isLogged ? (
              <MenuItem subItems={myAccountArray}>Minha Conta</MenuItem>
            ) : (
              <NextLink passHref href="/login">
                <Button as="a" variant="custom" w="100%" mt="30px">
                  Login
                </Button>
              </NextLink>
            )}
          </Accordion>
          <Flex mt="100px" mx="auto" pb="30px">
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              mr="20px"
              _hover={{ transform: "scale(1.1)" }}
              transition="0.3s"
            >
              <LinkedinIcon />
            </Link>
            <Link
              href="https://pt-br.facebook.com"
              target="_blank"
              mr="20px"
              _hover={{ transform: "scale(1.1)" }}
              transition="0.3s"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              _hover={{ transform: "scale(1.1)" }}
              transition="0.3s"
            >
              <InstagramIcon />
            </Link>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
