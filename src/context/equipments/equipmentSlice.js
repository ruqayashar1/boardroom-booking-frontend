import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, FETCH_BOARDROOM_EQUIPMENTS_URL } from "../../constants";

const initialState = {
  isLoading: false,
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

const equipmentSlice = createSlice({
  name: "equipment",
  initialState: initialState,
  reducers: {},
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
  },
});

export default equipmentSlice.reducer;
export { fetchBoardroomEquipments };
