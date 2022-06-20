import { Loader } from "@mantine/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../redux/reducers/auth";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useOnFulfilled } from "../shared/hooks/useOnFulfilled";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isFulfilled } = useOnFulfilled();
  useEffect(() => {
    if (!auth.user)
      isFulfilled(fetchUser, undefined, undefined, () => navigate("/"));
  }, [dispatch]);

  return <>{auth.loading !== "success" ? <Loader /> : children}</>;
}

export default ProtectedRoute;
