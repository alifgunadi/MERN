import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { logout } from '../features/userSlice';
import localStorage from 'redux-persist/es/storage';

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
            onQueryStarted: async (token, { dispatch }) => {
                try {
                  dispatch(logout());
                  await localStorage.removeItem('persist:root');
                } catch (error) {
                  console.error('Logout failed:', error);
                }
            },
            onError: (error) => {
                console.error('Logout failed:', error);
            },
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
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),

        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
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
} = appApi;

export default appApi;