// ** 新建订单页面 ** //
import React, { useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  message
} from "antd";
import * as ROUTES from "constants/routes";
import firebase from "api/firebase";
import styles from "./createOrderForm.module.css";

const { RangePicker } = DatePicker;

const CreateOrderFormBase = props => {
  const history = useHistory();
  // 用于动态增删产品
  const [items, setItems] = useState([0]);

  const {
    form: { getFieldDecorator, validateFieldsAndScroll }
  } = props;

  const addItem = () => setItems(prev => [...prev, 0]);
  const removeItem = () => setItems(prev => prev.slice(0, prev.length - 1));

  const onSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        let { date, products } = values;
        products = products.filter(product => product.name);
        products.forEach(product => {
          product.pressure = "1.0";
        });
        // 下单日期
        const orderAt = date[0].format("YYYY-MM-DD");
        // 到货日期
        const arrivalAt = date[1].format("YYYY-MM-DD");
        // 提交到数据库的单个产品信息
        const order = {
          ...values,
          date: { orderAt, arrivalAt },
          nameplate: false,
          certificate: false,
          products
        };
        console.log("order: ", order);
        // api
        firebase
          .createOrder(order)
          .then(() => {
            message.success("订单创建成功", 0.5);
            history.push(ROUTES.WORK_ORDERS);
          })
          .catch(error => message.error(error.message));
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      offset: 2,
      span: 6
    },
    wrapperCol: {
      span: 12
    }
  };

  return (
    <Form onSubmit={onSubmit} {...formItemLayout}>
      <Form.Item>
        <Button.Group>
          <Button
            disabled={items.length <= 1}
            icon="minus"
            onClick={removeItem}
          >
            删除产品
          </Button>
          <Button type="primary" icon="plus" onClick={addItem}>
            增加产品
          </Button>
        </Button.Group>
      </Form.Item>
      <Form.Item label="销售客户" wrapperCol={{ span: 8 }}>
        {getFieldDecorator("consumer", {
          rules: [
            {
              required: true,
              message: "请输入销售客户"
            },
            {
              whitespace: true,
              message: "销售客户不能为空白字符"
            }
          ]
        })(<Input autoFocus allowClear />)}
      </Form.Item>
      <Form.Item label="货期" wrapperCol={{ span: 8 }}>
        {getFieldDecorator("date", {
          initialValue: [moment(), moment().add(7, "days")],
          rules: [
            {
              required: true,
              message: "请输入货期"
            }
          ]
        })(<RangePicker style={{ width: "100%" }} />)}
      </Form.Item>
      <Row gutter={10} className={styles.productRow}>
        {items.map((item, index) => (
          <Col
            key={index}
            span={8}
            pull={index === 1 ? 8 : 0}
            push={index === 0 ? 8 : 0}
            className={styles.productCol}
          >
            <Form.Item label="款式">
              {getFieldDecorator(`products[${index}].model`, {
                initialValue: "HQS"
              })(
                <Radio.Group>
                  <Radio value="HQS">HQS</Radio>
                  <Radio value="HJ">HJ</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="产品型号">
              {getFieldDecorator(`products[${index}].name`, {
                rules: [
                  {
                    required: true,
                    message: "请输入产品型号"
                  },
                  {
                    whitespace: true,
                    message: "产品型号不能为空白字符"
                  }
                ]
              })(<Input allowClear />)}
            </Form.Item>
            <Form.Item label="材质">
              {getFieldDecorator(`products[${index}].material`, {
                initialValue: "304",
                rules: [
                  {
                    required: true,
                    message: "请指定材质"
                  }
                ]
              })(
                <Select>
                  <Select.Option value="304">304</Select.Option>
                  <Select.Option value="碳钢">碳钢</Select.Option>
                  <Select.Option value="外壳碳钢 芯体304">
                    外壳碳钢 芯体304
                  </Select.Option>
                  <Select.Option value="316L">316L</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="数量">
              {getFieldDecorator(`products[${index}].quantity`, {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                    message: "请输入产品数量"
                  }
                ]
              })(<InputNumber min={1} max={99} />)}
            </Form.Item>
            <Form.Item label="重量 kg">
              {getFieldDecorator(`products[${index}].weight`, {
                initialValue: 50
              })(
                <Radio.Group>
                  <Radio.Button value={8}>{8}</Radio.Button>
                  <Radio.Button value={15}>{15}</Radio.Button>
                  <Radio.Button value={50}>{50}</Radio.Button>
                  <Radio.Button value={200}>{200}</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="流量 t/h">
              {getFieldDecorator(`products[${index}].flow`, {
                initialValue: 20
              })(<InputNumber min={1} max={2000} step={10} />)}
            </Form.Item>
            <Form.Item label="进水温度 °C">
              {getFieldDecorator(`products[${index}].heatFrom`, {
                initialValue: 5
              })(<InputNumber min={1} max={160} />)}
            </Form.Item>
            <Form.Item label="出水温度 °C">
              {getFieldDecorator(`products[${index}].heatTo`, {
                initialValue: 65
              })(<InputNumber min={1} max={200} />)}
            </Form.Item>
            <Form.Item label="法兰标准">
              {getFieldDecorator(`products[${index}].flangeStandard`, {
                initialValue: "GB/T 9119-2000"
              })(
                <Select>
                  <Select.Option value="GB/T 9119-2000">
                    GB/T 9119-2000
                  </Select.Option>
                  <Select.Option value="HG/T 20592-2009">
                    HG/T 20592-2009
                  </Select.Option>
                  <Select.Option value="GB/T 9119-2010">
                    GB/T 9119-2000
                  </Select.Option>
                  <Select.Option value="HG/T 20615-2009">
                    HG/T 20615-2009
                  </Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          新建订单
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateOrderForm = Form.create({ name: "create_order" })(
  CreateOrderFormBase
);

export default CreateOrderForm;
