import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "chakra/theme";
import ApplicationContextProvider from "contexts/application-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApplicationContextProvider>
        <Component {...pageProps} />
      </ApplicationContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
