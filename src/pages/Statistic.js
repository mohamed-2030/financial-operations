import "./Statistic.css";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import OperationContext from "../store/operation-context";
import {
  currentWeek,
  months,
  operationsTypePerDayinWeek,
  totalOperationsPerDayinWeek,
  totalOperationsPerMonthInYear,
  operationsTypePerMonthinYear,
} from "../helpers/dateOperations";
import ChartBar from "../components/Charts/ChartBar";

const Statistic = () => {
  const [operationsData, setOperationsData] = useState([]);
  const [statisticScreen, setStatisticScreen] = useState({
    showOperationPrice: true,
    showOperationType: false,
  });
  const operationsCtx = useContext(OperationContext);

  useEffect(() => {
    if (operationsCtx.operationsList) {
      setOperationsData(operationsCtx.operationsList);
    }
  }, [operationsCtx.operationsList]);
  const totalDayPriceStatisticOfTheCurrentWeek = {
    labels: currentWeek,
    datasets: [
      {
        label: "Total Price",
        data: totalOperationsPerDayinWeek(operationsData),
        backgroundColor: ["#00c6cf"],
      },
    ],
  };

  const totalMonthPriceStatisticOfTheCurrentYear = {
    labels: months,
    datasets: [
      {
        label: "Total Price",
        data: totalOperationsPerMonthInYear(operationsData),
        backgroundColor: ["#7fd1ae"],
      },
    ],
  };

  const OperationsTypeStatisticOfTheCurrentWeek = {
    labels: currentWeek,
    datasets: [
      {
        label: "me",
        data: operationsTypePerDayinWeek(operationsData)[0],
        backgroundColor: ["red"],
      },
      {
        label: "house",
        data: operationsTypePerDayinWeek(operationsData)[1],
        backgroundColor: ["green"],
      },
      {
        label: "else",
        data: operationsTypePerDayinWeek(operationsData)[2],
        backgroundColor: ["blue"],
      },
    ],
  };

  const OperationsTypeStatisticOfTheCurrentYear = {
    labels: months,
    datasets: [
      {
        label: "me",
        data: operationsTypePerMonthinYear(operationsData)[0],
        backgroundColor: ["red"],
      },
      {
        label: "house",
        data: operationsTypePerMonthinYear(operationsData)[1],
        backgroundColor: ["green"],
      },
      {
        label: "me",
        data: operationsTypePerMonthinYear(operationsData)[2],
        backgroundColor: ["blue"],
      },
    ],
  };

  const globalOperationPriceStatisticData = [
    {
      data: totalDayPriceStatisticOfTheCurrentWeek,
      title: "Day Price Total Statistic of The Current Week",
    },
    {
      data: totalMonthPriceStatisticOfTheCurrentYear,
      title: "Month Price Total Statistic of The Current Year",
    },
  ];
  const globalOperationTypeStatisticData = [
    {
      data: OperationsTypeStatisticOfTheCurrentWeek,
      title: "Operations Type Statistic of The Current Week",
    },
    {
      data: OperationsTypeStatisticOfTheCurrentYear,
      title: "Operations Type Statistic of The Current Year",
    },
  ];

  const selectHandler = (e) => {
    const enteredSelect = e.target.value;
    enteredSelect === "operation-price"
      ? setStatisticScreen({
          showOperationPrice: true,
          showOperationType: false,
        })
      : setStatisticScreen({
          showOperationPrice: false,
          showOperationType: true,
        });
  };
  return (
    <div className="statistic-page">
      <NavBar />
      <div className="select">
        <select onChange={selectHandler}>
          <option value="operation-price">Operations Price</option>
          <option value="operation-Type">Operations Type</option>
        </select>
      </div>
      <ul className="statictic-bar">
        {statisticScreen.showOperationPrice &&
          globalOperationPriceStatisticData.map((dataItem) => {
            return (
              <li key={dataItem.title}>
                <ChartBar data={dataItem.data} title={dataItem.title} />
              </li>
            );
          })}
        {statisticScreen.showOperationType &&
          globalOperationTypeStatisticData.map((dataItem) => {
            return (
              <li key={dataItem.title}>
                <ChartBar data={dataItem.data} title={dataItem.title} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Statistic;
