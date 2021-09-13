
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const date = new Date(coinHistory?.data?.history[i].timestamp);
    coinTimestamp.push(date.toLocaleDateString());
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
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row style={{ gap: '50px', display: 'flex', justifyContent: 'space-between', color: '#0071bd' }}>
        <Title level={2} style={{ color: '#0071bd' }}>{coinName} Price Chart </Title>
        <Col style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Title level={5} style={{ fontWeight: '900' }}>Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} style={{ marginTop: '0px', fontWeight: '900' }}>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>

      </Row>
      <Line data={data} options={options} />
    </>
);
};

export default LineChart;
