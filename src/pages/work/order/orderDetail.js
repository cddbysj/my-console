// ** 产品详情页 ** //
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Descriptions,
  Typography,
  Button,
  Collapse,
  Row,
  Col,
  Empty,
} from 'antd';
import { RightSquareOutlined } from '@ant-design/icons';
import * as ROUTES from 'constants/routes';
import * as PRODUCT from 'constants/product';
import { computeHolesCount, computeThroatDiameter } from '../helper';
import styles from './orderDetail.module.css';

const { Text, Title, Paragraph } = Typography;
const { Panel } = Collapse;

const OrderDetailPage = () => {
  let {
    id,
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
      model,
    } = product;

    // 喉部直径由流量推算出
    const throatDiameter = computeThroatDiameter(flow);
    // 斜孔数量由流量和温差共同推算出
    const holesCount = computeHolesCount(flow, heatFrom, heatTo);

    // 根据产品型号推算三个口径，特殊型号后续自行修改
    // HQS-125-20G --> ['HQS', 125, 20, 'G']
    // HJ-50C --> ['HJ', '50C']
    const prefix = name.split('-')[0];
    const dn =
      model === 'HQS'
        ? `DN${name.split('-')[1]}`
        : `DN${name.split('-')[1].slice(0, name.split('-')[1].length - 1)}`;
    const dnInlet = dn; // 进水口径
    const dnOutlet = dn; // 出水口径
    const dnSteam = prefix === 'JRG' ? `DN150` : dn; // 蒸汽口径

    // 生产编号
    const serialNumber = `${orderAt.replace(/-/g, '')}01`;

    // 产品单价
    const price =
      model === 'HQS'
        ? PRODUCT.HQS_MATRIX[material][dn]
        : PRODUCT.HJ_MATRIX[material][dn];

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
    const contractItemText =
      model === 'HQS'
        ? `法兰标准：${flangeStandard}。材质 ${material}，进水侧口径 ${dnInlet}，出水侧口径 ${dnOutlet}，蒸汽侧口径 ${dnSteam}，喉径 ${throatDiameter}mm，斜孔数 ${holesCount}，斜孔直径 3.5mm，角度与轴线成 30℃。`
        : `法兰标准：${flangeStandard}。材质 ${material}，口径 ${dn}`;

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

  // 传递给技术参数页面的属性，仅传递与技术参数相关属性
  const propsPassToSpecPage = products.map(
    ({
      name,
      flow,
      heatFrom,
      heatTo,
      quantity,
      weight,
      pressure,
      flangeStandard,
      model,
      throatDiameter,
      holesCount,
      dnInlet,
      dnOutlet,
      dnSteam,
      material,
    }) => ({
      name,
      flow,
      heatFrom,
      heatTo,
      quantity,
      weight,
      pressure,
      flangeStandard,
      model,
      throatDiameter,
      holesCount,
      dnInlet,
      dnOutlet,
      dnSteam,
      material,
    })
  );

  // 传递给合格证页面的属性
  const propsPassToCertificatePage = {
    id,
    arrivalAt,
    products: products.map(({ name, model, quantity }) => ({
      name,
      model,
      quantity,
    })),
  };

  return (
    <div>
      <Row gutter={[0, 80]} style={{ marginBottom: 64 }}>
        <Col span={6}>
          <Title level={4} type="secondary">
            产品清单
          </Title>
        </Col>
        <Col span={18} style={{ paddingLeft: 16 }}>
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
          </Collapse>
        </Col>
      </Row>
      <Row gutter={[0, 80]} style={{ marginBottom: 64 }}>
        <Col span={6}>
          <Title level={4} type="secondary">
            CRM 辅助文本
          </Title>
        </Col>
        <Col span={18} style={{ paddingLeft: 16 }}>
          <Collapse
            expandIconPosition="right"
            bordered={false}
            defaultActiveKey={['purchaseTitle']}
          >
            <Panel
              className={styles.collapsePanel}
              header="采购主题"
              key="purchaseTitle"
            >
              <Paragraph copyable>
                {consumer}{' '}
                {products
                  .map(product => `${product.name} ${product.quantity} 台 `)
                  .join('')}
              </Paragraph>
            </Panel>
            <Panel
              className={styles.collapsePanel}
              header={<div>产品明细</div>}
              key="productsInfo"
            >
              {products.map((product, index) => (
                <Collapse key={product.name} defaultActiveKey="0">
                  <Panel header={product.name} key={index}>
                    <p>品名：{product.model}</p>
                    <p>型号：{product.name}</p>
                    <p>数量：{product.quantity}</p>
                    <p>单价：￥{product.price}</p>
                    <p>金额：￥{product.quantity * product.price}</p>
                    <div>
                      备注：<Text copyable>{product.contractItemText}</Text>
                    </div>
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Row gutter={[8, 80]} style={{ background: '#fafafa', width: '100%' }}>
        <Col span={6}>
          <Title level={4} type="secondary">
            铭牌
          </Title>
        </Col>
        <Col span={18}>
          {products.filter(product => product.model === 'HQS').length ? (
            products
              .filter(product => product.model === 'HQS')
              .map(product => (
                <Descriptions
                  key={product.name}
                  className={styles.nameplateCard}
                >
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
              ))
          ) : (
            <Empty description="当前订单没有铭牌信息" />
          )}
        </Col>
      </Row>
      <Row gutter={[16, 80]}>
        <Col span={6}>
          <div>
            <Title level={4} type="secondary">
              链接
            </Title>
          </div>
        </Col>
        <Col span={18}>
          <div>
            <div>
              <Link
                to={{
                  pathname: `${ROUTES.ORDER_CONTRACT}/${id}`,
                  state: { id, products, date: { orderAt, arrivalAt } },
                }}
              >
                <Button type="link" icon={<RightSquareOutlined />}>
                  采购合同
                </Button>
              </Link>
              <Link
                to={{
                  pathname: `${ROUTES.CERTIFICATE_PAGE}/${id}`,
                  state: propsPassToCertificatePage,
                }}
              >
                <Button type="link" icon={<RightSquareOutlined />}>
                  产品合格证
                </Button>
              </Link>
              <Link
                to={{
                  pathname: `${ROUTES.ORDER_SPEC}/${id}`,
                  state: propsPassToSpecPage,
                }}
              >
                <Button type="link" icon={<RightSquareOutlined />}>
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
