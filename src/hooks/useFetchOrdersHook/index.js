import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getOrders } from "../../redux/slice/cartSlice";

export const useFetchOrdersHook = () => {
  const dispatch = useDispatch();
  const [iceData, setIceData] = useState();

  const getIceFunc = useCallback(async () => {
    dispatch(getOrders()).then((response) => {
      setIceData(response?.payload);
    });
  }, []);

  return [iceData, getIceFunc];
};
