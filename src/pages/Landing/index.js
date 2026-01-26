import React, { useEffect } from "react";
import { Layout, Button, Row, Col, Card } from "antd";
import { LinkedinFilled, GithubFilled, MailFilled } from "@ant-design/icons";

import categoriesImg from "../../assets/imgs/categories.png";
import transactionsImg from "../../assets/imgs/transactions.png";
import dashboardImg from "../../assets/imgs/dashboard.png";
import savingsPlansImg from "../../assets/imgs/savings-plans.png";
import "./index.css";
import { useNavigate } from "react-router";

import PennyWaveFontWhite from "../../assets/imgs/penny-wave-font-white.png";

const { Header, Footer } = Layout;

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const header = document.querySelector(".land-header");
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        header.classList.remove("hidden", "visible");
        header.classList.add("top");
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        header.classList.remove("top", "visible");
        header.classList.add("hidden");
      }

      if (currentScrollY < lastScrollY) {
        header.classList.remove("hidden", "top");
        header.classList.add("visible");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>
      <div className="land-hero-wrapper">
        <Header className="land-header">
          <div className="land-header-item"></div>

          <div className="land-header-item">
            <img
              src={PennyWaveFontWhite}
              style={{ marginTop: "1rem", height: "3rem" }}
              alt="Penny Wave"
            />
          </div>

          <div className="land-header-item">
            <Button
              type="primary"
              className="land-header-btn"
              style={{ backgroundColor: "#191970" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              SIGN IN
            </Button>

            <Button
              type="primary"
              className="land-header-btn"
              style={{
                border: "1.5px solid #ffffff",
                color: "#ffffff",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              SIGN UP
            </Button>
          </div>
        </Header>

        <div className="land-banner">
          <div style={{ textAlign: "center" }}>
            <h1>Your Smart Solution for Personal Finance</h1>

            <p>
              Track expenses, manage budgets, and gain insights into your spending with
              our powerful and easy-to-use Bookkeeping App.
            </p>

            <iframe
              className="land-video"
              width="640"
              height="360"
              src="https://www.youtube.com/embed/-0Kt80Snxmk?si=EarQk1my27b1SpUo"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="land-banner-arc" style={{ marginTop: "-1px" }}>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "120px" }}
          >
            <path d="M0,0 C240,120 1200,120 1440,0 L1440,120 L0,120 Z" fill="#f5f5f5" />
          </svg>
        </div>
      </div>

      <div className="land-features">
        <Row gutter={64} align="middle">
          <Col span={12} align="right">
            <h3>Track Transactions</h3>
            <p>
              Effortlessly monitor all your income and expenses with a clear, detailed
              transaction list.
            </p>
          </Col>
          <Col span={12}>
            <img
              src={transactionsImg}
              alt="transactions"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={64} align="middle">
          <Col span={12}>
            <img
              src={categoriesImg}
              alt="categories"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
          <Col span={12}>
            <h3>Smart Categories</h3>
            <p>
              Easily organize your spending into categories and gain insights into your
              financial habits.
            </p>
          </Col>
        </Row>

        <Row gutter={64} align="middle">
          <Col span={12} align="right">
            <h3>Savings Plans</h3>
            <p>
              Set clear saving goals and build healthy habits with structured, flexible
              savings plans.
            </p>
          </Col>
          <Col span={12}>
            <img
              src={savingsPlansImg}
              alt="savings plans"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={64} align="middle">
          <Col span={12} align="right">
            <img
              src={dashboardImg}
              alt="dashboard"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
          <Col span={12}>
            <h3>Data Visualization</h3>
            <p>
              Understand your finances at a glance with intuitive charts that show income,
              expenses, and budget trends.
            </p>
          </Col>
        </Row>
      </div>

      <Card className="land-card">
        <h1 style={{ color: "#191970" }}>Elevate Your Financial Journey</h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Our app simplifies expense tracking and empowers you to make better financial
          decisions.
        </p>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "#191970", marginTop: "1rem", fontWeight: "bold" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          GET STARTED
        </Button>
      </Card>

      <Footer className="land-footer">
        <div className="land-footer-arc-top"></div>

        <div className="land-footer-arc-bot">
          <h2>Contact Me</h2>

          <div className="land-footer-contact">
            <div className="land-footer-contact-item">
              <MailFilled />
              <a style={{ cursor: "default" }}>johnnymu0809@gmail.com</a>
            </div>

            <div className="land-footer-contact-item">
              <LinkedinFilled />
              <a
                href="https://www.linkedin.com/in/johnny-mu/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/zicheng-mu/
              </a>
            </div>

            <div className="land-footer-contact-item">
              <GithubFilled />
              <a href="https://github.com/jo-muuuuuu/" target="_blank" rel="noreferrer">
                https://github.com/jo-muuuuuu/
              </a>
            </div>
          </div>

          <hr className="land-footer-divider" />

          <div className="land-footer-copy">
            <div style={{ lineHeight: "60px" }}>
              Penny Wave ©2025 | Created by Johnny Mu
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Landing;
