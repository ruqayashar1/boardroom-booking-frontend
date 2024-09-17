import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import {
  BASE_URL,
  EQUIPMENT_URL,
  FETCH_BOARDROOM_EQUIPMENTS_URL,
} from "../../constants";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isCreatingEquipment: false,
  boardroomEquipments: [],
  error: null,
};

const fetchBoardroomEquipments = createAsyncThunk(
  "equipment/fetchBoardroomEquipments",
  async (boardroomId) => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_BOARDROOM_EQUIPMENTS_URL(boardroomId))
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const createBoardroomEquipment = createAsyncThunk(
  "equipment/createBoardroomEquipment",
  async (newEquipment, { rejectWithValue }) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(EQUIPMENT_URL),
        newEquipment
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

const equipmentSlice = createSlice({
  name: "equipment",
  initialState: initialState,
  reducers: {
    setCreatingEquipment: (state, action) => {
      state.isCreatingEquipment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardroomEquipments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardroomEquipments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardroomEquipments = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBoardroomEquipments.rejected, (state, action) => {
      state.isLoading = false;
      state.boardroomEquipments = [];
      state.error = action.payload;
    });
    // Create boardroom equipment
    builder.addCase(createBoardroomEquipment.pending, (state) => {
      state.isCreatingEquipment = true;
    });
    builder.addCase(createBoardroomEquipment.fulfilled, (state, action) => {
      state.isCreatingEquipment = false;
      state.boardroomEquipments.unshift(action.payload);
      state.error = null;
      toast.success("Equipment created successfully");
    });
    builder.addCase(createBoardroomEquipment.rejected, (state, action) => {
      state.isCreatingEquipment = false;
      state.error = action.payload;
    });
  },
});

export default equipmentSlice.reducer;
export const { setCreatingEquipment } = equipmentSlice.actions;
export { fetchBoardroomEquipments, createBoardroomEquipment };
