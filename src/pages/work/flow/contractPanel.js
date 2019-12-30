// ** 采购合同制作页 ** //

import React from "react";
import { Divider, Typography, Col, Row, Card, Table } from "antd";
import "./contractPanel.scss";

const { Text, Title } = Typography;
const { Column } = Table;

// 合同产品信息
const productInfo = [
  {
    product: "管道式加热器",
    model: "JRG-250-100C",
    unitPrice: 10550,
    quantity: 1,
    totalPrice: 10550,
    remark:
      "材质外壳碳钢，芯体304.进出水侧口径及蒸汽侧口径DN65，喉径16mm,斜孔数28。斜孔直径3.5mm，角度与水平线成30℃。"
  }
];

const serialNumber = 2019123001;

const ContractPanel = () => (
  <div className="contract-panel">
    <div className="contract-secondary">
      <Text type="secondary">SEMEM</Text>
      <Text type="secondary">合同文本</Text>
    </div>
    <Divider />
    <div className="contract-title">
      <Title level={1}>湖南西门机电科技有限公司</Title>
      <Title level={4}>产品采购合同</Title>
      <p>产品编号：{serialNumber}</p>
      <p className="contract-companies">
        <Text strong>供方：长沙南风机电设备有限公司</Text>
        <Text strong>需方：湖南西门机电科技有限公司</Text>
      </p>
    </div>
    <section className="contract-items">
      <div>
        <p>一、产品信息</p>
        <Table
          dataSource={productInfo}
          rowKey={record => record.model}
          footer={() => <div>共 1 件产品，合计：￥1420</div>}
          pagination={false}
          bordered
        >
          <Column title="产品名称" dataIndex="product" key="product" />
          <Column title="型号" dataIndex="model" key="model" />
          <Column title="单价" dataIndex="unitPrice" key="unitPrice" />
          <Column title="数量" dataIndex="quantity" key="quantity" />
          <Column title="总价" dataIndex="totalPrice" key="totalPrice" />
          <Column title="备注" width={450} dataIndex="remark" key="remark" />
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
            <p>单位地址：长沙市雨花区环保东路158号办公楼</p>
            <p>经 办 人： 审核：</p>
            <p>电话： 传真：</p>
            <p>开户银行：中国工商银行长沙广厦支行营业室</p>
            <p>账 号：1901007209200378119</p>
            <p>税 务 号：91430111MA4LYXHM73</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="需方">
            <p>单位名称：湖南西门机电科技有限公司 （章）</p>
            <p>单位地址：湖南省长沙市开福区迎宾路235号</p>
            <p>经 办 人： 审核：</p>
            <p>电话：0731-88801999 传真：0731-88801666</p>
            <p>开户银行：中国银行-长沙市岳麓支行</p>
            <p>账 号：584657351167</p>
            <p>税 务 号：914301057072101169</p>
          </Card>
        </Col>
      </Row>
    </section>
    <p>签订时间：2019 年 12 月 6 日 有效期限: 至 2020 年 12 月 6 日</p>
  </div>
);

export default ContractPanel;
