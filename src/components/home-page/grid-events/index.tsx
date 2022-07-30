import { Container, Grid } from "@chakra-ui/react";
import { EventCard } from "components/event-card";
import { Event } from "../../../../pages/api/get-events";

export function GridEvents({ events = [] }: { events?: Event[] }) {
  return (
    <Container py="100px">
      <Grid
        gap="40px"
        templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
      >
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
            link={`events/${event.id}`}
          />
        ))}
      </Grid>
    </Container>
  );
}
