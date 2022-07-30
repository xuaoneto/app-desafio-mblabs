import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { api } from "api";
import { toastDefaultStyle } from "components/home-page/apresentation";
import { DolarIcon } from "components/vectors/dolar-icon";
import { useApplicationContext } from "contexts/application-context";
import { useState } from "react";
import { Event } from "../../../../pages/api/get-events";

export function BuyButton({
  event,
  numberOfTickets,
}: {
  event: Event;
  numberOfTickets: number;
}) {
  const { isLogged, userLogged, setUpdateUserState } = useApplicationContext();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleBuy = () => {
    const { token } = userLogged!;
    const { id } = event;
    const submitData = { token, id };
    setIsLoading(true);

    api
      .post("api/buy-ticket", submitData)
      .then((response) => {
        if (response.status === 200) {
          toast({ title: response.data, ...toastDefaultStyle });
          setUpdateUserState((state) => state + 1);
          onClose();
        }
        setIsLoading(false);
      })
      .catch((response) => {
        toast({ title: response.data, ...toastDefaultStyle });
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLogged && numberOfTickets > 0 ? (
        <Button
          pos="fixed"
          bottom="40px"
          right="40px"
          leftIcon={<DolarIcon />}
          variant="custom"
          fontWeight="bold"
          onClick={onOpen}
        >
          Comprar Ingresso
        </Button>
      ) : null}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent bg="secondary.500">
          <ModalHeader>{event.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Preço: R${event.price},00</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="custom"
              fontWeight="bold"
              leftIcon={<DolarIcon />}
              onClick={handleBuy}
              isLoading={isLoading}
            >
              Comprar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
