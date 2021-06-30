import React, { useState, useEffect } from "react";
import AppTable from "../../componentDashs/Table/AppTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  searchTicket,
} from "../../redux/Ticket/TicketActions";
import { fetchAllFlight } from "../../redux/Flight/FlightActions";
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
const Ticket = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [typeAction, setTypeAction] = useState("add");
  useEffect(() => {
    dispatch(fetchAllTicket());
    dispatch(fetchAllFlight());
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  const tickets = useSelector((state) => state.ticket);
  const dataFlight = useSelector((state) =>
    state.flight.filter((data) => data.status !== 0)
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
    dispatch(searchTicket(values));
  };

  const addTicket = (values) => {
    values.id =
      typeAction === "add"
        ? Math.floor(Math.random() * 1000000000000000000).toString()
        : dataUpdate.id;
    values.status = 1;
    typeAction === "add"
      ? dispatch(createTicket(values))
      : dispatch(updateTicket(values));
    form.resetFields();
    setVisibleDrawer(false);
    openNotification(
      typeAction === "add"
        ? "Add ticket successfully"
        : "Update ticket successfully",
      "bottomRight"
    );
  };

  const changeStatus = (record) => {
    record.status = record.status ? 0 : 1;
    dispatch(updateTicket(record));
  };

  const handleTableChange = () => {};

  const confirmDelete = () => {
    dispatch(deleteTicket(id));
    openNotification("Delete ticket successfully", "bottomRight");
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
          ticketCode: "",
          status: "",
        }}
      >
        <Row gutter={{ md: 0, lg: 8, xl: 16 }}>
          <Col xl={8} md={12} xs={24}>
            <FormItem
              name="ticketCode"
              label={"Ticket Code"}
              {...formItemLayout}
            >
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
      title: "Ticket Code",
      dataIndex: "ticketCode",
      key: "ticketCode",
      sorter: (a, b) => (a > b ? 1 : -1),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Flight",
      key: "flightId",
      render: (text, record) => (
        <p>
          {dataFlight &&
            dataFlight.length > 0 &&
            dataFlight.find((data) => data.id === record.flightId) &&
            dataFlight.find((data) => data.id === record.flightId).flightCode}
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
          <Breadcrumb.Item>Ticket Management</Breadcrumb.Item>
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
          title={typeAction === "add" ? "Add New Ticket" : "Update Ticket"}
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
            onFinish={addTicket}
            initialValues={{
              ticketCode: "",
              price: "",
              userId: "",
              flightId: "",
              status: 1,
            }}
            layout="vertical"
          >
            <FormItem
              name="ticketCode"
              label={"Ticket Code"}
              rules={[{ required: true, message: "Please input ticket code!" }]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="price"
              label={"Price"}
              rules={[
                { required: true, message: "Please input ticket price!" },
              ]}
            >
              <Input type="number" />
            </FormItem>

            <Form.Item
              label="Flight"
              name="flightId"
              rules={[{ required: true, message: "Please select flight!" }]}
            >
              <Select>
                {dataFlight &&
                  dataFlight.length > 0 &&
                  dataFlight.map((data) => (
                    <Option key={data.id} value={data.id}>
                      {data.flightCode}
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
          dataSource={tickets}
          columns={columns}
          onChange={handleTableChange}
        />
      </Content>
    </>
  );
};

export default Ticket;
