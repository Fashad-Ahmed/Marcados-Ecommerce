import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import RoutesProvider from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay-nextgen";
import { useSelector } from "react-redux";

const colors = {
  brand: {
    900: "#00411a",
    800: "rgb(25, 130, 109)",
  },
};

const theme = extendTheme({ colors });

const App = () => {
  const overlayActive = useSelector((state) => state?.cart?.paymentByPaypal);

  return (
    <ChakraProvider theme={theme}>
      <LoadingOverlay active={overlayActive} spinner>
        <ToastContainer />
        <RoutesProvider />
      </LoadingOverlay>
    </ChakraProvider>
  );
};

export default App;
