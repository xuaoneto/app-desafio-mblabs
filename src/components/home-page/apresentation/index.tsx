import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useApplicationContext } from "contexts/application-context";
import { useEffect, useState } from "react";

export function ToastEvents() {
  const [name, setName] = useState("");
  const { userLogged } = useApplicationContext();
  const toast = useToast();
  useEffect(() => {
    if (userLogged) {
      setName(userLogged.name);
    }
  }, [userLogged]);

  useEffect(() => {
    if (name) {
      toast({
        title: ` Olá, ${name}`,
        isClosable: true,
        position: "top-right",
        ...toastDefaultStyle,
      });
    }
  }, [name]);

  return <></>;
}

export const toastDefaultStyle: UseToastOptions = {
  position: "top-right",
  variant: "none",
  containerStyle: {
    background: "var(--chakra-colors-secondary-400)",
    color: "#ffffff",
    borderRadius: "6",
  },
};
