import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "chakra/theme";
import ApplicationContextProvider from "contexts/application-context";
import { ToastEvents } from "components/home-page/apresentation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApplicationContextProvider>
        <Component {...pageProps} />
        <ToastEvents />
      </ApplicationContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
