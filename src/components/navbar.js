import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Box,
  Link,
  Switch,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  FiHeart,
  FiHome,
  FiShoppingCart,
  FiHeadphones,
  FiUser,
  FiList,
  FiGlobe,
} from "react-icons/fi";
import SocialLinks from "./sociallinks";
import NavLink from "./navLink";
import { BiStore } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/slice/authSlice";
import { logout } from "../redux/slice/cartSlice";
import { wishlistLogout } from "../redux/slice/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const user = useSelector((state) => state.data.user);
  const token = useSelector((state) => state.data.user.userToken);
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();
  const { toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onColor = "#00411a";

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(logout());
    dispatch(wishlistLogout());
    localStorage.removeItem("token");
    localStorage.clear();
    navigation("/Login");
  };

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Button
        href="/"
        me={["7px", "5px", 0]}
        fontSize="20px"
        bgColor="white"
        border="none"
        onClick={onOpen}
        minW="auto"
      >
        <HiMenuAlt3 />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            py="4"
            px="3"
            m="3"
            border="1px"
            borderColor="gray.100"
            borderRadius="0"
          />
          <DrawerHeader my="2" display="flex" alignItems="center">
            <Box>
              {token ? (
                user?.email?.fullName
              ) : (
                <Link href={"/Login"} fontSize="14px">
                  {t("LOGIN")}
                </Link>
              )}
            </Box>
          </DrawerHeader>
          <DrawerBody fontSize="14px">
            {/* <SearchBar /> */}

            <Box fontSize="15px" my="4" mx="1">
              <Box fontWeight="600" my="2">
                <NavLink navLocation={"Home"} name={t("HOME")}>
                  <FiHome />
                </NavLink>
              </Box>
              <Box fontWeight="600" my="2">
                <NavLink navLocation={"Shop"} name={t("SHOP")}>
                  <BiStore />
                </NavLink>
              </Box>
              <Box fontWeight="600" my="2">
                <NavLink navLocation={"Cart"} name={t("CART")}>
                  <FiShoppingCart />
                </NavLink>
              </Box>
              {token && (
                <>
                  <Box fontWeight="600" my="2">
                    <NavLink navLocation={"Wishlist"} name={t("WISHLIST")}>
                      <FiHeart />
                    </NavLink>
                  </Box>
                  <Box fontWeight="600" my="2">
                    <NavLink navLocation={"Account"} name={t("ACCOUNT")}>
                      <FiUser />
                    </NavLink>
                  </Box>
                  <Box fontWeight="600" my="2">
                    <NavLink navLocation={"Orders"} name={t("ORDERS")}>
                      <FiList />
                    </NavLink>
                  </Box>

                  <Box fontWeight="600" my="2">
                    <NavLink navLocation={"Contact"} name={t("CONTACT")}>
                      <FiHeadphones />
                    </NavLink>
                  </Box>
                </>
              )}

              {!token ? (
                ""
              ) : (
                <Box fontWeight="600" my="2">
                  <Box
                    display="flex"
                    navLocation={"Logout"}
                    cursor={"pointer"}
                    onClick={() => handleLogout()}
                    py="2"
                    alignItems="center"
                    w="100%"
                    _hover={{ color: "brand.900" }}
                  >
                    <FaSignOutAlt />
                    <Text me="3" ml={"10px"}>
                      {t("LOGOUT")}
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>

            <Box fontWeight="600" my="2">
              <Box display="flex">
                <Switch
                  marginTop={"0.5"}
                  me={"3"}
                  isChecked={i18n.language === "en"}
                  onChange={() =>
                    handleChangeLanguage(i18n.language === "en" ? "pt" : "en")
                  }
                  colorScheme="teal"
                  size="md"
                  trackColor={{ base: onColor }}
                  thumbColor={useColorModeValue("white", "gray.800")}
                />

                <Text pl="0" onClick={toggleColorMode} cursor="pointer">
                  {i18n.language === "en" ? t("ENGLISH") : t("PORTUGUESE")}
                </Text>
              </Box>
            </Box>

            <Box py="2" mt="4">
              <Link href="mailto:info@njmercados.com">
                <Text fontWeight="600">{t("INFO_EMAIL")}</Text>
              </Link>
              <SocialLinks />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
