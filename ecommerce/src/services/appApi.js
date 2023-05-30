import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import { logout } from '../features/userSlice';
// import localStorage from 'redux-persist/es/storage';

export const appApi = createApi({
    reducerPath: "appApi",
    
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:3000",
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/auth/signup",
                method: "POST",
                body: user,
            })
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/auth/login",
                method: "POST",
                body: user,
            })
        }),

        logout: builder.mutation({
            query: (token) => ({
              url: '/auth/logout',
              method: 'POST',
              body: { token }
            }),
        }),

        createProduct: builder.mutation({
            query: (product) => ({
                url: "/api/products",
                method: "POST",
                body: product,
            }),
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/api/products/${product._id}`,
                method: "PUT",
                body: product,
            })
        }),

        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/api/products/add-to-cart",
                method: "POST",
                body: cartInfo,
            }),
        }),

        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/api/products/remove-from-cart",
                method: "POST",
                body,
            }),
        }),

        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/api/products/increase-cart",
                method: "POST",
                body,
            }),
        }),

        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/api/products/decrease-cart",
                method: "POST",
                body,
            }),
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: "/api/orders",
                method: "POST",
                body,
            }),
        })
    }),
});

export const { 
    useSignupMutation, 
    useLoginMutation, 
    useLogoutMutation, 
    useCreateProductMutation,
    useUpdateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
} = appApi;

export default appApi;