import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { setPasswword } from "../../redux/slice/authSlice";

export const useSetPasswordHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const ResetPasswordFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(setPasswword(data));

        if (response.type === "auth/resetPassword/fulfilled") {
          succesToast(response?.payload?.message);
          navigation("/Login");
        }

        if (response.type === "auth/resetPassword/rejected") {
          errorToast(response?.payload?.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [dispatch, navigation]
  );

  return [ResetPasswordFunc];
};
