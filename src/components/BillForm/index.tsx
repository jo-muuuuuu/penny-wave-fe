import { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Divider,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Select,
} from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import DeleteButton from "../DeleteButton";
import BillCategoryGrid from "../CategoryGrid/billCategories";
import { Bill, NewBillPayload } from "../../types/bill";

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
  onFinish: (values: NewBillPayload) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void;
  initialValues?: Partial<Bill>;
  divider?: boolean;
}

const BillForm: React.FC<BillFormProps> = ({
  title,
  onCancel,
  onDelete,
  onFinish,
  initialValues = {},
  divider,
}) => {
  const [categorySelected, setCategorySelected] = useState<string | null>(
    initialValues.category ?? null,
  );

  const [form] = Form.useForm<NewBillPayload>();
  const isRecurring = Form.useWatch<boolean>("recurring", form);

  const handleCategorySelect = (name: string) => {
    // console.log("Selected category name:", name);
    setCategorySelected(name);
  };

  const handleFinish = (values: NewBillPayload) => {
    onFinish({ ...values, category: categorySelected! });
  };

  useEffect(() => {
    if (!isRecurring) {
      form.setFieldsValue({ period: undefined });
    }
  }, [isRecurring, form]);

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
            <DeleteButton type={"Bill"} name={initialValues.id} onDelete={onDelete} />
          )}
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
        name="bill-form"
        onFinish={handleFinish}
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

        <Form.Item
          label="Type"
          name="recurring"
          valuePropName="checked"
          tooltip="If enabled, bills for the next period will be automatically generated on the same day each period."
        >
          <Checkbox> Recurring </Checkbox>
        </Form.Item>

        {isRecurring && (
          <>
            <Form.Item
              label="Period"
              name="period"
              rules={[{ required: true, message: "Please select a period!" }]}
            >
              <Select placeholder="Select savings period">
                {periodOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Direct Debit" name="directDebit" valuePropName="checked">
              <Checkbox> Direct Debit </Checkbox>
            </Form.Item>
          </>
        )}

        <BillCategoryGrid onSelect={handleCategorySelect} selected={categorySelected} />

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
