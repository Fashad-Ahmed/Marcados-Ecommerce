import {
  Badge,
  Box,
  Flex,
  Grid,
  Image,
  Input,
  Link,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, Suspense, useEffect } from "react";
import bgsofas2 from "../assets/imgs/bgsofas.webp";
import bg from "../assets/imgs/bg.jpg";
import bg1 from "../assets/imgs/bg1.webp";
import bg2 from "../assets/imgs/bg2.webp";
import bg3 from "../assets/imgs/bg3.webp";
import Heading from "../components/heading";
import { data } from "../data/products";
import HeroSection from "../components/heroSection";
import Loader from "../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, succesToast } from "../utils/toast";
import { subscribeNewsletter } from "../redux/slice/authSlice";
import configs, { BASE_URL } from "../redux/config";
import { get } from "../api";
import {
  getAbout,
  getDiscountBanner,
  getHomeBanner,
  getPolicy,
  getSocialLinks,
  getTerms,
  getZip,
} from "../redux/slice/generalSlice";
import { updateWislisht } from "../redux/slice/wishlistSlice";

const Product = React.lazy(() => import("../components/product"));

const Home = () => {
  const user = useSelector((state) => state.data.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(
    user?.email?._id ? user?.email?.email : ""
  );
  const banner = useSelector((state) => state?.data?.general?.banner);
  const offer = useSelector((state) => state?.data?.general?.offer);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
    fetchWishlist();
  }, []);

  useEffect(() => {
    dispatch(getHomeBanner());
    dispatch(getDiscountBanner());
    dispatch(getTerms());
    dispatch(getAbout());
    dispatch(getPolicy());
    dispatch(getZip());
    dispatch(getSocialLinks());
  }, []);

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

  const fetchWishlist = async () => {
    try {
      let response = await get(configs.endpoints.user.getWishlist);
      console.log("response", response);
      dispatch(updateWislisht(response?.data));
    } catch (error) {
      errorToast(error);
    }
  };
  const handleNewsLetter = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        subscribeNewsletter({
          email: email,
        })
      );

      if (response.type === "newsletter/subscribe/fulfilled") {
        succesToast(response?.payload?.message);
        setIsLoading(false);
      }

      if (response.type === "newsletter/subscribe/rejected") {
        console.log(response);
        errorToast(response?.error?.message);

        setIsLoading(false);
      }
    } catch (error) {
      errorToast(error);
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Flex justify="flex-end" align="center" position="relative">
        <Box w={["100%", "100%", "70%"]}>
          <Suspense fallback={<Loader />}>
            <Box
              w="100%"
              h="600px"
              backgroundImage={
                banner ? `${BASE_URL}/${banner[0]?.image}` : `url(${bgsofas2})`
              }
              backgroundSize="cover"
              bgPosition="50%, 75%"
              alt="bgImage"
            ></Box>
          </Suspense>
        </Box>
        <HeroSection
          mainText={
            banner ? banner[0]?.title : "Minimalistic and Modern Interior."
          }
          subText={
            banner
              ? banner[0]?.description
              : "Upgrade your personality with our quality products. You can never go wrong with any of our products."
          }
        />
      </Flex>

      <Box fontSize="14px" px={[null, "10px", "5%", "10%"]} m="5% 0 50px 0">
        <Heading
          mainText={"GET AWESOME DISCOUNTS ON ALL PURCHASE"}
          subText={"Offers, Incentives and discounts all for you."}
        />
        <Flex
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          px={["20px", "20px", null]}
        >
          {/* <Grid
            gap={4}
            w="100%"
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
            ]}
          > */}
          {offer?.map((item, index) => (
            <Link
              w={["100%", "48%", "32%"]}
              textAlign="right"
              backgroundImage={
                banner ? `${BASE_URL}/${item?.image}` : `url(${bg2})`
              }
              bgSize="cover"
              my={["15px", null]}
              justifyContent="center"
              alignItems="center"
            >
              <Box py="60px" px="10px">
                <Text fontWeight="600" color="white">
                  {item?.title}
                </Text>
                <Text fontWeight="600" color="brand.900" mb="20px">
                  <Badge colorScheme="green">{item?.description}</Badge>
                </Text>
              </Box>
            </Link>
          ))}
          {/* </Grid> */}
        </Flex>
      </Box>

      <Box px={[null, "20px", "5%", "10%"]}>
        <Heading
          mainText={"HOT DEALS FOR YOU"}
          subText={"Our customers most loved products you can also get."}
        />

        <Grid
          gap={4}
          w="100%"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          {!loading ? (
            products?.slice(0, 4).map((product) => {
              return <Product key={product._id} product={product} />;
            })
          ) : (
            <Loader />
          )}
        </Grid>
      </Box>

      <Box px={[null, "0", "5%", "10%"]} my="5%">
        <Flex justify="space-between" flexWrap="wrap">
          <Box w={[null, "100%", "40%"]} p="5%" ps={["5%", "5%", 0]}>
            <Text fontSize={["20px", "30px"]} fontWeight="700" pb="15px">
              Amazing Fresh Products.
            </Text>
            <Text fontSize="14px" fontWeight="600" mb="35px">
              Purpose of a products is to keep you comfortable and healthy
            </Text>
            <Link
              href="/Shop"
              fontSize="14px"
              p="10px 20px"
              bgColor="brand.900"
              color="white"
              _hover={{ bgColor: "orange.500" }}
            >
              Shop now
            </Link>
          </Box>
          <Image
            src={bg}
            w={[null, "100%", "60%"]}
            alt="bg"
            border="5px"
            borderStyle="solid"
            borderColor="gray.300"
            loading="lazy"
          />
        </Flex>
      </Box>

      <Box bgColor="gray.100" p="5%" fontSize="14px">
        <Heading mainText={"Subscribe To Our Newsletter"} />

        <Flex
          justify="center"
          align="center"
          m="auto"
          w="fit-content"
          p="2px"
          bgColor="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="0"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            fontSize="14px"
            borderRadius="0"
            border="none"
            w={["100%", "100%", "300px"]}
          />

          {!isLoading ? (
            <Link
              bgColor="brand.900"
              p="10px 25px"
              border="1px"
              borderColor="brand.900"
              color="white"
              onClick={() => handleNewsLetter()}
            >
              Subscribe
            </Link>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.900"
              size="lg"
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
