import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import RoutesProvider from "./routes";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const colors = {
  brand: {
    900: "#00411a",
    800: "rgb(25, 130, 109)",
  },
};

const theme = extendTheme({ colors });

const App = () => {
  const dispatch = useDispatch();

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <RoutesProvider />
    </ChakraProvider>
  );
};

export default App;
