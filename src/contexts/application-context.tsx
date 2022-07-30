import { useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Account } from "../../pages/api/create-account";

interface ApplicationContextProps {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  userLogged: Account | undefined;
  setUserLogged: Dispatch<SetStateAction<Account | undefined>>;
  isMobile: boolean | undefined;
  setUpdateUserState: Dispatch<SetStateAction<number>>;
}

const DEFAULT = {
  isLogged: false,
  setIsLogged: () => undefined,
  userLogged: undefined,
  setUserLogged: () => undefined,
  isMobile: undefined,
  setUpdateUserState: () => undefined,
};

const Context = createContext<ApplicationContextProps>(DEFAULT);

const Provider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState<Account | undefined>();
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
  const [updateUserState, setUpdateUserState] = useState(0);
  const [isMobileMediaQuery] = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setIsMobile(isMobileMediaQuery);
  }, [isMobileMediaQuery]);

  useEffect(() => {
    async function validateLogin() {
      const userToken = window.localStorage.getItem("userToken");
      if (!userToken) return;
      else {
        axios
          .post("/api/get-login-by-token", { token: userToken })
          .then((response) => {
            if (response.status === 200) {
              setIsLogged(true);
              setUserLogged(response.data);
              console.log(response.data);
            }
          })
          .catch((response) => console.log("validate login error"));
      }
    }
    validateLogin();
  }, [isLogged, updateUserState]);

  return (
    <Context.Provider
      value={{
        isLogged,
        setIsLogged,
        userLogged,
        setUserLogged,
        isMobile,
        setUpdateUserState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
export const useApplicationContext = () => {
  const context = useContext<ApplicationContextProps>(Context);
  if (context === undefined)
    throw new Error(
      "useApplicationContext must be used within a ApplicationContextProvider"
    );
  return context;
};
