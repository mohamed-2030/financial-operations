import "./OperationItem.css";
import transIcon from "../../img/transaction1.jpg";

const OperationItem = (props) => {

  const { title, price, type, id, getOperation } = props;

  
  const operationClickHandler = () => {
    getOperation(id);
  };
  return (
    <div className="operationItem" onClick={operationClickHandler}>
      <div className="info">
        <div className="icon">
          <img src={transIcon} />
        </div>
        <div className="operationInfo">
          <span className="operationTitle">{title}</span>
          <span className="operationType">By : {type}</span>
        </div>
      </div>
      <div className="operationPrice">
        <span className="price">{price}DH</span>
        <i className="fa-solid fa-coins icon"></i>
      </div>
    </div>
  );
};

export default OperationItem;
