import {createSlice } from "@reduxjs/toolkit";
import { registerUser, userLocation, userLogin, loadUser, logoutUser } from "../Action/userAction";




const initialState = {
  userInfo: {},
  loading: false,
  userToken: null,
  error: null,
  success: false,
  isAuthenticated: false,
  location: null
};



  initialState.userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

  initialState.isAuthenticated = localStorage.getItem("isAuthenticated")
  ? localStorage.getItem("isAuthenticated")
  : false;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload.data.attributes;
      state.error = null;
    },
    removeCredentials: (state, {payload}) => {
      state.userInfo = null;
      state.error = payload
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');

    },
    clearErrors: (state, {payload}) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.auth_token;
        state.isAuthenticated = true;
        state.error= null;
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    })
    .addCase(registerUser.rejected, (state, {payload} ) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    })
    .addCase(userLocation.pending, (state) => {
      state.loading =true;
      state.error = null;
    })
    .addCase(userLocation.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.location = payload;
    })
    .addCase(userLocation.rejected, (state, {payload}) => {
      state.loading = false;
      state.error = payload;
      state.location = null;
    })
    .addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loadUser.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
      state.isAuthenticated = true;
    })
      .addCase(loadUser.rejected, (state, { payload }) => { 
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.userInfo = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })
  },
});

export const {setCredentials, removeCredentials ,clearErrors} = userSlice.actions;
export default userSlice.reducer;
