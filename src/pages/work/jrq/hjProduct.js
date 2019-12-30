// ** HJ 浸没式加热器产品页面 ** //

import React from 'react';
import { Table } from 'antd';

const { Column } = Table;

const data = [
  {
    dn: 20,
    holes: 12,
    cols: 6,
    loops: 2,
    holeDn: 3.5,
  },
  {
    dn: 25,
    holes: 16,
    cols: 4,
    loops: 4,
    holeDn: 3.5,
  },
  {
    dn: 32,
    holes: 30,
    cols: 6,
    loops: 5,
    holeDn: 3.5,
  },
  {
    dn: 40,
    holes: 45,
    cols: 9,
    loops: 5,
    holeDn: 3.5,
  },
  {
    dn: 50,
    holes: 72,
    cols: 12,
    loops: 6,
    holeDn: 3.5,
  },
  {
    dn: 65,
    holes: 100,
    cols: 10,
    loops: 10,
    holeDn: 3.5,
  },
  {
    dn: 80,
    holes: 150,
    cols: 15,
    loops: 10,
    holeDn: 3.5,
  },
  {
    dn: 100,
    holes: 204,
    cols: 17,
    loops: 12,
    holeDn: 3.5,
  },
  {
    dn: 125,
    holes: 300,
    cols: 20,
    loops: 15,
    holeDn: 3.5,
  },
];

const HjProduct = () => (
  <Table dataSource={data} rowKey={record => record.dn} pagination={false}>
    <Column title="口径" dataIndex="dn" />
    <Column title="孔数" dataIndex="holes" />
    <Column title="列数" dataIndex="cols" />
    <Column title="圈数" dataIndex="loops" />
    <Column title="孔径" dataIndex="holeDn" />
  </Table>
);

export default HjProduct;
