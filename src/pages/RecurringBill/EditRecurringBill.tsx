import { Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BillForm from "../../components/BillForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  deleteRecurringBill,
  editRecurringBill,
} from "../../store/reducers/recurringBillThunk";
import { BillFormValues } from "../../types/bill";

const EditRecurringBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const recurringBillSelected = useAppSelector(
    (state) => state.recurringBill.recurringBillSelected,
  );

  const onFinish = (values: BillFormValues) => {
    dispatch(editRecurringBill({ ...values, id: recurringBillSelected?.id }));
    navigate("/recurring-bill/overview");
  };

  const onCancel = () => {
    navigate("/recurring-bill/overview");
  };

  const onDelete = () => {
    if (!recurringBillSelected) return;

    dispatch(deleteRecurringBill(recurringBillSelected.id));
    navigate("/recurring-bill/overview");
  };

  return (
    <BillForm
      title={
        <h2 style={{ color: "#1677ff", margin: "0" }}>
          <EditOutlined /> Editing Bill
          <Divider> {recurringBillSelected?.name}</Divider>
        </h2>
      }
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={onDelete}
      divider={true}
      initialValues={recurringBillSelected}
      mode="recurring"
    />
  );
};

export default EditRecurringBill;
