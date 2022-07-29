import { Box, Container, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { EventCard } from "components/event-card";
import { Event } from "../../../../pages/api/get-events";

export function GridEvents({ events = [] }: { events?: Event[] }) {
  return (
    <Container>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}>
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
          />
        ))}
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
  const response = await axios.get("/api/get-events");
  const events = response.data;
  return {
    props: { events }, // will be passed to the page component as props
  };
}
