import {
  Box,
  Flex,
  Input,
  Link,
  Select,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Heading from "../components/heading";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { usePlaceOrderHook } from "../hooks/usePlaceOrderHook";
import { ORDER_STATUS } from '../utils/stattusEnum'
const Checkout = () => {
  const cart = useSelector((state) => state.data.cart.cart)
  // const [checkoutFunc] = usePlaceOrderHook();
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

  const [address, setAddress] = useState("");
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
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

  console.log("cart", cart);
  const handlePlaceOrder = () => {
    let data = {
      products: cart,
      amount: localStorage.getItem("amount"),
      status: ORDER_STATUS.PENDING,
      trackingNumber: uuidv4(),
      shippingAddress: shippingAddress,
    };

    console.log(data);
    // checkoutFunc(data);
  };
  return (
    <Box py="50px" px={["20px", "20px", "10%"]}>
      <Heading
        mainText={"CHECKOUT"}
        subText={"Order your products by filling the neccessary information."}
      />

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
              ORDER NOW
            </Text>
            <form method="post" action="/">
              <Box bgColor="white" p="20px">
                <Box>
                  <h2>
                    <Box flex="1" p="1" textAlign="left">
                      Personal Details
                    </Box>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        Fullname:
                      </FormLabel>
                      <Input
                        type="text"
                        name="fullname"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your full name"
                        value={fullname}
                        onChange={handleFullnameChange}
                      />
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        Email address:
                      </FormLabel>
                      <Input
                        type="text"
                        name="email"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        Company (optional):
                      </FormLabel>
                      <Input
                        type="text"
                        name="company"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your company"
                        value={company}
                        onChange={handleCompanyChange}
                      />
                    </FormControl>
                  </h2>
                </Box>

                <Box my="4">
                  <h2>
                    <Box flex="1" p="1" textAlign="left">
                      Shipping Details
                    </Box>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        Shipping address:
                      </FormLabel>
                      <Input
                        type="text"
                        name="address"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your shipping address"
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
                        Address:
                      </FormLabel>
                      <Input
                        type="text"
                        name="state"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your address"
                        value={address}
                        onChange={handleAddressChange}
                      />
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="0px"
                        left="17px"
                      >
                        Country:
                      </FormLabel>
                      <Select
                        onChange={handleCountryChange}
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your country"
                        value={countryCode}
                      >
                        {Country.getAllCountries().map((country, index) => {
                          return (
                            <option value={country.isoCode} key={index}>
                              {country.name}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="5px"
                        left="17px"
                      >
                        State:
                      </FormLabel>
                      <Select
                        onChange={handleStateChange}
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        value={stateCode}
                      >
                        {State.getStatesOfCountry(countryCode).map(
                          (state, index) => {
                            return (
                              <option value={state.isoCode} key={index}>
                                {state.name}
                              </option>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        City:
                      </FormLabel>
                      <Select
                        onChange={handleCityChange}
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                      >
                        {City.getCitiesOfState(countryCode, stateCode).map(
                          (city, index) => {
                            return (
                              <option value={city.isoCode} key={index}>
                                {city.name}
                              </option>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>
                    <FormControl my="5">
                      <FormLabel
                        fontSize="12px"
                        color="gray.400"
                        top="7px"
                        left="17px"
                      >
                        Phone number:
                      </FormLabel>
                      <Input
                        type="tel"
                        name="phone"
                        my="1"
                        fontSize="14px"
                        borderRadius="0"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
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
            <FormControl w="25%">
              <FormLabel fontSize="12px" color="gray.400" top="7px" left="17px">
                Total
              </FormLabel>
              <Input
                type="text"
                name="total"
                borderRadius="0"
                isDisabled={true}
                value={localStorage.getItem("amount")}
              />
            </FormControl>
            <Select
              onChange={handleCardTypeChange}
              name="type"
              borderRadius="0"
              my="5"
            >
              <option>COD</option>
              <option>Visa</option>
              <option>Mastercard</option>
              <option>American Express</option>
            </Select>
            {cardType != "COD" && (
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
            )}
          </Box>

          <Flex m="20px 0" bgColor="white" p="10px 0">
            <Link
              p="12px"
              w="100%"
              textAlign="center"
              borderRadius="2px"
              color="white"
              bgColor="brand.900"
              onClick={handlePlaceOrder}
            >
              Place order
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Checkout;
