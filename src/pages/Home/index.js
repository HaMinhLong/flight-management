import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { totalFlight } from "../../redux/Flight/FlightActions";
import { totalPlace } from "../../redux/Place/PlaceActions";
import { totalTicket } from "../../redux/Ticket/TicketActions";
import { totalUser } from "../../redux/User/UserActions";
import {
  totalFlightByPlaceDeparture,
  totalFlightByPlaceDestination,
  totalFlightByType,
  totalFlightByAirport,
} from "../../redux/Statistical/StatisticalActions";
import { Line, Pie, Bar, Area, DualAxes } from "@ant-design/charts";
import { Layout, Row, Col, Select, Typography, Card } from "antd";
const { Content } = Layout;
const { Text, Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalFlight());
    dispatch(totalPlace());
    dispatch(totalTicket());
    dispatch(totalUser());
    dispatch(totalFlightByPlaceDeparture());
    dispatch(totalFlightByPlaceDestination());
    dispatch(totalFlightByType());
    dispatch(totalFlightByAirport());
  }, []);
  const totalFlights = useSelector((state) => state.flight[0]);
  const totalPlaces = useSelector((state) => state.place[0]);
  const totalTickets = useSelector((state) => state.ticket[0]);
  const totalUsers = useSelector((state) => state.user[0]);
  const totalFlightsDeparture = useSelector(
    (state) => state.statistical.departure
  );
  const totalFlightsDestination = useSelector(
    (state) => state.statistical.destination
  );
  const totalFlightsByType = useSelector((state) => state.statistical.type);
  const totalFlightsByAirport = useSelector(
    (state) => state.statistical.airport
  );

  // const configDualAxes = {
  //   data: [totalFlightsDeparture, totalFlightsDestination],
  //   xField: "type",
  //   yField: ["value"],
  //   geometryOptions: [
  //     {
  //       geometry: "line",
  //       seriesField: "value",
  //       lineStyle: {
  //         lineWidth: 3,
  //         lineDash: [5, 5],
  //       },
  //       smooth: true,
  //     },
  //     {
  //       geometry: "line",
  //       seriesField: "value",
  //       point: {},
  //     },
  //   ],
  // };

  const configLineDeparture = {
    data: totalFlightsDeparture || {},
    xField: "type",
    yField: "value",
    seriesField: "category",
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return "".concat(s, ",");
          });
        },
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  const configPieDestination = {
    appendPadding: 10,
    data: totalFlightsDestination || {},
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: { type: "outer" },
    interactions: [{ type: "element-active" }],
  };

  const configBarAirport = {
    data: totalFlightsByAirport || {},
    xField: "value",
    yField: "type",
    seriesField: "type",
    legend: { position: "top-left" },
  };

  const configAreaType = {
    data: totalFlightsByType || {},
    xField: "type",
    yField: "value",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: function areaStyle() {
      return { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" };
    },
  };

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
        <Title level={2}>Dashboard</Title>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <Card
              title="Flight Management"
              extra={<Link to="/flight">Details</Link>}
              // style={{ width: 300 }}
            >
              <Text
                type="secondary"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                <i className="fas fa-plane" style={{ marginRight: 20 }}></i>
                Our total flights
              </Text>
              <br />
              <Text
                style={{ fontWeight: "bold", fontSize: 40, marginLeft: 40 }}
              >
                {totalFlights && totalFlights.total ? totalFlights.total : ""}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Place Management"
              extra={<Link to="/place">Details</Link>}
              // style={{ width: 300 }}
            >
              <Text
                type="secondary"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                <i
                  className="fas fa-map-marked-alt"
                  style={{ marginRight: 20 }}
                ></i>
                Our total places
              </Text>
              <br />
              <Text
                style={{ fontWeight: "bold", fontSize: 40, marginLeft: 40 }}
              >
                {totalPlaces && totalPlaces.total ? totalPlaces.total : ""}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Ticket Management"
              extra={<Link to="/ticket">Details</Link>}
              // style={{ width: 300 }}
            >
              <Text
                type="secondary"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                <i
                  className="fas fa-plane-arrival"
                  style={{ marginRight: 20 }}
                ></i>
                Our total tickets
              </Text>
              <br />
              <Text
                style={{ fontWeight: "bold", fontSize: 40, marginLeft: 40 }}
              >
                {totalTickets && totalTickets.total ? totalTickets.total : ""}
              </Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="User Management"
              extra={<Link to="/user">Details</Link>}
              // style={{ width: 300 }}
            >
              <Text
                type="secondary"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                <i
                  className="far fa-user-circle"
                  style={{ marginRight: 20 }}
                ></i>
                Our total users
              </Text>
              <br />
              <Text
                style={{ fontWeight: "bold", fontSize: 40, marginLeft: 40 }}
              >
                {totalUsers && totalUsers.total ? totalUsers.total : ""}
              </Text>{" "}
            </Card>
          </Col>
        </Row>

        {/* <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
          <Col span={24}>
            {totalFlightsDeparture && totalFlightsDestination && (
              <DualAxes {...configDualAxes} />
            )}
          </Col>
        </Row> */}

        <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
          <Col span={12}>
            {totalFlightsDeparture && <Line {...configLineDeparture} />}
          </Col>
          <Col span={12}>
            {totalFlightsDestination && <Pie {...configPieDestination} />}
          </Col>
        </Row>
        <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
          <Col span={18}>
            {totalFlightsByAirport && <Bar {...configBarAirport} />}
          </Col>
          <Col span={6}>
            {totalFlightsByType && <Area {...configAreaType} />}
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Home;
