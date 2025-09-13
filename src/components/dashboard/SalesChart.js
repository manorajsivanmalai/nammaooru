import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import { ExpensesContext } from "../../contextapi/expensesContextApi";
import { DataContext } from "../../contextapi/memberContextApi";
import { useContext } from "react";
const   SalesChart = () => {
  const {memclData, loading,} =useContext(DataContext);
  const {expenses,exploading,} =useContext(ExpensesContext);
  const uniqueYears = [
        ...new Set([
            ...expenses.map(item => new Date(item.createdAt).getFullYear()),
            ...memclData.map(item => new Date(item.createdAt).getFullYear())
        ])
        ].sort((a, b) => a - b);
 const clAmountByYear = !loading && memclData?.length > 0
  ? memclData.reduce((acc, item) => {
      const year = new Date(item.createdAt).getFullYear();
      const amount = parseInt(item.amount, 10);
      acc[year] = (acc[year] || 0) + (Number.isNaN(amount) ? 0 : amount);
      return acc;
    }, {})
  : {};

 const yearWiseTotalColection = Object.entries(clAmountByYear).map((item,i)=>{
       return item[1];      
  });
  

const expenseByYear = !exploading && expenses?.length > 0
  ? expenses.reduce((acc, item) => {
      const year = new Date(item.createdAt).getFullYear();
      const amount = parseInt(item.amount, 10);
      acc[year] = (acc[year] || 0) + (Number.isNaN(amount) ? 0 : amount);
      return acc;
    }, {})
  : {};

 const yearWiseTotalExpense = Object.entries(expenseByYear).map((item,i)=>{
       return item[1];      
  });
  
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
      categories: uniqueYears,
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "80%",
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
      data: yearWiseTotalColection,
    },
    {
      name: "Expenses",
      data: yearWiseTotalExpense,
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
