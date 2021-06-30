import React, { useState, useEffect } from "react";
import AppTable from "../../componentDashs/Table/AppTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFlight,
  createFlight,
  updateFlight,
  deleteFlight,
  searchFlight,
} from "../../redux/Flight/FlightActions";
import { fetchAllPlace } from "../../redux/Place/PlaceActions";
import { fetchAllAirport } from "../../redux/Airport/AirportActions";
import { fetchAllFlightTime } from "../../redux/FlightTime/FlightTimeActions";
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
  Breadcrumb,
  Popconfirm,
} from "antd";
const { Content } = Layout;
const { Option } = Select;
const FormItem = Form.Item;

const Flight = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataUpdate, setDataUpdate] = useState({});
  const [typeAction, setTypeAction] = useState("add");
  useEffect(() => {
    dispatch(fetchAllFlight());
    dispatch(fetchAllPlace());
    dispatch(fetchAllAirport());
    dispatch(fetchAllFlightTime());
  }, [dispatch]);
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  const flights = useSelector((state) => state.flight);
  const dataPlace = useSelector((state) =>
    state.place.filter((data) => data.status !== 0)
  );
  const dataAirport = useSelector((state) =>
    state.airport.filter((data) => data.status !== 0)
  );
  const dataFlightTime = useSelector((state) =>
    state.flightTime.filter((data) => data.status !== 0)
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
    dispatch(searchFlight(values));
  };

  const addFlight = (values) => {
    values.id =
      typeAction === "add"
        ? Math.floor(Math.random() * 1000000000000000000).toString()
        : dataUpdate.id;
    values.status = 1;
    typeAction === "add"
      ? dispatch(createFlight(values))
      : dispatch(updateFlight(values));
    form.resetFields();
    setVisibleDrawer(false);
    openNotification(
      typeAction === "add"
        ? "Add flight successfully"
        : "Update flight successfully",
      "bottomRight"
    );
  };
  const changeStatus = (record) => {
    record.status = record.status ? 0 : 1;
    dispatch(updateFlight(record));
  };
  const handleTableChange = () => {};
  const confirmDelete = () => {
    dispatch(deleteFlight(id));
    openNotification("Delete flight successfully", "bottomRight");
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
          flightCode: "",
          type: "",
          placeDeparture: "",
          placeDestination: "",
        }}
      >
        <Row gutter={{ md: 0, lg: 8, xl: 16 }}>
          <Col xl={8} md={12} xs={24}>
            <FormItem
              name="flightCode"
              label={"Flight Code"}
              {...formItemLayout}
            >
              <Input size="small" />
            </FormItem>
          </Col>

          <Col xl={8} md={12} xs={24}>
            <FormItem name="type" label="Type">
              <Radio.Group>
                <Radio value="Khứ hồi">Khứ hồi</Radio>
                <Radio value="1 chiều">1 chiều</Radio>
              </Radio.Group>
            </FormItem>
          </Col>

          <Col xl={8} md={12} xs={24}>
            <Form.Item
              label="Place Departure"
              name="placeDeparture"
              rules={[
                { required: true, message: "Please select place departure!" },
              ]}
            >
              <Select size="small">
                {dataPlace &&
                  dataPlace.length > 0 &&
                  dataPlace.map((data) => (
                    <Option key={data.id} value={data.name}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xl={8} md={12} xs={24}>
            <Form.Item
              label="Place Destination"
              name="placeDestination"
              rules={[
                { required: true, message: "Please select place destination!" },
              ]}
            >
              <Select size="small">
                {dataPlace &&
                  dataPlace.length > 0 &&
                  dataPlace.map((data) => (
                    <Option key={data.id} value={data.name}>
                      {data.name}
                    </Option>
                  ))}
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
      title: "Flight Code",
      dataIndex: "flightCode",
      key: "flightCode",
      sorter: (a, b) => (a > b ? 1 : -1),
    },
    {
      title: "Flight Type",
      dataIndex: "type",
      align: "center",
      key: "type",
    },
    {
      title: "Place Departure",
      dataIndex: "placeDeparture",
      align: "center",
      key: "placeDeparture",
    },
    {
      title: "Place Destination",
      dataIndex: "placeDestination",
      align: "center",
      key: "placeDestination",
    },
    {
      title: "Airport Destination",
      align: "center",
      key: "airportId",
      render: (text, record) =>
        dataAirport &&
        dataAirport.length > 0 &&
        dataAirport.find((data) => data.id === record.airportId).name,
    },
    {
      title: "Flight Time",
      align: "center",
      key: "flightTimeId",
      render: (text, record) =>
        dataFlightTime &&
        dataFlightTime.length > 0 &&
        dataFlightTime.find((data) => data.id === record.flightTimeId)
          ? dataFlightTime.find((data) => data.id === record.flightTimeId)
              .fromTo
          : "",
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
          <Breadcrumb.Item>Flight Management</Breadcrumb.Item>
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
          title={typeAction === "add" ? "Add New Flight" : "Update Flight"}
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
            onFinish={addFlight}
            initialValues={{
              flightCode: "",
              type: "",
              placeDeparture: "",
              placeDestination: "",
            }}
            layout="vertical"
          >
            <FormItem
              name="flightCode"
              label={"Flight Code"}
              rules={[{ required: true, message: "Please input flight code!" }]}
            >
              <Input />
            </FormItem>

            <FormItem
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please choose type!" }]}
            >
              <Radio.Group>
                <Radio value="Khứ hồi">Khứ hồi</Radio>
                <Radio value="1 chiều">1 chiều</Radio>
              </Radio.Group>
            </FormItem>

            <Form.Item
              label="Place Departure"
              name="placeDeparture"
              rules={[
                { required: true, message: "Please select place departure!" },
              ]}
            >
              <Select>
                {dataPlace &&
                  dataPlace.length > 0 &&
                  dataPlace.map((data) => (
                    <Option key={data.id} value={data.name}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Place Destination"
              name="placeDestination"
              rules={[
                { required: true, message: "Please select place destination!" },
              ]}
            >
              <Select>
                {dataPlace &&
                  dataPlace.length > 0 &&
                  dataPlace.map((data) => (
                    <Option key={data.id} value={data.name}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Airport Destination"
              name="airportId"
              rules={[{ required: true, message: "Please select airport!" }]}
            >
              <Select>
                {dataAirport &&
                  dataAirport.length > 0 &&
                  dataAirport.map((data) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Flight Time"
              name="flightTimeId"
              rules={[
                { required: true, message: "Please select flight time!" },
              ]}
            >
              <Select>
                {dataFlightTime &&
                  dataFlightTime.length > 0 &&
                  dataFlightTime.map((data) => (
                    <Option key={data.id} value={data.id}>
                      {data.fromTo}
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
          dataSource={flights}
          columns={columns}
          onChange={handleTableChange}
        />
      </Content>
    </>
  );
};

export default Flight;
