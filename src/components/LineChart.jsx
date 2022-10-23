import { Line } from "react-chartjs-2";
import {} from "chart.js/auto"
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = [] //data
  const coinTimestamp= [] //labels
  for (let i=0; i<coinHistory?.data?.history.length; i++){
    // Accessing i'th element and pushing its price to the coinPrice array
    coinPrice.push(coinHistory.data.history[i].price)
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
        {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
        },
    ]
  }
  
    return (
    <>
        <Row className="chart-header">
            <Title level={2} className="chart-title">{coinName} Price Chart </Title>
            <Col className="price-container">
                <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                <Title level={5} className="current-price">{coinName} Current Price: $ {currentPrice}</Title>
            </Col>
        </Row>
        <Line data={data}/>
    </>
  )
}

export default LineChart