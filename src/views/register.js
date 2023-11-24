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
import { useForm } from "react-hook-form";
import { useSignupHook } from "../hooks/useSignupHook";
import { errorToast } from "../utils/toast";
import { useTranslation } from "react-i18next";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation("common");
  const [type, setType] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const signup = useSignupHook();

  const handleRegister = async (values) => {
    const digitCount = phoneNumber?.replace(/\D/g, "").length;

    if (digitCount < 9) {
      errorToast(t("PHONE_NUMBER_DIGIT_REQUIREMENT"));
    }
    let data = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      address: values.address,
      phoneNumber: digitCount,
    };
    setLoading(true);

    signup(data);
    setLoading(false);
  };

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
          <Heading textAlign="center">{t("REGISTER")}!</Heading>
          <Text textAlign="center" fontWeight="600" py="3">
            {t("FILL_IN_DETAILS_TO_SIGNUP")}
          </Text>

          <FormControl mt="4" isInvalid={errors.email}>
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
                placeholder={t("ENTER_EMAIL_FOR_OTP")}
                {...register("email", {
                  required: t("EMAIL_ADDRESS_REQUIRED"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: t("INVALID_EMAIL_ADDRESS"),
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
              placeholder={t("EP")}
              {...register("password", {
                required: t("PASSWORD_REQUIRED"),
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
              placeholder={t("ENTER_FULL_NAME")}
              {...register("fullName", {
                required: t("FULL_NAME_REQUIRED"),
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
              placeholder={t("ENTER_ADDRESS")}
              {...register("address", {
                required: t("ENTER_ADDRESS"),
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
              placeholder={t("PLEASE_ENTER_PHONE_NUMBER")}
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
            {t("ALREADY_HAVE_ACCOUNT")}
            <Link href="/Login" color="brand.900">
              {t("LOGIN")}
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
