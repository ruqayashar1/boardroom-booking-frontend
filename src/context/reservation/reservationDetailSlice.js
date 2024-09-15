import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  APPROVE_RESERVATION_URL,
  BASE_URL,
  CREATE_RESERVATION_MEETING_LINK_URL,
  DELETE_RESERVATION_BY_ID_URL,
  FETCH_RESERVATION_BY_ID_URL,
  RESERVATION_VENUE_CHANGE_BY_ID_URL,
} from "../../constants";
import { toast } from "react-toastify";
import { removeboardroomReservation } from "./boardroomReservationSlice";

const initialState = {
  isLoading: false,
  isApproving: false,
  isSavingMeetingLink: false,
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

const approveReservation = createAsyncThunk(
  "selectedReservation/approveReservation",
  async ({ reservationId, approval }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(APPROVE_RESERVATION_URL(reservationId)),
        approval
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

const removeReservation = createAsyncThunk(
  "selectedReservation/removeReservation",
  async (reservationId, { dispatch, rejectWithValue }) => {
    try {
      const resp = await apiClient.delete(
        BASE_URL.concat(DELETE_RESERVATION_BY_ID_URL(reservationId))
      );
      if (resp.status === 200) {
        dispatch(removeboardroomReservation(reservationId));
      }
      return reservationId;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const changeReservationVenue = createAsyncThunk(
  "selectedReservation/changeReservationVenue",
  async ({ reservationId, newVenue }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(RESERVATION_VENUE_CHANGE_BY_ID_URL(reservationId)),
        newVenue
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

const createReservationMeetingLink = createAsyncThunk(
  "selectedReservation/createReservationMeetingLink",
  async ({ reservationId, meetingLink }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(CREATE_RESERVATION_MEETING_LINK_URL(reservationId)),
        meetingLink
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
    // Approve reservation
    builder.addCase(approveReservation.pending, (state) => {
      state.isApproving = true;
    });
    builder.addCase(approveReservation.fulfilled, (state, action) => {
      state.isApproving = false;
      state.reservation = action.payload;
      state.error = null;
      toast.success("Reservation approval done successfully");
    });
    builder.addCase(approveReservation.rejected, (state, action) => {
      state.isApproving = false;
      state.error = action.payload;
    });
    // Remove reservation
    builder.addCase(removeReservation.fulfilled, (state, action) => {
      state.isApproving = false;
      state.reservation = null;
      state.error = null;
      toast.success("Reservation deleted successfully");
    });
    // Change reservation venue
    builder.addCase(changeReservationVenue.fulfilled, (state, action) => {
      state.isApproving = false;
      state.reservation = action.payload;
      state.error = null;
      toast.success("Reservation venue changed successfully");
    });
    //Create meeting link
    builder.addCase(createReservationMeetingLink.pending, (state) => {
      state.isSavingMeetingLink = true;
    });
    builder.addCase(createReservationMeetingLink.fulfilled, (state, action) => {
      state.isSavingMeetingLink = false;
      state.reservation = action.payload;
      state.error = null;
      toast.success("Meeting link saved successfully");
    });
    builder.addCase(createReservationMeetingLink.rejected, (state, action) => {
      state.isSavingMeetingLink = false;
      state.error = action.payload;
    });
  },
});

export default reservationDetailSlice.reducer;
export {
  fetchReservationById,
  approveReservation,
  removeReservation,
  changeReservationVenue,
  createReservationMeetingLink,
};
