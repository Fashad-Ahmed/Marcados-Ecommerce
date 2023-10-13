import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { createReview } from "../../redux/slice/authSlice";

export const useCreateReviewHook = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const createReviewFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(createReview(data));
        if (response.type === "inquiry/createReview/fulfilled") {
          succesToast(response?.payload?.message);
          navigation("/");
        }
        if (response.type === "inquiry/createReview/rejected") {
          console.log(JSON.stringify(response));
          errorToast(response?.payload?.message);
        }
      } catch (error) {
        console.log("An error occurred");
      }
    },
    [dispatch, navigation]
  );

  return [createReviewFunc];
};
