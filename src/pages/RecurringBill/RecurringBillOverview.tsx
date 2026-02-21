import { Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchRecurringBills } from "../../store/reducers/recurringBillThunk";

import BillList from "../../components/BillList";

const { Column } = Table;

const RecurringBillOverview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const recurringBillList = useAppSelector(
    (state) => state.recurringBill.recurringBillList,
  );

  const newRecurringBillNav = () => {
    navigate("/recurring-bill/new");
  };

  useEffect(() => {
    dispatch(fetchRecurringBills());
  }, [dispatch]);

  return (
    <div>
      <div className="header">
        <h2 style={{ marginTop: "0" }}>Recurring Bills Overview</h2>
        <Button type="primary" className="green-button" onClick={newRecurringBillNav}>
          <PlusCircleOutlined /> New Recurring Bill
        </Button>
      </div>

      <BillList billList={recurringBillList} />
    </div>
  );
};

export default RecurringBillOverview;
