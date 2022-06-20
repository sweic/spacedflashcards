import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "./auth";
import axios from "axios";
axios.defaults.withCredentials = true;
const endpointURL = "http://localhost:5000";

interface ApplicationAPI {
  loading: LoadingStatus;
  error: boolean;
  type: "FETCH" | "VERIFY" | null;
}

const initialState: ApplicationAPI = {
  loading: "idle",
  error: false,
  type: null,
};

export const apiRequest = createAsyncThunk(
  "api/apiRequest",
  async (body: any, { dispatch, rejectWithValue }) => {
    const { method, url, data, type } = body;
    if (method === "GET") {
      return axios
        .get(`${endpointURL}/${url}`, { timeout: 10000 })
        .then((res) => {
          dispatch(apiSuccess({ payload: res, type }));
          return res.data;
        })
        .catch((error) => {
          dispatch(apiFailed({ payload: body, error }));
          return rejectWithValue("not found");
        });
    } else if (method === "POST") {
      return axios
        .post(`${endpointURL}/${url}`, data)
        .then((res) => {
          dispatch(apiSuccess({ payload: res, type }));
          return res.data;
        })
        .catch((error) => {
          dispatch(apiFailed({ payload: body, error }));
          return rejectWithValue("not found");
        });
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    apiFailed(state, payload) {
      state.error = true;
      state.loading = "idle";
    },
    apiSuccess(state, action) {
      state.error = false;
      state.loading = "idle";
      state.type = null;
    },
    apiLoading(state, action) {
      state.error = false;
      state.loading = "pending";
      state.type = action.payload;
    },
  },
});
export const { apiFailed, apiSuccess, apiLoading } = apiSlice.actions;
export default apiSlice.reducer;
