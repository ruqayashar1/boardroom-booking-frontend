import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, RESERVATION_URL } from "../../constants";

const initialState = {
  isLoading: false,
  reservations: [],
  error: null,
};

const fetchReservations = createAsyncThunk(
  "reservation/fetchReservations",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await apiClient.get(BASE_URL.concat(RESERVATION_URL));
      return resp.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reservations = action.payload;
      state.error = null;
    });
    builder.addCase(fetchReservations.rejected, (state, action) => {
      state.isLoading = false;
      state.reservations = [];
      state.error = action.payload;
    });
  },
});

export default reservationSlice.reducer;
export { fetchReservations };
