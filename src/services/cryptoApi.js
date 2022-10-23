import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseUrl = 'https://coinranking1.p.rapidapi.com'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers)=>{
            headers.set('X-RapidAPI-Key', 'a328134f75msh22e32d3f9f7d708p1b9470jsn35a7f3161c03')
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