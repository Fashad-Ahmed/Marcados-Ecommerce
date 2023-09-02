import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { infoToast, showToast } from "../../redux/Api/HelperFunction";
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
          infoToast(response?.payload?.message);
          localStorage.setItem("token", response?.payload?.token);
          dispatch(login());
          // navigation.navigate("DrawerNavigator");
        }

        if (response.type === "auth/login/rejected") {
          console.log(JSON.stringify(response));

          showToast("Login failed");
        }
      } catch (error) {
        showToast("An error occurred during login");
      }
    },
    [dispatch, navigation]
  );

  return loginFunc;
};
