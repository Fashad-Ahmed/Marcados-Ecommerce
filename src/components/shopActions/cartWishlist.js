import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaHeart, FaMinus } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../redux/slice/cartSlice";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/slice/wishlistSlice";
import ChangeQuantity from "./changeQuantity";
import { addWishlist } from "../../redux/slice/authSlice";
import LoginModal from "../modal/LoginModal";
import { useTranslation } from "react-i18next";

const CartWishlist = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.data.cart.cart);
  const wishlist = useSelector((state) => state.data.wishlist.wishlist);
  const token = useSelector((state) => state.data.user.userToken);
  const { t } = useTranslation("common");

  const [cartIds, setCartIds] = useState();
  const [wishlistIds, setWishlistIds] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setCartIds(cart?.map((element) => element?._id));
    setWishlistIds(wishlist?.map((element) => element?._id));
  }, [cart, wishlist]);

  const openModal = () => {
    setModalOpen(true);
  };

  const addToWishlist = async (id) => {
    try {
      const response = await dispatch(addWishlist(id));
      console.log("res", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Flex mt="10px" w="100%">
      {isModalOpen && (
        <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      )}
      {cartIds && cartIds.indexOf(product?._id) !== -1 ? (
        <Flex flex="1" align="center">
          <Button
            flex="1"
            me="5px"
            fontSize="14px"
            bgColor="gray.100"
            borderRadius="0"
            onClick={() => dispatch(removeProductFromCart(product?._id))}
          >
            <FaMinus />
          </Button>
          <ChangeQuantity product={product} />
        </Flex>
      ) : (
        <Button
          flex="1"
          fontSize="14px"
          bgColor="gray.100"
          borderRadius="0"
          onClick={() => dispatch(addProductToCart(product))}
        >
          <FiShoppingCart />
        </Button>
      )}
      {wishlistIds && wishlistIds.indexOf(product?._id) !== -1 ? (
        <Button
          fontSize="14px"
          bgColor="gray.100"
          color="red"
          borderRadius="0"
          ms="1"
          onClick={() => {
            addToWishlist(product?._id);
            dispatch(removeProductFromWishlist(product?._id));
          }}
        >
          <FaHeart />
        </Button>
      ) : (
        <Button
          fontSize="14px"
          bgColor="gray.100"
          borderRadius="0"
          ms="1"
          onClick={() => {
            if (token) {
              addToWishlist(product?._id);
              dispatch(addProductToWishlist(product));
            } else {
              openModal();
            }
          }}
        >
          <FiHeart />
        </Button>
      )}
    </Flex>
  );
};

export default CartWishlist;
