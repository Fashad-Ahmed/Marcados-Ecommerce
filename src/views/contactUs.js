import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useContactUsHook } from "../hooks/useContactUsHook";
import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA
import { errorToast } from "../utils/toast";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.data.user);
  const { t } = useTranslation("common");
  const [contactUsFunc] = useContactUsHook();
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const onSubmit = (data) => {
    if (recaptchaValue === null) {
      errorToast(t("RECAPTCHA_FAILED"));
      return;
    }

    let formData = {
      name: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    contactUsFunc(formData);
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">{t("CONTACT_US")}</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("FULL_NAME")}</FormLabel>
              <Controller
                name="fullName"
                control={control}
                defaultValue={user?.email?.fullName}
                rules={{ required: t("FULL_NAME_REQUIRED") }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder={t("ENTER_EMAIL")}
                      isDisabled={true}
                    />
                    {errors.fullName && (
                      <Alert status="error" fontSize="12px">
                        <AlertIcon />
                        <AlertDescription>
                          {errors.fullName.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("EMAIL_ADDRESS")} </FormLabel>
              <Controller
                name="email"
                control={control}
                defaultValue={user?.email?.email}
                rules={{
                  required: "Email address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="email"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder="Enter your email"
                      isDisabled={true}
                    />
                    {errors.email && (
                      <Alert status="error" fontSize="12px">
                        <AlertIcon />
                        <AlertDescription>
                          {errors.email.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("SUBJECT")}</FormLabel>
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                rules={{ required: t("SUBJECT_REQUIRED") }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder={t("ENTER_SUBJECT")}
                    />
                    {errors.subject && (
                      <Alert status="error" fontSize="12px">
                        <AlertIcon />
                        <AlertDescription>
                          {errors.subject.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel fontSize="14px">{t("MESSAGE")}</FormLabel>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{ required: t("MESSAGE_REQUIRED") }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder={t("ENTER_MESSAGE")}
                    />
                    {errors.message && (
                      <Alert status="error" fontSize="12px">
                        <AlertIcon />
                        <AlertDescription>
                          {errors.message.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              />
            </FormControl>
            <Flex mt="4" mb="4" justifyContent={"center"} alignItems={"center"}>
              <ReCAPTCHA
                sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"} // TESTING_KEY
                onChange={handleRecaptchaChange}
                style={{
                  display: "inline-block",
                  height: "40px",
                  alignSelf: "center",
                }}
              />
            </Flex>

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
              {t("SUBMIT")}
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ContactUs;
