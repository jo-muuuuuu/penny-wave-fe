import React from "react";
import BillForm from "../../components/BillForm";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NewBill = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
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
      divider={true}
    />
  );
};

export default NewBill;
