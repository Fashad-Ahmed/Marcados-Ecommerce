import {
  Box,
  Flex,
  Input,
  Link,
  Select,
  Text,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import Heading from "../components/heading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlaceOrderHook } from "../hooks/usePlaceOrderHook";
import { errorToast } from "../utils/toast";
import { removeDiscount, removeDiscountId } from "../redux/slice/cartSlice";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t } = useTranslation("common");

  const cart = useSelector((state) => state.data.cart.cart);
  const zipCode = useSelector((state) => state?.data?.general?.zipCode);
  const discountID = useSelector((state) => state?.data?.cart?.discountId);

  const dispatch = useDispatch();
  const checkoutFunc = usePlaceOrderHook();
  const [countryCode, setCountryCode] = useState("AF");
  const [stateCode, setStateCode] = useState("BDS");

  const [fullname, setFullname] = useState("");
  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [company, setCompany] = useState("");
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const [shippingAddress, setShippingAddress] = useState("");
  const handleShippingAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const [address, setAddress] = useState(zipCode && zipCode[0]?.code);
  const [shippingCharges, setShippingCharges] = useState({
    val: zipCode ? zipCode[0]?.shippingCharges : 0,
    id: zipCode && zipCode[0]?._id,
  });

  const handleAddressChange = (e) => {
    console.log(e.target);
    handleChangeShippingCharges(e.target.value);

    setAddress(e.target.value);
  };

  const handleChangeShippingCharges = (value) => {
    zipCode?.map((item) => {
      if (item?.code == value) {
        setShippingCharges({
          val: item?.shippingCharges,
          id: item?._id,
        });
      }
    });
  };
  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleStateChange = (e) => {
    setStateCode(e.target.value);
  };

  const [city, setCity] = useState("");
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const inputStyles = {
    width: "100%",
    padding: "10px",
    // borderRadius: "4px",
    fontSize: "16px",
    outline: "none",
    // border: "2px solid #3498db",
  };

  const placeholderStyles = {
    color: "#ccc",
  };

  const [cardName, setCardName] = useState("");

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const [cardType, setCardType] = useState("COD");
  const handleCardTypeChange = (e) => {
    setCardType(e.target.value);
  };

  const [expiryDate, setExpiryDate] = useState("");

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const [cvv, setCvv] = useState("");

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const [loading, setLoading] = useState(false);
  console.log("cart", cart);
  const handlePlaceOrder = () => {
    if (!shippingAddress) {
      errorToast(t("PLEASE_ENTER_SHIPPING_ADDRESS"));
      return;
    }
    if (!address) {
      errorToast(t("PLEASE_SELECT_ZIP_CODE"));
      return;
    }
    if (!phoneNumber) {
      errorToast(t("PLEASE_ENTER_PHONE_NUMBER"));
      return;
    }

    const digitCount = phoneNumber.replace(/\D/g, "").length;

    if (digitCount < 9) {
      errorToast(t("PHONE_NUMBER_DIGIT_REQUIREMENT"));
    }

    setLoading(true);
    let data = {
      products: cart,
      amount: localStorage.getItem("amount"),
      shippingAddress: shippingAddress,
      zip: shippingCharges?.id,
      phoneNumber: phoneNumber,
      paymentMethod: cardType,
      discountId: discountID,
    };

    checkoutFunc(data)
      .then(() => {
        dispatch(removeDiscount());
        dispatch(removeDiscountId());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box py="50px" px={["20px", "20px", "10%"]}>
      <Heading mainText={t("CHECKOUT")} subText={t("ORDER_PRODUCTS")} />

      <Flex flexWrap="wrap">
        <Box w={["100%", "100%", "60%"]} fontSize="14px">
          <Box p="20px" bgColor="#f3f3f3">
            <Text
              fontWeight="700"
              fontSize="18px"
              mb="3"
              p="2"
              color="brand.900"
            >
              {t("ORDER_NOW")}
            </Text>
            <form method="post" action="/">
              <Box bgColor="white" p="20px">
                <Box my="4">
                  <h2>
                    <Box flex="1" p="1" textAlign="left">
                      {t("SHIPPING_DETAILS")}
                    </Box>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        {t("SHIPPING_ADDRESS")}:
                      </FormLabel>
                      <Input
                        type="text"
                        name="address"
                        my="1"
                        border="none"
                        variant="unstyled"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder={t("ENTER_SHIPPING_ADDRESS")}
                        value={shippingAddress}
                        onChange={handleShippingAddressChange}
                      />
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        {t("ZIP_CODE")}:
                      </FormLabel>
                      {/* <Input
                        type="number"
                        name="zip"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Select Zip Code"
                        value={address}
                        onChange={handleAddressChange}
                      /> */}
                      <Select
                        onChange={handleAddressChange}
                        name="type"
                        borderRadius="0"
                        my="5"
                        border="none"
                        variant="unstyled"
                      >
                        {zipCode?.map((item) => (
                          <option>{item?.code}</option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        {t("PHONE_NUMBER")}:
                      </FormLabel>

                      <InputMask
                        mask="(+351) 999 999 999"
                        maskChar="_"
                        type="tel"
                        name="phone"
                        placeholder={t("ENTER_PHONE_NUMBER")}
                        value={phoneNumber}
                        onChange={handleChange}
                        style={inputStyles}
                        placeholderStyle={placeholderStyles}
                      />
                    </FormControl>
                  </h2>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>

        <Box
          w={["100%", "100%", "36%"]}
          border="1px solid #f4f4f4"
          fontSize="14px"
          p="20px"
          mx={[0, 0, "2%"]}
        >
          <Box>
            <Flex justify="space-between" bgColor="white" py="15px">
              <Text>{t("SHIPPING_CHARGES")}</Text>
              <Text as="b">${shippingCharges?.val}</Text>
            </Flex>

            <Flex justify="space-between" bgColor="white" py="15px">
              <Text>{t("TOTAL_AMOUNT")}</Text>
              <Text as="b">
                $
                {shippingCharges?.val
                  ? parseInt(localStorage.getItem("amount")) +
                    parseInt(shippingCharges?.val)
                  : localStorage.getItem("amount")}
              </Text>
            </Flex>

            <FormLabel fontSize="12px" color="gray.400" top="7px" left="17px">
              {t("PAYMENT_METHOD")}
            </FormLabel>
            <Input
              type="text"
              name="payment"
              my="1"
              isDisabled={true}
              fontSize="14px"
              borderRadius="0"
              value={cardType}
            />
            {/* <Select
              onChange={handleCardTypeChange}
              name="type"
              borderRadius="0"
              my="5"
            >
              <option>COD</option>
              <option>Visa</option>
              <option>Mastercard</option>
              <option>American Express</option>
            </Select> */}
            {/* {cardType != "COD" && (
              <>
                <FormControl my="5">
                  <FormLabel
                    fontSize="12px"
                    color="gray.400"
                    top="7px"
                    left="17px"
                  >
                    Name on card:
                  </FormLabel>
                  <Input
                    type="text"
                    name="cardName"
                    borderRadius="0"
                    placeholder="Enter the name on card"
                    value={cardName}
                    onChange={handleCardNameChange}
                  />
                </FormControl>
                <FormControl my="5">
                  <FormLabel
                    fontSize="12px"
                    color="gray.400"
                    top="7px"
                    left="17px"
                  >
                    Card number:
                  </FormLabel>
                  <Input
                    type="text"
                    name="CardNumber"
                    borderRadius="0"
                    placeholder="Enter the card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </FormControl>

                <Flex my="5" justify="space-between">
                  <FormControl w="70%">
                    <FormLabel
                      fontSize="12px"
                      color="gray.400"
                      top="7px"
                      left="17px"
                    >
                      Expiry date:
                    </FormLabel>
                    <Input
                      type="text"
                      name="expiry"
                      my="0"
                      me="1"
                      borderRadius="0"
                      placeholder="Enter the card expiry date"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                  </FormControl>
                  <FormControl w="25%">
                    <FormLabel
                      fontSize="12px"
                      color="gray.400"
                      top="7px"
                      left="17px"
                    >
                      CVV:
                    </FormLabel>
                    <Input
                      type="text"
                      name="cvv"
                      borderRadius="0"
                      placeholder="Enter CVV"
                      value={cvv}
                      onChange={handleCvvChange}
                    />
                  </FormControl>
                </Flex>
              </>
            )} */}
          </Box>

          <Flex m="20px 0" bgColor="white" p="10px 0">
            {loading ? (
              <Box
                p="12px"
                w="100%"
                textAlign="center"
                borderRadius="2px"
                color="white"
                bgColor="brand.900"
              >
                <Spinner value={15} color={"white.900"} />
              </Box>
            ) : (
              <Link
                p="12px"
                w="100%"
                textAlign="center"
                borderRadius="2px"
                color="white"
                bgColor="brand.900"
                onClick={handlePlaceOrder}
              >
                {t("PLACE_ORDER")}
              </Link>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Checkout;
