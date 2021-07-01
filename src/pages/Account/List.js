import React, { useState, useEffect } from "react";
import AppTable from "../../componentDashs/Table/AppTable";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchAllAccount,
  createAccount,
  deleteAccount,
  updateAccount,
  searchAccount,
} from "../../redux/Account/AccountActions";
import {
  Layout,
  Button,
  Input,
  Tooltip,
  Row,
  Col,
  Switch,
  Select,
  Form,
  Avatar,
  notification,
  Modal,
  Drawer,
  Radio,
  Space,
  Popconfirm,
  Breadcrumb,
} from "antd";
const { Content } = Layout;
const { Option } = Select;
const FormItem = Form.Item;

const Account = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [typeAction, setTypeAction] = useState("add");
  useEffect(() => {
    dispatch(fetchAllAccount());
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  const accounts = useSelector((state) => state.account);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [filter, setFilter] = useState({
    name: "",
  });
  const formItemLayout = {
    labelCol: {
      sm: { span: 7 },
      xs: { span: 7 },
      md: { span: 7 },
      xl: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 17 },
      sm: { span: 17 },
      md: { span: 17 },
      xl: { span: 17 },
    },
    style: { marginBottom: 10 },
    labelAlign: "left",
  };

  const handleSearch = (values) => {
    dispatch(searchAccount(values));
  };

  const addAccount = (values) => {
    values.id =
      typeAction === "add"
        ? Math.floor(Math.random() * 1000000000000000000).toString()
        : dataUpdate.id;
    values.status = 1;
    typeAction === "add"
      ? dispatch(createAccount(values))
      : dispatch(updateAccount(values));
    form.resetFields();
    setVisibleDrawer(false);
    openNotification(
      typeAction === "add"
        ? "Add account successfully"
        : "Update account successfully",
      "bottomRight"
    );
  };

  const changeStatus = (record) => {
    record.status = record.status ? 0 : 1;
    dispatch(updateAccount(record));
  };

  const handleTableChange = () => {};

  const confirmDelete = () => {
    dispatch(deleteAccount(id));
    openNotification("Delete account successfully", "bottomRight");
  };

  const openNotification = (text, placement) => {
    notification.success({
      message: `${text}`,
      description: `${text}`,
      placement,
    });
  };

  const SearchForm = () => {
    return (
      <Form
        onFinish={handleSearch}
        initialValues={{
          username: "",
          status: "",
        }}
      >
        <Row gutter={{ md: 0, lg: 8, xl: 16 }}>
          <Col xl={8} md={12} xs={24}>
            <FormItem name="username" label={"Username"} {...formItemLayout}>
              <Input size="small" />
            </FormItem>
          </Col>
          <Col xl={8} md={12} xs={24}>
            <Form.Item label="Status" name="status">
              <Select size="small">
                <Option key={1} value={1}>
                  Active
                </Option>
                <Option key={0} value={0}>
                  Cancel
                </Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xl={8} md={12} xs={24}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      fixed: "left",
      width: 150,
      sorter: (a, b) => (a > b ? 1 : -1),
    },
    {
      title: "Created At",
      key: "createdAt",
      width: 150,
      render: (text, record) => <p>{moment(record.createdAt).format("LL")}</p>,
    },
    {
      title: "Status",
      align: "center",
      key: "status",
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Tooltip placement="top" title={record.status ? "Active" : "Cancel"}>
            <Switch
              id="switch"
              defaultChecked={record.status}
              onChange={() => changeStatus(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      width: 150,
      render: (text, record) => (
        <Space size="middle">
          <Button
            disabled={!record.status}
            onClick={() => {
              setTypeAction("update");
              setDataUpdate(record);
              setVisibleDrawer(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirmDelete}
            // onCancel={cancelDelete}
            okText="Yes"
            cancelText="No"
            disabled={!record.status}
          >
            <Button
              danger
              disabled={!record.status}
              onClick={() => setId(record.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Account Management</Breadcrumb.Item>
      </Breadcrumb>
      {SearchForm()}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div></div>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            setTypeAction("add");
            setVisibleDrawer(true);
          }}
        >
          Add
        </Button>
      </div>
      <Drawer
        title={typeAction === "add" ? "Add New Account" : "Update Account"}
        placement="right"
        closable={false}
        onClose={() => {
          setVisibleDrawer(false);
        }}
        visible={visibleDrawer}
        width={450}
      >
        <Form
          form={form}
          onFinish={addAccount}
          initialValues={{
            username: "",
            password: "",
            status: 1,
          }}
          layout="vertical"
        >
          <FormItem
            name="username"
            label={"Username"}
            rules={[{ required: true, message: "Please input username!" }]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </FormItem>

          <FormItem
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
          </FormItem>

          <Button type="primary" htmlType="submit">
            {typeAction === "add" ? "Add" : "Update"}
          </Button>
        </Form>
      </Drawer>
      <AppTable
        loading={loading}
        rowKey="id"
        dataSource={accounts}
        columns={columns}
        onChange={handleTableChange}
        scrollX={{ x: 600 }}
      />
    </Content>
  );
};

export default Account;
