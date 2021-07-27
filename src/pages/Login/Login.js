import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/User/UserActions";
import { Form, Input, Button, Checkbox, notification, Typography } from "antd";
const { Title, Text } = Typography;
const Login = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginUser(values));
  };
  const users = useSelector((state) => state.user);

  useEffect(() => {
    users === "User not found"
      ? openNotification("User not found", "bottomRight")
      : users === "Password is wrong"
      ? openNotification("Password is wrong", "bottomRight")
      : users && users.length > 0
      ? loginSuccess(users[0])
      : console.log("Login Page");
  }, [users]);

  const loginSuccess = (data) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.id);
    window.location = "/";
  };

  const openNotification = (text, placement) => {
    notification.error({
      message: `${text}`,
      description: `${text}`,
      placement,
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
    },
    colon: false,
    labelAlign: "left",
    style: { marginBottom: 20 },
  };
  return (
    <section className="login-page">
      <div className="form-container">
        <Title level={2}>Sign In</Title>
        <Text style={{ marginBottom: 50 }}>
          Sign in by entering the information below
        </Text>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="form-login"
        >
          <Form.Item
            {...formItemLayout}
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }} style={{ position: "relative" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Login
            </Button>
          </Form.Item>
          <p style={{ textAlign: "center" }}>
            You don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      </div>
    </section>
  );
};

export default Login;
