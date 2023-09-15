import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { login, userLogin } from "../../redux/slice/authSlice";

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
          dispatch(userLogin(response));
          navigation("/Home");
        }

        if (response.type === "auth/login/rejected") {
          console.log(JSON.stringify(response));

          errorToast("Login failed");
        }
      } catch (error) {
        errorToast("An error occurred during login");
      }
    },
    [dispatch, navigation]
  );

  return loginFunc;
};
