// ** 产品详情页 ** //
import React from "react";
import { useLocation } from "react-router-dom";
import { Descriptions, Typography, Divider } from "antd";
import { computeHolesCount, computeThroatDiameter } from "../helper";

const { Text } = Typography;

const ProductPage = () => {
  const {
    consumer,
    products,
    date: { orderAt, arrivalAt }
  } = useLocation().state;

  const {
    flow,
    heatFrom,
    heatTo,
    quantity,
    weight,
    pressure,
    flangeStandard
  } = products[0];

  // 喉部直径由流量推算出
  const throatDiameter = computeThroatDiameter(flow);
  // 斜孔数量由流量和温差共同推算出
  const holesCount = computeHolesCount(flow, heatFrom, heatTo);

  const arrivalMonth = arrivalAt.slice(0, 7);
  const serialNumber = `${orderAt.replace(/-/g, "")}01`;

  const nameplateText = `
  产品型号: ${products[0].name}
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
  const prefix = products[0].name.split("-")[0];
  const dn = `DN${products[0].name.split("-")[1]}`;
  const dnInlet = dn; // 进水口径
  const dnOutlet = dn; // 出水口径
  const dnSteam = prefix === "JRG" ? `DN150` : dn; // 蒸汽口径

  // 符号到材质的映射表
  const symbolToMaterial = {
    G: "碳钢",
    C: "304",
    H: "外壳碳钢，芯体 304"
  };

  const materialSymbol = products[0].name.slice(-1).toUpperCase(); // 材质符号
  const material = symbolToMaterial[materialSymbol];

  // 型号到价格的映射表
  const matrix = {
    G: { DN40: 510, DN65: 540, DN125: 1420, DN250: 3050 },
    C: { DN40: 920, DN65: 1960, DN125: 4660, DN250: 10550 },
    H: { DN40: 640, DN65: 730, DN125: 2410, DN250: 6500 }
  };

  // 产品单价
  const price = matrix[materialSymbol][dn];

  const contractText = `法兰标准：${flangeStandard}。材质碳钢，进水侧口径${dnInlet}，出水侧口径${dnOutlet}，蒸汽侧口径${dnSteam}，喉径${throatDiameter}mm，斜孔数${holesCount}，斜孔直径3.5mm，角度与水平线成30℃。`;

  return (
    <div>
      <Descriptions title="铭牌信息" bordered>
        <Descriptions.Item label="产品型号">
          {products[0].name}
        </Descriptions.Item>
        <Descriptions.Item label="销售客户">{consumer}</Descriptions.Item>
        <Descriptions.Item label="数量">{quantity}</Descriptions.Item>
        <Descriptions.Item label="下单日期" span={2}>
          {orderAt}
        </Descriptions.Item>
        <Descriptions.Item label="出厂日期">{arrivalMonth}</Descriptions.Item>
        <Descriptions.Item label="编号" span={3}>
          {serialNumber}
        </Descriptions.Item>
        <Descriptions.Item label="流量">{flow} t/h</Descriptions.Item>
        <Descriptions.Item label="重量">{weight} kg</Descriptions.Item>
        <Descriptions.Item label="压力">{pressure} MPa</Descriptions.Item>
        <Descriptions.Item label="铭牌纯文本" span={3}>
          <Text copyable={{ text: nameplateText }}>复制</Text>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="合同信息" bordered>
        <Descriptions.Item label="进水口径">{dnInlet}</Descriptions.Item>
        <Descriptions.Item label="出水口径">{dnOutlet}</Descriptions.Item>
        <Descriptions.Item label="蒸汽口径">{dnSteam}</Descriptions.Item>
        <Descriptions.Item label="材质">{material}</Descriptions.Item>
        <Descriptions.Item label="斜孔数量">{holesCount}</Descriptions.Item>
        <Descriptions.Item label="喉径 mm">{throatDiameter}</Descriptions.Item>
        <Descriptions.Item label="产品价格">￥{price}</Descriptions.Item>
        <Descriptions.Item label="法兰标准" span={2}>
          {flangeStandard}
        </Descriptions.Item>
        <Descriptions.Item label="合同纯文本">
          <Text copyable={{ text: contractText }}>{contractText}</Text>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProductPage;
