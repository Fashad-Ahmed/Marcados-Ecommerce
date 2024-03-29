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
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLoginHook } from "../hooks/useLoginHook";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState(true);
  const login = useLoginHook();

  const onSubmit = async (formData) => {
    let data = {
      email: formData.email,
      password: formData.password,
      source: "customer",
      deviceId: "fcm token",
    };
    console.log("Form data", data);
    login(data);
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Welcome back!</Heading>
          <Text textAlign="center" fontWeight="600" py="3">
            Enter your email and password.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </Flex>
              {errors.email && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
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
                  {...register("password", {
                    required: "Required",
                  })}
                />
                <Button
                  p="3"
                  border="1px"
                  borderRadius="0"
                  borderColor="gray.100"
                  bgColor="white"
                  onClick={() => setType(!type)}
                >
                  {type ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </Flex>
              {errors.password && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{errors.password.message}</AlertDescription>
                </Alert>
              )}
            </FormControl>

            <Flex justify="space-between" my="5">
              <FormControl display="flex" align="center"></FormControl>
              <Link
                href="/ForgotPassword"
                w="150px"
                fontSize="12px"
                color="red"
              >
                Forgot password?
              </Link>
            </Flex>
            <Button
              fontSize="14px"
              borderRadius="2px"
              border="1px solid brand.900"
              bgColor="brand.900"
              color="white"
              w="100%"
              mt="6"
              _hover={{ bgColor: "orange.400" }}
              type="submit"
            >
              Login
            </Button>
          </form>

          <Text mt="4">
            Don't have an account yet?{" "}
            <Link href="/Register" color="brand.900">
              Sign up
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
