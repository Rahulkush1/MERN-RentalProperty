import { createSlice } from "@reduxjs/toolkit"
import { createAppointment, getAdminAppointments, getAllAppointmentloggedUser, getAppointment } from "../Action/appointmentAction";

const initialState = {
    appointments: [],
    appointment: {},
    loading: false ,
    error: null,
    success: false
}

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        clearErrors: (state, {payload}) => {
            state.error = null;
            state.success = false;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(createAppointment.pending, (state)=>{
            state.loading= true;
            state.error = null;
            state.success = false;
        })
        .addCase(createAppointment.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.appointment = payload.data;
            state.error = null;
            state.success = true;
        })

        .addCase(createAppointment.rejected, (state,{payload}) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
        })
        .addCase(getAppointment.pending,(state) => {
            state.loading = true;
            state.error = null;
        
        })
        .addCase(getAppointment.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.appointment = payload;
            state.error =  null;

        })
        .addCase(getAppointment.rejected, (state,{payload}) => {
            state.loading = false;
            state.error = payload;
            state.appointment = null;
        })
        .addCase(getAllAppointmentloggedUser.pending,(state) => {
            state.loading= true;
            state.error = null;

        })
        .addCase(getAllAppointmentloggedUser.fulfilled, (state,{payload}) => {
            state.loading = false;
            state.appointments = payload;
            state.error = null;
        })
        .addCase(getAllAppointmentloggedUser.rejected,(state,{payload}) => {
            state.loading = false;
            state.error = payload;
        })
        .addCase(getAdminAppointments.pending,(state) => {
            state.loading= true;
            state.error = null;

        })
        .addCase(getAdminAppointments.fulfilled, (state,{payload}) => {
            state.loading = false;
            state.appointments = payload;
            state.error = null;
        })
        .addCase(getAdminAppointments.rejected,(state,{payload}) => {
            state.loading = false;
            state.error = payload;
        })
    }
})

export const {clearErrors } = appointmentSlice.actions;
export default appointmentSlice.reducer;