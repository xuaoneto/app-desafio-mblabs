import { Container, Image, Text } from "@chakra-ui/react";
import { api } from "api";
import { Navbar } from "components/navbar";

import type { NextPage } from "next";
import { Event } from "../api/get-events";

const CreateEvent: NextPage<{ event: Event }> = ({ event }) => {
  return (
    <>
      <Navbar />
      <Container display="flex" flexDir="column" alignItems="center" py="100px">
        <Image
          w="80%"
          mb="30px"
          alt="imagem do evento"
          src={event.image}
          borderRadius="10"
          boxShadow="rgb(0, 0, 0, 0.2) 10px 10px 14px 1px"
        />
        <Text fontSize="40" mb="20px">
          {event.title}
        </Text>
        <Text>{event.description}</Text>
      </Container>
    </>
  );
};

export default CreateEvent;

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await api.get(`api/get-events?id=${params.id}`);
  const event = response.data[0];

  return {
    props: {
      event,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const getAllEvents = await api.get("api/get-events");
  let paths: string[] = [];
  getAllEvents.data.map((event: Event) => {
    paths.push(`/events/${event.id}`);
  });
  return {
    paths,
    fallback: false,
  };
}
