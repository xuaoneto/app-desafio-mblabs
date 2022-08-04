import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Fragment } from "react";
import { MenuSubItem } from "types";

export function MyAccountButton({
  myAccountArray,
}: {
  myAccountArray: MenuSubItem[];
}) {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" ml="15px" fontWeight="300">
        Minha Conta
      </MenuButton>
      <MenuList
        bg="#1a1a1a"
        border="1px solid var(--chakra-colors-secondary-400)"
        borderRadius="0.25rem"
        py="0"
        overflow="hidden"
      >
        {myAccountArray.map(({ name, onClick, condition }) => {
          const subItem = (
            <MenuItem
              bg="transparent"
              _hover={{ bg: "secondary.400" }}
              onClick={onClick}
              _focus={{}}
            >
              {name}
            </MenuItem>
          );
          return (
            <Fragment key={name}>
              {condition === undefined ? (
                <>{subItem}</>
              ) : (
                condition && <>{subItem}</>
              )}
            </Fragment>
          );
        })}
      </MenuList>
    </Menu>
  );
}
