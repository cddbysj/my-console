import React from "react";
import { useLocation } from "react-router-dom";
import { Descriptions, Typography, Divider } from "antd";

const { Text } = Typography;

const NameplatePage = () => {
  const {
    consumer,
    product,
    quantity,
    date: { orderAt, arrivalAt },
    flow,
    weight,
    pressure,
    throatDiameter,
    holesCount
  } = useLocation().state;

  const arrivalMonth = arrivalAt.slice(0, 7);
  const serialNumber = `${orderAt.replace(/-/g, "")}01`;

  const nameplateText = `
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

  // 根据产品型号推算三个口径，特殊型号后续自行修改
  // HQS-125-20G --> ['HQS', 125, 20, 'G']
  const prefix = product.split("-")[0];
  const dn = product.split("-")[1];
  const dnInlet = dn; // 进水口径
  const dnOutlet = dn; // 出水口径
  const dnSteam = prefix === "JRG" ? 150 : dn; // 蒸汽口径

  // 符号到材质的映射表
  const materialMap = {
    G: "碳钢",
    C: "304",
    H: "外壳碳钢，芯体 304"
  };

  const materialSymbol = product.slice(-1).toUpperCase(); // 材质符号
  const material = materialMap[materialSymbol];

  const contractText = `法兰标准：GB/T 9119-2000。材质碳钢，进水侧口径DN${dnInlet}，出水侧口径DN${dnOutlet}，及蒸汽侧口径DN${dnSteam}，喉径${throatDiameter}mm，斜孔数${holesCount}，斜孔直径3.5mm，角度与水平线成30℃。`;

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
      </Descriptions>
      <Divider />
      <Descriptions title="合同信息" bordered>
        <Descriptions.Item label="进水口径">{dnInlet}</Descriptions.Item>
        <Descriptions.Item label="出水口径">{dnOutlet}</Descriptions.Item>
        <Descriptions.Item label="蒸汽口径">{dnSteam}</Descriptions.Item>
        <Descriptions.Item label="材质">{material}</Descriptions.Item>
        <Descriptions.Item label="斜孔数量">{holesCount}</Descriptions.Item>
        <Descriptions.Item label="喉径 mm">{throatDiameter}</Descriptions.Item>
        <Descriptions.Item label="合同纯文本" span={3}>
          <Text copyable={{ text: contractText }}>复制</Text>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default NameplatePage;
