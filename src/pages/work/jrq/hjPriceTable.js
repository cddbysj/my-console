import React from 'react';
import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

const hjData = [
  {
    key: 'hj0',
    dn: 25,
    carbonSteel: 260,
    ss304: 460,
    ss316l: 560,
  },
  {
    key: 'hj1',
    dn: 32,
    carbonSteel: 260,
    ss304: 460,
    ss316l: 560,
  },
  {
    key: 'hj2',
    dn: 40,
    carbonSteel: 260,
    ss304: 460,
    ss316l: 560,
  },
  {
    key: 'hj3',
    dn: 50,
    carbonSteel: 280,
    ss304: 700,
    ss316l: 830,
  },
  {
    key: 'hj4',
    dn: 65,
    carbonSteel: 280,
    ss304: 700,
    ss316l: 830,
  },
  {
    key: 'hj5',
    dn: 80,
    carbonSteel: 460,
    ss304: 900,
    ss316l: 1050,
  },
  {
    key: 'hj6',
    dn: 100,
    carbonSteel: 460,
    ss304: 900,
    ss316l: 1050,
  },
  {
    key: 'hj7',
    dn: 125,
    carbonSteel: 620,
    ss304: 1150,
    ss316l: 1400,
  },
  {
    key: 'hj8',
    dn: 150,
    carbonSteel: 850,
    ss304: 1150,
    ss316l: 1700,
  },
];

const HjPriceTable = () => (
  <Table dataSource={hjData} size="middle" pagination={false}>
    <Column title="口径" dataIndex="dn" key="dn" />
    <ColumnGroup title="材质">
      <Column title="碳钢" dataIndex="carbonSteel" key="carbonSteel" />
      <Column title="304" dataIndex="ss304" key="ss304" />
      <Column title="316L" dataIndex="ss316l" key="ss316l" />
    </ColumnGroup>
  </Table>
);

export default HjPriceTable;
