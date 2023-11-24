import { Box, Flex, Text } from "@chakra-ui/react";
import OrderListing from "../components/OrderListing";
import { useFetchOrdersHook } from "../hooks/useFetchOrdersHook";
import { useEffect, useState } from "react";
import Loader from "../components/loader/loader";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation("common");
  const [iceData, getIceFunc] = useFetchOrdersHook();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getIceFunc()
      .then(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Flex m="20px" justify="center" fontSize="14px">
        <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
          <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
            {!iceData?.data || iceData?.data?.length < 1 ? (
              <Text textAlign="center" fontWeight="600" py="3">
                {t("NO_ORDERS_TO_SHOW")}
              </Text>
            ) : (
              <OrderListing orders={iceData?.data} />
            )}
          </Box>
        </Flex>
      </Flex>
    );
  }
};

export default Orders;
