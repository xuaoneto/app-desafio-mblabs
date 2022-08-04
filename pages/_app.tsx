import { ChakraProvider } from "@chakra-ui/react";
import theme from "chakra/theme";
import { ToastEvents } from "components/home-page/apresentation";
import ApplicationContextProvider from "contexts/application-context";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo titleTemplate={`%s | BR Eventos`} defaultTitle="BR Eventos" />
      <ChakraProvider theme={theme}>
        <ApplicationContextProvider>
          <Component {...pageProps} />
          <ToastEvents />
        </ApplicationContextProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
