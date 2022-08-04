import { SearchIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useApplicationContext } from "contexts/application-context";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Event } from "types";

export function SearchEvents({
  setEvents,
  events,
}: {
  setEvents: Dispatch<SetStateAction<Event[]>>;
  events: Event[];
}) {
  const [searchEvents, setSearchEvents] = useState("");
  const [myEvents, setMyEvents] = useState(false);
  const { userLogged, isLogged } = useApplicationContext();

  useEffect(() => {
    const filteredEvents = events.filter((current) => {
      if (!myEvents)
        return current.title.toLowerCase().includes(searchEvents.toLowerCase());
      else {
        return (
          current.title.toLowerCase().includes(searchEvents.toLowerCase()) &&
          current.created_by === userLogged?.id
        );
      }
    });
    setEvents(filteredEvents);
  }, [searchEvents, myEvents]);

  return (
    <Flex
      alignItems={{ base: "start", md: "center" }}
      flexDir={{ base: "column", md: "row" }}
      mb="40px"
    >
      <InputGroup
        maxW={{ base: "100%", md: "250px" }}
        mb={{ base: "15px", lg: "0" }}
      >
        <InputRightElement pointerEvents="none">
          <SearchIcon w="15px" h="15px" color="#666" />
        </InputRightElement>
        <Input
          value={searchEvents}
          onChange={(e) => setSearchEvents(e.target.value)}
          placeholder="Buscar Eventos"
          bg="transparent"
          borderColor="#343434"
          borderRadius="0.25rem"
          _focus={{
            outline: "4px solid #2e2e2e",
            boxShadow: "none",
            borderColor: "#343434",
          }}
        />
      </InputGroup>
      {isLogged ? (
        <Checkbox
          mt={{ base: "10px", md: "0" }}
          ml={{ base: "0", md: "15px" }}
          onChange={(e) => setMyEvents(e.target.checked)}
          isChecked={myEvents}
          colorScheme="green"
          borderColor="#343434"
          _focus={{
            outline: "4px solid #2e2e2e",
            boxShadow: "none",
            borderColor: "#343434",
          }}
        >
          Meus Eventos
        </Checkbox>
      ) : null}
    </Flex>
  );
}
