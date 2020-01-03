// ** 产品详情页 ** //
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Descriptions, Typography, Button, Collapse, Row, Col } from "antd";
import { computeHolesCount, computeThroatDiameter } from "../helper";

import styles from "./orderDetail.module.css";

// 型号到价格的映射表
const matrix = {
  碳钢: {
    DN40: 510,
    DN65: 540,
    DN125: 1420,
    DN250: 3050
  },
  "304": {
    DN40: 920,
    DN65: 1960,
    DN125: 4660,
    DN250: 10550
  },
  "316L": {
    DN40: 1380,
    DN65: 2490,
    DN125: 6990,
    DN250: 15825
  },
  "外壳碳钢 芯体304": {
    DN40: 640,
    DN65: 730,
    DN125: 2410,
    DN250: 6500
  }
};

const { Text, Title } = Typography;
const { Panel } = Collapse;

const OrderDetailPage = () => {
  let {
    id,
    consumer,
    products,
    date: { orderAt, arrivalAt }
  } = useLocation().state;

  const arrivalMonth = arrivalAt.slice(0, 7);

  products = products.map(product => {
    const {
      name,
      flow,
      heatFrom,
      heatTo,
      quantity,
      weight,
      pressure,
      flangeStandard,
      material
    } = product;

    // 喉部直径由流量推算出
    const throatDiameter = computeThroatDiameter(flow);
    // 斜孔数量由流量和温差共同推算出
    const holesCount = computeHolesCount(flow, heatFrom, heatTo);

    // 根据产品型号推算三个口径，特殊型号后续自行修改
    // HQS-125-20G --> ['HQS', 125, 20, 'G']
    const prefix = name.split("-")[0];
    const dn = `DN${name.split("-")[1]}`;
    const dnInlet = dn; // 进水口径
    const dnOutlet = dn; // 出水口径
    const dnSteam = prefix === "JRG" ? `DN150` : dn; // 蒸汽口径

    // 生产编号
    const serialNumber = `${orderAt.replace(/-/g, "")}01`;

    // 产品单价
    const price = matrix[material][dn];

    const nameplateText = `
  产品型号: ${product.name}
  数量: ${quantity}
  下单日期: ${orderAt}
  出厂日期: ${arrivalMonth}
  销售客户: ${consumer}
  编号: ${serialNumber}
  流量 t/h: ${flow}
  重量 kg: ${weight}
  压力 MPa: ${pressure}
`;
    // 合同内单类别产品信息
    const contractItemText = `法兰标准：${flangeStandard}。材质 ${material}，进水侧口径 ${dnInlet}，出水侧口径 ${dnOutlet}，蒸汽侧口径 ${dnSteam}，喉径 ${throatDiameter}mm，斜孔数 ${holesCount}，斜孔直径 3.5mm，角度与水平线成 30℃。`;

    return {
      ...product,
      throatDiameter,
      holesCount,
      dnInlet,
      dnOutlet,
      dnSteam,
      material,
      price,
      serialNumber,
      nameplateText,
      contractItemText
    };
  });

  return (
    <div>
      <Row gutter={[0, 80]} style={{ marginBottom: 64 }}>
        <Col span={3}>
          <Title level={4} type="secondary">
            产品清单
          </Title>
        </Col>
        <Col span={21} style={{ paddingLeft: 16 }}>
          <Collapse
            expandIconPosition="right"
            bordered={false}
            defaultActiveKey={["dn"]}
          >
            {products.map(product => (
              <Panel
                className={styles.collapsePanel}
                header={
                  <div>
                    {product.name} <Text code>{product.quantity}</Text>
                  </div>
                }
                key={product.name}
              >
                <p>{product.contractItemText}</p>
                <p>
                  单价 ￥{product.price}，{product.quantity} 台共计 ￥
                  {product.price * product.quantity}
                </p>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
      <Row gutter={[16, 80]} style={{ background: "#fafafa" }}>
        <Col span={3}>
          <Title level={4} type="secondary">
            铭牌
          </Title>
        </Col>
        {products.map(product => (
          <Col span={7 * (4 - products.length)} key={product.name}>
            <Descriptions className={styles.nameplateCard}>
              <Descriptions.Item label="产品型号" span={3}>
                {product.name}
              </Descriptions.Item>
              <Descriptions.Item label="销售客户" span={3}>
                {consumer}
              </Descriptions.Item>
              <Descriptions.Item label="数量" span={3}>
                {product.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="下单日期" span={3}>
                {orderAt}
              </Descriptions.Item>
              <Descriptions.Item label="出厂日期" span={3}>
                {arrivalMonth}
              </Descriptions.Item>
              <Descriptions.Item label="编号" span={3}>
                {product.serialNumber}
              </Descriptions.Item>
              <Descriptions.Item label="流量" span={3}>
                {product.flow} t/h
              </Descriptions.Item>
              <Descriptions.Item label="重量" span={3}>
                {product.weight} kg
              </Descriptions.Item>
              <Descriptions.Item label="压力" span={3}>
                {product.pressure} MPa
              </Descriptions.Item>
              <Descriptions.Item label="铭牌纯文本" span={3}>
                <Text copyable={{ text: product.nameplateText }}>复制</Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 80]}>
        <Col span={3}>
          <div>
            <Title level={4} type="secondary">
              链接
            </Title>
          </div>
        </Col>
        <Col span={21}>
          <div>
            <div>
              <Link
                to={{
                  pathname: `/order/contract/${id}`,
                  state: { id, products, date: { orderAt, arrivalAt } }
                }}
              >
                <Button type="link" icon="right-square">
                  采购合同
                </Button>
              </Link>
              <Link
                to={{
                  pathname: `/order/contract/${id}`,
                  state: { id, products, date: { orderAt, arrivalAt } }
                }}
              >
                <Button type="link" icon="right-square">
                  技术参数
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailPage;
