import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
// import App from "./App";
import Change from "./Change";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Change />
      {/* <App /> */}
    </ChakraProvider>
  </React.StrictMode>
);
