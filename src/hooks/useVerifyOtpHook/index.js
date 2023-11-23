import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { verificationCode } from "../../redux/slice/authSlice";

export const useVerifyOtpHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const verifyOtpFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(verificationCode(data));

        if (response.type === "auth/verificationCode/fulfilled") {
          succesToast(response?.payload?.message);
        }

        if (response.type === "auth/verificationCode/rejected") {
          errorToast(response?.payload?.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [dispatch, navigation]
  );

  return [verifyOtpFunc];
};
