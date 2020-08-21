// ** 温控产品页面 ** //
import React from "react";
import { Tabs, Typography, List, Tag, Collapse } from "antd";
import WkPriceTable from "./wkPriceTable";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Text } = Typography;

const WkProduct = () => (
  <Tabs defaultActiveKey="techInfo">
    <TabPane tab="技术信息" key="techInfo">
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel header="控制箱" key="1">
          仪表品牌为鸿润，控制箱的尺寸为 300 × 400 × 220mm。
          安装尺寸：箱体背板上开 4 个 φ13 的螺丝孔（配套用的膨胀螺丝建议用 M12
          规格），4 个螺丝孔中心形成的矩形尺寸是 220 * 356。
          控制箱默认的防尘防水等级是 IP21。 一般的户外使用，建议防尘防水等级用
          IP44； 防爆控制箱的防尘防水等级是 IP68。 供应商：长沙易变电气。
        </Panel>
        <Panel header="阀门" key="2">
          <Collapse defaultActiveKey="1">
            <Panel header="电动调节阀" key="1">
              电压 AC220V，模拟量控制，输入和输出信号均为 4-20ma。以 DN100
              口径的电动调节阀为例，其功率为 150W。供应商：上海湖泉阀门
            </Panel>
            <Panel header="电磁阀" key="2">
              DN50 及以下配套电磁阀，电压
              AC220V，开关量控制。供应商：上海湖泉阀门。
            </Panel>
            <Panel header="电动蝶阀" key="3">
              DN50 以上配套电动蝶阀，电压
              AC220V，开关量控制。供应商：上海湖泉阀门。
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="温度传感器" key="3">
          PT100 铂热电阻， 技术参数：外装式，螺纹规格 M20 * 1.5，探头长度
          150mm（含螺纹部分）。
          温度传感器配套的套筒，是一个圆柱形结构体，内螺纹规格 M20 *
          1.5，圆柱体外径 25mm，高度 25mm。
          供应商：之前直接从长沙宇光采购，目前从长沙易变电气采购。
        </Panel>
        <Panel header="液位变送器" key="4">
          型号为 H2，外装式，水箱侧壁靠下位置，预留 DN15
          的导压管，耐高温热水。更多信息请查看《液深变送器选型说明书》。
          供应商：甘肃天水华天。
        </Panel>
        <Panel header="连接线" key="5">
          <List footer="温度控制系统默认不包含连接线，同时建议客户按现场条件自己配备线材。">
            <List.Item>
              阀门到主机控制箱的连接线：<Tag color="geekblue">六芯控制线</Tag>，
              <Text code>KVV 6 × 1.5</Text>（这里的 6 指六芯，1.5
              指线材的横截面积是 1.5 平方毫米）
            </List.Item>
            <List.Item>
              温度传感器到主机控制箱的连接线：
              <Tag color="geekblue">三芯屏蔽线</Tag>，
              <Text code>RVVP 3 × 1.5</Text>
            </List.Item>
            <List.Item>
              RS485 远传模块端子的连接线：<Tag color="geekblue">屏蔽双绞线</Tag>
              ，<Text code>RVSP 2 × 0.5</Text>
            </List.Item>
          </List>
        </Panel>
        <Panel header="执行标准" key="6">
          <List>
            <List.Item>GB7251.1-2013: 低压成套设备</List.Item>
            <List.Item> GB7251.3-2013: 低压配电箱</List.Item>
          </List>
        </Panel>
      </Collapse>
    </TabPane>
    <TabPane tab="价格表" key="priceTable">
      <WkPriceTable />
    </TabPane>
  </Tabs>
);

export default WkProduct;
