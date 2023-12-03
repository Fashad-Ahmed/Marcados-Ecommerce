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
import { useTranslation } from "react-i18next";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState(true);
  const login = useLoginHook();
  const { t } = useTranslation("common");

  const onSubmit = async (formData) => {
    let data = {
      email: formData.email,
      password: formData.password,
      source: "customer",
      deviceId: "fcm token",
    };
    login(data);
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">{t("WELCOME_BACK")}</Heading>
          <Text textAlign="center" fontWeight="600" py="3">
            {t("ENTER_EMAIL_AND_PASSWORD")}
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("EMAIL_ADDRESS")} </FormLabel>

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

            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("PASSWORD")} </FormLabel>

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
            </FormControl>

            <Flex justify="space-between" my="5">
              <FormControl display="flex" align="center"></FormControl>
              <Link
                href="/ForgotPassword"
                w="150px"
                fontSize="12px"
                color="red"
              >
                {t("FORGOT_PASSWORD")}?
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
              {t("LOGIN")}
            </Button>
          </form>

          <Text mt="4">
            {t("NO_ACCOUNT")} 
            <Link href="/Register" color="brand.900">
              {t("SIGN_UP")}
            </Link>
          </Text>

          <Flex justifyContent={"center"} alignItems={"center"}>
            <Link href="/Home">
              <Text color="brand.900" fontWeight="extrabold" mt="4">
                {t("CONTINUE_AS_GUEST")}
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
