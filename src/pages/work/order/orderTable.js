// ** 合同列表页面 ** //
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  Divider,
  Button,
  Switch,
  List,
  Icon,
  Typography,
  Tag
} from "antd";
import * as ROUTES from "constants/routes";

const { Column } = Table;
const { Text } = Typography;

const OrderTable = props => {
  const history = useHistory();

  const {
    orders,
    onRemoveOrder,
    onToggleNameplatePrint,
    onToggleCertificatePrint,
    createCertificates,
    removeCertificates
  } = props;

  const goCreateOrder = () => history.push(ROUTES.CREATE_ORDER);

  const handleCertificateChange = async (record, checked) => {
    const {
      id,
      products,
      date: { arrivalAt }
    } = record;
    await onToggleCertificatePrint(id, checked);
    // firestore 对于元素类型为对象的数组支持比较差
    // 为了适应 firestore 的数据结构，将 products 转化成对象结构
    const productsInfo = {};
    products.forEach(product => {
      const { name, quantity, model } = product;
      productsInfo[name] = {
        model,
        quantity
      };
    });
    const certificateInfo = {
      arrivalAt, // 用作检验日期
      orderId: id, // 对应的订单 id
      products: productsInfo,
      printDone: false, // 是否已打印
      preparePrintAt: Date.now(), // 准备打印日期
    };
    // 选中则新建该订单下所有产品的合格证，不选中则删除该订单下所有产品的合格证
    checked
      ? await createCertificates(id, certificateInfo)
      : await removeCertificates(id);
  };

  return (
    <div>
      <Button type="primary" onClick={goCreateOrder}>
        新建订单
      </Button>
      <Table
        dataSource={orders}
        rowKey={record => record.id}
        pagination={{ position: "top" }}
        size="middle"
      >
        <Column
          title="产品"
          dataIndex="product"
          key="product"
          render={(text, record) => (
            <Link
              to={{
                pathname: `${ROUTES.WORK_ORDER}/${record.id}`,
                state: record
              }}
            >
              <List
                size="small"
                split={false}
                dataSource={record.products}
                renderItem={product => (
                  <List.Item>
                    <span>
                      <Tag color="blue">
                        <span>{product.name}</span>
                      </Tag>
                      <Text code>
                        <span>{product.quantity}</span>
                      </Text>
                    </span>
                  </List.Item>
                )}
              />
            </Link>
          )}
        />
        <Column
          title="销售客户"
          dataIndex="consumer"
          key="consumer"
          render={text => <Text copyable>{text}</Text>}
        />
        <Column
          title="采购日期"
          dataIndex="orderAt"
          key="orderAt"
          render={(text, record) => (
            <span>{record.date && record.date.orderAt}</span>
          )}
        />
        <Column
          title="铭牌"
          dataIndex="nameplate"
          key="nameplate"
          filters={[
            { text: "已打印", value: true },
            { text: "未打印", value: false }
          ]}
          onFilter={(value, record) => record.nameplate === value}
          render={(text, record) => (
            <Switch
              checked={record.nameplate}
              onChange={checked => onToggleNameplatePrint(record.id, checked)}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked
            />
          )}
        />
        <Column
          title="合格证"
          dataIndex="certificate"
          key="certificate"
          filters={[
            { text: "已打印", value: true },
            { text: "未打印", value: false }
          ]}
          onFilter={(value, record) => record.certificate === value}
          render={(text, record) => (
            <Switch
              checked={record.certificate}
              onChange={checked => handleCertificateChange(record, checked)}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked
            />
          )}
        />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <span>
              <Button
                type="link"
                icon="delete"
                onClick={() => onRemoveOrder(record.id)}
              />
              <Divider type="vertical" />
              <Button type="link" icon="edit" />
              <Divider type="vertical" />
              <Button type="link" icon="copy" />
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default OrderTable;
