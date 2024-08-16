import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CONSTANT_VALUES from "../../constants";
import { getUserInfoFromDecodedToken, storeToken } from "../../functions";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {
    username: "",
    name: "",
    email: "",
    role: "",
  },
  error: null,
};

const authenticateUser = createAsyncThunk(
  "auth/authenticate",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(CONSTANT_VALUES.AUTH_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });
      const tokenInstance = response.data;
      storeToken(tokenInstance);
      return tokenInstance.accessToken;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    updateUserInfoFromLocalToken: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = getUserInfoFromDecodedToken(action.payload);
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { authenticate, updateUserInfoFromLocalToken } = authSlice.actions;
export { authenticateUser };
