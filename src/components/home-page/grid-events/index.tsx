import { Container, Grid } from "@chakra-ui/react";
import { EventCard } from "components/event-card";
import { useState } from "react";
import { Event } from "../../../../pages/api/get-events";
import { SearchEvents } from "../search-events";

export function GridEvents({ events = [] }: { events?: Event[] }) {
  const [visibleEvents, setVisibleEvents] = useState(events);

  return (
    <Container py="100px">
      <SearchEvents setEvents={setVisibleEvents} events={events} />
      <Grid
        gap="40px"
        templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
      >
        {visibleEvents.map((event, index) => (
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
