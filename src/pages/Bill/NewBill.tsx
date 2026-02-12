import BillForm from "../../components/BillForm";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { newBill } from "../../store/reducers/billThunk";
import { useAppDispatch } from "../../store/hooks";
import { NewBillPayload } from "../../types/bill";

const NewBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: NewBillPayload) => {
    dispatch(newBill(values));
    navigate("/bill/overview");
  };

  const onCancel = () => {
    navigate("/bill/overview");
  };
  return (
    <BillForm
      title={
        <p style={{ color: "#1677ff", margin: "0" }}>
          <PlusCircleOutlined /> New Bill
        </p>
      }
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={undefined}
      divider={true}
    />
  );
};

export default NewBill;
