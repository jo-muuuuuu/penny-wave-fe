import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LeftOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input, Divider } from "antd";

import "./index.css";
import { userForgotPassword } from "../../store/reducers/userInfoThunk";
import PennyWaveFontBlue from "../../assets/imgs/penny-wave-font-blue.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginNavigate = () => {
    navigate("/login");
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    dispatch(userForgotPassword(values, navigate));
  };

  return (
    <div
      className="login-container"
      style={{
        background: "linear-gradient(180deg, #1677ff 0%, #4da3ff 25%, #f5f5f5 100%)",
      }}
    >
      <Card className="login-card" variant="borderless" style={{ width: 500 }}>
        <div style={{ textAlign: "center" }}>
          <img src={PennyWaveFontBlue} style={{ height: "4rem" }} />
        </div>
        <Divider />
        <div style={{ textAlign: "center", color: "#1677ff", marginBottom: "1.5rem" }}>
          <h2>Forgot Password</h2>
        </div>
        {/* <div className="login-link">
          <a onClick={loginNavigate}>
            <LeftOutlined /> Back to Log In
          </a>
        </div> */}
        <div className="reset-hint">
          <p>
            Enter your e-mail address below, and we'll send you an e-mail allowing you to
            reset your password.
          </p>
        </div>

        <Form
          className="login-form"
          name="reset"
          onFinish={onFinish}
          style={{ maxWidth: 360 }}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
