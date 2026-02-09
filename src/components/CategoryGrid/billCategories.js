import React, { useState } from "react";
import { Row, Col, Divider } from "antd";
import "./index.css";

import * as Icons from "../../assets";

const bills = [
  { id: 1, name: "Water", icon: <Icons.Water /> },
  { id: 2, name: "Electricity", icon: <Icons.Electricity /> },
  { id: 3, name: "Gas", icon: <Icons.Gas /> },
  { id: 4, name: "Health Insurance", icon: <Icons.HealthInsurance /> },
  { id: 5, name: "Rent / Mortgage", icon: <Icons.Rent /> },
  { id: 6, name: "Home Insurance", icon: <Icons.HomeInsurance /> },
  { id: 7, name: "Internet", icon: <Icons.Internet /> },
  { id: 8, name: "Mobile Plan", icon: <Icons.MobilePlan /> },
  { id: 9, name: "Car Loan", icon: <Icons.CarLoan /> },
  { id: 10, name: "Car Insurance", icon: <Icons.CarInsurance /> },
  { id: 11, name: "Car Service", icon: <Icons.CarService /> },
  { id: 12, name: "Parking", icon: <Icons.Parking /> },
  { id: 13, name: "Subscription", icon: <Icons.Subscription /> },
  { id: 14, name: "Membership", icon: <Icons.Membership /> },
  { id: 15, name: "Credit Card", icon: <Icons.CreditCard /> },
  { id: 16, name: "Others", icon: <Icons.Others /> },
];

const BillCategoryGrid = ({ onSelect, selected }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected);

  const handleSelect = (name) => {
    setSelectedCategory(name);
    onSelect(name);
  };

  return (
    <>
      <Divider style={{ color: "#1677ff" }}>Select Category</Divider>

      <>
        <Row justify="space-evenly" style={{ padding: "20px", textAlign: "center" }}>
          {bills.map((category) => (
            <Col
              key={category.id}
              span={6}
              className="category-grid-item"
              onClick={() => handleSelect(category.name)}
              style={{
                border: selectedCategory === category.name ? "1px solid #1677ff" : "none",
              }}
            >
              <div className="category-grid-svg">{category.icon}</div>
              <div style={{ marginTop: "8px" }}>{category.name}</div>
            </Col>
          ))}
        </Row>
      </>
    </>
  );
};

export default BillCategoryGrid;
