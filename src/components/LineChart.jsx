import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
const { Title: AntTitle } = Typography

const LineChart = ({ coinName, currentPrice, coinHistory }) => {
  const coinPrice = []
  const coinTimeStamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; ++i) {
    coinPrice.unshift(coinHistory?.data?.history[i].price)
    coinTimeStamp.unshift(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000,
      ).toLocaleDateString(),
    )
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price to USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  }

  const options = {
    Scale: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <Row className="chart-header">
        <AntTitle className="chart-title" level={2}>
          {coinName} Price Chart
        </AntTitle>
        <Col className="price-container">
          <AntTitle className="price-change" level={5}>
            {coinHistory?.data?.change}%
          </AntTitle>
          <AntTitle className="current-price" level={5}>
            Current {coinName} Price $ {currentPrice}
          </AntTitle>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart;
