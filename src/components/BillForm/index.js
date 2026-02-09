import React, { useState } from "react";
import { Button, Row, Col, Divider, Form, Input, DatePicker, Checkbox } from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import DeleteButton from "../DeleteButton";
import BillCategoryGrid from "../CategoryGrid/billCategories";

const BillForm = ({
  onCancel,
  title,
  onDelete,
  onFinish,
  initialValues = {},
  divider,
}) => {
  const [categorySelected, setCategorySelected] = useState(null);

  const handleCategorySelect = (name) => {
    // console.log("Selected category name:", name);
    setCategorySelected(name);
  };

  return (
    <div>
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
          {onDelete && (
            <DeleteButton
              type={"Account Book"}
              name={initialValues.id}
              onDelete={onDelete}
            />
          )}
        </Col>
      </Row>

      {divider && <Divider />}

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        className="new-form"
        name="bill-form"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the name of your new bill!",
            },
          ]}
        >
          <Input />
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

        <Form.Item label="Type" name="type">
          <Checkbox value="recur"> Recurring </Checkbox>
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please enter the due date!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <BillCategoryGrid
          onSelect={handleCategorySelect}
          selected={initialValues.category}
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          style={{ textAlign: "center" }}
        >
          <Button className="green-button" type="primary" htmlType="submit">
            <CheckOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BillForm;
