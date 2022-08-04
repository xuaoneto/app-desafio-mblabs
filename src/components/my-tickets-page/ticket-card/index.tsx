import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export function MyTicketCard({
  title,
  price,
  image,
  link,
}: {
  title: string;
  price: number;
  image: string;
  link: string;
}) {
  return (
    <Link passHref href={link}>
      <Flex as="a" flexDir="column">
        <Image
          borderRadius="0.25rem"
          mb="3"
          src={image}
          alt="imagem do evento"
        />
        <Box>
          <Text fontSize="25" mb="10px">
            {title}
          </Text>
          <Text>Preço: R${price}</Text>
        </Box>
      </Flex>
    </Link>
  );
}
