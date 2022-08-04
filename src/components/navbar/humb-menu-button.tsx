import { Box, Flex } from "@chakra-ui/react";

export function HumbMenuButton({ onToggle }: { onToggle: () => void }) {
  return (
    <Flex
      flexDir="column"
      py="10px"
      px="10px"
      justifyContent="space-between"
      w={{ base: "50px", xl: "55px" }}
      h={{ base: "43px", xl: "45px" }}
      borderRadius="0.25rem"
      transition="background .3s"
      _hover={{ bg: "secondary.400" }}
      onClick={onToggle}
      cursor="pointer"
    >
      <Box w="100%" borderRadius="0.25rem" h="2px" bg="primary.500" />
      <Box w="100%" borderRadius="0.25rem" h="2px" bg="primary.500" />
      <Box w="100%" borderRadius="0.25rem" h="2px" bg="primary.500" />
    </Flex>
  );
}
