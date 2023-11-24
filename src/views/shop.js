// Shop.js
import { useEffect, useState } from "react";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
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
import { useTranslation } from "react-i18next";

const Shop = () => {
  const { t } = useTranslation("common");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState("");

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

  const fetchPriceProducts = async (prices) => {
    setLoading(true);
    try {
      let response = await get(configs.endpoints.shop.product, {
        "price[min]": prices[0],
        "price[max]": prices[1],
      });
      setProducts(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
    setCurrent("Price");
  };

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      let response = await get(configs.endpoints.shop.product, {
        category: [selectedCategories],
      });
      setProducts(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
    setCurrent("Category");
  };

  const handleFilters = (filters) => {
    if (!current) {
      errorToast(t("SFTP"));
    }

    if (current == "Price") {
      fetchPriceProducts(filters?.price);
    }
    if (current == "Category") {
      fetchCategoryProducts();
    }
    // setSelectedCategories(filters.categories);
    // let filterResult = filterProducts(products, filters);
    // setProducts(filterResult);
  };

  const clearFilters = () => {
    fetchCategory();
    fetchProducts();
    setSelectedCategories("");
  };

  if (loading) return <Loader />;

  return (
    <Box>
      <Flex my="5%" mx={["20px", "20px", "10%"]} flexWrap="wrap">
        <ShopFilters
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          handleFilters={handleFilters}
          clearFilters={clearFilters}
          current={current}
          setCurrent={setCurrent}
        />

        <Box w={["100%", "100%", "auto"]} flex="1">
          {products?.length > 0 ? (
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
                products?.map((product) => {
                  return <Product key={product.id} product={product} />;
                })
              ) : (
                <Loader />
              )}
            </Grid>
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
        </Box>
      </Flex>
    </Box>
  );
};

export default Shop;
