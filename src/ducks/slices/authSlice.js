import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
