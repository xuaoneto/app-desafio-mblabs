import { Box, Image, Text } from "@chakra-ui/react";

export function EventCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <Box w="100%">
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
      <Text></Text>
    </Box>
  );
}
