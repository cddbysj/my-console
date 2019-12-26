import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  DatePicker,
  Modal
} from "antd";
import firebase from "../../components/firebase";

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
        const { date } = values;
        const orderAt = date[0].format("YYYY-MM-DD");
        const arrivalAt = date[1].format("YYYY-MM-DD");
        const order = {
          ...values,
          date: { orderAt, arrivalAt },
          nameplate: false,
          certificate: false,
          pressure: '1.0',
          timestamp: firebase.serverTimestamp()
        };
        // api
        firebase.createOrder(order);
      }
    });
  };

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <Modal
      {...formItemLayout}
      style={{ top: 10 }}
      visible={visible}
      title="新建订单"
      okText="完成"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form onSubmit={onSubmit}>
        <Form.Item>
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
          })(<Input placeholder="销售客户" autoFocus allowClear />)}
        </Form.Item>
        <Form.Item>
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
          })(<Input placeholder="产品型号" allowClear />)}
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
          })(<InputNumber />)}
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
              <Radio value={8}>{8}</Radio>
              <Radio value={15}>{15}</Radio>
              <Radio value={50}>{50}</Radio>
              <Radio value={200}>{200}</Radio>
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
          })(<InputNumber />)}
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
