import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { login, setToken, userLogin } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";

export const useLoginHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const loginFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(login(data));

        if (response.type === "auth/login/fulfilled") {
          succesToast(response?.payload?.message);
          localStorage.setItem("token", response?.payload?.token);
          dispatch(setToken(response?.payload?.token));
          dispatch(userLogin(response?.payload?.data));
          navigation("/Home");
        }

        if (response.type === "auth/login/rejected") {
          errorToast(response?.error?.message);
        }
      } catch (error) {
        errorToast(t("LOGIN_ERROR"));
      }
    },
    [dispatch, navigation]
  );

  return loginFunc;
};
