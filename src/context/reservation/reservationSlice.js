import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, RESERVATION_URL } from "../../constants";

const initialState = {
  isLoading: false,
  reservations: [],
  filter: { approved: false, pending: false, declined: false },
  error: null,
};

const fetchReservations = createAsyncThunk(
  "reservation/fetchReservations",
  async () => {
    try {
      const resp = await apiClient.get(BASE_URL.concat(RESERVATION_URL));
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState: initialState,
  reducers: {
    filterByApproved: (state, action) => {
      state.filter.approved = action.payload;
    },
    filterByPending: (state, action) => {
      state.filter.pending = action.payload;
    },

    filterByDeclined: (state, action) => {
      state.filter.declined = action.payload;
    },
  },
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
export const { filterByApproved, filterByPending, filterByDeclined } =
  reservationSlice.actions;
export { fetchReservations };
