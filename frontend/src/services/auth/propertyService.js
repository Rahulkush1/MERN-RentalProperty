import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userToken;
      if (token) {
        // include token in req header
        headers.set("auth_token", `${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => ({
        url: "/properties",
        method: "GET",
        responseHandler: (response) => response.text()
      }),
    }),
  }),
});

export const { useGetPropertiesQuery } = propertyApi