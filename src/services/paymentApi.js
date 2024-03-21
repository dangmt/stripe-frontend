import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Sửa đổi ở đây là thay "baseUrl" bằng "baseQuery" và sử dụng "baseUrl" bên trong "fetchBaseQuery"
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: amount,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
