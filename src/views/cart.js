import { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Heading from "../components/heading";
import { FaHandPointDown } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  addDiscount,
  addDiscountId,
  removeProductFromCart,
} from "../redux/slice/cartSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ChangeQuantity from "../components/shopActions/changeQuantity";
import sampleImage from "../assets/imgs/sample.jpeg";
import { errorToast, succesToast } from "../utils/toast";
import { get } from "../api";
import configs, { BASE_URL } from "../redux/config";
import { putCoupon } from "../redux/slice/authSlice";
import LoginModal from "../components/modal/LoginModal";

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const cart = useSelector((state) => state.data.cart.cart);
  const discountedValue = useSelector((state) => state.data.cart.discountValue);

  const token = useSelector((state) => state.data.user.userToken);
  const discountID = useSelector((state) => state?.data?.cart?.discountId);

  const [subTotal, setSubTotal] = useState(0);
  const [coupon, setCoupon] = useState();
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let subTotalSum = 0;

    cart?.map((item) => {
      return (subTotalSum += item.price * (item.quantity || 1));
    });
    setSubTotal(subTotalSum);
  }, [setSubTotal, cart]);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleApplyCoupon = async () => {
    if (!token) {
      openModal();
      return;
    }
    if (!coupon) {
      errorToast("Please enter coupon");
      return;
    }

    if (discountID?.length > 0) {
      errorToast("Coupon has already been applied");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(
        putCoupon({
          title: coupon,
        })
      );
      if (response.type === "coupon/putCoupon/fulfilled") {
        console.log("response?.payload?.data", response?.payload?.data);

        if ((subTotal / 100) * response?.payload?.data?.percent < subTotal) {
          if (discount < 100) {
            succesToast(`${response?.payload?.data?.title} Coupon Applied`);
            dispatch(addDiscount(response?.payload?.data?.percent));
            dispatch(addDiscountId(response?.payload?.data?._id));
            setDiscount(response?.payload?.data?.percent);
          } else {
            errorToast("Coupon Price limit reached");
          }
        }
      }
      if (response.type === "coupon/putCoupon/rejected") {
        console.log(response);
        errorToast(response?.error?.message);
      }
    } catch (e) {
      errorToast(e.message);
    }

    setLoading(false);
    // try {
    //   await get(configs.endpoints.checkout.applyCoupon)
    //     .then((response) => {
    //       console.log(response?.data);
    //       response?.data?.map((item) => {
    //         if (item?.active && item?.title == coupon) {
    //           if ((subTotal / 100) * item?.percent < subTotal) {
    //             if (discount < 100) {
    //               succesToast(`${item?.title} Coupon Applied`);
    //               dispatch(addDiscount(item?.percent));
    //               setDiscount(item?.percent);
    //             } else {
    //               errorToast("Coupon Price limit reached");
    //             }
    //           }
    //         }
    //       });
    //     })
    //     .catch((error) => {
    //       errorToast(error?.message);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleClick = () => {
    if (!token) {
      openModal();
      return;
    }

    if (token) {
      if (cart?.length > 0) {
        let val = discountedValue
          ? (subTotal / 100) * discountedValue
          : subTotal;
        localStorage.setItem("amount", val);
        navigation("/checkout");
      } else {
        errorToast("Please add products to cart");
      }
    } else {
      // popup to signin
    }
  };
  return (
    <Box py="50px" px={["20px", "20px", "10%"]}>
      {isModalOpen && (
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          message="You need to login to perform payment checkout"
        />
      )}

      <Heading
        mainText={"MY CART"}
        subText={"Finish up the order and get a reward."}
      />

      <Flex flexWrap="wrap" justifyContent="center">
        <Box w={["100%", "100%", "60%"]} fontSize="14px">
          <Box p="20px" bgColor="#f3f3f3">
            {cart && cart?.length === 0 ? (
              <Text p="30px" bgColor="white">
                Your Cart is empty. Add products from the{" "}
                <Link href="/shop" color="brand.900">
                  Shop
                </Link>
              </Text>
            ) : (
              cart?.map((product) => {
                return (
                  <Flex
                    key={product?._id}
                    align="center"
                    borderBlock="1px solid #f3f3f3"
                    bgColor="white"
                    p="10px"
                  >
                    <RouterLink
                      to={{
                        pathname: "/singleProduct",

                        search: `?id=${product?._id}`,
                      }}
                    >
                      <Image
                        w={["100px"]}
                        src={
                          product?.images?.length > 0
                            ? `${BASE_URL}/${product?.images[0]}`
                            : sampleImage
                        }
                        alt="product"
                      />
                    </RouterLink>
                    <Box p="30px 10px" flex="1">
                      <Text fontWeight="bold">{product?.name}</Text>
                      <Flex
                        justify="space-between"
                        align="flex-end"
                        flexWrap="wrap"
                        w="100%"
                        mt="2"
                      >
                        <Text>{product?.category?.name}</Text>
                        <FiTrash
                          onClick={() => {
                            dispatch(removeProductFromCart(product?._id));
                          }}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </Flex>
                      <Flex
                        justify="space-between"
                        align="flex-end"
                        flexWrap="wrap"
                        w="100%"
                        mt="4"
                      >
                        <Text fontSize="18px" fontWeight="bold">
                          ${product?.price}
                        </Text>
                        <ChangeQuantity product={product} />
                      </Flex>
                    </Box>
                  </Flex>
                );
              })
            )}

            <Box justify="space-between" p="10px 0">
              <Flex p="3" pt="5%">
                <Text>Have a coupon code? Enter here </Text>
                <Text color="brand.900" p="5px 10px">
                  <FaHandPointDown />
                </Text>
              </Flex>
              <Flex
                align="center"
                w="100%"
                p="2px"
                mb="5%"
                border="1px"
                bgColor="white"
                borderColor="gray.100"
                borderRadius="0"
              >
                <Input
                  placeholder="Enter code"
                  fontSize="14px"
                  borderRadius="0"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                {loading ? (
                  <Button
                    bgColor="gray.100"
                    fontSize="14px"
                    p="12px 25px"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="0"
                    disabled={true}
                  >
                    <Spinner />
                  </Button>
                ) : (
                  <Button
                    onClick={handleApplyCoupon}
                    bgColor="gray.100"
                    fontSize="14px"
                    p="12px 25px"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="0"
                  >
                    Apply coupon
                  </Button>
                )}
              </Flex>

              {/* <Flex justify="space-between" bgColor="white" p="15px">
                <Text>Subtotal</Text>
                <Text as="b">${subTotal}</Text>
              </Flex> */}
              {/* <Flex justify="space-between" bgColor="white" p="15px">
                <Text>Delivery</Text>
                <Text as="b">$50.90</Text>
              </Flex> */}
              <Flex justify="space-between" bgColor="white" p="15px">
                <Text>Discount</Text>
                <Text as="b">{discountedValue ? discountedValue : 0}%</Text>
              </Flex>

              <Divider />

              <Flex justify="space-between" bgColor="white" p="15px">
                <Text>Sub Total:</Text>
                <Text as="b" fontSize="20px" color="brand.900">
                  $
                  {discountedValue
                    ? (subTotal / 100) * discountedValue
                    : subTotal}
                </Text>
              </Flex>
            </Box>

            <Flex m="20px 0" bgColor="white" p="10px">
              <Button
                p="12px"
                w="100%"
                textAlign="center"
                borderRadius="2px"
                color="white"
                bgColor="brand.900"
                onClick={() => {
                  handleClick();
                }}
              >
                Checkout now
              </Button>
            </Flex>
          </Box>
        </Box>
        {/* 
        <Box
          w={["100%", "100%", "36%"]}
          border="1px solid #f4f4f4"
          fontSize="14px"
          p="20px"
          mx="2%"
        >
          <Text fontWeight="700" fontSize="18px" mb="3" color="brand.900">
            ORDER NOW
          </Text>
        </Box> */}
      </Flex>
    </Box>
  );
};

export default Cart;
