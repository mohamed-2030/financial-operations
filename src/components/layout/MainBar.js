import { useContext } from "react";
import OperationContext from "../../store/operation-context";
import "./MainBar.css";

const MainBar = ({ mainOperation }) => {
  const operationCtx = useContext(OperationContext);
  if (!mainOperation) {
    return <div className="mainBar"></div>;
  }
  const { title, price, id, description, comment, operationDate } =
    mainOperation;
  const { day, year, month } = operationDate;
  const deleteClickHandler = () => {
    operationCtx.deleteOperation(id);
  };
  return (
    <div className="mainBar">
      <div className="mainBartitle">
        <span>Operation detaille</span>
      </div>
      <div className="operationDetaille">
        <div className="operationInfo">
          <div className="title info">
            <i className="fa-solid fa-chess-board"></i>
            <span>{title}</span>
          </div>
          <div className="price info">
            <i className="fa-solid fa-coins"></i>
            <span>{price} DH</span>
          </div>
          <div className="date info">
            <i className="fa-solid fa-calendar-days"></i>
            <span>{`${day}/${month + 1}/${year}`}</span>
          </div>
        </div>
        <div className="operationDescreption text">
          <h3>Descreption </h3>
          <p>{description}</p>
        </div>
        <div className="operationComment text">
          <h3>Comment </h3>
          <p>{comment}</p>
        </div>
      </div>
      <div className="operationEdit">
        <i
          className="fa-solid fa-trash-can deleteIcon"
          onClick={deleteClickHandler}
        ></i>
      </div>
    </div>
  );
};

export default MainBar;
