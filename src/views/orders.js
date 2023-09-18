import { Box, Flex, Text } from "@chakra-ui/react";
import OrderListing from "../components/OrderListing";
import { useFetchOrdersHook } from "../hooks/useFetchOrdersHook";
import { useEffect } from "react";

const Orders = () => {
  const [iceData, getIceFunc] = useFetchOrdersHook();

  useEffect(() => {
    getIceFunc();
  }, []);

  console.log("iceData", iceData);
  return (
    <Flex m="20px" justify="center" fontSize="14px">
      <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
        <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
          {!iceData?.data || iceData?.data?.length < 1 ? (
            <Text textAlign="center" fontWeight="600" py="3">
              No orders to show.
            </Text>
          ) : (
            <OrderListing orders={iceData?.data} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Orders;
