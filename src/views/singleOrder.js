import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Divider, Flex } from "@chakra-ui/react";
import configs from "../redux/config";
import Loader from "../components/loader/loader";
import { get } from "../api";
import { errorToast } from "../utils/toast";
import { useTranslation } from "react-i18next";

const SingleOrder = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();

  useEffect(() => {
    let id = localStorage.getItem("orderId");
    fetchOrder(id);
  }, []);

  const fetchOrder = async (data) => {
    setLoading(true);
    try {
      let response = await get(configs.endpoints.checkout.singleOrder + data);
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <Flex justifyContent="center" alignItems="center" height="80vh">
      <Box
        p="4"
        m="5"
        w="50%"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading textAlign="center" size="lg" my="8">
          {t("ORDER_DETAILS")}
        </Heading>
        <Flex flexDirection="row" justifyContent="space-between" py="4">
          <Box>
            <Text mb="2" fontSize="md">
              <strong>{t("AMOUNT")}:</strong> {order?.amount}
            </Text>
            <Text mb="2" fontSize="md">
              <strong>{t("STATUS")}:</strong> {order?.status}
            </Text>
            <Text mb="2" fontSize="md">
              <strong>{t("TRACKING_NUMBER")}:</strong> {order?.trackingNumber}
            </Text>
          </Box>

          <Box>
            <Text mb="2" fontSize="md">
              <strong>{t("SHIPPING_ADDRESS")}:</strong> {order?.shippingAddress}
            </Text>
            <Text mb="2" fontSize="md">
              <strong>{t("ZIP_CODE")}:</strong> {order?.zip.code}
            </Text>

            <Text mb="2" fontSize="md">
              <strong>{t("PAYMENT_METHOD")}:</strong> {order?.paymentMethod}
            </Text>
          </Box>
        </Flex>
        <Divider my="4" />
        <Text fontSize="md">
          <strong>{t("PHONE_NUMBER")}:</strong> {order?.phoneNumber}
        </Text>
      </Box>
    </Flex>
  );
};

export default SingleOrder;
