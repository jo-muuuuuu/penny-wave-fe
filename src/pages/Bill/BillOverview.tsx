import { useEffect } from "react";
import { Button, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventInput } from "@fullcalendar/core";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBills } from "../../store/reducers/billThunk";
import { Bill } from "../../types/bill";

const BillOverview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const billList = useAppSelector((state) => state.bill.billList);
  const events: EventInput[] = billList.map((bill) => ({
    id: String(bill.id),
    title: bill.name,
    start: bill.date,
    extendedProps: bill,
  }));

  const newBillNav = () => {
    navigate("/bill/new");
  };

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

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
            const bill = arg.event.extendedProps as Bill;

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
