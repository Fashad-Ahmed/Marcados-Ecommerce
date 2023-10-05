import { Box, Flex, Text } from "@chakra-ui/react";

const OrderListing = ({ orders }) => {
  return (
    <Flex direction="column" w="full">
      {orders.map((order) => (
        <Box key={order.id} borderWidth="1px" borderRadius="md" p="4" mb="4">
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
        </Box>
      ))}
    </Flex>
  );
};

export default OrderListing;
