import React,{ useEffect, useState }  from "react";
// react-bootstrap
import { Row, Col, Card,Form } from "react-bootstrap";

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
// import barChartData from "./chart/barChartData";
import comboChartData from "./chart/comboChartData";
import candlestickChartData from "./chart/candlestickChartData";


import { getStatisticsAPI ,AddStatisticsAPI} from "./js/StatisticsAPI";

const DashAnalytics = () => {
  const [viewType, setViewType] = useState('day');
  const [items, setItems] = useState([]);
  const [chartData, setChartData] = useState({
    height: 150,
    type: 'donut',
    options: {
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
          },
        },
      },
      labels: ['Chưa xác nhận', 'Đã xác nhận'],
      legend: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      colors: ['#FF0000', '#2ed8b6'],
      fill: {
        opacity: [1, 1],
      },
      stroke: {
        width: 0,
      },
    },
    series: [0, 0], // Khởi tạo giá trị series
  });
  const [data, setData] = useState({
    labels: [],
    datasets: [{
      label: 'Tổng tiền VND',
      data: [],
      backgroundColor: 'turquoise',
      borderColor: 'aqua',
      borderWidth: 1
    }]
  });
  useEffect(() => {
    const GetStatistics = async () => {
      try {
        const res = await getStatisticsAPI();

    
        if (res) {
          setItems(res);
    
          // Cập nhật dữ liệu cho chartData
          setChartData((prevData) => ({
            ...prevData,
            series: [res.demkhChuaXacNhan, res.demkhXacNhan] // Truyền giá trị vào series của biểu đồ
          }));
    
          const response = await AddStatisticsAPI(viewType);
    
          if (response && response.labels && response.numbers) {
            // Cập nhật dữ liệu cho chart
            setData({
              labels: response.labels,
              datasets: [{
                label: 'Tổng tiền VND',
                data: response.numbers,
                backgroundColor: 'turquoise',
                borderColor: 'aqua',
                borderWidth: 1
              }]
            });
          } else {
          }
        } else {
          setItems([]);
        }
      } catch (er) {
      }
    };
    

    GetStatistics();
  }, [viewType]);
  const barChartData = {
    height: 230,
    type: "bar",
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: data.labels || [], // Dữ liệu categories từ state data
        labels: {
          style: {
            color: "#ccc",
          },
        },
      },
      yaxis: {
        title: {
          text: "Doanh thu",
        },
        labels: {
          style: {
            color: "#ccc",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} VND`, // Hiển thị doanh thu với đơn vị VND
        },
      },
      colors: ["#73b4ff"],
      grid: {
        borderColor: "#cccccc3b",
      },
    },
    series: [{
      name: "Doanh thu",
      data: data.datasets[0].data || [], // Dữ liệu doanh thu từ state data
    }],
  };
  

  const handleChangeViewType = (e) => {
    setViewType(e.target.value); // Cập nhật viewType khi người dùng chọn ngày/tháng/năm
  };
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
              primaryText: `${items.count2}`,
              secondaryText: "Đơn hàng đã hoàn thành",
              extraText: `${items.count1}`,
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Tổng đơn hàng",
              class: "bg-c-green",
              icon: "feather icon-tag",
              primaryText: `${items.tongdoanhthu}`,
              secondaryText: "Tháng này",
              extraText: `${items.tongdoanhthutheothang}`,
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Tổng doanh thu",
              class: "bg-c-yellow",
              icon: "feather icon-repeat",
              primaryText: `${items.tongTienGioHang} VND`,
              secondaryText: "Tháng này",
              extraText: `${items.totalAmount1} VND`,
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Số đơn đã hủy",
              class: "bg-c-red",
              icon: "feather icon-award",
             primaryText: `${items.sodonhanghuy}`,
              secondaryText: "Tháng này",
              extraText: `${items.sodonhanghuytrongthang}`,
            }}
          />
        </Col>

        <Col md={9} xl={9}>
      <Card>
        <Card.Header>
        
          {/* Form để chọn kiểu thống kê */}
          <Form>
            <Form.Group controlId="viewTypeSelect">
              <Form.Label>Chọn khoảng thời gian</Form.Label>
              <Form.Control as="select" onChange={handleChangeViewType} value={viewType}>
                <option value="day">Ngày</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Card.Header>
        <Card.Body className="ps-4 pt-4 pb-0">
          {/* Biểu đồ */}
          <Chart {...barChartData} />
        </Card.Body>
      </Card>
    </Col>
        <Col md={3} xl={3}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Khách hàng</span>
                    </Col>
                    <Col className="text-end">
                      
                      <span className="text-c-green">
                        <p className="mb-0 ">{items.demkh}    <i className="feather icon-trending-up ms-1" /></p>
                     
                      </span>
                    </Col>
                  </Row>
                  <Chart {...chartData} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        {items.demkhXacNhan}
                      </h3>
                      <span className="ms-3">Xác nhận</span>
                    </Col>
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle text-danger f-10 mx-2" />
                        {items.demkhChuaXacNhan}
                      </h3>
                      <span className="ms-3">Chưa xác nhận</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
        </Col>

        {/* <Col lg={4} md={6}>
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
        </Col> */}

        
      </Row>
      {/* <Col md={12} xl={12}>
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
      </Col> */}
    </React.Fragment>
  );
};

export default DashAnalytics;
