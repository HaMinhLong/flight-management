import React, { useState, useEffect } from "react";
import AppTable from "../../componentDashs/Table/AppTable";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchAllFlightTime,
  createFlightTime,
  updateFlightTime,
  deleteFlightTime,
  searchFlightTime,
} from "../../redux/FlightTime/FlightTimeActions";
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
const FlightTime = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [typeAction, setTypeAction] = useState("add");
  useEffect(() => {
    dispatch(fetchAllFlightTime());
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  const flightTimes = useSelector((state) => state.flightTime);
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
    dispatch(searchFlightTime(values));
  };

  const addFlightTime = (values) => {
    values.id =
      typeAction === "add"
        ? Math.floor(Math.random() * 1000000000000000000).toString()
        : dataUpdate.id;
    values.status = 1;
    typeAction === "add"
      ? dispatch(createFlightTime(values))
      : dispatch(updateFlightTime(values));
    form.resetFields();
    setVisibleDrawer(false);
    openNotification(
      typeAction === "add"
        ? "Add flight time successfully"
        : "Update flight time successfully",
      "bottomRight"
    );
  };

  const changeStatus = (record) => {
    record.status = record.status ? 0 : 1;
    dispatch(updateFlightTime(record));
  };

  const handleTableChange = () => {};

  const confirmDelete = () => {
    dispatch(deleteFlightTime(id));
    openNotification("Delete flight time successfully", "bottomRight");
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
          name: "",
          status: "",
        }}
      >
        <Row gutter={{ md: 0, lg: 8, xl: 16 }}>
          <Col xl={8} md={12} xs={24}>
            <FormItem name="fromTo" label={"Flight Time"} {...formItemLayout}>
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
      title: "Flight Time Name",
      dataIndex: "fromTo",
      key: "fromTo",
      fixed: "left",
      width: 200,
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
          <Breadcrumb.Item>Flight Time Management</Breadcrumb.Item>
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
          title={
            typeAction === "add" ? "Add New Flight Time" : "Update Flight Time"
          }
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
            onFinish={addFlightTime}
            initialValues={{
              fromTo: "",
              status: 1,
            }}
            layout="vertical"
          >
            <FormItem
              name="fromTo"
              label={"Flight Time"}
              rules={[{ required: true, message: "Please input flight time!" }]}
            >
              <Input />
            </FormItem>

            <Button type="primary" htmlType="submit">
              {typeAction === "add" ? "Add" : "Update"}
            </Button>
          </Form>
        </Drawer>
        <AppTable
          loading={loading}
          rowKey="id"
          dataSource={flightTimes}
          columns={columns}
          onChange={handleTableChange}
          scrollX={{ x: 600 }}
        />
      </Content>
    </>
  );
};

export default FlightTime;
