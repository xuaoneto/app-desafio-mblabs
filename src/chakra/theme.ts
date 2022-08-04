import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const defaultScroll = {
  "&::-webkit-scrollbar": { width: "7px" },
  "&::-webkit-scrollbar-track": { width: "7px", background: "#444444" },
  "&::-webkit-scrollbar-thumb": {
    background: "#686868",
    borderRadius: "10px",
  },

  scrollbarColor: "#444444 transparent",
  scrollbarWidth: "thin",
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        color: "#EDEDED",
        background: "secondary.500",
        overflow: "overlay",
        ...defaultScroll,
      },
    },
  },
  fonts: {
    body: "Montserrat",
  },
  colors: {
    primary: {
      400: "#3fcf8e",
      500: "#34b27b",
    },
    secondary: {
      100: "#737373",
      200: "#595959",
      300: "#404040",
      400: "#2e2e2e",
      500: "#1a1a1a",
      600: "#101010",
      700: "#000000",
    },
  },
  sizes: {
    "navbar-height": "100px",
    "max-width-forms": "600px",
  },
  components: {
    Container: {
      baseStyle: {
        maxW: { base: "100%", xl: "1536px" },
        px: { base: "25px", lg: "64px" },
      },
      variants: {
        centered: {
          display: "flex",
          flexDir: "column",
          alignItems: "center",
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "0.25rem",
      },
      variants: {
        custom: {
          p: "9px 20px",
          h: "auto",
          bg: "primary.500",
          borderRadius: "0.25rem",
          color: "#fbfcfd",
          fontWeight: "300",
          transition: "0.3s",
          border: "1px solid var(--chakra-colors-primary-500)",
          _hover: {
            bg: "var(--chakra-colors-primary-400)",
            border: "1px solid var(--chakra-colors-primary-500)",
          },
        },
        "custom-outline": {
          border: "1px solid #343434",
          bg: "#2e2e2e",
          _focus: { outline: "4px solid #343434" },
          _hover: { bg: "#343434" },
        },
        danger: {
          color: "#ff6369",
          bg: "#291415",
          border: "1px solid #822025",
          _hover: { bg: "#e5484d", color: "#ffffff" },
          _focus: { outline: "4px solid #343434" },
          fontWeight: "bold",
        },
      },
    },
    a: {
      _hover: {
        texteDecoration: "none",
      },
    },
    Input: {
      variants: {
        "custom-outline": {
          border: "1px solid #343434",
          bg: "#2e2e2e",
          _focus: { outline: "4px solid #343434" },
        },
      },
    },
  },
});

export default theme;
