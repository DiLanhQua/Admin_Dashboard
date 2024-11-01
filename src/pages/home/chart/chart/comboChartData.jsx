const comboChartData = {
  height: 350,
  type: "line",
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "1/11/2000",
      "2/11/2000",
      "3/11/2000",
      "4/11/2000",
      "5/11/2000",
      "6/11/2000",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Doanh thu",
        },
      },
      {
        opposite: true,
        title: {
          text: "Số đơn hàng",
        },
      },
    ],
    colors: ["#73b4ff", "#59e0c5"],
  },
  series: [
    {
      name: "Doanh thu",
      type: "column",
      data: [23, 34, 45, 56, 67, 78],
    },
    {
      name: "Số đơn hàng",
      type: "line",
      data: [12, 23, 33, 43, 54, 65],
    },
  ],
};

export default comboChartData;
