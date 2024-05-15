import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const createAppointment = createAsyncThunk(
  "create/appointment",
  async (appointment, { rejectWithValue }) => {
    try {
      console.log(appointment)
      const {name, email, phone, property_id, date, message} = appointment
      const config = {
        headers: {
          Content_type: "application/json",
        },
        withCredentials: true,
      };

      const {data} = await axios.post(
        `${BASE_URL}appointment/create`,
        { name, email, phone, property_id, date, message },
        config
      );
        console.log(data)
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAppointment = createAsyncThunk(
    "get/appointment",
    async (id, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Content_type: "application/json",
          },
          withCredentials: true
        };
  
        const {data} = await axios.get(
          `${BASE_URL}appointment/user/${id}`,
          config
        );
        return data.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const getAllAppointmentloggedUser = createAsyncThunk(
    "get/all/appointments/logged_user",
    async (id, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Content_type: "application/json",
          },
          withCredentials: true
        };
  
        const {data} = await axios.get(
          `${BASE_URL}appointment/all`,
          config
        );
          console.log(data)
        return data.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const getAdminAppointments = createAsyncThunk(
    "get/all/appointments/admin",
    async (id, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Content_type: "application/json",
            auth_token: localStorage.getItem("userToken"),
          },
        };
  
        const {data} = await axios.get(
          `${BASE_URL}/users/appointments`,
          config
        );

        return data.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );