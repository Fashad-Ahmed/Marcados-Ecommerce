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
import { FaEnvelope, FaEye, FaLock, FaSearchLocation } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { signIn } from "../firebase";
import { userLogin } from "../redux/slice/authSlice";

const Account = () => {
  const [type, setType] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => { };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Profile</Heading>

          {/* <Alert status="error">
                          <AlertIcon/>
                          <AlertDescription>{errorMsg}</AlertDescription>
                      </Alert> */}
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
                placeholder="Enter your password"
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
            <FormLabel fontSize="14px">Address 1 </FormLabel>

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
                <FaSearchLocation />
              </Button>
              <Input
                type="email"
                fontSize="14px"
                borderRadius="0"
                border="none"
                placeholder="Enter your main address"
                onChange={(e) => console.log(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mt="4">
            <FormLabel fontSize="14px">Address 2 </FormLabel>

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
                <FaSearchLocation />
              </Button>
              <Input
                type="email"
                fontSize="14px"
                borderRadius="0"
                border="none"
                placeholder="Enter your secondary address"
                onChange={(e) => console.log(e.target.value)}
              />
            </Flex>
          </FormControl>
          {/* 
          <Button
            fontSize="14px"
            borderRadius="2px"
            border="1px solid brand.900"
            bgColor="brand.900"
            color="white"
            w="100%"
            mt="6"
            _hover={{ bgColor: "orange.400" }}
            onClick={() => handleLogin()}
          >
            Login
          </Button> */}

          {/* <Text mt="4">
            Don't have an account yet?{" "}
            <Link href="/Register" color="brand.900">
              Sign up
            </Link>
          </Text> */}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Account;
