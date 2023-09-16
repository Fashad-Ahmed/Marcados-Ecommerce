import React from "react";
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
import { FaEnvelope, FaPersonBooth, FaTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useContactUsHook } from "../hooks/useContactUsHook";

const ContactUs = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.data.user);
  const [contactUsFunc] = useContactUsHook();

  const onSubmit = (data) => {
    let formData = {
      name: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    console.log(" data", formData);
    contactUsFunc(formData);
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Contact Us</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="4">
              <FormLabel fontSize="14px">Full Name</FormLabel>
              <Controller
                name="fullName"
                control={control}
                defaultValue={user?.email?.payload?.data?.fullName}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder="Enter your full name"
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
              <FormLabel fontSize="14px">Email address</FormLabel>
              <Controller
                name="email"
                control={control}
                defaultValue={user?.email?.payload?.data?.email}
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
              <FormLabel fontSize="14px">Subject</FormLabel>
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder="Enter your subject"
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
              <FormLabel fontSize="14px">Message</FormLabel>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{ required: "Message is required" }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                      placeholder="Enter your message"
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
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ContactUs;
