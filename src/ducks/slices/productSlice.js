import { createSlice } from "@reduxjs/toolkit";

const initState = {
  list: [],
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: initState,
  reducers: {
    updateProduct(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;
