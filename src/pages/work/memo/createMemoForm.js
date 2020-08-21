/* 新建备忘录表单 */
import React from "react";
import { Form, Input, Button } from "antd";

const CreateMemoForm = ({ onClose, onCreateMemo }) => {
  const onFinish = (values) => {
    const newMemo = { ...values, createAt: Date.now() };
    onCreateMemo(newMemo);
    console.log("提交的备忘录：", newMemo);
  };
  const onFinishFailed = () => {};

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name="title" rules={[{ required: true, whitespace: true }]}>
        <Input placeholder="标题" />
      </Form.Item>
      <Form.Item name="text" rules={[{ required: true, whitespace: true }]}>
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
    </Form>
  );
};

export default CreateMemoForm;
