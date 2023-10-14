import { Badge, Box, Flex, Image, Text, Input, Button } from "@chakra-ui/react";
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

  const userId = useSelector((state) => state?.user?.email?.payload?.data?._id);
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

  const userReviewExists = fetchReviews.some((item) => item.user.id === userId);
  if (userReviewExists) {
    return null; 
  }
  


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
  if (!review || review.length === 0) {
    return <div>Loading...</div>;
  }
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

      {/* <Heading ReviewText={"Reviews"} />
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        flexWrap="wrap"
        mx={["60px", "40px", "20%"]}
        mb="5%"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems="center">
            <Flex alignItems="center">
              <StarRating rating={rating} onRate={setRating} />
            </Flex>
            <Input
              type="text"
              fontSize="14px"
              color="black"
              borderRadius="8px"
              w="100%"
              h="40px" // Increase the height
              border="2px solid darkgreen" // Specify border style
              borderColor="darkgreen"
              variant="unstyled"
              ml="40px"
              px={3}
              pl={3} // Increase the padding-left to show placeholder text fully
              placeholder="Feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              _placeholder={{
                color: "darkgreen",
                fontSize: "16px",
              }}
            />
            <Flex alignItems="center">
              <Button
                type="submit"
                fontSize="14px"
                borderRadius="8px"
                border="2px solid brand.900"
                bgColor="darkgreen"
                color="white"
                w="100%"
                ml="30px"
                _hover={{ bgColor: "orange.400" }}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex> */}
      <Heading ReviewText={"Testimonials"} />
      <Flex
        flexDirection="column"
        ref={containerRef}
        justifyContent="space-between"
        flexWrap="wrap"
        mx={["20px", "20px", "10%"]}
        mb="5%"
      >
        {review.map((item, index) => (
          <Flex key={index} flexDirection="column" mb="20px">
            <Text fontSize="25px" fontWeight="600">
              User Name: {item.user.fullName}
            </Text>
            <Flex flexDirection="row">
              <Text fontSize="25px" fontWeight="600" ml="10px">
                Comment: {item.comment}
              </Text>
              <GetStar rating={item.rating} />
            </Flex>
          </Flex>
        ))}
        {loading && <div>Loading...</div>}
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
