import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  BOARDROOM_RESESERVATIONS_URL,
  CHECK_RESERVATION_EVENT_OVERLAP_URL,
  RESERVATION_URL,
} from "../../constants";
import { toast } from "react-toastify";

const initialState = {
  isCreatingReservation: false,
  isLoading: false,
  boardroomReservations: [],
  error: null,
};

const fetchBoardroomReservations = createAsyncThunk(
  "boardroomReservation/fetchBoardroomReservations",
  async (boardroomId, { rejectWithValue }) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(BOARDROOM_RESESERVATIONS_URL(boardroomId))
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

const createReservation = createAsyncThunk(
  "boardroomReservation/createReservation",
  async (newReservation, { rejectWithValue }) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(RESERVATION_URL),
        newReservation
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

const updateReservation = createAsyncThunk(
  "boardroomReservation/updateReservation",
  async (newReservation, { rejectWithValue }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(RESERVATION_URL),
        newReservation
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

const checkReservationEventOverlap = createAsyncThunk(
  "boardroomReservation/checkReservationEventOverlap",
  async ({ boardroomId, reservationEventDate }) => {
    const resp = await apiClient.post(
      BASE_URL.concat(CHECK_RESERVATION_EVENT_OVERLAP_URL(boardroomId)),
      reservationEventDate
    );
    return resp.data;
  }
);

const boardroomReservationSlice = createSlice({
  name: "boardroomReservation",
  initialState: initialState,
  reducers: {
    removeboardroomReservation: (state, action) => {
      state.boardroomReservations = [
        state.boardroomReservations.filter(
          (reservation) => reservation.id !== action.payload
        ),
      ];
    },
    setIsCreatingReservation: (state, action) => {
      state.isCreatingReservation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardroomReservations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomReservations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroomReservations = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBoardroomReservations.rejected, (state, action) => {
      state.isLoading = false;
      state.boardroomReservations = [];
      state.error = action.payload;
    });
    // Create reservation
    builder.addCase(createReservation.pending, (state) => {
      state.isCreatingReservation = true;
    });
    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.isCreatingReservation = false;
      if (action.payload) {
        state.boardroomReservations = [
          action.payload,
          ...state.boardroomReservations,
        ];
      }
      toast.success("Reservation made successfully");
      state.error = null;
    });
    builder.addCase(createReservation.rejected, (state, action) => {
      state.isCreatingReservation = false;
      state.error = action.payload;
    });
    // Update reservation
    builder.addCase(updateReservation.fulfilled, (state, action) => {
      const newReservation = action.payload;
      state.boardroomReservations = [
        ...state.boardroomReservations.map((reservation) =>
          reservation.id !== newReservation?.id ? reservation : newReservation
        ),
      ];
      toast.success("Reservation updated successfully");
      state.error = null;
    });
    builder.addCase(updateReservation.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default boardroomReservationSlice.reducer;
export const { removeboardroomReservation, setIsCreatingReservation } =
  boardroomReservationSlice.actions;
export {
  fetchBoardroomReservations,
  createReservation,
  updateReservation,
  checkReservationEventOverlap,
};
