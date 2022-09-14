import "./MyOperations.css";
import MainBar from "../components/layout/MainBar";
import SideBar from "../components/layout/SideBar";
import NavBar from "../components/layout/NavBar";
import useHttp from "../hooks/use-http";
import { getOperations } from "../lib/api";
import { useContext, useEffect, useState } from "react";
import OperationContext from "../store/operation-context";
const MyOperations = () => {
  const operationCtx = useContext(OperationContext);
  const [mainOperation, setMainOperation] = useState(null);

  const { sendRequest, data } = useHttp(getOperations, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    operationCtx.getAllOperations(data);
  }, [data]);

  const getOperation = (id) => {
    const targetOperation = operationCtx.operationsList.find((operation) => {
      return operation.id === id;
    });
    if (targetOperation) setMainOperation(targetOperation);
  };

  return (
    <>
      <NavBar />
      <div className="MyExpenditurePage">
        <SideBar
          operations={operationCtx.operationsList}
          getOperation={getOperation}
        />
        <MainBar mainOperation={mainOperation} />
      </div>
    </>
  );
};

export default MyOperations;
