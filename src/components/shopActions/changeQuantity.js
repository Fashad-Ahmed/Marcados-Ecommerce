import { Button, Flex } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity } from "../../redux/slice/cartSlice";

const ChangeQuantity = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.data.cart.cart);
    const cartItem = useSelector((state) => state.data.cart.cart.find(item => item._id === product._id));

    return (
        <Flex justify="flex-end" border="1px solid #e4e4e4" p="3px">
            <Button
                size="sm"
                borderColor="gray.100"
                fontSize="10px"
                borderRadius="0"
                p="1"
                onClick={() => dispatch(increaseCartQuantity(product._id))}>
                <FaPlus />
            </Button>

            {
                cart.filter(item => (item._id === product._id)).map((element, index) => {
                    console.log(element);
                    return (
                        <Button
                            key={index}
                            size="sm"
                            type="number"
                            borderColor="gray.100"
                            fontSize="12px"
                            borderRadius="0"
                            bgColor="whiteAlpha.500"
                            w="40px">
                            {cartItem ? cartItem.quantity : 1}
                        </Button>
                    )
                })
            }

            <Button
                size="sm"
                borderColor="gray.100"
                fontSize="10px"
                borderRadius="0"
                p="1"
                onClick={() => dispatch(decreaseCartQuantity(product._id))}>
                <FaMinus />
            </Button>
        </Flex>
    )
}

export default ChangeQuantity;