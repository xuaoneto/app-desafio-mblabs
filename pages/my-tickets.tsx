import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import { MyTicketCard } from "components/my-tickets-page/ticket-card";
import { Navbar } from "components/navbar";
import { LoadingIcon } from "components/vectors/loading-icon";
import { useApplicationContext } from "contexts/application-context";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Router from "next/router";
import { useEffect, useState } from "react";
import { supabaseClient } from "services/db/supabase";
import { Event, TicketsSold } from "types";

const MyTickets: NextPage = () => {
  const { userLogged, isLogged } = useApplicationContext();
  const [buyedTickets, setBuyedTickets] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBuyedTickets() {
      const { data: ticketsSold } = (await supabaseClient
        .from("tickets_sold")
        .select()
        .eq("user_id", userLogged!.id)) as { data: TicketsSold[] };
      if (ticketsSold) {
        const filterArray = [...ticketsSold.map(({ event_id }) => event_id)];
        console.log(filterArray);

        const { data: events } = (await supabaseClient
          .from("events")
          .select()
          .in("id", filterArray)) as { data: Event[] };
        setBuyedTickets(events);
      } else return;
    }
    if (isLogged !== undefined) {
      if (userLogged) {
        getBuyedTickets().then(() => setIsLoading(false));
      } else {
        Router.push("/");
      }
    }
  }, [isLogged]);

  return (
    <>
      <NextSeo title="Meus Ingressos" />
      <Navbar />

      {isLoading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          w="100%"
          h={`calc(100vh - var(--chakra-sizes-navbar-height))`}
        >
          <LoadingIcon />
        </Flex>
      ) : (
        <Container py={{ base: "50px", xl: "100px" }}>
          <Flex flexDir="column" w="100%" gap="30px">
            <Text fontSize="30">Ingressos comprados.</Text>
            <Grid
              gap="30px"
              templateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                xl: "1fr 1fr 1fr",
              }}
            >
              {buyedTickets.map((event, index) => (
                <MyTicketCard
                  key={`buyed-event-${index}`}
                  title={event.title}
                  price={event.price}
                  image={event.image}
                  link={`events/${event.id}`}
                />
              ))}
            </Grid>
            {buyedTickets.length === 0 ? (
              <Text>Não há Ingressos comprados.</Text>
            ) : null}
          </Flex>{" "}
        </Container>
      )}
    </>
  );
};

export default MyTickets;
