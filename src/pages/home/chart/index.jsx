import React from "react";

// react-bootstrap
import { Row, Col, Card } from "react-bootstrap";

// third party
import Chart from "react-apexcharts";
// import PerfectScrollbar from "react-perfect-scrollbar";

// project import
// import OrderCard from "../../components/Widgets/Statistic/OrderCard";
// import SocialCard from "../../components/Widgets/Statistic/SocialCard";
import uniqueVisitorChart from "./chart/analytics-unique-visitor-chart";
import customerChart from "./chart/analytics-cuatomer-chart";
import customerChart1 from "./chart/analytics-cuatomer-chart-1";

// assets
import OrderCard from "@/components/Widgets/OrderCard";
import SocialCard from "@/components/Widgets/SocialCard";
import barChartData from "./chart/barChartData";
import comboChartData from "./chart/comboChartData";
import candlestickChartData from "./chart/candlestickChartData";

// ==============================|| DASHBOARD ANALYTICS ||============================== //

const DashAnalytics = () => {
  return (
    <React.Fragment>
      <Row>
        {/* order cards */}
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Đơn hàng đã nhận",
              class: "bg-c-blue",
              icon: "feather icon-shopping-cart",
              primaryText: "486",
              secondaryText: "Đơn hàng đã hoàn thành",
              extraText: "351",
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Tổng doanh thu",
              class: "bg-c-green",
              icon: "feather icon-tag",
              primaryText: "1641",
              secondaryText: "Tháng này",
              extraText: "213",
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Doanh thu",
              class: "bg-c-yellow",
              icon: "feather icon-repeat",
              primaryText: "$42,562",
              secondaryText: "Tháng này",
              extraText: "$5,032",
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Tổng lợi nhuận",
              class: "bg-c-red",
              icon: "feather icon-award",
              primaryText: "$9,562",
              secondaryText: "Tháng này",
              extraText: "$542",
            }}
          />
        </Col>

        <Col md={12} xl={6}>
          <Card>
            <Card.Header>
              <h5>Khách truy cập duy nhất</h5>
            </Card.Header>
            <Card.Body className="ps-4 pt-4 pb-0">
              <Chart {...uniqueVisitorChart} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={6}>
          <Row>
            <Col sm={6}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Khách hàng</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0">826</h2>
                      <span className="text-c-green">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">Mới</span>
                    </Col>
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle text-primary f-10 mx-2" />
                        182
                      </h3>
                      <span className="ms-3">Trở lại</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className="bg-primary text-white">
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Khách hàng</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0 text-white">826</h2>
                      <span className="text-white">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart1} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">Mới</span>
                    </Col>
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-white" />
                        182
                      </h3>
                      <span className="ms-3">Trở lại</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={4} md={6}>
          <SocialCard
            params={{
              icon: "fa fa-envelope-open",
              class: "blue",
              variant: "primary",
              primaryTitle: "8.62k",
              primaryText: "Người đăng ký",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Quản lý danh sách",
            }}
          />
          <SocialCard
            params={{
              icon: "fab fa-twitter",
              class: "green",
              variant: "success",
              primaryTitle: "+40",
              primaryText: "Người theo dõi",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Kiểm tra chúng",
            }}
          />
        </Col>
        <Col lg={4} md={6}>
          <SocialCard
            params={{
              icon: "fa fa-comment",
              class: "red",
              variant: "danger",
              primaryTitle: "1.25k",
              primaryText: "Bình luận",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Xem tất cả bình luận",
            }}
          />
          <SocialCard
            params={{
              icon: "fa fa-thumbs-up",
              class: "yellow",
              variant: "warning",
              primaryTitle: "1.25k",
              primaryText: "Thích",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Xem tất cả thích",
            }}
          />
        </Col>
        <Col lg={4} md={12}>
          <SocialCard
            params={{
              icon: "fa fa-share-alt",
              class: "blue",
              variant: "primary",
              primaryTitle: "1.25k",
              primaryText: "Chia sẻ",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Xem tất cả chia sẻ",
            }}
          />
          <SocialCard
            params={{
              icon: "fa fa-users",
              class: "green",
              variant: "success",
              primaryTitle: "1.25k",
              primaryText: "Người dùng",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Xem tất cả người dùng",
            }}
          />
        </Col>

        <Col md={12} xl={12}>
          <Card>
            <Card.Header>
              <h5>Khách truy cập duy nhất</h5>
            </Card.Header>
            <Card.Body className="ps-4 pt-4 pb-0">
              <Chart {...barChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Col md={12} xl={12}>
        <Card>
          <Card.Header>
            <h5>Khách truy cập duy nhất</h5>
          </Card.Header>
          <Card.Body className="ps-4 pt-4 pb-0">
            <Chart {...comboChartData} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} xl={12}>
        <Card>
          <Card.Header>
            <h5>Khách truy cập duy nhất</h5>
          </Card.Header>
          <Card.Body className="ps-4 pt-4 pb-0">
            <Chart {...candlestickChartData} />
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default DashAnalytics;
