const candlestickChartData = {
  height: 350,
  type: "candlestick",
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          color: "#ccc",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          color: "#ccc",
        },
      },
    },
    grid: {
      borderColor: "#cccccc3b",
    },
  },
  series: [
    {
      data: [
        {
          x: new Date("2023-08-01"),
          y: [6620, 6650, 6580, 6600], // [Open, High, Low, Close]
        },
        {
          x: new Date("2023-08-02"),
          y: [6600, 6700, 6550, 6680],
        },
        {
          x: new Date("2023-08-03"),
          y: [6680, 6800, 6620, 6750],
        },
        {
          x: new Date("2023-08-04"),
          y: [6750, 6850, 6700, 6820],
        },
        {
          x: new Date("2023-08-05"),
          y: [6820, 6900, 6750, 6880],
        },
      ],
    },
  ],
};

export default candlestickChartData;
