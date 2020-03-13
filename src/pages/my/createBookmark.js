import React, { useState } from "react";
import { Button, Drawer, Form, Input, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SITE_CATEGORIES } from "constants/index";

const { Option } = Select;

const CreateBookmark = ({ addSite }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);

  const onDrawerClose = () => setVisible(false);

  const onFinish = async values => {
    console.log("received values: ", values);
    await addSite({ ...values, createAt: Date.now() });
    onDrawerClose();
    message.success("添加成功", 0.5);
  };

  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      span: 16,
      offset: 8
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showDrawer()}
      >
        添加网址
      </Button>
      <Drawer
        title="添加网址"
        placement="left"
        closable={false}
        onClose={onDrawerClose}
        visible={visible}
        width={400}
      >
        <Form
          onFinish={onFinish}
          {...formItemLayout}
          initialValues={{
            category: SITE_CATEGORIES[0]
          }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: "请输入网址标题"
              },
              {
                whitespace: true,
                message: "网址标题不能为空字符"
              }
            ]}
          >
            <Input autoFocus />
          </Form.Item>
          <Form.Item
            name="description"
            label="概要"
            rules={[
              {
                required: true,
                message: "请输入描述信息"
              },
              {
                whitespace: true,
                message: "描述信息不能为空字符"
              }
            ]}
          >
            <Input placeholder="尽可能简短" />
          </Form.Item>
          <Form.Item
            name="url"
            label="网址"
            rules={[
              {
                required: true,
                message: "请输入链接"
              },
              {
                whitespace: true,
                message: "链接不能为空字符"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="类别"
            rules={[
              {
                required: true,
                message: "请输入网址类别"
              },
              {
                whitespace: true,
                message: "网址类别不能为空字符"
              }
            ]}
          >
            <Select>
              {SITE_CATEGORIES.map(c => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick={onDrawerClose} style={{ marginRight: 12 }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default CreateBookmark;
