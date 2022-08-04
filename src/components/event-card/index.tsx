import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export function EventCard({
  image,
  title,
  description,
  link,
  created_by,
  date,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
  created_by?: string;
  date: string;
}) {
  const active = new Date(date).getTime() - new Date().getTime() > 0;
  return (
    <NextLink passHref href={link}>
      <Box
        w="100%"
        as={Link}
        _hover={{ textDecor: "none", opacity: "0.8" }}
        transition="0.3s"
        opacity={active ? "1" : "0.5"}
      >
        <Image
          mb="15px"
          src={image}
          w="100%"
          borderRadius="0.25rem"
          css={{ aspectRatio: "1.777" }}
          alt="imagem do evento"
        />
        <Text mb="10px" fontSize="20">
          {title}
        </Text>
        <Text fontStyle="italic" fontWeight="light" noOfLines={3}>
          {description}
        </Text>
      </Box>
    </NextLink>
  );
}
