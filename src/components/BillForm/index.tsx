import { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Select,
} from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import DeleteButton from "../DeleteButton";
import BillCategoryGrid from "../CategoryGrid/billCategories";

import dayjs from "dayjs";
import { BillFormValues, OnceOffBill } from "../../types/bill";
import { antdError } from "../../utils/antdMessage";

const { Option } = Select;
const periodOptions = [
  { label: "Week", value: "week" },
  { label: "Fortnight", value: "fortnight" },
  { label: "Month", value: "month" },
  { label: "Quarter", value: "quarter" },
  { label: "Year", value: "year" },
];

interface BillFormProps {
  title: React.ReactNode;
  onFinish: (values: BillFormValues) => void;
  onCancel: () => void;
  onDelete?: () => void | undefined;
  divider?: boolean;
  initialValues?: OnceOffBill | null;
  mode: "new" | "edit";
}

const BillForm = ({
  title,
  onFinish,
  onCancel,
  onDelete,
  divider,
  initialValues,
  mode,
}: BillFormProps) => {
  const [categorySelected, setCategorySelected] = useState<string>("");

  const [form] = Form.useForm();
  const isRecurring = Form.useWatch("recurring", form);

  const handleCategorySelect = (name: string) => {
    // console.log("Selected category name:", name);
    setCategorySelected(name);
  };

  const handleFinish = (values: BillFormValues) => {
    if (!categorySelected) {
      antdError("Please select a category!");
      return;
    }

    onFinish({ ...values, category: categorySelected! });
  };

  useEffect(() => {
    if (!isRecurring) {
      form.setFieldsValue({ period: undefined });
    }
  }, [isRecurring, form]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : undefined,
      });

      if (initialValues.category) {
        setCategorySelected(initialValues.category);
      }
    }
  }, [initialValues, form]);

  return (
    <div>
      <Row className="view-transaction-header">
        <Col span={8}>
          <Button type="primary" onClick={onCancel}>
            <LeftOutlined />
            Cancel
          </Button>
        </Col>
        <Col span={8}>{title}</Col>

        <Col span={8}>
          {onDelete && <DeleteButton type={"Bill"} name={""} onDelete={onDelete} />}
        </Col>
      </Row>

      {divider && <Divider />}

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="new-form"
        name="bill-form"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name of your new bill!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} precision={2} />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="date"
          rules={[{ required: true, message: "Please enter the due date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Direct Debit" name="direct_debit" valuePropName="checked">
          <Checkbox> Direct Debit </Checkbox>
        </Form.Item>

        {mode === "new" && (
          <>
            <Form.Item
              label="Type"
              name="recurring"
              valuePropName="checked"
              tooltip="If enabled, bills for the next period will be automatically generated on the same day each period."
            >
              <Checkbox> Recurring </Checkbox>
            </Form.Item>

            <Form.Item
              label="Period"
              name="period"
              hidden={!isRecurring}
              rules={
                isRecurring
                  ? [{ required: true, message: "Please select a period!" }]
                  : []
              }
            >
              <Select placeholder="Select a period">
                {periodOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

        <BillCategoryGrid
          key={categorySelected || "empty"}
          onSelect={handleCategorySelect}
          selected={categorySelected}
        />

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
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
