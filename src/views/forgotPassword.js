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
import { FaEnvelope, FaEye, FaLock, FaAnchor } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase";
import { userLogin } from "../redux/slice/authSlice";

const ForgotPassword = () => {
  const [type, setType] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [counter, setCounter] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPassword = () => {
    if (counter === 1 || counter === 0) {
      setCounter(counter + 1);
    } else {
      navigate("/Login");
    }
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Forgot Password</Heading>

          {/* <Alert status="error">
                        <AlertIcon/>
                        <AlertDescription>{errorMsg}</AlertDescription>
                    </Alert> */}
          {counter === 0 ? (
            <FormControl mt="4">
              <FormLabel fontSize="14px">Email address </FormLabel>

              <Flex
                align="center"
                w="100%"
                p="2px"
                border="1px"
                borderColor="gray.100"
                borderRadius="0"
              >
                <Button
                  href="/"
                  bgColor="gray.100"
                  p="3"
                  border="1px"
                  borderRadius="0"
                  borderColor="gray.100"
                >
                  <FaEnvelope />
                </Button>
                <Input
                  type="email"
                  fontSize="14px"
                  borderRadius="0"
                  border="none"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Flex>
            </FormControl>
          ) : counter === 1 ? (
            <FormControl mt="4">
              <FormLabel fontSize="14px">OTP </FormLabel>

              <Flex
                align="center"
                w="100%"
                p="2px"
                border="1px"
                borderColor="gray.100"
                borderRadius="0"
              >
                <Button
                  href="/"
                  bgColor="gray.100"
                  p="3"
                  border="1px"
                  borderRadius="0"
                  borderColor="gray.100"
                >
                  <FaAnchor />
                </Button>
                <Input
                  type="email"
                  fontSize="14px"
                  borderRadius="0"
                  border="none"
                  placeholder="Enter the OTP recieved on your email address"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Flex>
            </FormControl>
          ) : (
            <>
              <FormControl mt="4">
                <FormLabel fontSize="14px">Password </FormLabel>

                <Flex
                  align="center"
                  w="100%"
                  p="2px"
                  border="1px"
                  borderColor="gray.100"
                  borderRadius="0"
                >
                  <Button
                    href="/"
                    bgColor="gray.100"
                    p="3"
                    border="1px"
                    borderRadius="0"
                    borderColor="gray.100"
                  >
                    <FaLock />
                  </Button>
                  <Input
                    type={type ? "password" : "text"}
                    fontSize="14px"
                    borderRadius="0"
                    border="none"
                    placeholder="Enter your new password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    p="3"
                    border="1px"
                    borderRadius="0"
                    borderColor="gray.100"
                    bgColor="white"
                    onClick={() => setType(!type)}
                  >
                    <FaEye />
                  </Button>
                </Flex>
              </FormControl>
              <FormControl mt="4">
                <FormLabel fontSize="14px">Confirm Password </FormLabel>

                <Flex
                  align="center"
                  w="100%"
                  p="2px"
                  border="1px"
                  borderColor="gray.100"
                  borderRadius="0"
                >
                  <Button
                    href="/"
                    bgColor="gray.100"
                    p="3"
                    border="1px"
                    borderRadius="0"
                    borderColor="gray.100"
                  >
                    <FaLock />
                  </Button>
                  <Input
                    type={type ? "password" : "text"}
                    fontSize="14px"
                    borderRadius="0"
                    border="none"
                    placeholder="Enter your password again"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    p="3"
                    border="1px"
                    borderRadius="0"
                    borderColor="gray.100"
                    bgColor="white"
                    onClick={() => setType(!type)}
                  >
                    <FaEye />
                  </Button>
                </Flex>
              </FormControl>
            </>
          )}

          <Button
            fontSize="14px"
            borderRadius="2px"
            border="1px solid brand.900"
            bgColor="brand.900"
            color="white"
            w="100%"
            mt="6"
            _hover={{ bgColor: "orange.400" }}
            onClick={() => handleForgotPassword()}
          >
            Update
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
