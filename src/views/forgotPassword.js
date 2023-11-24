import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  FaAnchor,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useForgetPasswordHook } from "../hooks/useForgetPasswordHook";
import { useVerifyOtpHook } from "../hooks/useVerifyOtpHook";
import { useSetPasswordHook } from "../hooks/useSetPasswordHook";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [type, setType] = useState(true);
  const [typeTwo, setTypeTwo] = useState(true);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [forgetPasswordFunc] = useForgetPasswordHook();
  const [verifyOtpFunc] = useVerifyOtpHook();
  const [ResetPasswordFunc] = useSetPasswordHook();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const { t } = useTranslation("common");

  const onSubmit = (values) => {
    if (counter === 1 || counter === 0) {
      if (counter === 0) {
        forgetPasswordFunc({
          email: values.email,
        }).then(() => {
          setCounter(counter + 1);
        });
      } else {
        verifyOtpFunc({
          email: values.email,
          otp: values.otp,
        }).then(() => {
          setCounter(counter + 1);
        });
      }
    } else {
      const password = getValues("password");
      const confirmPassword = getValues("confirmPassword");

      if (password === confirmPassword) {
        ResetPasswordFunc({
          email: values.email,
          password: values.password,
        });
      } else {
        setValue("confirmPassword", "", { shouldValidate: true });
        setValue("password", "", { shouldValidate: true });
      }
    }
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">{t("FORGOT_PASSWORD")}</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            {counter === 0 ? (
              <FormControl mt="4">
                <FormLabel fontSize="14px">{t("EMAIL_ADDRESS")} </FormLabel>

                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: t("EMAIL_ADDRESS_REQUIRED"),
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: t("INVALID_EMAIL_ADDRESS"),
                    },
                  }}
                  render={({ field }) => (
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
                        {...field}
                      />
                    </Flex>
                  )}
                />
                {errors.email && (
                  <Text color="red" fontSize="12px">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
            ) : counter === 1 ? (
              <FormControl mt="4">
                <FormLabel fontSize="14px">{t("OTP")}</FormLabel>
                <Controller
                  name="otp"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: t("OTP_REQUIRED"),
                  }}
                  render={({ field }) => (
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
                        type="text"
                        fontSize="14px"
                        borderRadius="0"
                        border="none"
                        placeholder={t("ENTER_OTP")}
                        {...field}
                      />
                    </Flex>
                  )}
                />
                {errors.otp && (
                  <Text color="red" fontSize="12px">
                    {errors.otp.message}
                  </Text>
                )}
              </FormControl>
            ) : (
              <>
                <FormControl mt="4">
                  <FormLabel fontSize="14px">{t("PASSWORD")} </FormLabel>

                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("PASSWORD_REQUIRED"),
                      // minLength: {
                      //   value: 6,
                      //   message: "Password must be at least 6 characters",
                      // },
                    }}
                    render={({ field }) => (
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
                          placeholder={t("ENTER_NEW_PASSWORD")}
                          {...field}
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
                    )}
                  />
                  {errors.password && (
                    <Text color="red" fontSize="12px">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl mt="4">
                  <FormLabel fontSize="14px">
                    {t("CONFIRM_PASSWORD")}{" "}
                  </FormLabel>

                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("CONFIRM_PASSWORD_REQUIRED"),
                      validate: (value) =>
                        value === getValues("password") ||
                        t("PASSWORDS_DO_NOT_MATCH"),
                    }}
                    render={({ field }) => (
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
                          type={typeTwo ? "password" : "text"}
                          fontSize="14px"
                          borderRadius="0"
                          border="none"
                          placeholder={t("ENTER_PASSWORD_AGAIN")}
                          {...field}
                        />
                        <Button
                          p="3"
                          border="1px"
                          borderRadius="0"
                          borderColor="gray.100"
                          bgColor="white"
                          onClick={() => setTypeTwo(!typeTwo)}
                        >
                          {typeTwo ? <FaEye /> : <FaEyeSlash />}
                        </Button>
                      </Flex>
                    )}
                  />
                  {errors.confirmPassword && (
                    <Text color="red" fontSize="12px">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              fontSize="14px"
              borderRadius="2px"
              border="1px solid brand.900"
              bgColor="brand.900"
              color="white"
              w="100%"
              mt="6"
              _hover={{ bgColor: "orange.400" }}
            >
              {t("key")}
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
