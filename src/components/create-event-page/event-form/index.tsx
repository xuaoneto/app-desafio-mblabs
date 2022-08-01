import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputProps,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { api } from "api";
import { FieldError } from "components/field-error";
import { FieldInput } from "components/field-input.tsx";
import { Logo } from "components/vectors/logo";
import { UploadImageIcon } from "components/vectors/upload-image-icon";
import { AnimatePresence, motion } from "framer-motion";
import Router from "next/router";
import { DragEvent, useEffect, useRef, useState } from "react";
import { generateToken } from "services/generatetoken";
import { Event } from "../../../../pages/api/get-events";
import { DraggableImageField } from "./draggable-file-field";
import { handleValidateFile } from "./validate-file";

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [isTitleError, setIsTitleError] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [isTicketsError, setIsTicketsError] = useState(false);
  const [date, setDate] = useState("");
  const [isDateError, setIsDateError] = useState(false);
  const [description, setDescription] = useState("");
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [image, setImage] = useState("");
  const [isImageError, setIsImageError] = useState(false);
  const [id, setId] = useState(generateToken());
  const [price, setPrice] = useState("0,00");
  const [isPriceError, setIsPriceError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnknownError, setIsUnknownError] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setIsTitleError(false);
  }, [title]);

  useEffect(() => {
    setIsTicketsError(false);
  }, [tickets]);

  useEffect(() => {
    setIsDateError(false);
    console.log(date);
  }, [date]);

  useEffect(() => {
    setIsDescriptionError(false);
  }, [description]);

  useEffect(() => {
    setIsImageError(false);
  }, [image]);

  useEffect(() => {
    setIsPriceError(false);
  }, [price]);

  useEffect(() => {
    setIsUnknownError(false);
  }, [title, tickets, description, image, price]);

  const handleFile = (file: File) => {
    if (!file) return setImage("");
    if (handleValidateFile(file, toast)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const result = reader.result as string;
        setImage(result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  const handleSubmit = () => {
    const newEvent: Event = {
      date,
      description,
      id,
      image,
      price: parseFloat(
        price.replace("R$ ", "").replace(".", "").replace(",", ".")
      ),
      tickets,
      title,
    };

    if (!date) return setIsDateError(true);
    else setIsDateError(false);
    if (!description) return setIsDescriptionError(true);
    else setIsDescriptionError(false);
    if (!image) return setIsImageError(true);
    else setIsImageError(false);
    if (!price) return setIsPriceError(true);
    else setIsPriceError(false);
    if (!tickets) return setIsTicketsError(true);
    else setIsTicketsError(false);
    if (!title) return setIsTicketsError(true);
    else setIsTicketsError(false);

    setIsLoading(true);

    api
      .post("api/create-event", newEvent)
      .then((response) => {
        setIsLoading(false);
        Router.push("/");
      })
      .catch((response) => {
        setIsLoading(false);
        setIsUnknownError(true);
      });
  };

  function currencyMask(value: string): string {
    value = value
      .replace(".", "")
      .replace(",", "")
      .replace(/\D/g, "")
      .replace("R$ ", "");
    const options = { minimumFractionDigits: 2 }; //decimal places
    const result = new Intl.NumberFormat("pt-BR", options).format(
      parseFloat(value) / 100 // factor
    );
    return `R$ ${result}`;
  }
  return (
    <Flex as="form" w="100%" maxW="400px" flexDir="column" alignItems="start">
      <Box mb="50px" mx="auto">
        <Logo />
      </Box>

      <FieldInput
        fieldName="Título:"
        isError={isTitleError}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        errorMessage="Título é um campo obrigatório."
      />

      <FieldInput
        fieldName="Preço:"
        isError={isPriceError}
        onChange={(e) => setPrice(currencyMask(e.target.value))}
        value={price}
        errorMessage="Preço é um campo obrigatório."
      />

      <FieldInput
        fieldName="Número de ingressos:"
        onChange={(e) => setTickets(parseFloat(e.target.value))}
        value={tickets}
        type="number"
        isError={isTicketsError}
        errorMessage="Número de ingressos é um campo obrigatório."
      />

      <FieldInput
        fieldName="Descrição:"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        as={Textarea}
        isError={isDescriptionError}
        errorMessage="Descrição é um campo obrigatório."
      />

      <FieldInput
        fieldName="Data do evento:"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        type="datetime-local"
        isError={isDateError}
        errorMessage="Descrição é um campo obrigatório."
      />

      <DraggableImageField
        handleFile={handleFile}
        image={image}
        setImage={setImage}
        isError={isImageError}
      />
      <FieldError isError={isUnknownError}>Algo deu errado.</FieldError>
      <Button
        mt="25px"
        variant="custom"
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        Submeter Evento
      </Button>
    </Flex>
  );
}
