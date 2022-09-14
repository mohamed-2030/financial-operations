import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AddOperation from "./pages/AddOperation";
import Home from "./pages/Home";
import MyOperations from "./pages/MyOperations";
import Statistic from "./pages/Statistic";
import OperationContext from "./store/operation-context";
import { addOperation, getOperations } from "./lib/api";
import useHttp from "./hooks/use-http";
import { useContext, useEffect } from "react";

function App() {
  const operationCtx = useContext(OperationContext);
  const { sendRequest, data } = useHttp(getOperations, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    operationCtx.getAllOperations(data);
  }, [data]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/My-operations" element={<MyOperations />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/add-operation" element={<AddOperation />} />
      </Routes>
    </div>
  );
}

export default App;
