import { extendTheme } from "@chakra-ui/react";

export const thema = extendTheme({
  fonts: {
    heading: "rubik",
    body: "Nunito",
  },
  colors: {
    primary: "#101010",
    secondary: "#ffff",
    error: "#d90429",
  },
  components: {
    Heading: {
      variants: {
        primary: { fontSize: "32px", fontWeight: "500", color: "#000000" },
        secondary: { fontSize: "32px", fontWeight: "500", color: "#000000" },
        dashboard: { fontSize: "24px", fontWeight: "500", color: "#000000" },
      },
    },
    Text: {
      variants: {
        primary: { fontSize: "15px", fontWeight: "600px", color: "#000000" },
        bold: { fontSize: "15px", fontWeight: "700px", color: "#000000" },
        secondary: { fontSize: "15px", fontWeight: "600px", color: "#FFFFFF" },
        price: { fontSize: "15px", fontWeight: "600px", color: "#000000" },
      },
    },
    Button: {
      variants: {
        primary: {
          background: "#2B2D42",
          color: "white",
          margin: "10px",
          width: "300px",
          height: "43px",
          _hover: {
            background: "#E39774",
            color: "#000",
          },
        },
        dashboard: {
          background: "#FFF5F5",
          color: "white",
          margin: "10px",
          width: "122px",
          height: "75px",
          _hover: {
            background: "#E39774",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {},
    },
  },
});
