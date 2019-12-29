// ** 温控产品页面 ** //
import React from 'react';
import { Tabs, Typography, List } from 'antd';

const { TabPane } = Tabs;
const { Paragraph, Title, Tag } = Typography;

// 温控连接线缆信息
const cableInfo = [
  '阀门到主机控制箱的连接线：六芯控制线，KVV 6 × 1.5（这里的 6 指六芯，1.5 指线材的横截面积是 1.5 平方毫米）',
  '温度传感器到主机控制箱的连接线：三芯屏蔽线，RVVP 3 × 1.5 RS485',
  '远传模块端子的连接线：屏蔽双绞线，RVSP 2 × 0.5',
];

const WkProduct = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="技术信息" key="1">
      <List
        header={<div>连接线规格</div>}
        bordered
        dataSource={cableInfo}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </TabPane>
    <TabPane tab="价格表" key="2"></TabPane>
  </Tabs>
);

export default WkProduct;
