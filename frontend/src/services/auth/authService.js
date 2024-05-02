import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
    getUserDetails: builder.query({
      query: () => ({
        url: "/users/sessions",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi