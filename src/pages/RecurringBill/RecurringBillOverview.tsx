import { Button, Space, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import {
  fetchRecurringBills,
  deleteRecurringBill,
} from "../../store/reducers/recurringBillThunk";
import { RecurringBill } from "../../types/bill";
import DeleteButton from "../../components/DeleteButton";
import "./index.css";

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

  const viewRecurringBillNav = () => {
    return () => {};
  };

  const editRecurringBillNav = () => {
    return () => {};
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

      <Table
        dataSource={recurringBillList}
        rowClassName={(record) => {
          if (record.status === "active") return "row-active";
          if (record.status === "paused") return "row-paused";
          return "";
        }}
      >
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(text) => (text ? text.toUpperCase() : "N/A")}
        />

        <Column title="Amount" dataIndex="amount" key="amount" />

        <Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(text) => (text ? text.toUpperCase() : "N/A")}
        />

        <Column
          title="Period"
          dataIndex="period"
          key="period"
          render={(text) => (text ? text.toUpperCase() : "N/A")}
        />

        <Column
          title="Actions"
          key="actions"
          className="table-actions"
          render={(item) => {
            return (
              <Space>
                <Button type="primary" onClick={viewRecurringBillNav()}>
                  <EyeOutlined />
                  View
                </Button>
                <Button
                  className="yellow-button"
                  type="primary"
                  onClick={editRecurringBillNav()}
                >
                  <EditOutlined />
                  Edit
                </Button>
                <DeleteButton
                  type="RecurringBill"
                  name={item.name}
                  onDelete={() => {
                    dispatch(deleteRecurringBill(item.id));
                  }}
                />
              </Space>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default RecurringBillOverview;
