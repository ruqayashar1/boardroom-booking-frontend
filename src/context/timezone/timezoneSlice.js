import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIMEZONES_FETCH_URL } from "../../constants";
import apiClient from "../../utils/axiosClient";

const initialState = {
  isLoading: false,
  timezones: [],
  error: null,
};

const fetchTimezones = createAsyncThunk(
  "timezone/fetchTimezones",
  async (_, { rejectWithValue }) => {
    try {
      console.log(TIMEZONES_FETCH_URL);
      const response = await apiClient.get(TIMEZONES_FETCH_URL);
      const timezones = response.data;
      console.log(timezones);

      return timezones;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const timezoneSlice = createSlice({
  name: "timezone",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTimezones.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTimezones.fulfilled, (state, action) => {
      state.isLoading = false;
      state.timezones = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTimezones.rejected, (state, action) => {
      state.isLoading = false;
      state.timezones = [];
      state.error = action.payload;
    });
  },
});

export default timezoneSlice.reducer;
export { fetchTimezones };
