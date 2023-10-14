import { Suspense } from "react";
import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import StarRating from "./starRating";
import { Link } from "react-router-dom";
import CartWishlist from "./shopActions/cartWishlist";
import Loader from "../components/loader/loader";
import sampleImage from "../assets/imgs/sample.jpeg";
import { BASE_URL } from "../redux/config";

const renderLoader = () => <Loader />;

const Product = ({
  product,
  boxStyleProps,
  badgeStyleProps,
  imageStyleProps,
  smallBoxStyleProps,
}) => {
  return (
    <Box
      h="105%"
      b
      position="relative"
      shadow="base"
      justifyContent={"center"}
      alignItems={"center"}
      {...boxStyleProps}
    >
      <Suspense fallback={renderLoader()}>
        <Badge
          bgColor="brand.900"
          color="white"
          position="absolute"
          top="10px"
          right="10px"
          {...badgeStyleProps}
        >
          {product?.category?.name}
          {/* {product.discountPercentage}% */}
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
            h="200"
            src={
              product?.images?.length > 0
                ? `${BASE_URL}/${product?.images[0]}`
                : sampleImage
            }
            alt="product"
            p="4"
            {...imageStyleProps}
          />
        </Link>
        <Box px="4" fontSize="14px" {...smallBoxStyleProps}>
          <Flex px="5px" align="center" justify="space-between">
            <Text fontSize="16px" fontWeight="600">
              $
              {
                product?.price
                // -(product?.discountPercentage / 100) * product?.price}
                // <Badge colorScheme="gray" ms="10px" textDecoration="line-through">
                //   ${product?.price}
                // </Badge>
              }
            </Text>
            <Text my="20px" p="3px 6px">
              {product?.name}
            </Text>
            {/* <StarRating rating={product?.rating} /> */}
          </Flex>
          <CartWishlist product={product} />
          {/* <Text my="20px" p="3px 6px">
            {product?.description}
          </Text> */}
        </Box>
      </Suspense>
    </Box>
  );
};

export default Product;
