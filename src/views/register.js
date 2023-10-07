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
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLandmark,
  FaLock,
  FaPhone,
  FaUber,
} from "react-icons/fa";
import InputMask from "react-input-mask";
import bg from "../assets/imgs/bg.jpg";
import { signup } from "../redux/slice/authSlice";
import { useForm } from "react-hook-form";
import { useSignupHook } from "../hooks/useSignupHook";
import { errorToast } from "../utils/toast";
const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState(true);
  const [loading, setLoading] = useState(false);
  const signup = useSignupHook();

  const handleRegister = async (values) => {
    const digitCount = phoneNumber?.replace(/\D/g, "").length;

    if (digitCount < 9) {
      errorToast("Phone number must have at least 9 digits.");
    }
    let data = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      address: values.address,
      phoneNumber: digitCount,
    };
    console.log("data", data);
    setLoading(true);

    signup(data);
    setLoading(false);
  };
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const inputStyles = {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    outline: "none",
    borderColor: "#000",
  };

  const placeholderStyles = {
    color: "#ccc",
  };

  return (
    <Flex
      m="20px"
      justify="center"
      fontSize="14px"
      backgroundImage={`url(${bg})`}
      bgSize="cover"
    >
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box
          as="form"
          p="20px"
          w={["100%", "400px", "500px"]}
          my="20px"
          bgColor="white"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Heading textAlign="center">Register!</Heading>
          <Text textAlign="center" fontWeight="600" py="3">
            Fill in your details to signup.
          </Text>

          <FormControl mt="4" isInvalid={errors.email}>
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
                variant="unstyled"
                px={3}
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
              variant="unstyled"
              px={3}
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
              <FaUber />
            </Button>
            <Input
              type="text"
              fontSize="14px"
              borderRadius="0"
              border="none"
              variant="unstyled"
              px={3}
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Required",
              })}
            />
          </Flex>
          {errors.fullName && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.fullName.message}</AlertDescription>
            </Alert>
          )}

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
              <FaLandmark />
            </Button>
            <Input
              type="text"
              fontSize="14px"
              borderRadius="0"
              border="none"
              variant="unstyled"
              px={3}
              placeholder="Enter your address"
              {...register("address", {
                required: "Required",
              })}
            />
          </Flex>
          {errors.address && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.address.message}</AlertDescription>
            </Alert>
          )}
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
              <FaPhone />
            </Button>
            {/* <Input
              type="tel"
              fontSize="14px"
              borderRadius="0"
              border="none"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Required",
                pattern: {
                  value: /^(?:\+\d{1,3}|\d{1,4})?\d{7,14}$/,
                  message: "Invalid phone number",
                },
              })}
            /> */}
            <InputMask
              mask="(+351) 999 999 999"
              maskChar="_"
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={handleChange}
              style={inputStyles}
              placeholderStyle={placeholderStyles}
            />
          </Flex>
          {errors.phoneNumber && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.phoneNumber.message}</AlertDescription>
            </Alert>
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
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Spinner size="sm" color="brand.900" mr="2" />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Text mt="4">
            Already have an account?{" "}
            <Link href="/Login" color="brand.900">
              Login
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
