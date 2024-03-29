import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NavLink from "./navLink";
import SocialLinks from "./sociallinks";

const Footer = () => {
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
            SERVICES
          </Text>

          <NavLink navLocation={"Orders"} />
          <NavLink navLocation={"Shop"} />
          <NavLink navLocation={"Cart"} />
          <NavLink navLocation={"Wishlist"} />
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            SUPPORTS
          </Text>

          <Link
            href="/AboutUs"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">About Us</Text>
          </Link>
          <Link
            href="/TermsConditions"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">Terms & Conditions</Text>
          </Link>
          <Link
            href="/PrivacyPolicy"
            style={{
              textDecoration: "none",
            }}
          >
            <Text p="3">Privacy Policy</Text>
          </Link>
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3" px="3">
          <SocialLinks />
          {/* <Text>Lagos, Nigeria</Text> */}
          <Link href="mailto:info@njmercados.com">info@njmercados.com</Link>
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
        <Text>Copyright &copy; {new Date().getFullYear()}</Text>
      </Flex>
    </footer>
  );
};

export default Footer;
