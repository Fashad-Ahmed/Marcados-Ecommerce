import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  Switch,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEnvelope, FaEye, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase";
import { userLogin } from "../redux/slice/authSlice";
import OrderListing from "../components/OrderListing";

const Orders = () => {
  const [type, setType] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = [
    { id: 1, totalPrice: 100, currency: "USD", date: "2023-06-16" },
    { id: 2, totalPrice: 75, currency: "EUR", date: "2023-06-15" },
    { id: 1, totalPrice: 100, currency: "USD", date: "2023-06-16" },
    { id: 2, totalPrice: 75, currency: "EUR", date: "2023-06-15" },
  ];
  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          {!orders ? (
            <Text textAlign="center" fontWeight="600" py="3">
              No orders to show.
            </Text>
          ) : (
            <OrderListing orders={orders} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Orders;
