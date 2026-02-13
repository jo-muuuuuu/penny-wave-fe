import { useNavigate } from "react-router";
import { Row, Col, Button, Divider } from "antd";
import {
  LeftOutlined,
  EyeOutlined,
  CalculatorOutlined,
  CheckOutlined,
  UndoOutlined,
  EditOutlined,
} from "@ant-design/icons";
import DeleteButton from "../../components/DeleteButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteBill, markBill } from "../../store/reducers/billThunk";

const ViewBill = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const billSelected = useAppSelector((state) => state.bill.billSelected);

  const onCancel = () => {
    navigate("/bill/overview");
  };

  const onDelete = () => {
    if (!billSelected) return;

    dispatch(deleteBill(billSelected.id));
    navigate("/bill/overview");
  };

  const onMarkBill = (action: string) => {
    return () => {
      if (!billSelected) return;

      dispatch(markBill({ id: billSelected?.id, action }));
    };
  };

  const editBillNav = () => {
    if (!billSelected) return;

    navigate(`/bill/edit/${billSelected?.id}`);
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
          <h2>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#1677ff", marginTop: "0" }}>
                <EyeOutlined /> Viewing Bill
              </p>
              <Divider>{billSelected?.name?.toUpperCase()}</Divider>
            </div>
          </h2>
        </Col>

        <Col span={8}>
          <DeleteButton type={"Bill"} name={billSelected?.name} onDelete={onDelete} />
        </Col>
      </Row>

      <div className="transaction-detail-container">
        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Name</span>
            <span>{billSelected?.name}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Amount</span>
            <span>{billSelected?.amount}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Due Date</span>
            <span>{new Date(billSelected?.date || "").toLocaleDateString()}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Category</span>
            <span>{billSelected?.category}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Status</span>
            <span>{billSelected?.status}</span>
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
            disabled={billSelected?.status === "completed"}
            onClick={onMarkBill("pay")}
          >
            <CheckOutlined /> Mark as Paid
          </Button>
        </Col>

        <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
          <Button
            type="primary"
            danger
            className=" savings-plan-actions-btn"
            disabled={billSelected?.status === "pending"}
            onClick={onMarkBill("undo")}
          >
            <UndoOutlined /> Undo Payment
          </Button>
        </Col>

        <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
          <Button
            type="primary"
            className="yellow-button savings-plan-actions-btn"
            onClick={editBillNav}
          >
            <EditOutlined /> Edit Bill
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ViewBill;
