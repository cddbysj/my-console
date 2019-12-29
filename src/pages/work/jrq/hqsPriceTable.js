import React from 'react';
import { Table, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

const hqsData = [
  {
    key: 'hqs0',
    dn: 40,
    carbonSteel: 510,
    hybrid: 640,
    ss304: 920,
    ss316l: 1380,
    d2205: 2760,
  },
  {
    key: 'hqs1',
    dn: 65,
    carbonSteel: 540,
    hybrid: 730,
    ss304: 1960,
    ss316l: 2490,
    d2205: 5880,
  },
  {
    key: 'hqs2',
    dn: 125,
    carbonSteel: 1402,
    hybrid: 2410,
    ss304: 4660,
    ss316l: 6990,
    d2205: 13980,
  },
  {
    key: 'hqs3',
    dn: 250,
    carbonSteel: 3050,
    hybrid: 6500,
    ss304: 10550,
    ss316l: 15825,
    d2205: 31650,
  },
  {
    key: 'hqs4',
    dn: 300,
    carbonSteel: 5000,
    hybrid: 9900,
    ss304: 16000,
    ss316l: 24000,
    d2205: 48000,
  },
  {
    key: 'hqs5',
    dn: 400,
    carbonSteel: 10000,
    hybrid: 16100,
    ss304: 26000,
    ss316l: 39000,
    d2205: 78000,
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
