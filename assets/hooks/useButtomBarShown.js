import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSlice } from "../redux/auth/authReducer";

export const useButtomBarShown = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSlice.actions.buttomBarShown(false));
    return () => {
      dispatch(authSlice.actions.buttomBarShown(true));
    };
  }, []);
};
