import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import RoutesProvider from "./routes";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getDiscountBanner, getHomeBanner } from "./redux/slice/generalSlice";

const colors = {
  brand: {
    900: "#00411a",
    800: "rgb(25, 130, 109)",
  },
};

const theme = extendTheme({ colors });

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeBanner());
    dispatch(getDiscountBanner());
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <RoutesProvider />
    </ChakraProvider>
  );
};

export default App;
