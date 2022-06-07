import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { green, red } from "@mui/material/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AccountBookPieChart({ incomes = [], expenses = [] }) {
  const incomeAmount = incomes.reduce((a, b) => {
    return parseInt(a) + parseInt(b.amount);
  }, 0);
  const expenseAmount = expenses.reduce((a, b) => {
    return parseInt(a) + parseInt(b.amount);
  }, 0);
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Income Expenditure Comparision",
        data: [incomeAmount, expenseAmount],
        backgroundColor: [green[200], red[200]],
        borderColor: [green[200], red[200]],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
