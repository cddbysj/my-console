// ** 温控价格表 ** //

import React from "react";
import { Table } from "antd";

const { Column } = Table;

const data = [
  {
    model: "WK31",
    price: 1100,
    children: [
      {
        model: "防爆",
        price: 3600
      },
      {
        model: "箱体材质 304",
        price: 1500
      }
    ]
  },
  {
    model: "WK11A",
    price: 1150,
    children: [
      {
        model: "防爆",
        price: 4400
      }
    ]
  },
  {
    model: "WK11B",
    price: 1200
  }
];

const WkPriceTable = props => {
  return (
    <div>
      <Table
        dataSource={data}
        pagination={false}
        footer={() => (
          <div>
            <p>- WK31 系列增加声光报警模块，加 360 元每套。</p>
            <p>- WK31 系列增加 RS485 远传接口，加 380 元每套。</p>
            <p>- 以上价格均包含 PT100 铂热电阻。</p>
          </div>
        )}
        rowKey={record => `${record.model}-${record.price}`}
      >
        <Column width={600} title="型号" dataIndex="model" key="model" />
        <Column
          title="价格"
          dataIndex="price"
          key="price"
          render={text => `￥${text}`}
        />
      </Table>
    </div>
  );
};

export default WkPriceTable;
