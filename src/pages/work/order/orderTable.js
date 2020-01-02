import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Divider,
  Button,
  Switch,
  Icon,
  Typography,
  Tag,
  Badge,
} from 'antd';

const { Column } = Table;
const { Text } = Typography;

const OrderTable = props => {
  const {
    orders,
    onRemoveOrder,
    onToggleNameplatePrint,
    onToggleCertificatePrint,
  } = props;

  const onCreateOrder = () => {};

  return (
    <div>
      <Button type="primary" onClick={onCreateOrder}>
        新建订单
      </Button>
      <Table
        dataSource={orders}
        rowKey={record => record.id}
        pagination={{ position: 'top' }}
        size="middle"
      >
        <Column
          title="产品"
          dataIndex="product"
          key="product"
          render={(text, record) => (
            <Link to={{ pathname: `/product/${record.id}`, state: record }}>
              {record.products.map(product => (
                <Tag color="magenta" key={product.name}>
                  <span>{product.name}</span>
                  <Badge
                    offset={[1, -4]}
                    count={product.quantity}
                    style={{ backgroundColor: '#52c41a' }}
                  />
                </Tag>
              ))}
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
            { text: '已打印', value: true },
            { text: '未打印', value: false },
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
            { text: '已打印', value: true },
            { text: '未打印', value: false },
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
