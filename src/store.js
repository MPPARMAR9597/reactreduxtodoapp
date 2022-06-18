import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./Reducers/index";

const store = configureStore({
  reducer: reducer,
});

export default store;