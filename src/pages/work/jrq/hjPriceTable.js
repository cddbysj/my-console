import React from 'react';
import { Table } from 'antd';

const { Column, ColumnGroup } = Table;

const hjData = [
  {
    key: 'hj0',
    dn: 25,
    carbonSteel: 270,
    ss304: 480,
    ss316l: 590,
  },
  {
    key: 'hj1',
    dn: 32,
    carbonSteel: 270,
    ss304: 480,
    ss316l: 590,
  },
  {
    key: 'hj2',
    dn: 40,
    carbonSteel: 270,
    ss304: 480,
    ss316l: 590,
  },
  {
    key: 'hj3',
    dn: 50,
    carbonSteel: 290,
    ss304: 740,
    ss316l: 870,
  },
  {
    key: 'hj4',
    dn: 65,
    carbonSteel: 290,
    ss304: 740,
    ss316l: 870,
  },
  {
    key: 'hj5',
    dn: 80,
    carbonSteel: 480,
    ss304: 950,
    ss316l: 1100,
  },
  {
    key: 'hj6',
    dn: 100,
    carbonSteel: 480,
    ss304: 950,
    ss316l: 1100,
  },
  {
    key: 'hj7',
    dn: 125,
    carbonSteel: 650,
    ss304: 1210,
    ss316l: 1470,
  },
  {
    key: 'hj8',
    dn: 150,
    carbonSteel: 890,
    ss304: 1210,
    ss316l: 1790,
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
