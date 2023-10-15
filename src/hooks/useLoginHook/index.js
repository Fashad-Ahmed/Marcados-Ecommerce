import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { login, setToken, userLogin } from "../../redux/slice/authSlice";

export const useLoginHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const loginFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(login(data));

        if (response.type === "auth/login/fulfilled") {
          succesToast(response?.payload?.message);
          localStorage.setItem("token", response?.payload?.token);
          console.log("response from", response?.payload);
          dispatch(setToken(response?.payload?.token));
          dispatch(userLogin(response?.payload?.data));
          navigation("/Home");
        }

        if (response.type === "auth/login/rejected") {
          console.log("response", response);

          errorToast(response?.error?.message);
        }
      } catch (error) {
        errorToast("An error occurred during login");
      }
    },
    [dispatch, navigation]
  );

  return loginFunc;
};
