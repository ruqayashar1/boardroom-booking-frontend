import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  DELETE_SYSTEM_ADMIN_URL_BY_ID_URL,
  FETCH_CURRENT_ADMINS_URL,
  SYSTEM_ADMIN_URL,
} from "../../constants";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isDeleting: false,
  currentAdmins: [],
  error: null,
};

const fetchCurrentAdmins = createAsyncThunk(
  "systemAdmin/fetchCurrentAdmins",
  async () => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_CURRENT_ADMINS_URL)
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const createSystemAdmin = createAsyncThunk(
  "systemAdmin/createSystemAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(SYSTEM_ADMIN_URL),
        data
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const removeSystemAdmin = createAsyncThunk(
  "systemAdmin/removeSystemAdmin",
  async (adminId, { rejectWithValue }) => {
    try {
      await apiClient.delete(
        BASE_URL.concat(DELETE_SYSTEM_ADMIN_URL_BY_ID_URL(adminId))
      );

      return adminId;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const currentAdminSlice = createSlice({
  name: "systemAdmin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentAdmins.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAdmins = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCurrentAdmins.rejected, (state, action) => {
      state.isLoading = false;
      state.currentAdmins = [];
      state.error = action.payload;
    });
    // create admin
    builder.addCase(createSystemAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSystemAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAdmins = [action.payload, ...state.currentAdmins];
      toast.success("System administrator successfully added");
      state.error = null;
    });
    builder.addCase(createSystemAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Remove system admin
    builder.addCase(removeSystemAdmin.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(removeSystemAdmin.fulfilled, (state, action) => {
      state.isDeleting = false;
      state.currentAdmins = state.currentAdmins.filter(
        (admin) => admin.id !== action.payload
      );
      toast.success("System administrator successfully removed");
      state.error = null;
    });
    builder.addCase(removeSystemAdmin.rejected, (state, action) => {
      state.isDeleting = false;
      state.error = action.payload;
    });
  },
});

export default currentAdminSlice.reducer;
export { fetchCurrentAdmins, createSystemAdmin, removeSystemAdmin };
