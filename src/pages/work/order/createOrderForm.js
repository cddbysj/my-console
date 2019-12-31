import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  Modal,
  message
} from "antd";
import firebase from "components/firebase";
import { computeHolesCount, computeThroatDiameter } from "../helper";

const { RangePicker } = DatePicker;

const CreateOrderFormBase = props => {
  const {
    form: { getFieldDecorator, validateFieldsAndScroll },
    visible,
    onCancel,
    onCreate
  } = props;

  const onSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        console.log("received values", values);
        const { date, flow, heatFrom, heatTo } = values;
        // 下单日期
        const orderAt = date[0].format("YYYY-MM-DD");
        // 到货日期
        const arrivalAt = date[1].format("YYYY-MM-DD");
        // 喉部直径由流量推算出
        const throatDiameter = computeThroatDiameter(flow);
        // 斜孔数量由流量和温差共同推算出
        const holesCount = computeHolesCount(flow, heatFrom, heatTo);
        const order = {
          ...values,
          date: { orderAt, arrivalAt },
          nameplate: false,
          certificate: false,
          pressure: "1.0",
          timestamp: firebase.serverTimestamp(),
          throatDiameter,
          heatFrom,
          heatTo,
          holesCount
        };
        console.table("订单信息：", order);
        // api
        firebase
          .createOrder(order)
          .then(() => message.success("订单创建成功", 0.5))
          .catch(error => message.error(error.message));
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  };

  return (
    <Modal
      style={{ top: 10 }}
      visible={visible}
      title="新建订单"
      okText="完成"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form onSubmit={onSubmit} {...formItemLayout}>
        <Form.Item label="销售客户">
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
        <Form.Item label="产品型号">
          {getFieldDecorator("product", {
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
        <Form.Item label="数量">
          {getFieldDecorator("quantity", {
            rules: [
              {
                required: true,
                message: "请输入产品数量"
              }
            ],
            initialValue: 1
          })(<InputNumber min={1} max={99} />)}
        </Form.Item>
        <Form.Item label="重量 kg">
          {getFieldDecorator("weight", {
            rules: [
              {
                required: true,
                message: "请输入重量"
              }
            ],
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
          {getFieldDecorator("flow", {
            initialValue: 20,
            rules: [
              {
                required: true,
                message: "请输入有效的水流量"
              }
            ]
          })(<InputNumber min={1} max={2000} step={10} />)}
        </Form.Item>
        <Form.Item label="进水温度 °C">
          {getFieldDecorator("heatFrom", {
            initialValue: 5,
            rules: [
              {
                required: true,
                message: "请输入进水温度"
              }
            ]
          })(<InputNumber min={1} max={160} />)}
        </Form.Item>
        <Form.Item label="出水温度 °C">
          {getFieldDecorator("heatTo", {
            initialValue: 65,
            rules: [
              {
                required: true,
                message: "请输入出水温度"
              }
            ]
          })(<InputNumber min={1} max={200} />)}
        </Form.Item>
        <Form.Item label="法兰标准">
          {getFieldDecorator("flangeStandard", {
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
        <Form.Item label="货期">
          {getFieldDecorator("date", {
            rules: [
              {
                required: true,
                message: "请输入货期"
              }
            ]
          })(<RangePicker />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateOrderForm = Form.create({ name: "create_order" })(
  CreateOrderFormBase
);

export default CreateOrderForm;
