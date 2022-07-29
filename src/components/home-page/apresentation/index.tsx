import { Container, Text } from "@chakra-ui/react";
import { useApplicationContext } from "contexts/application-context";
import { useEffect, useState } from "react";

export function Apresentation() {
  const [name, setName] = useState("");
  const { userLogged } = useApplicationContext();

  useEffect(() => {
    if (userLogged) {
      setName(userLogged.name);
    }
  }, [userLogged]);
  return (
    <>
      {userLogged ? (
        <Container mt={{ base: "80px" }} mb="30px">
          <Text fontSize={{ base: "30" }}>Olá, {name}</Text>
        </Container>
      ) : null}
    </>
  );
}
