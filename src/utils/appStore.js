import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./detailsSlice";

const appStore = configureStore({
  reducer: {
    details: detailsReducer,
  },
});

export default appStore;
