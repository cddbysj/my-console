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
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import * as ROUTES from "constants/routes";
import firebase from "api/firebase";
import styles from "./createOrderForm.module.css";

const { RangePicker } = DatePicker;

// 订单中产品的初始状态
// 为什么需要这个？ 参考：https://github.com/ant-design/ant-design/issues/21816
const initialProduct = {
  model: "HQS",
  material: "304",
  quantity: 1,
  weight: 50,
  flow: 20,
  heatFrom: 5,
  heatTo: 65,
  flangeStandard: "HG/T 20592-2009",
  pressure: "1.0"
};
const initialProducts = [];
// 单个订单一般不超过 10 个产品
for (let index = 0; index < 10; index++) {
  initialProducts.push(initialProduct);
}

const CreateOrderForm = props => {
  const history = useHistory();
  // 根据 flag 的值判断订单状态：
  // EDIT_ORDER 编辑订单
  // COPY_ORDER 复制订单
  // 其他值都为：新建订单
  // 将部分表单的初始值设置为正在编辑订单的数据
  const { id, date, consumer, products, flag } = history.location.state || {};

  // 用于动态增删产品
  const [items, setItems] = useState([0]);

  const addItem = () => setItems(prev => [...prev, 0]);
  const removeItem = () => setItems(prev => prev.slice(0, prev.length - 1));

  let submitButtonText = "新建订单";

  const onFinish = values => {
    let { date, products } = values;
    // antd v4 改动：嵌套字段使用数组会有一点问题，如下：
    // 假如要选定 products 数组 第一个元素的 name 属性
    // v3 字段路径： 'products.0.name'
    // v4 字段路径：['products', '0', 'name']
    // v4 得到的 products 得到的不是数组，而是属性为数字下标的对象
    // 将 products 添加 length 属性，然后转化为数组
    products.length = Object.keys(products).length;
    products = Array.from(products);
    products.filter(product => product.name);

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
    // api
    switch (flag) {
      case "EDIT_ORDER":
        firebase
          .editOrder(id, order)
          .then(() => {
            message.success("订单更新成功", 1);
            history.push(ROUTES.WORK_ORDERS);
          })
          .catch(error => message.error(error.message));
        submitButtonText = "更新订单";
        break;
      case "COPY_ORDER":
        firebase
          .createOrder(order)
          .then(() => {
            message.success("订单复制成功", 1);
            history.push(ROUTES.WORK_ORDERS);
          })
          .catch(error => message.error(error.message));
        submitButtonText = "复制订单";
        break;
      default:
        firebase
          .createOrder(order)
          .then(() => {
            message.success("订单创建成功", 1);
            history.push(ROUTES.WORK_ORDERS);
          })
          .catch(error => message.error(error.message));
        break;
    }
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
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        consumer: consumer || "",
        date: date || [moment(), moment().add(7, "days")],
        products: products || initialProducts
      }}
    >
      <Form.Item
        name="consumer"
        label="销售客户"
        wrapperCol={{ span: 8 }}
        rules={[
          {
            required: true,
            message: "请输入销售客户"
          },
          {
            whitespace: true,
            message: "销售客户不能为空白字符"
          }
        ]}
      >
        <Input autoFocus allowClear />
      </Form.Item>
      <Form.Item
        name="date"
        label="货期"
        wrapperCol={{ span: 8 }}
        rules={[
          {
            required: true,
            message: "请输入货期"
          }
        ]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item noStyle>
        <Row gutter={10} className={styles.productRow}>
          {items.map((item, index) => (
            <Col
              key={index}
              span={8}
              pull={index === 1 ? 8 : 0}
              push={index === 0 ? 8 : 0}
              className={styles.productCol}
            >
              <Form.Item name={["products", `${index}`, "model"]} label="款式">
                <Radio.Group defaultValue="HQS">
                  <Radio value="HQS">HQS</Radio>
                  <Radio value="HJ">HJ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "name"]}
                label="产品型号"
                rules={[
                  {
                    required: true,
                    message: "请输入产品型号"
                  },
                  {
                    whitespace: true,
                    message: "产品型号不能为空白字符"
                  }
                ]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "material"]}
                label="材质"
                rules={[
                  {
                    required: true,
                    message: "请指定材质"
                  }
                ]}
              >
                <Select defaultValue="304">
                  <Select.Option value="304">304</Select.Option>
                  <Select.Option value="碳钢">碳钢</Select.Option>
                  <Select.Option value="外壳碳钢 芯体304">
                    外壳碳钢 芯体304
                  </Select.Option>
                  <Select.Option value="316L">316L</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "quantity"]}
                label="数量"
                rules={[
                  {
                    required: true,
                    message: "请输入产品数量"
                  }
                ]}
              >
                <InputNumber min={1} max={99} defaultValue={1} />
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "weight"]}
                label="重量 kg"
              >
                <Radio.Group defaultValue={50}>
                  <Radio.Button value={8}>{8}</Radio.Button>
                  <Radio.Button value={15}>{15}</Radio.Button>
                  <Radio.Button value={50}>{50}</Radio.Button>
                  <Radio.Button value={200}>{200}</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "flow"]}
                label="流量 t/h"
              >
                <InputNumber min={1} max={2000} step={10} defaultValue={20} />
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "heatFrom"]}
                label="进水温度 °C"
              >
                <InputNumber min={1} max={160} defaultValue={5} />
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "heatTo"]}
                label="出水温度 °C"
              >
                <InputNumber min={1} max={200} defaultValue={65} />
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "flangeStandard"]}
                label="法兰标准"
              >
                <Select defaultValue="HG/T 20592-2009">
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
              </Form.Item>
              <Form.Item
                name={["products", `${index}`, "pressure"]}
                label="压力 MPa"
              >
                1.0
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          {submitButtonText}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button.Group>
          <Button
            disabled={items.length <= 1}
            icon={<MinusOutlined />}
            onClick={removeItem}
          >
            删除产品
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
            增加产品
          </Button>
        </Button.Group>
      </Form.Item>
    </Form>
  );
};

export default CreateOrderForm;
