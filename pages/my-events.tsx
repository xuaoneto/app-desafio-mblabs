import {
  Button,
  Container,
  Flex,
  Grid,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { MyTicketCard } from "components/my-tickets-page/ticket-card";
import { Navbar } from "components/navbar";
import { LoadingIcon } from "components/vectors/loading-icon";
import { TrashIcon } from "components/vectors/trash-icon";
import { useApplicationContext } from "contexts/application-context";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Router from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { supabaseClient } from "services/db/supabase";
import { Event } from "types";

const MyEvents: NextPage = () => {
  const { userLogged, isLogged } = useApplicationContext();
  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTable, setUpdateTable] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [idDeleteRow, setIdDeleteRow] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteRow() {
    setIsDeleting(true);
    const { data, error } = await supabaseClient
      .from("events")
      .delete()
      .match({ id: idDeleteRow });
    setIsDeleting(false);
    setUpdateTable((state) => state + 1);
  }

  useEffect(() => {
    async function getCreatedEvents() {
      const { data } = (await supabaseClient
        .from("events")
        .select()
        .eq("created_by", userLogged!.id)) as { data: Event[] };
      setCreatedEvents(data);
    }
    if (isLogged !== undefined) {
      if (userLogged) {
        getCreatedEvents().then(() => setIsLoading(false));
      } else {
        Router.push("/");
      }
    }
  }, [isLogged, updateTable]);

  useEffect(() => {
    if (!isOpen) setIdDeleteRow(null);
  }, [isOpen]);

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
            <Text fontSize="30">
              Eventos criados{" "}
              <Text as="span" color="primary.500">
                por você.
              </Text>
            </Text>
            <TableContainer>
              <Table>
                <Tr>
                  <Th color="#EDEDED" borderColor="secondary.400">
                    Imagem
                  </Th>
                  <Th color="#EDEDED" borderColor="secondary.400">
                    Título
                  </Th>
                  <Th color="#EDEDED" borderColor="secondary.400">
                    Ingressos Restantes
                  </Th>
                  <Th color="#EDEDED" borderColor="secondary.400">
                    Data
                  </Th>
                  <Th color="#EDEDED" borderColor="secondary.400">
                    Preço
                  </Th>
                  <Th color="#EDEDED" borderColor="secondary.400">
                    Opções
                  </Th>
                </Tr>
                <Tbody>
                  {createdEvents.map(
                    ({ id, date, image, title, price, tickets }) => {
                      const active =
                        new Date(date).getTime() - new Date().getTime() > 0;

                      return (
                        <Tr
                          key={id}
                          opacity={active ? "1" : "0.5"}
                          transition="0.3s"
                          _hover={{ bg: "secondary.400" }}
                          onClick={() => Router.push(`events/${id}`)}
                        >
                          <Td color="#EDEDED" borderColor="secondary.400">
                            <Image
                              src={image}
                              w="50px"
                              alt="imagem do evento"
                            />
                          </Td>
                          <Td color="#EDEDED" borderColor="secondary.400">
                            {title}
                          </Td>
                          <Td color="#EDEDED" borderColor="secondary.400">
                            {tickets}
                          </Td>
                          <Td color="#EDEDED" borderColor="secondary.400">
                            {date.replace(/-/g, "/")}
                          </Td>
                          <Td color="#EDEDED" borderColor="secondary.400">
                            R$ {price}
                          </Td>
                          <Td color="#EDEDED" borderColor="secondary.400">
                            <IconButton
                              aria-label="Deletar"
                              icon={<TrashIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIdDeleteRow(id!);
                                onOpen();
                              }}
                            />
                          </Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            {createdEvents.length === 0 ? (
              <Text>Não há Eventos criados por você.</Text>
            ) : null}
          </Flex>{" "}
        </Container>
      )}
      <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent
          overflow="hidden"
          bg="secondary.500"
          borderRadius="0.5rem"
        >
          <ModalHeader>Tem Certeza que deseja deletar o evento?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Esta ação não poderá ser revertida.</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="custom-outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              leftIcon={<TrashIcon />}
              onClick={() => deleteRow()}
              isLoading={isDeleting}
            >
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyEvents;
