import BillForm from "../../components/BillForm/index";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { newBill } from "../../store/reducers/billThunk";
import { useAppDispatch } from "../../store/hooks";
import { BillFormValues } from "../../types/bill";

const NewBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: BillFormValues) => {
    dispatch(newBill(values));
    navigate("/bill/overview");
  };

  const onCancel = () => {
    navigate("/bill/overview");
  };

  return (
    <BillForm
      title={
        <h2 style={{ color: "#1677ff", margin: "0" }}>
          <PlusCircleOutlined /> New Bill
        </h2>
      }
      onFinish={onFinish}
      onCancel={onCancel}
      divider={true}
      mode="new"
    />
  );
};

export default NewBill;
