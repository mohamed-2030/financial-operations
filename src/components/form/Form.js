import "./Form.css";
import formImage from "../../img/formImage.jpg";
import { useEffect, useRef, useState } from "react";
import addOperationDataValidation from "../../helpers/addOperationDataValidation";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addOperation } from "../../lib/api";
import Spinner from "../UI/Spinner/Spinner";

const Form = ({ typeOperation, operation }) => {
  const navigate = useNavigate();
  const [titleNotValidite, setTitleNotValidite] = useState(false);
  const [priceNotValidite, setPriceNotValidite] = useState(false);
  const [title, price, description, comment, type] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const { sendRequest, status, data, error } = useHttp(addOperation);
  const submitHandler = async (e) => {
    e.preventDefault();
    const enterdeTitle = title.current.value;
    const enterdePrice = price.current.value;
    const enterdeDescription = description.current.value;
    const enterdeComment = comment.current.value;
    const enterdeType = type.current.value;

    // create operatione date

    const date = new Date();

    const operationDate = {
      day: +date.getDate(),
      month: +date.getMonth(),
      year: +date.getFullYear(),
      weekDay: date.getDay(),
    };
    //submit entered Data to addOperationDataValidation to validite

    const dataResponce = addOperationDataValidation({
      enterdeTitle,
      enterdePrice,
      enterdeDescription,
      enterdeComment,
      enterdeType,
      operationDate,
    });
    const {
      body: dataBody,
      status: { titleIsValide, priceIsValide },
    } = dataResponce;
    if (!dataBody) {
      if (!titleIsValide && !priceIsValide) {
        setTitleNotValidite(true);
        setPriceNotValidite(true);
        return;
      } else if (!titleIsValide && priceIsValide) {
        setTitleNotValidite(true);
        return;
      } else if (titleIsValide && !priceIsValide) {
        setPriceNotValidite(true);
        return;
      }
    }
    //add operation data to firebase datebase
    await sendRequest(dataBody);
  };
  useEffect(() => {
    //check if data sending succecfly => data represent responce to fetch
    if (data) {
      navigate("/My-operations");
    }
  }, [data]);
  const titleNotValiditeContent = (
    <p className="not-valid-paragraph"> Title Should be not empty !</p>
  );
  const priceNotValiditeContent = (
    <p className="not-valid-paragraph"> Price Should be most than 0 !</p>
  );

  // inputs Foucs Handler

  const titleFoucsHandler = () => {
    if (titleNotValidite) {
      setTitleNotValidite(false);
    }
  };
  const priceFoucsHandler = () => {
    if (priceNotValidite) {
      setPriceNotValidite(false);
    }
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <aside className="type">
          {status === "pending" && <Spinner />}
          {error && (
            <p style={{ textAlign: "center", fontSize: "20px" }}>{error}</p>
          )}
          {status !== "pending" && !error && (
            <>
              <label htmlFor="title">Operation Title</label>
              <input
                type="text"
                id="title"
                ref={title}
                onFocus={titleFoucsHandler}
                className={titleNotValidite ? "not-valid-input" : ""}
              />
              {titleNotValidite && titleNotValiditeContent}

              <label htmlFor="price">Operation Price</label>
              <input
                type="number"
                id="price"
                ref={price}
                onFocus={priceFoucsHandler}
                className={priceNotValidite ? "not-valid-input" : ""}
              />
              {priceNotValidite && priceNotValiditeContent}

              <label htmlFor="description">Operation Description</label>
              <input type="text" id="description" ref={description} />

              <label htmlFor="comment">Operation Comment</label>
              <input type="text" id="comment" ref={comment} />

              <label htmlFor="type">Operation type</label>
              <select id="type" ref={type}>
                <option>Me</option>
                <option>House</option>
                <option>else</option>
              </select>

              <button id="makePayment">MAKE A OPERATION</button>
            </>
          )}
        </aside>
        <aside className="description">
          <h2>Operations Managment</h2>
          <h3>V 1.0.0</h3>
          <img src={formImage} />
          <h1>By &copy;: MOHAMED EL-AFFOURI</h1>
        </aside>
      </form>
    </div>
  );
};

export default Form;
