import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import {
  addDiscount,
  changePayment,
  createOrder,
  logout,
} from "../../redux/slice/cartSlice";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../redux/config";
import { PAYMENT_TYPE } from "../../utils/stattusEnum";
const { io } = require("socket.io-client");

export const usePlaceOrderHook = () => {
  let openedWindow;
  const userId = useSelector((state) => state?.data?.user?.email?._id);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [socket, setSocket] = useState(null);

  function openChildWindow(response) {
    openedWindow = window.open(
      response?.payload?.payment_link,
      "_blank",
      "rel=noopener noreferrer"
    );

    // Handle case where the child window could not be opened
    if (!openedWindow) {
      console.error("Failed to open the child window.");
      return;
    }

    // Store a reference to the opened window
    window.openedWindow = openedWindow;
  }

  useEffect(() => {
    socketSetup();
  }, []);

  useEffect(() => {
    if (!!socket) {
      socketListener();
    }
  }, [socket]);

  const socketListener = () => {
    socket.on("payment-success", (data) => {
      console.log("Response from payment-success: " + JSON.stringify(data));
      if (!!data?.success) {
        console.log("Response from payment-success", window.openedWindow);
        dispatch(addDiscount(0));
        dispatch(logout());
        navigation("/Home");
      } else {
        console.log("payment by card failed");
        errorToast(t("PAYMENT_FAILED"));
      }
    });
  };

  // console.log("socket connection", socket);

  const socketSetup = (data) => {
    setSocket(io.connect(BASE_URL, { query: { userId } }));

    // socket.on("connect", () => {
    //   console.log("socket.id", socket.id); // x8WIv7-mJelg7on_ALbx
    //   setSocketConnected(true);
    // });
  };

  const checkoutFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(createOrder(data));

        if (response.type === "create/order/fulfilled") {
          if (data?.paymentMethod == PAYMENT_TYPE.COD) {
            dispatch(addDiscount(0));
            dispatch(logout());
            succesToast(response?.payload?.message);
            navigation("/Home");
          }

          if (data?.paymentMethod == PAYMENT_TYPE.CARD) {
            dispatch(changePayment(true));
            openChildWindow(response);
          }
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
