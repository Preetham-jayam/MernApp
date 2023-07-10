import { PRODUCTS_URL ,UPLOADS_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const ProductsApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts:builder.query({
            query:({keyword,pageNumber})=>({
                url:PRODUCTS_URL,
                params:{keyword,pageNumber},
            }),
            keepUnusedDataFor:5
        }),
        getProduct:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`

            }),
            keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:'POST',
            }),
            invalidatesTags:['Product'],
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data._id}`,
                method:'PUT',
                body:data,

            }),
            invalidatesTags:['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOADS_URL}`,
              method: 'POST',
              body: data,
            }),
          }),
        deleteProduct: builder.mutation({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            method: 'DELETE',
        }),
        providesTags: ['Product'],
        }),

        createReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
          getTopProducts: builder.query({
            query: () => `${PRODUCTS_URL}/top`,
            keepUnusedDataFor: 5,
          }),
    }),
});


export const {useGetTopProductsQuery,useCreateReviewMutation,useUploadProductImageMutation,useGetProductsQuery,useGetProductQuery,useCreateProductMutation,useUpdateProductMutation,useDeleteProductMutation}=ProductsApiSlice;

