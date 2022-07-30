import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export function EventCard({
  image,
  title,
  description,
  link,
}: {
  image: string;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link passHref href={link}>
      <Box w="100%" as="a">
        <Image
          mb="15px"
          src={image}
          w="100%"
          borderRadius="10"
          alt="event image"
        />
        <Text mb="10px" fontSize="20">
          {title}
        </Text>
        <Text fontStyle="italic" fontWeight="light" noOfLines={3}>
          {" "}
          {description}
        </Text>
      </Box>
    </Link>
  );
}
