import { Flex, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Event } from "../../../../pages/api/get-events";

export function SearchEvents({
  setEvents,
  events,
}: {
  setEvents: Dispatch<SetStateAction<Event[]>>;
  events: Event[];
}) {
  const [searchEvents, setSearchEvents] = useState("");

  useEffect(() => {
    const filteredEvents = events.filter((current) =>
      current.title.toLowerCase().includes(searchEvents.toLowerCase())
    );
    setEvents(filteredEvents);
  }, [searchEvents]);

  return (
    <Flex alignItems="center" maxW="350px" mb="40px">
      <Text mr="15px" whiteSpace="nowrap">
        Buscar Eventos:{" "}
      </Text>
      <Input
        value={searchEvents}
        size="sm"
        bg="transparent"
        borderColor="primary.500"
        _focus={{ outline: "none", boxShadow: "none", borderColor: "#fff" }}
        onChange={(e) => setSearchEvents(e.target.value)}
      />
    </Flex>
  );
}
