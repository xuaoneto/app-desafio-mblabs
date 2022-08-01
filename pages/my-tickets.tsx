import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import { api } from "api";
import { MyTicketCard } from "components/my-tickets-page/ticket-card";
import { Navbar } from "components/navbar";
import { useApplicationContext } from "contexts/application-context";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Event } from "./api/get-events";

const MyTickets: NextPage = () => {
  const { userLogged, isLogged } = useApplicationContext();
  const [buyedTickets, setBuyedTickets] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLogged !== undefined) {
      if (userLogged) {
        setIsLoading(true);
        api
          .post("api/get-tickets-by-ids", userLogged.tickets)
          .then((response) => {
            setBuyedTickets(response.data);
            setIsLoading(false);
          })
          .catch((response) => {
            console.log(response.data ?? "Falha ao pegar tickets");
            setIsLoading(false);
          });
      } else {
        Router.push("/");
      }
    }
  }, [isLogged]);

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
