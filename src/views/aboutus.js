import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const data = useSelector((state) => state?.data?.general?.about);
  console.log(data);
  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading textAlign="center">About Us</Heading>

          <Text p="20px">{data}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AboutUs;
