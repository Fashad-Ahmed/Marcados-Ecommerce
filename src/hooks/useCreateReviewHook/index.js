import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { succesToast, errorToast } from "../../utils/toast";
import { createReview } from "../../redux/slice/authSlice";
import { useTranslation } from "react-i18next";

export const useCreateReviewHook = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const createReviewFunc = useCallback(
    async (data) => {
      try {
        const response = await dispatch(createReview(data));
        if (response.type === "inquiry/createReview/fulfilled") {
          succesToast(t("REVIEW_SUBMITTED_SUCCESSFULLY"));
        }
        if (response.type === "inquiry/createReview/rejected") {
          console.log(JSON.stringify(response));
          errorToast(response?.payload?.message);
        }
      } catch (error) {
        console.log("An error occurred");
      }
    },
    [dispatch]
  );

  return [createReviewFunc];
};
