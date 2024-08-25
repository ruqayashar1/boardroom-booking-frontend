import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, FETCH_RESERVATION_BY_ID_URL } from "../../constants";

const initialState = {
  isLoading: false,
  reservation: null,
  error: null,
};

const fetchReservationById = createAsyncThunk(
  "selectedReservation/fetchReservationById",
  async (reservationId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_RESERVATION_BY_ID_URL(reservationId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const reservationDetailSlice = createSlice({
  name: "selectedReservation",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservationById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReservationById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reservation = action.payload;
      state.error = null;
    });
    builder.addCase(fetchReservationById.rejected, (state, action) => {
      state.isLoading = false;
      state.reservation = null;
      state.error = action.payload;
    });
  },
});

export default reservationDetailSlice.reducer;
export { fetchReservationById };
