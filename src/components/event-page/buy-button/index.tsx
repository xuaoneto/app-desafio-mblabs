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
import { PostgrestError } from "@supabase/supabase-js";
import { toastDefaultStyle } from "components/home-page/apresentation";
import { DolarIcon } from "components/vectors/dolar-icon";
import { useApplicationContext } from "contexts/application-context";
import { useState } from "react";
import { supabaseClient } from "services/db/supabase";
import { Event } from "types";

export function BuyButton({
  event,
  numberOfTickets,
}: {
  event: Event;
  numberOfTickets: number;
}) {
  const { isLogged, setUpdateUserState, userLogged } = useApplicationContext();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleBuy = async () => {
    setIsLoading(true);

    const { data: events, error } = (await supabaseClient
      .from("eventos")
      .select()
      .eq("id", event.id)) as {
      data: Event[] | null;
      error: PostgrestError | null;
    };

    if (events) {
      if (events[0].tickets <= 0) {
        setIsLoading(false);
        return toast({
          title: "Tickets Esgotados.",
          ...toastDefaultStyle,
        });
      }
    }

    const { data: buyData, error: errorBuy } = await supabaseClient
      .from("tickets_sold")
      .insert({ event_id: event.id, user_id: userLogged?.id });

    if (errorBuy) {
      toast({
        title: errorBuy.message || "Houve um problema ao efetuar a compra.",
        ...toastDefaultStyle,
      });
    } else {
      toast({ title: "Ingresso comprado com sucesso!", ...toastDefaultStyle });
    }
    setIsLoading(false);

    // const token = window.localStorage.getItem("userToken");
    // const { id } = event;
    // const submitData = { token, id };
    // setIsLoading(true);

    // api
    //   .post("api/buy-ticket", submitData)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       toast({ title: response.data, ...toastDefaultStyle });
    //       setUpdateUserState((state) => state + 1);
    //       onClose();
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((response) => {
    //     toast({ title: response.data, ...toastDefaultStyle });
    //     setIsLoading(false);
    //   });
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
        <ModalContent bg="secondary.500" borderRadius="0.25rem">
          <ModalHeader>{event.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Preço: R${event.price}</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="custom-outline" onClick={onClose}>
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
