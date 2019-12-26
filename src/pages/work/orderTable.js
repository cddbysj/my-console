import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Divider, Button, Switch, Icon, Typography } from "antd";
import CreateOrderForm from "./createOrderForm";

const { Column } = Table;
const { Text } = Typography;

const OrderTable = props => {
  const [visible, setVisible] = useState(false);

  const {
    orders,
    onRemoveOrder,
    onToggleNameplatePrint,
    onToggleCertificatePrint
  } = props;

  const showModal = () => {
    setVisible(true);
  };

  const handleCreate = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        新建订单
      </Button>
      <CreateOrderForm
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />
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
            <Text copyable>
              <Link to={{ pathname: `/nameplate/${record.id}`, state: record }}>
                {text}
              </Link>
            </Text>
          )}
        />
        <Column
          title="销售客户"
          dataIndex="consumer"
          key="consumer"
          render={text => <Text copyable>{text}</Text>}
        />
        <Column title="数量" dataIndex="quantity" key="quantity" />
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
              onChange={checked => onToggleCertificatePrint(record.id, checked)}
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
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default OrderTable;
