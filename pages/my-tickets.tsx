import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import { api } from "api";
import { MyTicketCard } from "components/my-tickets-page/ticket-card";
import { Navbar } from "components/navbar";
import { useApplicationContext } from "contexts/application-context";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Event } from "./api/get-events";

const MyTickets: NextPage = () => {
  const { userLogged } = useApplicationContext();
  const [buyedTickets, setBuyedTickets] = useState<Event[]>([]);

  useEffect(() => {
    if (userLogged) {
      api
        .post("api/get-tickets-by-ids", userLogged.tickets)
        .then((response) => {
          setBuyedTickets(response.data);
        })
        .catch((response) => {
          console.log(response.data ?? "Falha ao pegar tickets");
        });
    } else {
      // Router.push("/");
    }
  }, [userLogged]);

  return (
    <>
      <Navbar />
      <Container py={{ base: "50px", xl: "100px" }}>
        <Flex flexDir="column" w="100%" gap="30px">
          <Text fontSize="30">Ingressos comprados.</Text>
          <Grid
            gap="30px"
            templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
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
            <Text>Não há Tickets comprados.</Text>
          ) : null}
        </Flex>
      </Container>
    </>
  );
};

export default MyTickets;
