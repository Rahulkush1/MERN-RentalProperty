import { createSlice } from "@reduxjs/toolkit"
import { createBooking, getAdminBookings, getAllBookings, getBooking } from "../Action/bookingAction";


const initialState = {
    bookings: [],
    booking: {},
    loading: false ,
    error: null,
    success: false
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        clearErrors: (state, {payload}) => {
            state.error = null;
            state.success = false;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(createBooking.pending, (state)=>{
            state.loading= true;
            state.error = null;
            state.success = false;
        })
        .addCase(createBooking.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.booking = payload.data;
            state.error = null;
            state.success = true;
        })
        .addCase(createBooking.rejected, (state, {payload}) => {
            state.loading = false;
            state.booking = payload.data;
            state.error = null;
            state.success = true;
        })
        .addCase(getAllBookings.pending, (state) => {
            state.loading = true;
            state.error = null;
            
        })
        .addCase(getAllBookings.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.bookings = payload;
            state.error = null;
        })
        .addCase(getAllBookings.rejected,(state,{payload}) => {
            state.loading = false;
            state.error = payload;
            state.bookings = null;
        })
        .addCase(getBooking.pending, (state) => {
            state.loading = true;
            state.error = null;
            
        })
        .addCase(getBooking.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.booking = payload;
            state.error = null;
        })
        .addCase(getBooking.rejected,(state,{payload}) => {
            state.loading = false;
            state.error = payload;
            state.booking = null;
        })
        .addCase(getAdminBookings.pending, (state) => {
            state.loading = true;
            state.error = null;
            
        })
        .addCase(getAdminBookings.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.bookings = payload;
            state.error = null;
        })
        .addCase(getAdminBookings.rejected,(state,{payload}) => {
            state.loading = false;
            state.error = payload;
            state.bookings = null;
        })

  
    }
})

export const {clearErrors } = bookingSlice.actions;
export default bookingSlice.reducer;