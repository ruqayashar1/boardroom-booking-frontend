import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
  user: {
    username: "",
    name: "",
    email: "",
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { authenticate } = authSlice.actions;
