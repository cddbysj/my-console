// ** 合同列表页面 ** //
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  Divider,
  Button,
  Switch,
  List,
  Typography,
  Tag,
  message
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import * as ROUTES from "constants/routes";
import useAuth from "hooks/useAuth";

const { Column } = Table;
const { Text } = Typography;

const OrderTable = props => {
  const history = useHistory();
  const auth = useAuth();

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

    if (!auth) {
      message.warn("您没有该权限");
      return;
    }

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
      preparePrintAt: Date.now() // 准备打印日期
    };
    // 选中则新建该订单下所有产品的合格证，不选中则删除该订单下所有产品的合格证
    checked
      ? await createCertificates(id, certificateInfo)
      : await removeCertificates(id);
  };

  const handleToggleNameplatePrint = async (id, checked) => {
    if (!auth) {
      message.warn("您没有该权限");
      return;
    }
    await onToggleNameplatePrint(id, checked);
  };

  const handleRemoveOrder = async orderId => {
    if (!auth) {
      message.warn("您没有该权限");
      return;
    }

    try {
      await onRemoveOrder(orderId);
      message.success("删除订单成功", 1);
    } catch (error) {
      message.error("删除订单失败", 2.5);
    }
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
              onChange={checked =>
                handleToggleNameplatePrint(record.id, checked)
              }
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
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
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
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
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveOrder(record.id)}
              />
              <Divider type="vertical" />
              <Button type="link" icon={<EditOutlined />} />
              <Divider type="vertical" />
              <Button type="link" icon={<CopyOutlined />} />
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default OrderTable;
