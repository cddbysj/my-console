import React from 'react';
import { Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

const hqsData = [
  {
    key: 'hqs0',
    dn: 40,
    carbonSteel: 540,
    hybrid: 670,
    ss304: 970,
    ss316l: 1450,
    d2205: 2900,
  },
  {
    key: 'hqs1',
    dn: 65,
    carbonSteel: 570,
    hybrid: 770,
    ss304: 2060,
    ss316l: 2610,
    d2205: 6170,
  },
  {
    key: 'hqs2',
    dn: 125,
    carbonSteel: 1490,
    hybrid: 2530,
    ss304: 4890,
    ss316l: 7340,
    d2205: 14680,
  },
  {
    key: 'hqs3',
    dn: 250,
    carbonSteel: 3200,
    hybrid: 6830,
    ss304: 11080,
    ss316l: 16620,
    d2205: 33230,
  },
  {
    key: 'hqs4',
    dn: 300,
    carbonSteel: 5250,
    hybrid: 10400,
    ss304: 13650,
    ss316l: 20480,
    d2205: 40950,
  },
  {
    key: 'hqs5',
    dn: 400,
    carbonSteel: 8930,
    hybrid: 12600,
    ss304: 19950,
    ss316l: 29930,
    d2205: 59850,
  },
];

const HqsPriceTable = () => (
  <div>
    <Table
      dataSource={hqsData}
      pagination={false}
      footer={() => (
        <div>
          底座价格：<Tag color="orange">碳钢</Tag>材质 ￥500 一个，
          <Tag color="orange">304</Tag> 材质 ￥1000 一个
        </div>
      )}
    >
      <Column title="口径" dataIndex="dn" key="dn" />
      <ColumnGroup title="材质">
        <Column title="碳钢" dataIndex="carbonSteel" key="carbonSteel" />
        <Column title="混合" dataIndex="hybrid" key="hybrid" />
        <Column title="304" dataIndex="ss304" key="ss304" />
        <Column title="316L" dataIndex="ss316l" key="ss316l" />
        <Column title="2205" dataIndex="d2205" key="d2205" />
      </ColumnGroup>
    </Table>
  </div>
);

export default HqsPriceTable;
