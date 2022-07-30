import { Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useApplicationContext } from "contexts/application-context";
import Router from "next/router";

export function MyAccountButton() {
  const { userLogged, setIsLogged } = useApplicationContext();
  return (
    <Menu>
      <MenuButton as={Link} _hover={{ textDecor: "underline" }} ml="15px">
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
  );
}
