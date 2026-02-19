import { useEffect } from "react";
import { Button, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import type { EventInput } from "@fullcalendar/core";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBills } from "../../store/reducers/billThunk";
import { OnceOffBill } from "../../types/bill";
import { setBillSelected } from "../../store/reducers/billSlice";

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

  const viewBillNav = (bill: OnceOffBill) => {
    dispatch(setBillSelected(bill));
    navigate(`/bill/view/${bill.id}`);
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
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          height="auto"
          expandRows={false}
          showNonCurrentDates={false}
          fixedWeekCount={false}
          dayMaxEvents={2}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,listWeek", // user can switch between the two
          }}
          events={events}
          eventContent={(arg) => {
            const bill = arg.event.extendedProps as OnceOffBill;

            return (
              <div className="bill-event" onClick={() => viewBillNav(bill)}>
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
