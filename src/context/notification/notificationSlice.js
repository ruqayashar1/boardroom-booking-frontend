import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  FETCH_NOTIFICATIONS_URL,
  UPDATE_NOTIFICATION_AS_READ_URL,
} from "../../constants";

const initialState = {
  isLoading: false,
  updating: {},
  notifications: [],
  error: null,
};

const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async () => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_NOTIFICATIONS_URL)
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async (notificationId) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(UPDATE_NOTIFICATION_AS_READ_URL(notificationId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setUpdatingNotification: (state, action) => {
      state.updating[action.payload.id] = action.payload.updating;
    },
    addNotification: (state, action) => {
      const isPresent = state.notifications.some(
        (notification) => notification.id === action.payload.id
      );
      if (!isPresent) {
        state.notifications.unshift(action.payload);
      } else {
        state.notifications = state.notifications.map((notification) =>
          notification.id === action.payload.id ? action.payload : notification
        );
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch notifications
    builder.addCase(fetchNotifications.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.pending = false;
      state.notifications = action.payload;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.pending = false;
      state.error = action.payload;
    });
    // Mark notification as read
    builder.addCase(markNotificationAsRead.pending, (state, action) => {
      state.updating[action.meta.arg] = true;
    });
    builder.addCase(markNotificationAsRead.fulfilled, (state, action) => {
      state.updating[action.payload.id] = false;
      state.notifications = state.notifications.map((notification) =>
        notification.id === action.payload.id ? action.payload : notification
      );
    });
    builder.addCase(markNotificationAsRead.rejected, (state, action) => {
      state.updating[action.meta.arg] = false;
      state.error = action.payload;
    });
  },
});

export default notificationSlice.reducer;
export const { addNotification, setUpdatingNotification } =
  notificationSlice.actions;
export { markNotificationAsRead, fetchNotifications };
