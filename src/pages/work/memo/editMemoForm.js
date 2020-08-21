/* 编辑备忘录表单 */
import React from "react";
import { Form, Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const EditMemoForm = ({ onClose, onUpdateMemo, onRemoveMemo, activeMemo }) => {
  const [form] = Form.useForm();
  form.setFieldsValue(activeMemo);

  const onFinish = (values) => {
    const newMemo = { ...activeMemo, ...values, createAt: Date.now() };
    onUpdateMemo(newMemo);
    console.log("提交的备忘录：", newMemo);
  };

  const onFinishFailed = () => {};

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name="title">
        <Input placeholder="标题" />
      </Form.Item>
      <Form.Item name="text">
        <Input.TextArea
          autoSize={{ minRows: 2 }}
          placeholder="在这里记录"
          allowClear
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={onRemoveMemo} type="danger" icon={<DeleteOutlined />}>
          删除
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditMemoForm;
