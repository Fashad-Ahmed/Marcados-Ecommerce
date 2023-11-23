import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { useChangePasswordHook } from "../hooks/useChangePasswordHook";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation("common");
  const [type, setType] = useState(true);
  const [typeTwo, setTypeTwo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [changePasswordFunc] = useChangePasswordHook();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    changePasswordFunc({
      currentPassword: data.password,
      newPassword: data.confirmPassword,
    });
    setLoading(false);
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">{t("CHANGE_PASSWORD")}</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("PASSWORD")} </FormLabel>

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: t("PASSWORD_REQUIRED"),
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
              <FormLabel fontSize="14px">{t("CONFIRM_PASSWORD")} </FormLabel>

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
                      type={type ? "password" : "text"}
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
              {loading ? (
                <Button
                  type="submit"
                  isDisabled={true}
                  fontSize="14px"
                  borderRadius="2px"
                  border="1px solid brand.900"
                  bgColor="brand.900"
                  color="white"
                  w="100%"
                  mt="6"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner color="white" />
                </Button>
              ) : (
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
              )}
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChangePassword;
