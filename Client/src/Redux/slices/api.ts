import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./CompilerSlice";
import { loginCredentialsType, userInfoType } from "@/vite-env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      { url: string; status: string },
      CompilerSliceStateType["fullCode"]
    >({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode,
        };
      },
    }),

    loadcode: builder.mutation<
      { fullCode: CompilerSliceStateType["fullCode"] },
      { urlId: string }
    >({
      query: (body) => {
        return {
          url: "/compiler/load",
          method: "POST",
          body: body,
        };
      },
    }),

    login: builder.mutation<userInfoType, loginCredentialsType>({
      query: (body) => {
        return {
          url: "/user/login",
          body: body,
          method: "POST",
          credentials: "include",
        };
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => {
        return {
          url: "user/logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),

    getUserDetails: builder.query<userInfoType, void>({
      query: () => {
        return {
          url: "/user/user-details",
          method: "GET",
          cache: "no-store"
        };
      },
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadcodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
} = api;