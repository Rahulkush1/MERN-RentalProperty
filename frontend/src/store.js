import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import propertySlice from "./Slice/propertySlice";
import { propertyApi } from "./services/auth/propertyService";
import citySlice from "./Slice/citySlice";
import appointmentSlice from "./Slice/appointmentSlice";
import bookingSlice from "./Slice/bookingSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    properties: propertySlice,
    cities: citySlice,
    appointment: appointmentSlice,
    booking: bookingSlice,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(propertyApi.middleware)
  },
});
// setupListeners(store.dispatch)
export default store;
