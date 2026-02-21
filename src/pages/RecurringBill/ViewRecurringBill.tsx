import { Button, Col, Divider, Row } from "antd";
import {
  LeftOutlined,
  EyeOutlined,
  CalculatorOutlined,
  EditOutlined,
  ForwardOutlined,
  PauseOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeRecurringBillStatus,
  deleteRecurringBill,
} from "../../store/reducers/recurringBillThunk";

import DeleteButton from "../../components/DeleteButton";
import BillList from "../../components/BillList";

const ViewRecurringBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const recurringBillSelected = useAppSelector(
    (state) => state.recurringBill.recurringBillSelected,
  );

  const generatedBillList = useAppSelector((state) =>
    state.bill.billList.filter(
      (bill) => bill.recurring_bill_id === recurringBillSelected?.id,
    ),
  );

  const onCancel = () => {
    navigate("/recurring-bill/overview");
  };

  const onDelete = () => {
    if (!recurringBillSelected) return;

    dispatch(deleteRecurringBill(recurringBillSelected.id));
    navigate("/recurring-bill/overview");
  };

  const onChangeStatus = (action: string) => {
    return () => {
      if (!recurringBillSelected) return;

      dispatch(changeRecurringBillStatus({ id: recurringBillSelected?.id, action }));
    };
  };

  const editBillNav = () => {
    if (!recurringBillSelected) return;

    navigate(`/recurring-bill/edit/${recurringBillSelected?.id}`);
  };

  return (
    <div>
      <Row className="view-transaction-header">
        <Col span={6}>
          <Button type="primary" onClick={onCancel}>
            <LeftOutlined />
            Cancel
          </Button>
        </Col>
        <Col span={12}>
          <h2>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#1677ff", marginTop: "0" }}>
                <EyeOutlined /> Viewing Recurring Bill Template
              </p>
              <Divider>{recurringBillSelected?.name?.toUpperCase()}</Divider>
            </div>
          </h2>
        </Col>

        <Col span={6}>
          <DeleteButton
            type={"RecurringBill"}
            name={recurringBillSelected?.name}
            onDelete={onDelete}
          />
        </Col>
      </Row>

      <div className="transaction-detail-container">
        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Name</span>
            <span>{recurringBillSelected?.name}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Amount</span>
            <span>{recurringBillSelected?.amount}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Direct Debit</span>
            <span>{recurringBillSelected?.direct_debit ? "Yes" : "No"}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Period</span>
            <span>{recurringBillSelected?.period}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Category</span>
            <span>{recurringBillSelected?.category}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Status</span>
            <span>{recurringBillSelected?.status}</span>
          </Col>
        </Row>
      </div>

      <Divider style={{ color: "#1677ff" }}>
        <CalculatorOutlined /> Actions
      </Divider>

      <Row gutter={16}>
        <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
          <Button
            type="primary"
            className="green-button savings-plan-actions-btn"
            disabled={recurringBillSelected?.status === "active"}
            onClick={onChangeStatus("resume")}
          >
            <ForwardOutlined /> Resume
          </Button>
        </Col>

        <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
          <Button
            type="primary"
            danger
            className=" savings-plan-actions-btn"
            disabled={recurringBillSelected?.status === "paused"}
            onClick={onChangeStatus("pause")}
          >
            <PauseOutlined /> Pause
          </Button>
        </Col>

        <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
          <Button
            type="primary"
            className="yellow-button savings-plan-actions-btn"
            onClick={editBillNav}
          >
            <EditOutlined /> Edit Template
          </Button>
        </Col>
      </Row>

      <Divider style={{ color: "#1677ff" }}>
        <BarsOutlined /> Bills Generated from this Template
      </Divider>

      <BillList billList={generatedBillList} />
    </div>
  );
};

export default ViewRecurringBill;
