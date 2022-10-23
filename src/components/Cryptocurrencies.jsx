import millify from "millify"
import { Link } from "react-router-dom"
import { Card, Row, Col, Input } from "antd"
// Whenever we need to use the data from an api, we just need to import the hook that fetches that data
import { useGetCryptosQuery } from "../services/cryptoApi"
import { useState, useEffect } from "react"
import Loader from "./Loader"

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10:100
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
  const [searchTerm, setSearchTerm] = useState("") 
  //When the value of the search term changes, we want to do sth, so need to use useEffect
  useEffect(()=>{
    // Whenever the data in cryptoList/searchTerm changes, we want to update the cryptos var
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm]) 
  if (isFetching) return <Loader/>
  return (
    <>
    {!simplified &&(
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrencies" onChange={(event)=>{setSearchTerm(event.target.value)}} value={searchTerm}/>
      </div>
    )}
    <Row gutter={[32, 32]} className="crypto-card-container">
    {cryptos?.map((coin) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
          <Link to={`/crypto/${coin.uuid}`}>
            <Card title={`${coin.rank}. ${coin.name}`} extra={<img className="crypto-image" src={coin.iconUrl}/>} hoverable>
              <p>Price: {millify(coin.price)}</p>
              <p>Market Cap: {millify(coin.marketCap)}</p>
              <p>Daily Change: {millify(coin.change)}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
    </>
  )
}

export default Cryptocurrencies
