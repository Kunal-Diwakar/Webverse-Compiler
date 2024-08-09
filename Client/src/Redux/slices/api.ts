import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./CompilerSlice";
import {
  codeType,
  loginCredentialsType,
  signupCredentialsType,
  userInfoType,
} from "@/vite-env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://webverse-compiler-backend.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["myCodes", "allCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<{ url: string; status: string }, codeType>({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode,
        };
      },
      invalidatesTags: ["myCodes", "allCodes"],
    }),

    loadcode: builder.mutation<
      { fullCode: CompilerSliceStateType["fullCode"]; isOwner: boolean },
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

    deleteCode: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),

    editCode: builder.mutation<
      void,
      { fullCode: CompilerSliceStateType["fullCode"]; id: string }
    >({
      query: ({ fullCode, id }) => {
        return {
          url: `/compiler/edit/${id}`,
          method: "PUT",
          body: fullCode,
        };
      },
    }),

    getAllCodes: builder.query<
      Array<{ _id: string; title: string; ownerName: string }>,
      void
    >({
      query: () => ({
        url: "/compiler/get-all-codes",
        cache: "no-store",
        method: "GET"
      }),
      providesTags: ["allCodes"],
    }),

    getUserDetails: builder.query<userInfoType, void>({
      query: () => ({ url: "/user/user-details", cache: "no-store", method: "GET" }),
    }),

    getMyCodes: builder.query<Array<codeType>, void>({
      query: () => ({ url:"/user/my-codes", method: "GET"}),
      providesTags: ["myCodes"],
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
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = api;