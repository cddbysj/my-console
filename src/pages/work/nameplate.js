import React from "react";
import { useLocation } from "react-router-dom";
import { Descriptions, Typography } from "antd";

const { Text } = Typography;

const NameplatePage = () => {
  const {
    consumer,
    product,
    quantity,
    date: { orderAt, arrivalAt },
    flow,
    weight,
    pressure
  } = useLocation().state;

  const arrivalMonth = arrivalAt.slice(0, 7);
  const serialNumber = `${orderAt.replace(/-/g, "")}01`;

  const formattedText = `
  产品型号: ${product}
  数量: ${quantity}
  下单日期: ${orderAt}
  出厂日期: ${arrivalMonth}
  销售客户: ${consumer}
  编号: ${serialNumber}
  流量 t/h: ${flow}
  重量 kg: ${weight}
  压力 MPa: ${pressure}
`;

  return (
    <div>
      <Descriptions title="铭牌信息" bordered>
        <Descriptions.Item label="产品型号">{product}</Descriptions.Item>
        <Descriptions.Item label="销售客户">{consumer}</Descriptions.Item>
        <Descriptions.Item label="数量">{quantity}</Descriptions.Item>
        <Descriptions.Item label="下单日期" span={2}>
          {orderAt}
        </Descriptions.Item>
        <Descriptions.Item label="出厂日期">{arrivalMonth}</Descriptions.Item>
        <Descriptions.Item label="编号" span={3}>
          {serialNumber}
        </Descriptions.Item>
        <Descriptions.Item label="流量 t/h">{flow}</Descriptions.Item>
        <Descriptions.Item label="重量 kg">{weight}</Descriptions.Item>
        <Descriptions.Item label="压力 MPa">{pressure}</Descriptions.Item>
        <Descriptions.Item label="文本">
          <Text copyable={{ text: formattedText }}>复制铭牌信息</Text>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default NameplatePage;
