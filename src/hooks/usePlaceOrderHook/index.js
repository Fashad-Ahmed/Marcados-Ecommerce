import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/slice/cartSlice";

export const usePlaceOrderHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const checkoutFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(createOrder(data));

        if (response.type === "create/order/fulfilled") {
          succesToast(response?.payload?.message);
          navigation("/Home");
        }

        if (response.type === "create/order/rejected") {
          console.log(JSON.stringify(response));

          errorToast("checkout failed");
        }
      } catch (error) {
        errorToast("An error occurred during checkout");
      }
    },
    [dispatch, navigation]
  );

  return checkoutFunc;
};