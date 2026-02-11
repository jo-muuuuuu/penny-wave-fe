import React, { useEffect } from "react";
import { Button, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../../store/reducers/billThunk";

const BillOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const billList = useSelector((state) => state.bill.billList);
  const events = billList.map((bill) => ({
    id: bill.id,
    title: bill.name, // 必须有
    start: bill.date,
    extendedProps: bill,
  }));

  const newBillNav = () => {
    navigate("/bill/new");
  };

  useEffect(() => {
    dispatch(fetchBills());
  }, []);

  return (
    <div>
      <div className="header">
        <h2 style={{ marginTop: "0" }}>Bills Overview</h2>
        <Button type="primary" className="green-button" onClick={newBillNav}>
          <PlusCircleOutlined /> New Bill
        </Button>
      </div>

      <Card className="calendar-card">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={(arg) => {
            const bill = arg.event.extendedProps;

            return (
              <div className="bill-event">
                <span className={`bill-status ${bill.status}`}></span>

                <span className="bill-name">{bill.name}</span>
                <span className="bill-amount">${parseInt(bill.amount)}</span>
              </div>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default BillOverview;
