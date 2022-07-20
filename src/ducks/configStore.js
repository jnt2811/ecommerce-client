import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice, productSlice } from "./slices";

const reducer = combineReducers({
  auth: authSlice,
  product: productSlice,
});

const store = configureStore({ reducer });

export default store;
