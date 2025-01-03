import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../Slices/SerivceSlice";

const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
});

export default store;
