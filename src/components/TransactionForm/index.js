import React, { useState, useEffect } from "react";

import { Button, Form, Input, Divider, DatePicker, Radio, Select, Row, Col } from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
// import "./index.css";

import { useDispatch, useSelector } from "react-redux";

import CategoryGrid from "../CategoryGrid";
import DeleteButton from "../DeleteButton";
import { fetchAccountBooks } from "../../store/reducers/accountBookThunk";

const TransactionForm = ({
  title,
  onFinish,
  onCancel,
  onDelete,
  divider,
  initialValues = { type: "expense" },
}) => {
  const [type, setType] = useState("");
  const [categorySelected, setCategorySelected] = useState(null);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const accountBookList = useSelector((state) => state.accountBook.accountBookList);
  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected,
  );

  // console.log(initialValues);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategorySelect = (name) => {
    // console.log("Selected category name:", name);
    setCategorySelected(name);
  };

  const handleFinish = (values) => {
    onFinish({ ...values, category: categorySelected });
  };

  useEffect(() => {
    if (accountBookSelected) {
      form.setFieldsValue({
        select: {
          key: accountBookSelected.id,
          value: accountBookSelected.name,
          label: accountBookSelected.name,
        },
      });
    } else {
      dispatch(fetchAccountBooks());
    }

    setType(initialValues.type);
  }, [accountBookSelected, form]);

  return (
    <>
      <Row className="view-transaction-header">
        <Col span={8}>
          <Button type="primary" onClick={onCancel}>
            <LeftOutlined />
            Cancel
          </Button>
        </Col>
        <Col span={8}>
          <h2>{title}</h2>
        </Col>

        <Col span={8}>
          {onDelete && <DeleteButton type={"Transaction"} onDelete={onDelete} />}
        </Col>
      </Row>

      {divider && <Divider />}

      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        className="new-form"
        name="transaction-form"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Account Book"
          name="select"
          rules={[
            {
              required: true,
              message: "Please select the account book!",
            },
          ]}
        >
          <Select labelInValue>
            {accountBookList?.map((accountBook) => (
              <Select.Option key={accountBook.id} value={accountBook.id}>
                {accountBook.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please enter the amount!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please enter the date!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please enter the type!",
            },
          ]}
        >
          <Radio.Group onChange={handleTypeChange}>
            <Radio value="income"> Income </Radio>
            <Radio value="expense"> Expense </Radio>
          </Radio.Group>
        </Form.Item>

        <CategoryGrid
          onSelect={handleCategorySelect}
          type={type}
          selected={initialValues.category}
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <Button className="green-button" type="primary" htmlType="submit">
            <CheckOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TransactionForm;
