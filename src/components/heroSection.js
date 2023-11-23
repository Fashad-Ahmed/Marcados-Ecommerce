import { Box, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const HeroSection = ({ mainText, subText }) => {
  const { t } = useTranslation("common");

  return (
    <Box
      w={[null, "100%", "40%"]}
      position="absolute"
      left={["0", "0", "10%"]}
      top={["0", "0", "auto"]}
      p={"5%"}
      pt={["10%", "5%", "5%"]}
      pb="80px"
      ps={["5%", "5%", 0]}
      bgColor={["blackAlpha.600", "blackAlpha.600", "whiteAlpha.800"]}
      color={["white", "white", "black"]}
    >
      <Text fontSize="40px" lineHeight="50px" fontWeight="700" pb="15px">
        {mainText}
      </Text>
      <Text fontSize="14px" lineHeight="30px" fontWeight="600" mb="35px">
        {subText}
      </Text>
      <Link
        href="/Shop"
        p="13px 25px"
        borderRadius="2px"
        bgColor="brand.900"
        color="white"
        _hover={{ bgColor: "brand.800", color: "white" }}
      >
        {t("SHOP_NOW")}
      </Link>
    </Box>
  );
};

export default HeroSection;
