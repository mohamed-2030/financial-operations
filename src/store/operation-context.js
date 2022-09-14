import React, { createContext } from "react";

const OperationContext = React.createContext({
  operationsList: [],
  getAllOperations: () => {},
  addOperation: () => {},
  deleteOperation: () => {},
});
export default OperationContext;
