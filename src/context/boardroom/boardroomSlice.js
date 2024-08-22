import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, BOARDROOM_URL } from "../../constants";

const initialState = {
  isLoading: false,
  boardrooms: [],
  filter: { capacityFilter: null, searchedString: "" },
  error: null,
};

const fetchBoardrooms = createAsyncThunk(
  "boardrom/fetchBoardrooms",
  async () => {
    try {
      const resp = await apiClient.get(BASE_URL.concat(BOARDROOM_URL));
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const boardroomSlice = createSlice({
  name: "boardroom",
  initialState: initialState,
  reducers: {
    filterByCapacity: (state, action) => {
      state.filter.capacityFilter = action.payload;
    },
    filterBySearchedString: (state, action) => {
      state.filter.searchedString = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardrooms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardrooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boardrooms = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBoardrooms.rejected, (state, action) => {
      state.isLoading = false;
      state.boardrooms = [];
      state.error = action.payload;
    });
  },
});

export default boardroomSlice.reducer;
export const { filterByCapacity, filterBySearchedString } =
  boardroomSlice.actions;
export { fetchBoardrooms };
