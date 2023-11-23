import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { addDiscount, createOrder, logout } from "../../redux/slice/cartSlice";
import { useTranslation } from "react-i18next";

export const usePlaceOrderHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const checkoutFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(createOrder(data));

        if (response.type === "create/order/fulfilled") {
          dispatch(addDiscount(0));
          dispatch(logout());
          succesToast(response?.payload?.message);
          navigation("/Home");
        }

        if (response.type === "create/order/rejected") {
          errorToast(response?.error?.message);
        }
      } catch (error) {
        errorToast(t("ORDER_PLACEMENT_ERROR"));
      }
    },
    [dispatch, navigation]
  );

  return checkoutFunc;
};
