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
import React, { useState, Suspense } from "react";
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

const Product = React.lazy(() => import("../components/product"));

const Home = () => {
  const user = useSelector((state) => state.data.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(
    user?.email?.payload?.token ? user?.email?.payload?.data?.email : ""
  );
  const [isLoading, setIsLoading] = useState(false);

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
              backgroundImage={`url(${bgsofas2})`}
              backgroundSize="cover"
              bgPosition="50%, 75%"
              alt="bgImage"
            ></Box>
          </Suspense>
        </Box>
        <HeroSection
          mainText={"Minimalistic and Modern Interior."}
          subText={
            "Upgrade your personality with our quality products. You can never go wrong with any of our products."
          }
        />
      </Flex>

      <Box fontSize="14px" px={[null, "10px", "5%", "10%"]} m="5% 0 50px 0">
        <Heading
          mainText={"GET AWESOME DISCOUNTS ON ALL PURCHASE"}
          subText={"Offers, Incentives and discounts all for you."}
        />
        <Flex
          justify="space-between"
          flexWrap="wrap"
          px={["20px", "20px", null]}
        >
          <Link
            href="/Shop"
            w={["100%", "48%", "32%"]}
            textAlign="right"
            backgroundImage={`url(${bg1})`}
            bgSize="cover"
            my={["15px", null]}
          >
            <Box p="50px">
              <Text fontWeight="600" color="white">
                MEAT
              </Text>
              <Text fontWeight="600" color="brand.900" mb="20px">
                <Badge colorScheme="green">SAVE 30%</Badge>
              </Text>
            </Box>
          </Link>
          <Link
            href="/Shop"
            w={["100%", "48%", "32%"]}
            textAlign="right"
            backgroundImage={`url(${bg2})`}
            bgSize="cover"
            my={["15px", null]}
          >
            <Box p="50px">
              <Text fontWeight="600" color="white">
                FRUITS
              </Text>
              <Text fontWeight="600" color="brand.900" mb="20px">
                <Badge colorScheme="green">SAVE 50%</Badge>
              </Text>
            </Box>
          </Link>
          <Link
            href="/Shop"
            w={["100%", "48%", "32%"]}
            textAlign="right"
            backgroundImage={`url(${bg3})`}
            bgSize="cover"
            my={["15px", null]}
          >
            <Box p="50px">
              <Text fontWeight="600" color="white">
                VEGETABLES
              </Text>
              <Text fontWeight="600" color="brand.900" mb="20px">
                <Badge colorScheme="green">SAVE 20%</Badge>
              </Text>
            </Box>
          </Link>
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
          {data.products.map((product) => {
            return (
              <Suspense key={product.id} fallback={<div>Loading...</div>}>
                <Product key={product.id} product={product} />
              </Suspense>
            );
          })}
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
