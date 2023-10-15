import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { FaEnvelope, FaSearchLocation } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.data.user);

  // console.log(user?.email?.payload?.data);
  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">Profile</Heading>

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
                isDisabled
                value={user?.email?.email}
                type="email"
                fontSize="14px"
                borderRadius="0"
                border="none"
                placeholder="Enter your email address"
              />
            </Flex>
          </FormControl>

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
              <Input
                isDisabled
                value={user?.email?.fullName}
                type="text"
                fontSize="14px"
                borderRadius="0"
                border="none"
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
              <Input
                isDisabled
                value={user?.email?.address}
                type="text"
                fontSize="14px"
                borderRadius="0"
                border="none"
              />
            </Flex>
          </FormControl>

          <Button
            fontSize="14px"
            borderRadius="2px"
            border="1px solid brand.900"
            bgColor="brand.900"
            color="white"
            w="100%"
            mt="6"
            _hover={{ bgColor: "orange.400" }}
            onClick={() => navigate("/ChangePassword")}
          >
            Change Password
          </Button>
          <Button
            fontSize="14px"
            borderRadius="2px"
            border="1px solid brand.900"
            bgColor="brand.900"
            color="white"
            w="100%"
            mt="6"
            _hover={{ bgColor: "orange.400" }}
            onClick={() => navigate("/EditProfile")}
          >
            Edit Profile
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Account;
