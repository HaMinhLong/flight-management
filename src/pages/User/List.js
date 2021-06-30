import React, { useState, useEffect } from "react";
import AppTable from "../../componentDashs/Table/AppTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUser,
  createUser,
  deleteUser,
  updateUser,
  searchUser,
} from "../../redux/User/UserActions";
import { fetchAllAccount } from "../../redux/Account/AccountActions";
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

const User = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [typeAction, setTypeAction] = useState("add");
  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchAllAccount());
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  const users = useSelector((state) => state.user);
  const dataAccount = useSelector((state) =>
    state.account.filter((data) => data.status !== 0)
  );
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
    dispatch(searchUser(values));
  };

  const addUser = (values) => {
    values.id =
      typeAction === "add"
        ? Math.floor(Math.random() * 1000000000000000000).toString()
        : dataUpdate.id;
    values.status = 1;
    typeAction === "add"
      ? dispatch(createUser(values))
      : dispatch(updateUser(values));
    form.resetFields();
    setVisibleDrawer(false);
    openNotification(
      typeAction === "add"
        ? "Add user successfully"
        : "Update user successfully",
      "bottomRight"
    );
  };

  const changeStatus = (record) => {
    record.status = record.status ? 0 : 1;
    dispatch(updateUser(record));
  };

  const handleTableChange = () => {};

  const confirmDelete = () => {
    dispatch(deleteUser(id));
    openNotification("Delete user successfully", "bottomRight");
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
          fullName: "",
          status: "",
        }}
      >
        <Row gutter={{ md: 0, lg: 8, xl: 16 }}>
          <Col xl={8} md={12} xs={24}>
            <FormItem name="fullName" label={"Full Name"} {...formItemLayout}>
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
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => (a > b ? 1 : -1),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Username",
      key: "accountId",
      render: (text, record) => (
        <p>
          {dataAccount &&
            dataAccount.length > 0 &&
            dataAccount.find((data) => data.id === record.accountId).username}
        </p>
      ),
    },
    {
      title: "Status",
      align: "center",
      key: "status",
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
    <>
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
          <Breadcrumb.Item>User Management</Breadcrumb.Item>
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
          title={typeAction === "add" ? "Add New User" : "Update User"}
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
            onFinish={addUser}
            initialValues={{
              fullName: "",
              gender: "",
              email: "",
              phoneNumber: "",
              accountId: "",
              status: 1,
            }}
            layout="vertical"
          >
            <FormItem
              name="fullName"
              label={"Full Name"}
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </FormItem>

            <FormItem
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
            </FormItem>

            <FormItem
              name="email"
              label={"Email"}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="phoneNumber"
              label={"Phone Number"}
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </FormItem>

            <Form.Item
              label="Account"
              name="accountId"
              rules={[{ required: true, message: "Please select account!" }]}
            >
              <Select>
                {dataAccount &&
                  dataAccount.length > 0 &&
                  dataAccount.map((data) => (
                    <Option key={data.id} value={data.accountId}>
                      {data.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              {typeAction === "add" ? "Add" : "Update"}
            </Button>
          </Form>
        </Drawer>
        <AppTable
          loading={loading}
          rowKey="id"
          dataSource={users}
          columns={columns}
          onChange={handleTableChange}
        />
      </Content>
    </>
  );
};

export default User;
