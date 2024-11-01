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
      categories: [
        "1/11/2000",
        "2/11/2000",
        "3/11/2000",
        "4/11/2000",
        "5/11/2000",
        "6/11/2000",
      ],
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
        formatter: (val) => `$${val}K`,
      },
    },
    colors: ["#73b4ff", "#59e0c5"],
    grid: {
      borderColor: "#cccccc3b",
    },
  },
  series: [
    {
      name: "Nghệ thuật",
      data: [44, 55, 57, 56, 61, 58],
    },
    {
      name: "Thương mại",
      data: [76, 85, 101, 98, 87, 105],
    },
  ],
};

export default barChartData;
