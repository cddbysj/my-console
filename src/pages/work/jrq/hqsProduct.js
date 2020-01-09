import React from "react";
import { Table } from "antd";

const { Column } = Table;

const data = [
  {
    dn: 40,
    shellDn: 108,
    shellThickness: 5,
    coreThickness: 4.5
  },
  {
    dn: 65,
    shellDn: 133,
    shellThickness: 6,
    coreThickness: 4.5
  },
  {
    dn: 125,
    shellDn: 219,
    shellThickness: 6,
    coreThickness: 4.5
  },
  {
    dn: 250,
    shellDn: 273,
    shellThickness: 8,
    coreThickness: 6
  }
];

const HqsProduct = () => {
  return (
    <div>
      <Table dataSource={data} rowKey={record => record.dn} pagination={false}>
        <Column title="口径" key="dn" dataIndex="dn" />
        <Column title="外壳外径 mm" key="shellDn" dataIndex="shellDn" />
        <Column
          title="外壳厚度 mm"
          key="shellThickness"
          dataIndex="shellThickness"
        />
        <Column
          title="喷管厚度 mm"
          key="coreThickness"
          dataIndex="coreThickness"
        />
      </Table>
    </div>
  );
};

export default HqsProduct;
