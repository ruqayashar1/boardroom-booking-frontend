import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfoFromDecodedToken, storeToken } from "../../functions";
import {
  AUTH_URL,
  BASE_URL,
  FETCH_USER_BY_ID_URL,
  UPDATE_USER_TIMEZONE_URL,
} from "../../constants";
import axios from "axios";
import apiClient from "../../utils/axiosClient";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  role: "",
  user: {
    username: "",
    fullName: "",
    email: "",
    department: "",
    timeZone: "",
    id: null,
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

const updateUserTimezone = createAsyncThunk(
  "auth/updateUserTimezone",
  async ({ userId, timezone }, { rejectWithValue }) => {
    const newTimezone = { userTimezone: timezone };
    try {
      const resp = await apiClient.patch(
        UPDATE_USER_TIMEZONE_URL(userId),
        newTimezone
      );
      return resp.data;
    } catch (error) {
      // Handle the error by returning a rejection
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const fetchCurrentLoggedUserDetail = createAsyncThunk(
  "auth/fetchCurrentLoggedUserDetail",
  async (userId, { rejectWithValue }) => {
    try {
      const resp = await apiClient.get(FETCH_USER_BY_ID_URL(userId));
      return resp.data;
    } catch (error) {
      // Handle the error by returning a rejection
      return rejectWithValue(
        error.response ? error.response.data : error.message
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
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const userInfo = getUserInfoFromDecodedToken(action.payload);
      state.isAuthenticated = true;
      state.role = userInfo?.role;
      state.username = userInfo.username;
      state.error = null;
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    });
    // update user timezome
    builder.addCase(updateUserTimezone.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserTimezone.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.timeZone = action.payload.timeZone;
      state.error = null;
    });
    builder.addCase(updateUserTimezone.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Fetch current logged user
    builder.addCase(fetchCurrentLoggedUserDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentLoggedUserDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.role = action.payload.role;
      state.error = null;
    });
    builder.addCase(fetchCurrentLoggedUserDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { authenticate } = authSlice.actions;
export { authenticateUser, updateUserTimezone, fetchCurrentLoggedUserDetail };
