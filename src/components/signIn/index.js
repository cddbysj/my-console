import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import firebase from "../firebase";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
  state = {
    email: null
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();

    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ email: user.email });
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { email, password } = values;
        firebase
          .signInWithEmailAndPassword(email, password)
          .then(result => {
            message.success("欢迎");
          })
          .catch(error => message.error(error.message));
      }
    });
  };

  signOut = () => {
    firebase.signOut();
  };

  render() {
    const { email } = this.state;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return email ? (
      <span>
        <Icon type="user" />
        {email}{" "}
        <Button
          type="primary"
          shape="round"
          size="small"
          onClick={this.signOut}
        >
          Sign out
        </Button>
      </span>
    ) : (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={emailError ? "error" : ""}
          help={emailError || ""}
        >
          {getFieldDecorator("email", {
            rules: [
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your email!" }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
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
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);

export default WrappedLoginForm;
