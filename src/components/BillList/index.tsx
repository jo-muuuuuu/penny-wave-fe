import { Table, Button, Space } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { OnceOffBill, RecurringBill } from "../../types/bill";
import { setRecurringBillSelected } from "../../store/reducers/recurringBillSlice";
import { deleteRecurringBill } from "../../store/reducers/recurringBillThunk";
import { setBillSelected } from "../../store/reducers/billSlice";
import { deleteBill } from "../../store/reducers/billThunk";
import DeleteButton from "../DeleteButton";
import "./index.css";

const { Column } = Table;

interface BillListProps {
  billList: (OnceOffBill | RecurringBill)[];
}

const BillList = ({ billList }: BillListProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isRecurringBill = (bill: OnceOffBill | RecurringBill): bill is RecurringBill => {
    return "period" in bill;
  };

  const onView = (bill: OnceOffBill | RecurringBill) => {
    if (isRecurringBill(bill)) {
      dispatch(setRecurringBillSelected(bill));
      navigate(`/recurring-bill/view/${bill.id}`);
    } else {
      dispatch(setBillSelected(bill));
      navigate(`/bill/view/${bill.id}`);
    }
  };

  const onEdit = (bill: OnceOffBill | RecurringBill) => {
    if (isRecurringBill(bill)) {
      dispatch(setRecurringBillSelected(bill));
      navigate(`/recurring-bill/edit/${bill.id}`);
    } else {
      dispatch(setBillSelected(bill));
      navigate(`/bill/edit/${bill.id}`);
    }
  };

  const onDelete = (bill: OnceOffBill | RecurringBill) => {
    if (isRecurringBill(bill)) {
      dispatch(deleteRecurringBill(bill.id));
      navigate("/recurring-bill/overview");
    } else {
      dispatch(deleteBill(bill.id));
      navigate("/bill/overview");
    }
  };

  return (
    <Table<OnceOffBill | RecurringBill>
      dataSource={billList}
      rowClassName={(record) => {
        if (record.status === "active" || record.status === "completed")
          return "row-active";
        if (record.status === "pending") return "row-pending";
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
              <Button type="primary" onClick={() => onView(item)}>
                <EyeOutlined />
                View
              </Button>
              <Button
                className="yellow-button"
                type="primary"
                onClick={() => onEdit(item)}
              >
                <EditOutlined />
                Edit
              </Button>
              <DeleteButton
                type="RecurringBill"
                name={item.name}
                onDelete={() => onDelete(item.id)}
              />
            </Space>
          );
        }}
      />
    </Table>
  );
};

export default BillList;
