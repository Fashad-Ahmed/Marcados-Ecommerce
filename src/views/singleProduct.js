import { Badge, Box, Flex, Image, Text, Input, Button } from "@chakra-ui/react";
import Heading from "../components/heading";
import StarRating from "../components/starRating";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import CartWishlist from "../components/shopActions/cartWishlist";
import configs, { BASE_URL } from "../redux/config";
import { errorToast } from "../utils/toast";
import { get, post } from "../api";
import sampleImage from "../assets/imgs/tv-base/product01-03.webp";
import Loader from "../components/loader/loader";
import { useCreateReviewHook } from "../hooks/useCreateReviewHook";
import { useForm } from "react-hook-form";

const SingleProduct = () => {
  const { handleSubmit } = useForm();
  const [createReviewFunc] = useCreateReviewHook();
  const onSubmit = () => {
    let formData = {
      productId: id,
      rating: rating,
      comment: comment,
    };
    // console.log(" data", formData);
    createReviewFunc(formData);
  };
  const location = useLocation().search;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState();
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(false);
  const useQuery = () => new URLSearchParams(location);
  const id = localStorage.getItem("productId");
  // console.log(id);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      let response = await get(`${configs.endpoints.shop.productDetail}/${id}`);
      console.log("response", response);
      setProduct(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let response = await get(
        `${configs.endpoints.shop.getReview}?productId=${id}`
      );
      console.log("reviewsssssssss", response);
      setReview(response?.data);
      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  var settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    speed: 500,
    initialSlide: 2,
    infinite: true,
    arrows: false,
  };

  if (loading) return <Loader />;

  return (
    <>
      <Heading mainText={"PRODUCT"} />
      <Flex justify="" flexWrap="wrap" mx={["20px", "20px", "10%"]} mb="5%">
        <Flex w={["100%", "100%", "40%"]}>
          {product?.images?.length > 1 ? (
            <Slider {...settings} style={{ width: "100%", overflow: "hidden" }}>
              {product?.images?.map((item, index) => {
                return (
                  <Image
                    src={`${BASE_URL}/${item}`}
                    key={index}
                    w="100%"
                    h="100%"
                    alt="singleProduct"
                  />
                );
              })}
            </Slider>
          ) : (
            <Image
              src={`${BASE_URL}/${product?.images[0]}`}
              w="8  0%"
              h="80%"
              alt="singleProduct"
            />
          )}
        </Flex>

        <Box w={["100%", "100%", "60%"]} px={["0", "0", "10%"]}>
          <Text fontSize="20px" fontWeight="600">
            {product?.name}
          </Text>
          <Text fontSize="18px" color="gray.500">
            Price: ${product?.price}
            {/* ${product.price - ((product.discountPercentage / 100) * product.price)} */}
            {/* <Badge colorScheme="gray" ms="10px" textDecoration="line-through">${product.price}</Badge> */}
          </Text>
          <Text my="4px" lineHeight="25px">
            {product?.description}
          </Text>
          <CartWishlist product={product} />
        </Box>
      </Flex>

      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        style={{
          backgroundColor: "red",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems="center">
            <Input
              type="text"
              fontSize="14px"
              color="black"
              borderRadius="0"
              border="none"
              variant="unstyled"
              px={3}
              placeholder="Enter your comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <StarRating rating={rating} onRate={setRating} />
            <Button
              type="submit"
              fontSize="14px"
              borderRadius="2px"
              border="1px solid brand.900"
              bgColor="brand.900"
              color="white"
              w="100%"
              mt="6"
              _hover={{ bgColor: "orange.400" }}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
      <Flex alignItems="center">
          <Heading ReviewText={"Reviews"} />

          <Text fontSize="25px" fontWeight="600" pb="20px" ml="10px">
            {}
          </Text>
          <Text fontSize="25px" fontWeight="600" pb="20px" ml="30px">
            verygood product
          </Text>
          <Text fontSize="25px" fontWeight="600" pb="20px" ml="40px">
            5 rating
          </Text>
        </Flex>
      {/* <Box
        w={["auto", "auto", "50%"]}
        mx={["20px", "20px", "10%"]}
        mb="10%"
        backgroundColor="red"
      >dl;dsklds</Box> */}
    </>
  );
};

export default SingleProduct;
