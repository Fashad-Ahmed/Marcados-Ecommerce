import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { FaEnvelope, FaSearchLocation } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorToast, succesToast } from "../utils/toast";
import { put } from "../api";
import configs from "../redux/config";
import { userLogin } from "../redux/slice/authSlice";
const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.data.user);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    let formData = {
      fullName: data.fullName,
      address: data.address,
    };

    try {
      let response = await put(
        configs.endpoints.auth.editProfile + user?.email?._id,
        formData,
        false
      );
      console.log("response: " + JSON.stringify(response));
      succesToast(response?.message);
      dispatch(userLogin(response?.data));
      navigate("/Account");
    } catch (error) {
      console.log(error);
      errorToast(error);
    }

    setLoading(false);
  };

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Edit Profile</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mt="4">
              <FormLabel fontSize="14px">Full Name</FormLabel>
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
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue={user?.email?.fullName || ""} // Set default value
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                    />
                  )}
                />
              </Flex>
            </FormControl>

            <FormControl mt="4">
              <FormLabel fontSize="14px">Address</FormLabel>
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
                <Controller
                  name="address"
                  control={control}
                  defaultValue={user?.email?.address || ""} // Set default value
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      fontSize="14px"
                      borderRadius="0"
                      border="none"
                    />
                  )}
                />
              </Flex>
            </FormControl>
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
                Update Profile
              </Button>
            )}
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default EditProfile;
