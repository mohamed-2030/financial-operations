import React, { useReducer } from "react";
import OperationContext from "./operation-context";

const defaultOperationState = {
  operations: [],
  addCounter: 0,
};

const operationReducer = (state, action) => {
  if (action.type === "GET") {
    return {
      operations: action.loadedOperations,
    };
  }

  if (action.type === "ADD") {
    return {
      operations: [action.newOperation, ...state.operations],
    };
  }
  if (action.type === "DELETE") {
    const newOperations = state.operations.filter((item) => {
      return item.id !== action.id;
    });
    const userDecision = window.confirm(
      "do you want to delete this operation ?"
    );
    if (userDecision) {
      return {
        operations: newOperations,
      };
    }
  }
};
const OperationProvider = (props) => {
  const [operationState, dispatchOperationAction] = useReducer(
    operationReducer,
    defaultOperationState
  );

  const getOperationsListFromFirebase = (operationsObj) => {
    dispatchOperationAction({ type: "GET", loadedOperations: operationsObj });
  };

  const addItemToOperationsList = (operation) => {
    dispatchOperationAction({ type: "ADD", newOperation: operation });
  };
  const deleteItemFromOperationsList = (id) => {
    dispatchOperationAction({ type: "DELETE", id: id });
  };

  const operationContext = {
    operationsList: operationState.operations,
    addCounter: operationState.addCounter,
    getAllOperations: getOperationsListFromFirebase,
    addOperation: addItemToOperationsList,
    deleteOperation: deleteItemFromOperationsList,
  };

  return (
    <OperationContext.Provider value={operationContext}>
      {props.children}
    </OperationContext.Provider>
  );
};

export default OperationProvider;
