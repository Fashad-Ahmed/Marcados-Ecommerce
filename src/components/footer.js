import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NavLink from "./navLink";
import SocialLinks from "./sociallinks";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");
  const token = useSelector((state) => state.data.user.userToken);
  const isOnRoute = useMatch("/Login");
  const isonRouteTwo = useMatch("/Register");
  const isonRouteThree = useMatch("/ForgotPassword");

  if (isOnRoute || isonRouteTwo || isonRouteThree) {
    return null;
  }

  return (
    <footer>
      <Flex
        justify="space-between"
        flexWrap="wrap"
        py="5%"
        px={["10px", "20px", "10%"]}
        fontSize="14px"
        bgColor="gray.100"
      >
        {/* <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            PAGES
          </Text>

          <NavLink navLocation={"Home"} />

        </Box> */}

        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            {t("SERVICES")}
          </Text>

          <Link
            href="/Shop"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">{t("SHOP")}</Text>
          </Link>

          {token && (
            <>
              <Link
                href="/Orders"
                style={{
                  textDecoration: "none",
                }}
              >
                <Text p="3">{t("ORDERS")}</Text>
              </Link>
              <Link
                href="/Cart"
                style={{
                  textDecoration: "none",
                }}
              >
                <Text p="3">{t("CART")}</Text>
              </Link>
              <Link
                href="/Wishlist"
                style={{
                  textDecoration: "none",
                }}
              >
                <Text p="3">{t("WISHLIST")}</Text>
              </Link>
            </>
          )}
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            {t("SUPPORT")}
          </Text>

          <Link
            href="/AboutUs"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">{t("ABOUT_US")}</Text>
          </Link>
          <Link
            href="/TermsConditions"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">{t("TERMS_CONDITIONS")}</Text>
          </Link>
          <Link
            href="/PrivacyPolicy"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">{t("PRIVACY_POLICY")}</Text>
          </Link>
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3" px="3">
          <SocialLinks />
          {/* <Text>Lagos, Nigeria</Text> */}
          <Link href="mailto:info@njmercados.com">{t("INFO_EMAIL")}</Link>
        </Box>
      </Flex>

      <Flex
        mb={["12%", "12%", 0]}
        justify="space-between"
        py="20px"
        px={["20px", "20px", "10%"]}
        bgColor="gray.600"
        color="white"
        fontSize="14px"
      >
        <Text></Text>
        <Text>
          {t("COPYRIGHT")} &copy; {new Date().getFullYear()}
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
