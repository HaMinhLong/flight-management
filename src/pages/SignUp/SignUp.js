import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/User/UserActions";
import {
  Form,
  Input,
  Button,
  Checkbox,
  notification,
  Typography,
  Select,
} from "antd";
const { Option } = Select;
const { Title, Text } = Typography;
const SignUp = (props) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user);
  useEffect(() => {
    message === "Register Successfully"
      ? registerSuccess(message)
      : message && message.length > 0
      ? openNotification(message, "bottomRight")
      : console.log("Register");
  }, [message]);
  const onFinish = (values) => {
    values.idUser = Math.floor(Math.random() * 1000000000000000000).toString();
    values.idAccount = Math.floor(
      Math.random() * 1000000000000000000
    ).toString();
    dispatch(registerUser(values));
  };

  const registerSuccess = (mes) => {
    openNotificationSuccess(mes, "bottomRight");
    window.location = "/";
  };

  const openNotification = (text, placement) => {
    notification.error({
      message: `${text}`,
      description: `${text}`,
      placement,
    });
  };
  const openNotificationSuccess = (text, placement) => {
    notification.success({
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
    <>
      <section className="login-page">
        <div className="form-container">
          <Title level={2}>Sign Up</Title>
          <Text style={{ marginBottom: 50 }}>
            Sign <up></up> by entering the information below
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
              name="fullName"
              label={"Full Name"}
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              name="gender"
              label={"Gender"}
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select>
                <Option key={"Male"} value={"Male"}>
                  Male
                </Option>
                <Option key={"Female"} value={"Female"}>
                  Female
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              name="email"
              label={"Email"}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              name="phoneNumber"
              label={"Phone Number"}
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ position: "relative" }}
            >
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
                Sign Up
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              You have an account? <Link to="/">Login</Link>
            </p>
          </Form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
