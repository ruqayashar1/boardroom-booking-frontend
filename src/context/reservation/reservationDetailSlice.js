import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  APPROVE_RESERVATION_URL,
  BASE_URL,
  CREATE_RESERVATION_MEETING_LINK_URL,
  DELETE_RESERVATION_BY_ID_URL,
  RESERVATION_BY_ID_URL,
  RESCHEDULE_RESERVATION_URL,
  RESERVATION_VENUE_CHANGE_BY_ID_URL,
} from "../../constants";
import { toast } from "react-toastify";
import {
  removeboardroomReservation,
  updateBoardroomReservation,
} from "./boardroomReservationSlice";

const initialState = {
  isLoading: false,
  isApproving: false,
  isRescheduling: false,
  isSavingMeetingLink: false,
  reservation: null,
  error: null,
};

const fetchReservationById = createAsyncThunk(
  "selectedReservation/fetchReservationById",
  async (reservationId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(RESERVATION_BY_ID_URL(reservationId))
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
      if (resp.status === 204) {
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

const rescheduleReservation = createAsyncThunk(
  "selectedReservation/rescheduleReservation",
  async ({ reservationId, rescheduleData }, { rejectWithValue, dispatch }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(RESCHEDULE_RESERVATION_URL(reservationId)),
        rescheduleData
      );
      dispatch(updateBoardroomReservation(resp.data));
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
  reducers: {
    updateSelectedReservation: (state, action) => {
      state.reservation = action.payload;
    },
  },
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
    //Reschedule reservation
    builder.addCase(rescheduleReservation.pending, (state) => {
      state.isRescheduling = true;
    });
    builder.addCase(rescheduleReservation.fulfilled, (state, action) => {
      state.isRescheduling = false;
      state.reservation = action.payload;
      state.error = null;
      toast.success("Reservation rescheduled successfully");
    });
    builder.addCase(rescheduleReservation.rejected, (state, action) => {
      state.isRescheduling = false;
      state.error = action.payload;
    });
  },
});

export default reservationDetailSlice.reducer;
export const { updateSelectedReservation } = reservationDetailSlice.actions;
export {
  fetchReservationById,
  approveReservation,
  removeReservation,
  changeReservationVenue,
  createReservationMeetingLink,
  rescheduleReservation,
};
