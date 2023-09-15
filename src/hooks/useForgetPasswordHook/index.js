import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/slice/authSlice";

export const useForgetPasswordHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const forgetPasswordFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(forgetPassword(data));

        if (response.type === "auth/forgetPassword/fulfilled") {
          succesToast(response?.payload?.message);
        }

        if (response.type === "auth/forgetPassword/rejected") {
          console.log(JSON.stringify(response));
          errorToast(response?.payload?.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [dispatch, navigation]
  );

  return [forgetPasswordFunc];
};
