import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const OrderListing = ({ orders }) => {
  console.log();
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
              Status: {order?.status}
            </Text>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Text fontWeight="bold">Total Price: </Text>
              <Text>{order?.amount} $</Text>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Text fontWeight="bold">Tracking Number:</Text>
              <Text>{order?.trackingNumber}</Text>
            </div>
            <div
              style={{
                marginBottom: 10,
              }}
            >
              <Text fontWeight="bold">Shipping Address:</Text>
              <Text>{order?.shippingAddress}</Text>
            </div>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default OrderListing;
