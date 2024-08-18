import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfoFromDecodedToken, storeToken } from "../../functions";
import { AUTH_URL, BASE_URL } from "../../constants";
import axios from "axios";

const initialState = {
  isLoading: false,
  isAuthenticated: true,
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
      const response = await axios.post(BASE_URL.concat(AUTH_URL), userData, {
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
