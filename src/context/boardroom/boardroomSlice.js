import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, BOARDROOM_BY_ID_URL, BOARDROOM_URL } from "../../constants";

const initialState = {
  isLoading: false,
  isSaving: false,
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

const createBoardroom = createAsyncThunk(
  "boardrom/createBoardroom",
  async (newBoardroom) => {
    try {
      const resp = await apiClient.post(
        BASE_URL.concat(BOARDROOM_URL),
        newBoardroom
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const updateBoardroom = createAsyncThunk(
  "boardrom/updateBoardroom",
  async ({ boardroomId, newBoardroom }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.patch(
        BASE_URL.concat(BOARDROOM_BY_ID_URL(boardroomId)),
        newBoardroom
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
    lockOrUnLockFetchedHomeBoardroom: (state, action) => {
      const { boardroomId, lockOrUnlock } = action.payload;
      state.boardrooms = [
        ...state.boardrooms.map((boardroom) =>
          boardroom.id !== boardroomId
            ? boardroom
            : { ...boardroom, locked: lockOrUnlock }
        ),
      ];
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
    // Create new boardroom
    builder.addCase(createBoardroom.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(createBoardroom.fulfilled, (state, action) => {
      state.isSaving = false;
      if (action.payload) {
        state.boardrooms = [action.payload, ...state.boardrooms];
        toast.success("Boardroom created successfully!");
      }
      state.error = null;
    });
    builder.addCase(createBoardroom.rejected, (state, action) => {
      state.isSaving = false;
      state.error = action.payload;
    });
    // Update boardroom
    builder.addCase(updateBoardroom.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(updateBoardroom.fulfilled, (state, action) => {
      state.isSaving = false;
      if (action.payload) {
        state.boardrooms = state.boardrooms.map((boardroom) =>
          boardroom.id === action.payload.id ? action.payload : boardroom
        );
        toast.success("Boardroom modified successfully!");
      }
      state.error = null;
    });
    builder.addCase(updateBoardroom.rejected, (state, action) => {
      state.isSaving = false;
      state.error = action.payload;
    });
  },
});

export default boardroomSlice.reducer;
export const {
  filterByCapacity,
  filterBySearchedString,
  lockOrUnLockFetchedHomeBoardroom,
} = boardroomSlice.actions;
export { fetchBoardrooms, createBoardroom, updateBoardroom };
