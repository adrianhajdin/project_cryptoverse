import React from 'react';
import { Spin } from 'antd';

export const Loader = () => (
  <>
    <Spin style={{ height: '74vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
  </>
);
