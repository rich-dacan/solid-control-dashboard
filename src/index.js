import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "./Providers";
import { thema } from "./styles/GlobalStyles";
import "@fontsource/itim";
import "@fontsource/nunito";
import "@fontsource/rubik";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Providers>
      <ToastContainer />
      <BrowserRouter>
        <ChakraProvider theme={thema}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>
);
