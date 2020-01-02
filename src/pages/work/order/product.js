// ** 产品详情页 ** //
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Descriptions, Typography, Divider, Collapse, Row, Col } from 'antd';
import { computeHolesCount, computeThroatDiameter } from '../helper';

import styles from './product.module.css';

// 型号到价格的映射表
const matrix = {
  碳钢: {
    DN40: 510,
    DN65: 540,
    DN125: 1420,
    DN250: 3050,
  },
  '304': {
    DN40: 920,
    DN65: 1960,
    DN125: 4660,
    DN250: 10550,
  },
  '316L': {
    DN40: 1380,
    DN65: 2490,
    DN125: 6990,
    DN250: 15825,
  },
  '外壳碳钢 芯体304': {
    DN40: 640,
    DN65: 730,
    DN125: 2410,
    DN250: 6500,
  },
};

const { Text, Title } = Typography;
const { Panel } = Collapse;

const ProductPage = () => {
  let {
    consumer,
    products,
    date: { orderAt, arrivalAt },
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
      material,
    } = product;

    // 喉部直径由流量推算出
    const throatDiameter = computeThroatDiameter(flow);
    // 斜孔数量由流量和温差共同推算出
    const holesCount = computeHolesCount(flow, heatFrom, heatTo);

    // 根据产品型号推算三个口径，特殊型号后续自行修改
    // HQS-125-20G --> ['HQS', 125, 20, 'G']
    const prefix = name.split('-')[0];
    const dn = `DN${name.split('-')[1]}`;
    const dnInlet = dn; // 进水口径
    const dnOutlet = dn; // 出水口径
    const dnSteam = prefix === 'JRG' ? `DN150` : dn; // 蒸汽口径

    // 生产编号
    const serialNumber = `${orderAt.replace(/-/g, '')}01`;

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
      contractItemText,
    };
  });

  return (
    <div>
      <Row gutter={[0, 40]}>
        <Col span={3}>
          <Title level={4}>合同产品单</Title>
        </Col>
        <Col span={16}>
          <Collapse
            expandIconPosition="right"
            bordered={false}
            defaultActiveKey={['dn']}
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

            {/* <Panel className={styles.collapsePanel} header="口径" key="dn">
              <p>进水侧口径 DN250，出水侧口径 DN250，蒸汽侧口径 DN150</p>
            </Panel>
            <Panel
              className={styles.collapsePanel}
              header="喉径 & 斜孔"
              key="holesCount"
            >
              <p>
                喉径 {throatDiameter}，斜孔 {holesCount}
                ，斜孔直径 3.5 mm，角度与水平线成 30℃
              </p>
            </Panel>
            <Panel
              className={styles.collapsePanel}
              header="材质 & 法兰标准"
              key="material"
            >
              <p>
                材质 {material}，法兰标准 {flangeStandard}
              </p>
            </Panel>
            <Panel className={styles.collapsePanel} header="价格" key="price">
              <p>￥{price}</p>
            </Panel>
            <Panel
              className={styles.collapsePanel}
              header="合同文本"
              key="contractText"
            >
              <div>
                <Text copyable={{ text: contractText }}>{contractText}</Text>
              </div>
            </Panel> */}
          </Collapse>
        </Col>
        <Col span={5} style={{ width: '100%' }}></Col>
      </Row>
      <Row gutter={[24, 40]} style={{ background: '#fafafa' }}>
        <Col span={3}>
          <Title level={4}>铭牌</Title>
        </Col>
        {products.map(product => (
          <Col
            span={5}
            key={product.name}
            style={{ background: 'white', margin: '0 8px' }}
          >
            <Descriptions>
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
    </div>
  );
};

export default ProductPage;
