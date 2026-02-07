import React from "react";
import { Button, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./index.css";

const BillOverview = () => {
  const navigate = useNavigate();
  const newBillNav = () => {
    navigate("/bill/new");
  };

  return (
    <div>
      <div className="header">
        <h2 style={{ marginTop: "0" }}>Bills Overview</h2>
        <Button type="primary" className="green-button" onClick={newBillNav}>
          <PlusCircleOutlined /> New Bill
        </Button>
      </div>

      <Card className="calendar-card">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </Card>
    </div>
  );
};

export default BillOverview;
