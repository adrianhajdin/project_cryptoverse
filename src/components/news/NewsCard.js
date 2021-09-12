import React from 'react';
import { Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

const demoImage = 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F3eeb15d1-a70f-45cd-a02a-f4a21bf36674.png?fit=scale-down&source=next&width=700';
const { Text, Title } = Typography;
export const NewsCard = ({ news }) => (
  <Card hoverable className="news-card-body">
    <a href={news.url} target="_blank" className="news-card" rel="noreferrer">
      <Avatar size={90} shape="square" src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
      <Col>
        <Title level={4}>{news.name}</Title>
        <Row style={{ gap: '10px' }}>
          <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
          <Text>{news.provider[0]?.name}</Text>
          <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
        </Row>
      </Col>
    </a>
  </Card>
);
