import { Container, Flex, Grid } from "@chakra-ui/react";
import { EventCard } from "components/event-card";
import { LoadingIcon } from "components/vectors/loading-icon";
import { useState } from "react";
import { Event } from "types";
import { SearchEvents } from "../search-events";

export function GridEvents({ events = [] }: { events?: Event[] }) {
  const [visibleEvents, setVisibleEvents] = useState(events);

  return (
    <>
      {events.length ? (
        <Container py={{ base: "50px", lg: "100px" }}>
          <SearchEvents setEvents={setVisibleEvents} events={events} />
          <Grid
            gap="40px"
            templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
          >
            {visibleEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                image={event.image}
                description={event.description}
                created_by={event.created_by}
                link={`events/${event.id}`}
                date={event.date}
              />
            ))}
          </Grid>
        </Container>
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          w="100%"
          h={`calc(100vh - var(--chakra-sizes-navbar-height))`}
        >
          <LoadingIcon />
        </Flex>
      )}
    </>
  );
}
