import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../utils/axiosClient";
import { BASE_URL, FETCH_KEMRI_EMPLOYEES_URL } from "../../constants";

const initialState = {
  isLoading: false,
  kemriEmployees: [],
  error: null,
};

const fetchKemriEmployees = createAsyncThunk(
  "kemriEmployee/fetchKemriEmployees",
  async () => {
    try {
      const resp = await apiClient.get(
        BASE_URL.concat(FETCH_KEMRI_EMPLOYEES_URL)
      );
      return resp.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const kemriEmployeeSlice = createSlice({
  name: "kemriEmployee",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchKemriEmployees.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchKemriEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.kemriEmployees = action.payload;
      state.error = null;
    });
    builder.addCase(fetchKemriEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.kemriEmployees = [];
      state.error = action.payload;
    });
  },
});

export default kemriEmployeeSlice.reducer;
export { fetchKemriEmployees };
