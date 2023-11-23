import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const OrderListing = ({ orders }) => {
  const { t } = useTranslation("common");

  return (
    <Flex direction="column" w="full">
      {orders.map((order) => (
        <Box
          key={order?._id}
          borderWidth="1px"
          borderRadius="md"
          p="4"
          mb="4"
          _hover={{
            backgroundColor: "lightgrey",
          }}
        >
          <Link
            to={{
              pathname: "/SingleOrder",
              search: `?id=${order?._id}`,
            }}
            onClick={() => localStorage.setItem("orderId", order?._id)}
          >
            <Text
              fontWeight="bold"
              mb="2"
              style={{
                textTransform: "uppercase",
              }}
            >
              {t("Status")}: {order?.status}
            </Text>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Text fontWeight="bold">{t("TOTAL_PRICE")}: </Text>
              <Text>{order?.amount} $</Text>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Text fontWeight="bold">{t("TRACKING_NUMBER")}:</Text>
              <Text>{order?.trackingNumber}</Text>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Text fontWeight="bold">{t("SHIPPING_ADDRESS")}:</Text>
              <Text>{order?.shippingAddress}</Text>
            </div>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default OrderListing;
