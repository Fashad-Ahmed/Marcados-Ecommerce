import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  Input,
  Button,
  Grid,
  Stack,
  Spacer,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import Heading from "../components/heading";
import StarRating from "../components/starRating";
import { useEffect, useState, useRef } from "react";
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
import React from "react";
import GetStar from "../components/getStar";
import { useSelector } from "react-redux";
const SingleProduct = () => {
  const containerRef = useRef();
  const useQuery = () => new URLSearchParams(location);
  const userId = useSelector((state) => state.data.user);

  const id = localStorage.getItem("productId");
  const { handleSubmit } = useForm();
  const [createReviewFunc] = useCreateReviewHook();

  const location = useLocation().search;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState();
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [isReviewAllowed, setIsReviewAllowed] = useState(true);

  const onSubmit = () => {
    setIsReviewSubmitted(true);
    let formData = {
      productId: id,
      rating: rating,
      comment: comment,
    };
    createReviewFunc(formData)
      .then(() => {
        fetchReviews();
      })
      .finally(() => {
        setIsReviewSubmitted(false);
      });
  };

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
    window.scrollTo(0, 0);
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let response = await get(
        `${configs.endpoints.shop.getReview}?productId=${id}`
      );
      setReview(response?.data);
      for (const review of response?.data) {
        console.log(
          "========>",
          review?.user?._id == userId?.email?.payload?.data?._id
        );
        if (review?.user?._id == userId?.email?.payload?.data?._id) {
          setIsReviewAllowed(false);
        }
      }

      setLoading(false);
    } catch (error) {
      errorToast(error);
      setLoading(false);
    }
  };

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

  if (loading || !review) return <Loader />;

  return (
    <>
      <Heading mainText={"PRODUCT"} />
      <Flex
        justify=""
        flexWrap="wrap"
        mx={["20px", "20px", "10%"]}
        alignItems="center"
      >
        <Flex w={["100%", "100%", "40%"]}>
          {/* {product?.images?.length > 1 ? ( */}
          {/* <Slider {...settings} style={{ width: "100%", overflow: "hidden" }}>
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
          </Slider> */}
          {/* // ) : ( */}
          <Image
            src={`${BASE_URL}/${product?.images[0]}`}
            w="8  0%"
            h="80%"
            alt="singleProduct"
          />
          {/* // )} */}
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

      {/*  */}
      {isReviewAllowed ? (
        <>
          <Heading ReviewText={"Add Review"} />

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mx={["20px", "20px", "10%"]}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex alignItems="center">
                <Input
                  type="text"
                  fontSize="14px"
                  color="black"
                  borderRadius="16px"
                  w="500px"
                  h="40px"
                  border="2px solid darkgreen"
                  borderColor="darkgreen"
                  variant="unstyled"
                  ml="40px"
                  px={3}
                  pl={3}
                  placeholder="Add a review ..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  _placeholder={{
                    color: "darkgreen",
                    fontSize: "16px",
                  }}
                />

                <Flex alignItems="center" marginLeft="140px">
                  <StarRating rating={rating} onRate={setRating} />
                  {isReviewSubmitted ? (
                    <Flex
                      fontSize="14px"
                      borderRadius="8px"
                      border="2px solid brand.900"
                      bgColor="darkgreen"
                      color="white"
                      w="140px"
                      ml="30px"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Spinner color="white" />
                    </Flex>
                  ) : (
                    <Button
                      type="submit"
                      fontSize="14px"
                      borderRadius="8px"
                      border="2px solid brand.900"
                      bgColor="darkgreen"
                      color="white"
                      w="140px"
                      ml="30px"
                      _hover={{ bgColor: "orange.400" }}
                    >
                      Submit
                    </Button>
                  )}
                </Flex>
              </Flex>
            </form>
          </Flex>
        </>
      ) : null}
      {/*  */}
      <Heading ReviewText={"Testimonials"} />
      {review?.length > 0 ? (
        <Flex
          flexDirection="column"
          ref={containerRef}
          justifyContent="space-between"
          flexWrap="wrap"
          mx={["20px", "20px", "10%"]}
          mb="5%"
        >
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
              {review.map((item, index) => (
                <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                  <Stack spacing={3}>
                    <Flex
                      align="center"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Text fontWeight="bold">{item?.user?.fullName}</Text>
                      <Spacer />
                      <GetStar rating={item?.rating} />
                    </Flex>
                    <Divider />
                    <Text fontStyle="italic">{item?.comment}</Text>
                  </Stack>
                </Box>
              ))}
            </Grid>
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" mb={"10"}>
          <Text fontSize="18px" fontWeight="600">
            No Reviews Available
          </Text>
        </Flex>
      )}
    </>
  );
};

export default SingleProduct;
