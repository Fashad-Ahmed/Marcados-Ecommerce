import { useEffect, useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg1 from "../assets/imgs/bg1.webp";
import bg2 from "../assets/imgs/bg2.webp";
import bg3 from "../assets/imgs/bg3.webp";
import { useSelector } from "react-redux";
import Product from "../components/product";
import ShopFilters from "../components/shopActions/shopFilter";
import { shopSliderSettings } from "../utils/sliderSettings";
import { filterProducts } from "../utils/filterProducts";
import configs from "../redux/config";
import { get } from "../api";
import { errorToast } from "../utils/toast";
import Loader from "../components/loader/loader";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultProducts = useSelector((state) => state.data.products);

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  const fetchCategory = async () => {
    try {
      let response = await get(configs.endpoints.shop.categories);
      setCategories(response?.data);
    } catch (error) {
      errorToast(error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response = await get(configs.endpoints.shop.product);
      setProducts(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  };
  const handleFilters = (filters) => {
    setSelectedCategories(filters.categories);
    let filterResult = filterProducts(defaultProducts, filters);
    setProducts(filterResult);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  if (loading) return <Loader />;

  return (
    <Box>
      <Flex justify="center" w="100%">
        <Slider
          {...shopSliderSettings}
          style={{ width: "100%", overflow: "hidden", display: "flex" }}
        >
          <Box
            w="100%"
            h="250px"
            backgroundImage={`url(${bg1})`}
            backgroundSize="cover"
            bgPosition="50%, 75%"
          >
            <Box
              float="right"
              p="5% 30px"
              lineHeight="40px"
              fontSize="0.8rem"
              w={["50%"]}
            >
              <Text mt="30px" fontSize="20px" fontWeight="700" color="white">
                Get as low as 60% discount
              </Text>
            </Box>
          </Box>
          <Box
            w="100%"
            h="250px"
            backgroundImage={`url(${bg2})`}
            backgroundSize="cover"
            bgPosition="50%, 75%"
          >
            <Box
              float="right"
              p="5% 30px"
              lineHeight="40px"
              fontSize="0.8rem"
              w={["50%"]}
            >
              <Text mt="30px" fontSize="20px" fontWeight="700" color="white">
                Free delivery when you purchase
              </Text>
            </Box>
          </Box>
          <Box
            w="100%"
            h="250px"
            backgroundImage={`url(${bg3})`}
            backgroundSize="cover"
            bgPosition="50%, 75%"
          >
            <Box
              float="right"
              p="5% 30px"
              lineHeight="40px"
              fontSize="0.8rem"
              w={["50%"]}
            >
              <Text mt="30px" fontSize="20px" fontWeight="700" color="white">
                Flash sales ongoing
              </Text>
            </Box>
          </Box>
        </Slider>
      </Flex>

      <Flex my="5%" mx={["20px", "20px", "10%"]} flexWrap="wrap">
        <ShopFilters
          categories={categories}
          selectedCategories={selectedCategories}
          handleFilters={handleFilters}
          clearFilters={clearFilters}
        />

        <Box w={["100%", "100%", "auto"]} flex="1">
          <Grid
            gap={4}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
          >
            {!loading ? (
              products.map((product) => {
                return <Product key={product.id} product={product} />;
              })
            ) : (
              <Loader />
            )}
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default Shop;
