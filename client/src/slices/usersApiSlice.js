import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:"POST",
                body:data,
            }),
            keepUnusedDataFor:5
        }),
        register: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
              method: 'POST',
              body: data,
            }),
          }),

        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: 'PUT',
              body: data,
            }),
          }),
          getUsers: builder.query({
            query: () => ({
              url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
          }),
          deleteUser: builder.mutation({
            query: (userId) => ({
              url: `${USERS_URL}/${userId}`,
              method: 'DELETE',
            }),
          }),
          getUserDetails: builder.query({
            query: (id) => ({
              url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
          }),
          updateUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/${data.userId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['User'],
          }),
       
    }),
});


export const {useGetUserDetailsQuery,useUpdateUserMutation,useDeleteUserMutation,useGetUsersQuery,useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation}=usersApiSlice;

