import React from "react";
import { useLocation } from "react-router-dom";
import { Divider, Typography, Col, Row, Card, Table } from "antd";
import "./contractPanel.scss";

const { Text, Title } = Typography;
const { Column } = Table;

const ContractPage = () => {
  let {
    products,
    date: { orderAt, arrivalAt }
  } = useLocation().state;

  // 判断是浸没式还是管道式加热器
  const isHj = name => {
    return (
      name.toUpperCase().includes("HJ") ||
      name.toUpperCase().includes("HX") ||
      name.toUpperCase().includes("CLP")
    );
  };

  products = products.map(product => ({
    ...product,
    totalPrice: product.quantity * product.price,
    model: isHj(product.name) ? "浸没式加热器" : "管道式加热器"
  }));

  // 订单内产品总数量
  const productsCount = products.reduce((acc, cur) => acc + cur.quantity, 0);

  // 订单总金额
  const orderAmount = products.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  // 合同编号
  const contractNumber = `${orderAt}01`;
  // 汉化日期
  const sinicizationDate = orderAt => {
    const year = orderAt.split("-")[0];
    const month = orderAt.split("-")[1];
    const day = orderAt.split("-")[2];
    return {
      contractStartAt: `${year} 年 ${month} 月 ${day} 日`,
      contractEndAt: `${+year + 1} 年 ${month} 月 ${day} 日`
    };
  };
  // 合同签订和到期时间
  const { contractStartAt, contractEndAt } = sinicizationDate(orderAt);

  return (
    <div className="contract-panel">
      <div className="contract-secondary">
        <Text type="secondary">SEMEM</Text>
        <Text type="secondary">合同文本</Text>
      </div>
      <Divider />
      <div className="contract-title">
        <Title level={1}>湖南西门机电科技有限公司</Title>
        <Title level={4}>产品采购合同</Title>
        <p>合同编号：{contractNumber}</p>
        <p className="contract-companies">
          <Text strong>供方：长沙南风机电设备有限公司</Text>
          <Text strong>需方：湖南西门机电科技有限公司</Text>
        </p>
      </div>
      <section className="contract-items">
        <div>
          <p>一、产品信息</p>
          <Table
            dataSource={products}
            rowKey={record => record.name}
            footer={() => (
              <div>
                共 {productsCount} 件产品，合计：￥{orderAmount}
              </div>
            )}
            pagination={false}
            bordered
          >
            <Column title="产品名称" dataIndex="model" key="model" />
            <Column
              title="型号"
              dataIndex="name"
              key="name"
              render={text => {
                const s = text.split("-");
                return `DN${s[1]}-${s[2]}`;
              }}
            />
            <Column title="单价" dataIndex="price" key="price" />
            <Column title="数量" dataIndex="quantity" key="quantity" />
            <Column title="总价" dataIndex="totalPrice" key="totalPrice" />
            <Column
              title="备注"
              width={450}
              dataIndex="contractItemText"
              key="contractItemText"
            />
          </Table>
        </div>
        <Divider />
        <p>
          二、质量要求技术标准、供方对质量负责的条件和期限：按企业标准制作，正常使用质量保证期为1年，1年内有制造质量问题，提供免费维修，超出质量保证期，收取成本维修费。
        </p>
        <p>三、交货时间：合同生效之日起 7 天内交货 。</p>
        <p>
          四、运输方式及到达站港和费用负担：公路运输，承担生产地到货运站的运费
        </p>
        <p>
          五、验收标准、方法：按标准图纸验收，如未达到验收要求，予以退货，供方承担相应的经济责任。
        </p>
        <p>六、结算方式及期限： 账付，月结。</p>
        <p>七、如需提供担保，另立合同担保书，作为本合同附件：无。</p>
        <p>八、违约责任：按《质量协议书》执行。</p>
      </section>
      <section className="contract-payment">
        <Row>
          <Col span={12}>
            <Card title="供方">
              <p>单位名称：长沙南风机电设备有限公司 （章）</p>
              <p>单位地址：长沙市雨花区环保东路 158 号办公楼</p>
              <p>经 办 人： </p>
              <p>电话：18684999975</p>
              <p>传真：</p>
              <p>开户银行：中国工商银行-长沙广厦支行</p>
              <p>账 号：1901007209200378119</p>
              <p>税 务 号：91430111MA4LYXHM73</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="需方">
              <p>单位名称：湖南西门机电科技有限公司 （章）</p>
              <p>单位地址：湖南省长沙市开福区迎宾路 235 号</p>
              <p>经 办 人： </p>
              <p>电话：0731-88801999</p>
              <p>传真：0731-88801666</p>
              <p>开户银行：中国银行-长沙市岳麓支行</p>
              <p>账 号：584657351167</p>
              <p>税 务 号：914301057072101169</p>
            </Card>
          </Col>
        </Row>
      </section>
      <p>
        签订时间：{contractStartAt}，有效期限: 至 {contractEndAt}
      </p>
    </div>
  );
};

export default ContractPage;
