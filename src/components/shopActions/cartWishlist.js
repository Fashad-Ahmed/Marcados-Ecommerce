import { Button, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FaHeart, FaMinus } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../redux/slice/cartSlice";
import { addProductToWishlist, removeProductFromWishlist } from "../../redux/slice/wishlistSlice";
import ChangeQuantity from "./changeQuantity";

const CartWishlist = ({ product }) => {
    const [cartIds, setCartIds] = useState()
    const [wishlistIds, setWishlistIds] = useState()
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.data.cart.cart)
    const wishlist = useSelector((state) => state.data.wishlist.wishlist)
    console.log('WISHLIST REDUX', wishlist);
    useEffect(() => {
        // if (cart && wishlist) {
        setCartIds(cart.map(element => element._id))
        setWishlistIds(wishlist.map(element => element._id))
        // }
    }, [cart, wishlist])

    return (
        <Flex mt="30px" w="100%">
            {
                cartIds &&
                    (cartIds.indexOf(product._id) !== -1) ?
                    <Flex flex="1" align="center">
                        <Button flex="1" me="5px" fontSize="14px" bgColor="gray.100" borderRadius="0" onClick={() => dispatch(removeProductFromCart(product._id))}><FaMinus /></Button>
                        <ChangeQuantity product={product} />
                    </Flex>
                    :
                    <Button flex="1" fontSize="14px" bgColor="gray.100" borderRadius="0" onClick={() => dispatch(addProductToCart(product))}><FiShoppingCart /></Button>
            }
            {
                wishlistIds &&
                    (wishlistIds.indexOf(product._id) !== -1) ?
                    <Button fontSize="14px" bgColor="gray.100" color="red" borderRadius="0" ms="1" onClick={() => dispatch(removeProductFromWishlist(product._id))}><FaHeart /></Button>
                    :
                    <Button fontSize="14px" bgColor="gray.100" borderRadius="0" ms="1" onClick={() => dispatch(addProductToWishlist(product._id))}><FiHeart /></Button>
            }

        </Flex>
    )
}

export default CartWishlist;