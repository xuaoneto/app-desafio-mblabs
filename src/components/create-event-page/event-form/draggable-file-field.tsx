import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FieldError } from "components/field-error";
import { UploadImageIcon } from "components/vectors/upload-image-icon";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, DragEvent, SetStateAction, useRef, useState } from "react";

const ALLOWED_FILE_TYPES = ` image/jpeg, image/jpg, image/png, image/svg, image/webp, image/svg+xml`;

export function DraggableImageField({
  setImage,
  image,
  handleFile,
  isError,
}: {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  handleFile: (file: File) => void;
  isError: boolean;
}) {
  const [dragHover, setDragHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragHover(true);
  };

  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragHover(true);
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragHover(false);
  };

  return (
    <>
      <Text mb="10px" mt="10px">
        Banner do evento:
      </Text>
      <Flex
        onClick={() => fileInputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files;
          if (file.length) handleFile(file[0]);
        }}
        borderRadius="0.125rem"
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDragEnter={dragEnter}
        onMouseLeave={() => setDragHover(false)}
        pointerEvents={isSending ? "none" : undefined}
        cursor="pointer"
        p="20px"
        border="1px solid var(--chakra-colors-primary-500)"
        flexDir="column"
        _hover={{ border: "1px solid #fff" }}
        transition="0.3s"
      >
        <AnimatePresence>
          {image ? (
            <>
              <IconButton
                ml="auto"
                icon={<DeleteIcon />}
                bg="transparent"
                border="1px solid #fff"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage("");
                }}
                aria-label=""
                _hover={{ bg: "rgba(255,255,255,0.1)" }}
                mb="10px"
              />
              <motion.img
                style={{ width: "100%", opacity: 0 }}
                animate={{ opacity: 1 }}
                src={image}
              />
            </>
          ) : (
            <motion.div exit={{ opacity: 0 }}>
              <Flex
                flexDir="column"
                alignItems="center"
                opacity={image ? 0 : 1}
                transition="0.3s"
                textAlign="center"
              >
                <Text userSelect="none">
                  Arraste uma imagem pra cá ou <b>clique para inserir</b>
                </Text>
                <Box
                  transition="0.3s"
                  transform={dragHover ? "skew(-20deg, 25deg)" : "none"}
                  mt="15px!important"
                >
                  <UploadImageIcon />
                </Box>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
      </Flex>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files;
          if (file?.length) handleFile(file[0]);
        }}
        value={""}
        accept={ALLOWED_FILE_TYPES}
      />
      <FieldError isError={isError}>
        Banner do evento é um campo obrigatório.
      </FieldError>
    </>
  );
}
