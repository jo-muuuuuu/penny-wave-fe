import BillForm from "../../components/BillForm";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BillFormValues } from "../../types/bill";
import { useAppDispatch } from "../../store/hooks";
import { newRecurringBill } from "../../store/reducers/recurringBillThunk";

const NewRecurringBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: BillFormValues) => {
    // console.log("Received values:", values);

    dispatch(newRecurringBill(values));
    navigate("/recurring-bill/overview");
  };

  const onCancel = () => {
    navigate("/recurring-bill/overview");
  };

  return (
    <div>
      <BillForm
        title={
          <h2 style={{ color: "#1677ff", margin: "0" }}>
            <PlusCircleOutlined /> New Recurring Bill
          </h2>
        }
        onFinish={onFinish}
        onCancel={onCancel}
        divider={true}
        mode="recurring"
      />
    </div>
  );
};

export default NewRecurringBill;
