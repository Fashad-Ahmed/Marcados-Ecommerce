import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { succesToast, errorToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../redux/slice/authSlice";

export const useChangePasswordHook = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const changePasswordFunc = useCallback(
        async (data) => {
            try {
                const response = await dispatch(changePassword(data));
                if (response.type === "user/changePassword/fulfilled") {
                    succesToast(response?.payload?.message);
                    navigation("/");
                }
                if (response.type === "user/changePassword/rejected") {
                    console.log(JSON.stringify(response));
                    errorToast(response?.error?.message);
                }
            } catch (error) {
                console.log("An error occurred");
            }
        },
        [dispatch, navigation]
    );

    return [changePasswordFunc];
};
