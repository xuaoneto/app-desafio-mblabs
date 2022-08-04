import { Container, Image, Text } from "@chakra-ui/react";
import { BuyButton } from "components/event-page/buy-button";
import { Navbar } from "components/navbar";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { supabaseClient } from "services/db/supabase";
import { Event } from "types";

const EventPage: NextPage<{ event: Event }> = ({ event }) => {
  return (
    <>
      <NextSeo title={event.title} />
      <Navbar />
      <Container
        display="flex"
        flexDir="column"
        alignItems={{ base: "start", lg: "center" }}
        py={{ base: "50px", lg: "100px" }}
      >
        <Text
          fontSize={{ base: "25", lg: "40" }}
          textAlign={{ base: "center", lg: "start" }}
          mb="50px"
        >
          {event.title}
        </Text>
        <Image
          w="100%"
          mb="50px"
          alt="imagem do evento"
          src={event.image}
          borderRadius="0.5rem"
          boxShadow="rgb(0, 0, 0, 0.2) 10px 10px 14px 1px"
        />

        <Text>{event.description}</Text>
      </Container>
      <BuyButton event={event} numberOfTickets={event.tickets} />
    </>
  );
};

export default EventPage;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  let { data: events } = (await supabaseClient
    .from("events")
    .select()
    .eq("id", params.slug)) as { data: Event[] };

  return {
    props: {
      event: events[0],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { data: getAllEvents } = (await supabaseClient
    .from("events")
    .select()) as { data: Event[] };
  let paths: { params: { slug: string } }[] = [];
  getAllEvents.map((event: Event) => {
    paths.push({ params: { slug: `${event.id}` } });
  });

  return {
    paths,
    fallback: "blocking",
  };
}
