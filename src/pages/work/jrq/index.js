// ** 加热器产品页面 ** //
import React from "react";
import { Tabs } from "antd";
import HqsPriceTable from "./hqsPriceTable";
import HjPriceTable from "./hjPriceTable";
import HeatComputer from "./heatComputer";
import HqsProduct from "./hqsProduct";
import HjProduct from "./hjProduct";
import TechInfo from "./techInfo";

const { TabPane } = Tabs;

const JrqProduct = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="计算" key="1">
      <HeatComputer />
    </TabPane>
    <TabPane tab="管道式" key="2">
      <HqsProduct />
    </TabPane>
    <TabPane tab="浸没式" key="3">
      <HjProduct />
    </TabPane>
    <TabPane tab="管道式价格表" key="4">
      <HqsPriceTable />
    </TabPane>
    <TabPane tab="浸没式价格表" key="5">
      <HjPriceTable />
    </TabPane>
    <TabPane tab="技术信息" key="6">
      <TechInfo />
    </TabPane>
  </Tabs>
);

export default JrqProduct;
