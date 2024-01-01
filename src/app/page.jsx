"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "../hooks/index";
import { checkAuthToken, setAdminThunk } from "../store/auth/thunks";
import { AuthRoutes, LoginPages } from "../auth/pages/LoginPages";
import { BikeRoutes } from "../bikeMain/routes/BikeRoutes";

export default function Page() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (document.location.href.includes("debugMode=true")) {
      dispatch(setAdminThunk());
    }
    dispatch(checkAuthToken());
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return <LoginPages />;
}
