import { useColorMode, useMediaQuery } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import { api } from "api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabaseClient } from "services/db/supabase";
import { Account } from "../../pages/api/create-account";

interface ApplicationContextProps {
  isLogged: boolean | undefined;
  setIsLogged: Dispatch<SetStateAction<boolean | undefined>>;
  userLogged: User | null;
  setUserLogged: Dispatch<SetStateAction<User | null>>;
  isMobile: boolean | undefined;
  setUpdateUserState: Dispatch<SetStateAction<number>>;
}

const DEFAULT = {
  isLogged: undefined,
  setIsLogged: () => undefined,
  userLogged: null,
  setUserLogged: () => undefined,
  isMobile: undefined,
  setUpdateUserState: () => undefined,
};

const Context = createContext<ApplicationContextProps>(DEFAULT);

const Provider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean | undefined>();
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
  const [updateUserState, setUpdateUserState] = useState(0);
  const [isMobileMediaQuery] = useMediaQuery("(max-width: 767px)");
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");
  }, []);

  useEffect(() => {
    setIsMobile(isMobileMediaQuery);
  }, [isMobileMediaQuery]);

  useEffect(() => {
    const user = supabaseClient.auth.user();

    if (!user) {
      console.log("Unlogged user");
      return setIsLogged(false);
    } else {
      console.log("User Logged");
      setIsLogged(true);
      setUserLogged(user);
    }
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
