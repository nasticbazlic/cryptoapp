import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoExchangesHeaders = {
  'X-rapidapi-key': '817394eb65mshe1ed55949c8f7ffp1c2f7cjsn9c2596c10a36',
  'X-rapidapi-host': 'coinpaprika1.p.rapidapi.com',
};


const baseUrl = 'https://coinpaprika1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders });

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptoExchanges: builder.query({
        query: () => createRequest('/exchanges'),
      }),
    }),
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;