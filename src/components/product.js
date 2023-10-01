import { Suspense } from "react";
import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import StarRating from "./starRating";
import { Link } from "react-router-dom";
import CartWishlist from "./shopActions/cartWishlist";
import Loader from '../components/loader/loader'
import sampleImage from "../assets/imgs/tv-base/product01-03.webp"

const renderLoader = () => <Loader />;

const Product = ({ product }) => {
  return (
    <Box h="80%" b position="relative" shadow="base" justifyContent={'center'} alignItems={'center'}>
      <Suspense fallback={renderLoader()}>
        <Badge
          bgColor="brand.900"
          color="white"
          position="absolute"
          top="10px"
          right="10px"
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
            localStorage.setItem('productId', product?._id)
          }}
        >
          <Image cursor={'pointer'} w="100%" h="60%" src={product?.images?.length > 0 ? product?.images[0] : sampleImage} alt="product" p="4" />
        </Link>
        <Box p="4" fontSize="14px">
          <Flex px="5px" align="center" justify="space-between">
            <Text fontSize="16px" fontWeight="600">
              $
              {product?.price
                // -(product?.discountPercentage / 100) * product?.price}
                // <Badge colorScheme="gray" ms="10px" textDecoration="line-through">
                //   ${product?.price}
                // </Badge>
              }
            </Text>
            <StarRating rating={product?.rating} />
          </Flex>
          <Text my="20px" p="3px 6px">
            {product?.name}
          </Text>

          {/* <Text my="20px" p="3px 6px">
            {product?.description}
          </Text> */}
          <CartWishlist product={product} />
        </Box>
      </Suspense>
    </Box>
  );
};

export default Product;
