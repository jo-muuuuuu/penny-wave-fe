import BillForm from "../../components/BillForm/index";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import { newBill } from "../../store/reducers/billThunk";
import { useAppDispatch } from "../../store/hooks";
import { BillFormValues } from "../../types/bill";

const NewBill = () => {
  const location = useLocation();
  const selectedDate = location.state?.date;

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
      selectedDate={selectedDate}
      mode="regular"
    />
  );
};

export default NewBill;
