import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/User/UserActions";
import { Form, Input, Button, Checkbox, notification } from "antd";
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
  return (
    <section className="login-page">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: 500 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Login;
