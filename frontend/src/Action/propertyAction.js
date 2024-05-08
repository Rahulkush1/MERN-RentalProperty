import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";

export const fetchAllProperty = createAsyncThunk(
  "property/all/fetch",
  async ({keyword= "", price = [0,2500000], page=1, sort_option, prop_type, posted, ratings = 0}, { rejectWithValue }) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(keyword)
    try {
      let link = `${BASE_URL}property/all?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&sort_option=${sort_option}&ratings[gte]=${ratings}`

      if (prop_type) {
        link = `${BASE_URL}property/all?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&sort_option=${sort_option}&prop_type=${prop_type}&ratings[gte]=${ratings}`
      }

      if (posted) {
        if (prop_type) {
          link = `${BASE_URL}property/all?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&sort_option=${sort_option}&prop_type=${prop_type}&posted=${posted}&ratings[gte]=${ratings}`
        } else { 
          link = `${BASE_URL}property/all?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&sort_option=${sort_option}&posted=${posted}&ratings[gte]=${ratings}`
        }
      }
      const {data} = await axios.get(link,
        config
      );
      return data.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const fetchPropertyDetails = createAsyncThunk(
  "fetch/propertyDetails",
  async (id, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const {data} = await axios.get(
        `${BASE_URL}property/p/${id}`,
        config
      );
      console.log(data.data)
      return data.data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchRecomendendProperty = createAsyncThunk(
  "fetch/recomanded/properties",
  async (city, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const {data} = await axios.get(
        `${BASE_URL}property/feature?city=${city}`,
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

export const CreatePropertyReview = createAsyncThunk(
  "create/property/review",
  async ({rating, comment, property_id}, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}review/create`,
        {rating, comment, property_id},
        config
      );
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

export const getAdminProperties = createAsyncThunk(
  "property/all/admin",
  async (filter, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties/admin_properties?self_property=true`,
        config
      );
      return resp.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createProperty = createAsyncThunk(
  "property/create",
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("userToken"),
      },
    };
    try {
      const resp = await axios.get(
        `${BASE_URL}/properties/admin_properties?self_property=true`,
        {data},
        config
      );
      return resp.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
