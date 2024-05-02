import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import propertySlice from "./Slice/propertySlice";
import { authApi } from "./services/auth/authService";

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
    [authApi.reducerPath]: authApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware).concat(propertyApi.middleware)
  },
});
// setupListeners(store.dispatch)
export default store;
