import { Box, Grid, Heading, Badge, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import configs from "../redux/config";
import { errorToast } from "../utils/toast";
import { get } from "../api";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import CartWishlist from "./../components/shopActions/cartWishlist";
import Loader from "../components/loader/loader";
import sampleImage from "../assets/imgs/sample.jpeg";
import { BASE_URL } from "../redux/config";

const renderLoader = () => <Loader />;

const TypeSearch = () => {
  const { t } = useTranslation("common");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let storedQuery = localStorage.getItem("TypeSearch");
    if (storedQuery) {
      fetchProducts(storedQuery);
    }
  }, []);

  const fetchProducts = async (query) => {
    setLoading(true);
    try {
      let response = await get(
        `${configs.endpoints.shop.getProduct}&page=1&rowsPerPage=10&search=${query}`
      );
      setProducts(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      {products?.length > 0 ? (
        <Flex align="center" justify="center" marginTop="4px">
          <Grid
            gap={4}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
          >
            {products.map((product) => (
              <Box
                h="90%"
                borderWidth={1}
                position="relative"
                shadow="base"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Suspense fallback={renderLoader()}>
                  <Badge
                    bgColor="brand.900"
                    color="white"
                    position="absolute"
                    top="10px"
                    right="10px"
                  >
                    {product?.category?.name}
                  </Badge>
                  <Link
                    to={{
                      pathname: "/SingleProduct",
                      search: `?id=${product?._id}`,
                    }}
                    onClick={() => {
                      localStorage.setItem("productId", product?._id);
                    }}
                  >
                    <Image
                      cursor={"pointer"}
                      w="100%"
                      h="70%"
                      src={
                        product?.images?.length > 0
                          ? `${BASE_URL}/${product?.images[0]}`
                          : sampleImage
                      }
                      alt="product"
                      p="4"
                    />
                  </Link>
                  <Box px="4" marginTop="-40px" fontSize="14px">
                    <Flex px="5px" align="center" justify="space-between">
                      <Text fontSize="16px" fontWeight="600">
                        ${product?.price}
                      </Text>
                      <Text my="20px" p="-10px 6px">
                        {product?.name}
                      </Text>
                    </Flex>
                    <CartWishlist product={product} />
                  </Box>
                </Suspense>
              </Box>
            ))}
          </Grid>
        </Flex>
      ) : (
        <Flex m="20px" justify="center" fontSize="14px">
          <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
            <Box
              w={["100%", "400px", "500px"]}
              p="20px"
              m="20px"
              bgColor="white"
            >
              <Heading p="20px" textAlign="center">
                {t("NO_PRODUCTS_AVAILABLE")}
              </Heading>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default TypeSearch;
