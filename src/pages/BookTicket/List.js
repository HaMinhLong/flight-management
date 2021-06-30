import React, { useState, useEffect } from "react";
import AppTable from "../../componentDashs/Table/AppTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBookTicket,
  createBookTicket,
  deleteBookTicket,
  updateBookTicket,
} from "../../redux/BookTicket/BookTicketActions";
import { fetchAllTicket } from "../../redux/Ticket/TicketActions";
import { fetchAllFlight } from "../../redux/Flight/FlightActions";
import { fetchAllUser } from "../../redux/User/UserActions";
import { fetchAllAirport } from "../../redux/Airport/AirportActions";
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
  Typography,
} from "antd";
const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;
const FormItem = Form.Item;
const BookTicket = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [typeAction, setTypeAction] = useState("add");
  const [ticketID, setTicketID] = useState();
  const [flightDetails, setFlightDetails] = useState();
  useEffect(() => {
    dispatch(fetchAllBookTicket());
    dispatch(fetchAllTicket());
    dispatch(fetchAllFlight());
    dispatch(fetchAllUser());
    dispatch(fetchAllAirport());
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  useEffect(() => {
    const ticketValue =
      dataTicket &&
      dataTicket.length > 0 &&
      dataTicket.find((data) => data.id === ticketID);

    setFlightDetails(
      ticketValue &&
        dataFlight &&
        dataFlight.length > 0 &&
        dataFlight.find((data) => data.id === ticketValue.flightId)
    );
  }, [ticketID]);
  const bookTickets = useSelector((state) => state.bookTicket);
  const dataTicket = useSelector((state) =>
    state.ticket.filter((data) => data.status !== 0)
  );
  const dataFlight = useSelector((state) =>
    state.flight.filter((data) => data.status !== 0)
  );
  const dataUser = useSelector((state) => state.user);
  const dataAirport = useSelector((state) => state.airport);
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
    // dispatch(searchBookTicket(values));
    console.log(values);
  };

  const addBookTicket = (values) => {
    values.id =
      typeAction === "add"
        ? Math.floor(Math.random() * 1000000000000000000).toString()
        : dataUpdate.id;
    values.status = 1;
    values.userId = localStorage.getItem("userId");
    typeAction === "add"
      ? dispatch(createBookTicket(values))
      : dispatch(updateBookTicket(values));
    form.resetFields();
    setVisibleDrawer(false);
    openNotification(
      typeAction === "add"
        ? "Book ticket successfully"
        : "Update book ticket successfully",
      "bottomRight"
    );
  };

  const changeStatus = (record) => {
    record.status = record.status ? 0 : 1;
    dispatch(updateBookTicket(record));
  };

  const handleTableChange = () => {};

  const confirmDelete = () => {
    dispatch(deleteBookTicket(id));
    openNotification("Delete book ticket successfully", "bottomRight");
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
          status: "",
        }}
      >
        <Row gutter={{ md: 0, lg: 8, xl: 16 }}>
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
      key: "ticketId",
      render: (text, record) => (
        <p>
          {dataTicket &&
            dataTicket.length > 0 &&
            dataTicket.find((data) => data.id === record.ticketId) &&
            dataTicket.find((data) => data.id === record.ticketId).ticketCode}
        </p>
      ),
      sorter: (a, b) => (a > b ? 1 : -1),
    },
    {
      title: "User",
      key: "userId",
      render: (text, record) => (
        <p>
          {dataUser &&
            dataUser.length > 0 &&
            dataUser.find((data) => data.id === record.userId) &&
            dataUser.find((data) => data.id === record.userId).fullName}
        </p>
      ),
      sorter: (a, b) => (a > b ? 1 : -1),
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
          <Breadcrumb.Item>Book Ticket</Breadcrumb.Item>
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
          title={typeAction === "add" ? "Book Ticket" : "Update Book Ticket"}
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
            onFinish={addBookTicket}
            initialValues={{
              ticketCode: "",
              price: "",
              userId: "",
              flightId: "",
              status: 1,
            }}
            layout="vertical"
          >
            <Form.Item
              label="Ticket Code"
              name="ticketId"
              rules={[{ required: true, message: "Please select flight!" }]}
            >
              <Select onChange={(e) => setTicketID(e)}>
                {dataTicket &&
                  dataTicket.length > 0 &&
                  dataTicket.map((data) => (
                    <Option key={data.id} value={data.id}>
                      {data.ticketCode}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              {typeAction === "add" ? "Add" : "Update"}
            </Button>
          </Form>
          <h2 style={{ marginTop: 20 }}>Flight Details</h2>
          {flightDetails && (
            <Space direction="vertical">
              <p>
                Flight Code:{" "}
                <Text type="secondary">{flightDetails.flightCode}</Text>
              </p>
              <p>
                Flight Type: <Text type="secondary">{flightDetails.type}</Text>
              </p>
              <p>
                Place Departure:{" "}
                <Text type="secondary">{flightDetails.placeDeparture}</Text>
              </p>
              <p>
                Place Destination:{" "}
                <Text type="secondary">{flightDetails.placeDestination}</Text>
              </p>
              <p>
                Flight Code:{" "}
                <Text type="secondary">
                  {dataAirport &&
                    dataAirport.length > 0 &&
                    dataAirport.find(
                      (data) => data.id === flightDetails.airportId
                    ).name}
                </Text>
              </p>
            </Space>
          )}
        </Drawer>
        <AppTable
          loading={loading}
          rowKey="id"
          dataSource={bookTickets}
          columns={columns}
          onChange={handleTableChange}
        />
      </Content>
    </>
  );
};

export default BookTicket;
