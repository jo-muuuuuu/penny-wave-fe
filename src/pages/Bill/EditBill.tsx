import { Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BillForm from "../../components/BillForm";
import { deleteBill } from "../../store/reducers/billThunk";
import { BillFormValues } from "../../types/bill";
import { editBill } from "../../store/reducers/billThunk";

const EditBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const billSelected = useAppSelector((state) => state.bill.billSelected);
  // console.log("billSelected", billSelected);

  const onFinish = (values: BillFormValues) => {
    dispatch(editBill({ ...values, id: billSelected?.id }));
    navigate("/bill/overview");
  };

  const onCancel = () => {
    navigate("/bill/overview");
  };

  const onDelete = () => {
    if (!billSelected) return;

    dispatch(deleteBill(billSelected.id));
    navigate("/bill/overview");
  };

  return (
    <BillForm
      title={
        <h2 style={{ color: "#1677ff", margin: "0" }}>
          <EditOutlined /> Editing Bill
          <Divider> {billSelected?.name}</Divider>
        </h2>
      }
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={onDelete}
      divider={true}
      initialValues={billSelected}
      mode="regular"
    />
  );
};

export default EditBill;
