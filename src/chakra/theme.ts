import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "#96CF24",
        background: "#1a1a1a",
      },
    },
  },
  fonts: {
    body: "Inter",
  },
  colors: {
    primary: {
      100: "#f5fbe9",
      200: "#e2f4be",
      300: "#ceec92",
      400: "#bbe567",
      500: "#96CF24",
      600: "#6e981a",
      700: "#4f6d13",
      800: "#2f410b",
    },
    secondary: {
      100: "#737373",
      200: "#595959",
      300: "#404040",
      400: "#262626",
      500: "#1a1a1a",
      600: "#0d0d0d",
      700: "#000000",
    },
  },

  components: {
    Container: {
      baseStyle: {
        maxW: { base: "100%", xl: "1536px" },
        px: { base: "25px", lg: "64px" },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "5",
      },
      variants: {
        custom: {
          p: "9px 20px",
          h: "auto",
          bg: "linear-gradient(to right, #006838, #96CF24)",
          color: "#fff",
          fontWeight: "300",
          transition: "0.3s",
          border: "1px solid var(--chakra-colors-primary-500)",
          _hover: {
            bg: "transparent",
            border: "1px solid var(--chakra-colors-primary-500)",
          },
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
          border: "1px solid #96CF24",
          bg: "#1a1a1a",
        },
      },
    },
  },
});

export default theme;
