import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { createFeedback } from "../../redux/slice/authSlice";

export const useContactUsHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const contactUsFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(createFeedback(data));
        if (response.type === "inquiry/create/fulfilled") {
          succesToast(response?.payload?.message);
          navigation("/");
        }
        if (response.type === "inquiry/create/rejected") {
          console.log(JSON.stringify(response));
          errorToast(response?.payload?.message);
        }
      } catch (error) {
        console.log("An error occurred");
      }
    },
    [dispatch, navigation]
  );

  return [contactUsFunc];
};
