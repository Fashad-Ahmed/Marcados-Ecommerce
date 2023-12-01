import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { handlePayment } from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";

export const useHandlePayment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handlePayment = useCallback(async (data) => {
    dispatch(handlePayment(data)).then((response) => {
      navigation("/Home");
    });
  }, []);

  return [handlePayment];
};
