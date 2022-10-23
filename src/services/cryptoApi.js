import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseUrl = 'https://coinranking1.p.rapidapi.com'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers)=>{
            headers.set('X-RapidAPI-Key', process.env.COINRANKING_API_KEY)
            return headers
        }
    }),
    endpoints: (builder)=>({
        // Building the endpoints
        getCryptos: builder.query({query: (count)=>`/coins?limit=${count}`}),
        // Fetching crypto details for a specific coin
        getCryptoDetails: builder.query({query: (coinId)=>`/coin/${coinId}`}),
        getCryptoHistory: builder.query({query: ({coinId, timePeriod})=>`/coin/${coinId}/history?timePeriod=${timePeriod}`}),
    }),
})
// RTK query automatically creates hooks for the endpoints we create
// These hooks will then give us the data from the APIs
export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi