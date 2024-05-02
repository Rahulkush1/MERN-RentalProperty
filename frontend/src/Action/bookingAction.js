import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const createBooking = createAsyncThunk(
  "confirm/payment",
  async (booking, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Content_type: "application/json",
          auth_token: localStorage.getItem("userToken"),
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/payment/complete`,
        { booking },
        config
      );
      console.log(data);
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



export const getAllBookings = createAsyncThunk(
  "get/bookings",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          auth_token: localStorage.getItem("userToken"),
        },
      };
      const {data} = await axios.get(
        `${BASE_URL}/bookings`,
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


export const getBooking = createAsyncThunk(
  "get/booking",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Content_type: "application/json",
          auth_token: localStorage.getItem("userToken"),
        },
      };

      const {data} = await axios.get(
        `${BASE_URL}/users/property/get_property_booking?property_id=${id}`,
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



export const getAdminBookings = createAsyncThunk(
  "get/admin/booking",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Content_type: "application/json",
          auth_token: localStorage.getItem("userToken"),
        },
      };

      const {data} = await axios.get(
        `${BASE_URL}/users/property/getAdminBookings`,
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