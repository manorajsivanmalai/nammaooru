import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import { ExpensesContext } from "../../contextapi/expensesContextApi";
import { DataContext } from "../../contextapi/memberContextApi";
import { useContext } from "react";
const SalesChart = () => {
  const {memclData, loading,} =useContext(DataContext);
  const {expenses,exploading,} =useContext(ExpensesContext);
  const ttlclAmount = !loading && memclData?.length > 0
  ? memclData.reduce((total, item) => {
      const amount = parseInt(item.amount);
      return total + (Number.isNaN(amount) ? 0 : amount); 
    }, 0)
  : 0;

const ttlExpense = !exploading && expenses?.length > 0
  ? expenses.reduce((total, item) => {
      const amount = parseInt(item.amount);
      return total + (Number.isNaN(amount) ? 0 : amount); 
    }, 0)
  : 0;
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        2025,2026,2027,2028,2029,2030
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "totalCollection",
      data: [ttlclAmount],
    },
    {
      name: "Expenses",
      data: [ttlExpense],
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Years Collections Summary</CardTitle>
    
        <Chart options={options} series={series} type="bar" height="379" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
