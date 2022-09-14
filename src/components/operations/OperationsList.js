import OperationItem from "./OperationItem";
import "./OperationsList.css";
import Spinner from "../UI/Spinner/Spinner";

const OperationsList = ({ operations , getOperation }) => {
  if (!operations) {
    return;
  }

  

  return (
    <ul className="operationsList" >
      {operations &&
        operations.length !== 0 &&
        operations.map((operation) => {
          return (
            <li key={operation.id}>
              <OperationItem
                title={operation.title}
                type={operation.type}
                price={operation.price}
                id={operation.id}
                date={operation.operationDate}
                description={operation.description}
                comment={operation.comment}
                getOperation={getOperation}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default OperationsList;
