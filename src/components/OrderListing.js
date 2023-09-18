import { Box, Flex, Text } from "@chakra-ui/react";

const OrderListing = ({ orders }) => {
  return (
    <Flex direction="column" w="full">
      {orders.map((order) => (
        <Box key={order.id} borderWidth="1px" borderRadius="md" p="4" mb="4">
          <Text fontWeight="bold" mb="2">
            Order ID: {order?.id}
          </Text>
          <Text>Total Price: {order?.amount} $</Text>
          <Text>Tracking Number: {order?.trackingNumber}</Text>
          <Text>Shipping Address: {order?.shippingAddress}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export default OrderListing;
