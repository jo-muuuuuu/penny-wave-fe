import React, { useState, useEffect } from "react";
import { Row, Col, Divider } from "antd";
import "./index.css";

import * as Icons from "../../assets";

const expenses = [
  { id: 1, name: "Groceries", icon: <Icons.Groceries /> },
  { id: 2, name: "Dining", icon: <Icons.Dining /> },
  { id: 3, name: "Coffee", icon: <Icons.Coffee /> },
  { id: 4, name: "Snacks", icon: <Icons.Snacks /> },
  { id: 5, name: "Transport", icon: <Icons.Transport /> },
  { id: 6, name: "Fuel", icon: <Icons.Fuel /> },
  { id: 7, name: "Travel", icon: <Icons.Travel /> },
  { id: 8, name: "Pet", icon: <Icons.Pet /> },
  { id: 9, name: "Shopping", icon: <Icons.Shopping /> },
  { id: 10, name: "Clothing", icon: <Icons.Clothing /> },
  { id: 11, name: "Shoes", icon: <Icons.Shoes /> },
  { id: 12, name: "Gift", icon: <Icons.Gift /> },
  { id: 13, name: "Medical", icon: <Icons.Medical /> },
  { id: 14, name: "Repairs", icon: <Icons.Repairs /> },
  { id: 15, name: "Education", icon: <Icons.Education /> },
  { id: 16, name: "Books", icon: <Icons.Books /> },
  { id: 17, name: "Electronics", icon: <Icons.Electronics /> },
  { id: 18, name: "Gaming", icon: <Icons.Gaming /> },
  { id: 19, name: "Sports", icon: <Icons.Sports /> },
  { id: 20, name: "Movies", icon: <Icons.Movies /> },
  { id: 21, name: "Alcohol", icon: <Icons.Alcohol /> },
  { id: 22, name: "Flower", icon: <Icons.Flower /> },
  { id: 23, name: "Beauty", icon: <Icons.Beauty /> },
  { id: 24, name: "Other", icon: <Icons.Other /> },
];

const incomes = [
  { id: 25, name: "Salary", icon: <Icons.Salary /> },
  { id: 26, name: "Bonus", icon: <Icons.Bonus /> },
  { id: 27, name: "Overtime", icon: <Icons.Overtime /> },
  { id: 28, name: "Capital Gain", icon: <Icons.CapitalGain /> },
  { id: 29, name: "Interest", icon: <Icons.Interest /> },
  { id: 30, name: "Dividend", icon: <Icons.Dividend /> },
  { id: 31, name: "Rental Income", icon: <Icons.RentalIncome /> },
  { id: 32, name: "Gift Money", icon: <Icons.GiftMoney /> },
];

const TransactionCategoryGrid = ({ onSelect, type, selected }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected);
  // console.log(select);

  useEffect(() => {
    onSelect(selected);
  }, []);

  const handleSelect = (name) => {
    setSelectedCategory(name);
    onSelect(name);
  };

  return (
    <>
      <Divider style={{ color: "#1677ff" }}>Select Category</Divider>

      {type === "income" ? (
        <>
          <Row justify="space-evenly" style={{ padding: "20px", textAlign: "center" }}>
            {incomes.map((category) => (
              <Col
                key={category.id}
                span={6}
                className="category-grid-item"
                onClick={() => handleSelect(category.name)}
                style={{
                  border:
                    selectedCategory === category.name ? "1px solid #1677ff" : "none",
                }}
              >
                <div className="category-grid-svg">{category.icon}</div>
                <div style={{ marginTop: "8px" }}>{category.name}</div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <Row justify="space-evenly" style={{ padding: "20px", textAlign: "center" }}>
            {expenses.map((category) => (
              <Col
                key={category.id}
                span={6}
                className="category-grid-item"
                onClick={() => handleSelect(category.name)}
                style={{
                  border:
                    selectedCategory === category.name ? "1px solid #1677ff" : "none",
                }}
              >
                <div className="category-grid-svg">{category.icon}</div>
                <div style={{ marginTop: "8px" }}>{category.name}</div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default TransactionCategoryGrid;
