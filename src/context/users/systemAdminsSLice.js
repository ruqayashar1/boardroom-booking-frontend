import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, FETCH_CURRENT_ADMINS_URL } from "../../constants";

const initialState = {
  isLoading: false,
  currentAdmins: [],
  error: null,
};

const fetchCurrentAdmins = createAsyncThunk(
  "currentAdmin/fetchCurrentAdmins",
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

const currentAdminSlice = createSlice({
  name: "currentAdmin",
  initialState: initialState,
  reducers: {
    addSystemAdmin: (state, action) => {
      state.currentAdmins.push(action.payload);
    },
    removeSystemAdmin: (state, action) => {
      const newAdmins = state.currentAdmins.filter(
        (admin) => admin.email !== action.payload.email
      );
      state.currentAdmins = newAdmins;
    },
  },
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
  },
});

export default currentAdminSlice.reducer;
export const { addSystemAdmin, removeSystemAdmin } = currentAdminSlice.actions;
export { fetchCurrentAdmins };
