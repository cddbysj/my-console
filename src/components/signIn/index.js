import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import firebase from "../../api/firebase";
import useAuth from "../../hooks/useAuth";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const LoginForm = props => {
  const user = useAuth();
  const email = user && user.email;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { email, password } = values;
        firebase
          .signInWithEmailAndPassword(email, password)
          .then(result => {
            message.success("欢迎", 1);
          })
          .catch(error => message.error(error.message));
      }
    });
  };

  const signOut = () => {
    firebase.signOut();
  };

  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = props.form;

  // Only show error after a field is touched.
  const emailError = isFieldTouched("email") && getFieldError("email");
  const passwordError = isFieldTouched("password") && getFieldError("password");

  return email ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        icon="logout"
        style={{ marginLeft: 20 }}
        size="small"
        onClick={signOut}
      >
        登出
      </Button>
    </div>
  ) : (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item
        validateStatus={emailError ? "error" : ""}
        help={emailError || ""}
      >
        {getFieldDecorator("email", {
          rules: [
            { type: "email", message: "无效的电子邮箱" },
            { required: true, message: "请输入你的电子邮箱" }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="电子邮件"
          />
        )}
      </Form.Item>
      <Form.Item
        validateStatus={passwordError ? "error" : ""}
        help={passwordError || ""}
      >
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="密码"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

export default WrappedLoginForm;
