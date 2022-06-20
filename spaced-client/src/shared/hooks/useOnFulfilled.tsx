import { AsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import { useAppDispatch } from "../../redux/store";

export const useOnFulfilled = () => {
  const dispatch = useAppDispatch();

  const isFulfilled = async (
    asyncFunction: AsyncThunk<any, any, {}>,
    body?: any,
    cbSuccess?: Function,
    cbFailure?: Function
  ) => {
    const result = await dispatch(asyncFunction(body));
    if (!asyncFunction.fulfilled.match(result)) {
      if (cbFailure) cbFailure();
      return;
    }
    if (cbSuccess) cbSuccess(result.payload);
  };
  return { isFulfilled };
};
