import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { signup } from "../../redux/slice/authSlice";

export const useSignupHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const signUpFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(signup(data));

        if (response.type === "user/create/fulfilled") {
          succesToast(response?.payload?.message);
          navigation("/Login");
        }

        if (response.type === "user/create/rejected") {
          errorToast("Signup failed");
        }
      } catch (error) {
        errorToast("An error occurred during sign up", error);
      }
    },

    [dispatch, navigation]
  );

  return signUpFunc;
};
