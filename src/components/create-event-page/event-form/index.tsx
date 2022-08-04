import { Box, Button, Flex, Textarea, useToast } from "@chakra-ui/react";
import { FieldError } from "components/field-error";
import { FieldInput } from "components/field-input.tsx";
import { UploadCloudIcon } from "components/upload-cloud-icon";
import { Logo } from "components/vectors/logo";
import { useApplicationContext } from "contexts/application-context";
import Router from "next/router";
import { useEffect, useState } from "react";
import { supabaseClient } from "services/db/supabase";
import * as yup from "yup";
import { currencyMask, numberMask } from "../input-masks";
import { DraggableImageField } from "./draggable-file-field";
import { handleValidateFile, toBase64File } from "./validate-file";

interface NewEvent {
  date: string;
  description: string;
  price: number;
  tickets: number;
  title: string;
  created_by: string | undefined;
  image?: string;
}

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [isTitleError, setIsTitleError] = useState("");
  const [tickets, setTickets] = useState("0");
  const [isTicketsError, setIsTicketsError] = useState("");
  const [date, setDate] = useState("");
  const [isDateError, setIsDateError] = useState("");
  const [description, setDescription] = useState("");
  const [isDescriptionError, setIsDescriptionError] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [base64Image, setBase64Image] = useState<string>("");
  const [isImageError, setIsImageError] = useState("");
  const [price, setPrice] = useState("R$ 0,00");
  const [isPriceError, setIsPriceError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendError, setIsSendError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { userLogged } = useApplicationContext();

  const toast = useToast();

  useEffect(() => {
    setIsTitleError("");
  }, [title]);

  useEffect(() => {
    setIsTicketsError("");
  }, [tickets]);

  useEffect(() => {
    setIsDateError("");
  }, [date]);

  useEffect(() => {
    setIsDescriptionError("");
  }, [description]);

  useEffect(() => {
    setIsImageError("");
  }, [base64Image]);

  useEffect(() => {
    setIsPriceError("");
  }, [price]);

  useEffect(() => {
    setIsSendError("");
  }, [title, tickets, description, base64Image, price]);

  const handleFile = async (file: File) => {
    if (!file) return setBase64Image("");
    if (handleValidateFile(file, toast)) {
      setBase64Image((await toBase64File(file))!);
      setImageFile(file);
    }
  };

  const handleSubmit = () => {
    const schema = yup.object().shape({
      date: yup.date().required("Data é um campo obrigatório"),
      description: yup.string().required("Descrição é um campo obrigatório"),
      price: yup.number().required("Preço é um campo obrigatório"),
      tickets: yup.number().required("Ingressos é um campo obrigatório"),
      title: yup.string().required("Título é um campo obrigatório"),
    });

    let newEvent: NewEvent = {
      date,
      description,
      price: parseFloat(
        price.replace("R$ ", "").replace(".", "").replace(",", ".")
      ),
      tickets: parseInt(tickets),
      title,
      created_by: userLogged?.id,
    };

    schema
      .validate(newEvent)
      .then(async () => {
        setIsLoading(true);
        setIsUploading(true);
        const path = `public/${new Date().getTime()}-${imageFile!.name.trim()}`;
        const { data, error: senderror } = await supabaseClient.storage
          .from("event-images")
          .upload(path, imageFile!, {
            cacheControl: "3600",
            upsert: false,
          });
        setIsUploading(false);
        // Check 1
        if (senderror) {
          setIsSendError(senderror.message);
          setIsLoading(false);
          return;
        }

        const { publicURL, error: urlError } = supabaseClient.storage
          .from("event-images")
          .getPublicUrl(path);
        // Check 2
        if (urlError) {
          setIsSendError(urlError.message);
          setIsLoading(false);
          return;
        }
        newEvent.image = publicURL!;

        const { error: insertError } = await supabaseClient
          .from("events")
          .insert([newEvent]);
        // Check 3
        if (insertError) {
          setIsSendError(insertError.message);
          setIsLoading(false);
          return;
        }

        Router.push("/");
      })
      .catch((err: yup.ValidationError) => {
        const fields = [
          { isErrorRegex: /Data/, errorState: setIsDateError },
          { isErrorRegex: /Descrição/, errorState: setIsDescriptionError },
          { isErrorRegex: /Preço/, errorState: setIsPriceError },
          { isErrorRegex: /Ingressos/, errorState: setIsTicketsError },
          { isErrorRegex: /Título/, errorState: setIsTitleError },
        ];
        if (!err.errors) {
          setIsImageError("Insira uma imagem.");
          setIsLoading(false);
          setIsUploading(false);
          return;
        }
        fields.map((field) => {
          err.errors.map((error) => {
            if (field.isErrorRegex.test(error)) field.errorState(error);
          });
        });
        setIsLoading(false);
        setIsUploading(false);
      });
  };

  return (
    <Flex
      as="form"
      w="100%"
      maxW="max-width-forms"
      flexDir="column"
      alignItems="start"
    >
      <Box mb="60px" w="80%" mx="auto">
        <Logo width="100%" height="auto" />
      </Box>

      <FieldInput
        fieldName="Título:"
        placeholder="Título"
        error={isTitleError}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <FieldInput
        fieldName="Preço:"
        placeholder="Preço"
        error={isPriceError}
        onChange={(e) => setPrice(currencyMask(e.target.value))}
        value={price}
      />

      <FieldInput
        fieldName="Número de ingressos:"
        onChange={(e) => setTickets(numberMask(e.target.value))}
        value={tickets}
        type="number"
        error={isTicketsError}
      />

      <FieldInput
        fieldName="Descrição:"
        placeholder="Descrição"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        as={Textarea}
        error={isDescriptionError}
      />

      <FieldInput
        fieldName="Data do evento:"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        type="datetime-local"
        error={isDateError}
      />

      <DraggableImageField
        handleFile={handleFile}
        image={base64Image}
        setImage={setBase64Image}
        error={isImageError}
        isUploading={isUploading}
      />

      <FieldError isError={isSendError !== ""}>
        {isSendError || "Algo deu errado."}
      </FieldError>
      <Flex justifyContent="flex-end" w="100%">
        <Button
          mt="25px"
          variant="custom"
          isLoading={isLoading}
          onClick={handleSubmit}
          w="100%"
          lineHeight="24px"
          leftIcon={<UploadCloudIcon />}
          loadingText="Publicando Evento"
        >
          Publicar Evento
        </Button>
      </Flex>
    </Flex>
  );
}
