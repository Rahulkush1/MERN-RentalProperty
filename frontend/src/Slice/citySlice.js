import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import axios from "axios";

const initialState = {
  cities: [],
  state_cities: [],
  error: null,
  loading: false,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityByCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityByCountry.fulfilled, (state, { payload }) => {
        state.cities = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCityByCountry.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchCityByStateCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityByStateCountry.fulfilled, (state, { payload }) => {
        state.state_cities = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCityByStateCountry.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const fetchCityByCountry = createAsyncThunk(
  "city",
  async (city, { rejectWithValue }) => {
    const config = {
      headers: {
        "X-CSCAPI-KEY":
          "Vno4ZnR2ZWVBZWNEY08yM3dkdGsxeTFxbnhqSXp2cjI3dDhOM3ZPag==",
      },
    };
    try {
      const resp = await axios.get(
        `https://api.countrystatecity.in/v1/countries/IN/cities`,
        config
      );
      return resp.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const fetchCityByStateCountry = createAsyncThunk(
    "city-state",
    async (userInfo, { rejectWithValue }) => {
      // console.log(userInfo.data.attributes.address.state)
      const config = {
        headers: {
          "X-CSCAPI-KEY":
            "Vno4ZnR2ZWVBZWNEY08yM3dkdGsxeTFxbnhqSXp2cjI3dDhOM3ZPag==",
        },
      };
      try {
        const resp = await axios.get(
          `https://api.countrystatecity.in/v1/countries/IN/states/MP/cities`,
          config
        );
        return resp.data;
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );

export default citySlice.reducer;

