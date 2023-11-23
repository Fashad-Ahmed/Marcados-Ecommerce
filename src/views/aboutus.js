import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation("common");
  const data = useSelector((state) => state?.data?.general?.about);

  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          <Heading p="20px" textAlign="center">
            {t("ABOUT_US")}
          </Heading>
          <Box p="20px" bgColor="#f3f3f3">
            <Text textAlign="justify" p="20px">
              {data}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AboutUs;
