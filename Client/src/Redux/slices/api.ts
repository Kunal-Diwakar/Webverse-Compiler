import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./CompilerSlice";
import { codeType, loginCredentialsType, signupCredentialsType, userInfoType } from "@/vite-env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["myCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      { url: string; status: string },
      codeType
    >({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode,
        };
      },
      invalidatesTags: ["myCodes"],
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

    signup: builder.mutation<userInfoType, signupCredentialsType>({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: body,
      }),
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
          cache: "no-store"
        };
      },
    }),

    getMyCodes: builder.query<Array<codeType>, void>({
      query: () => "/user/my-codes",
      providesTags: ["myCodes"]
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadcodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetUserDetailsQuery,
  useGetMyCodesQuery
} = api;