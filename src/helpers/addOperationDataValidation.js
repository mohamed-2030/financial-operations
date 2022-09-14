const addOperationDataValidation = ({
  enterdeTitle,
  enterdePrice,
  enterdeDescription,
  enterdeComment,
  enterdeType,
  operationDate,
}) => {
  const formData = {
    body: {
      title: enterdeTitle,
      price: +enterdePrice,
      description: enterdeDescription ? enterdeDescription : "",
      comment: enterdeComment ? enterdeComment : "",
      type: enterdeType,
      operationDate,
    },
    status: {
      titleIsValide: true,
      priceIsValide: true,
    },
  };
  const titleIsValidite = formData.body.title.trim().length !== 0;
  const priceIsValidite = formData.body.price > 0;

  if (!titleIsValidite && !priceIsValidite) {
    formData.body = null;
    formData.status.titleIsValide = false;
    formData.status.priceIsValide = false;
    return formData;
  } else if (titleIsValidite && !priceIsValidite) {
    formData.body = null;
    formData.status.priceIsValide = false;
    return formData;
  } else if (!titleIsValidite && priceIsValidite) {
    formData.body = null;
    formData.status.titleIsValide = false;
    return formData;
  } else {
    return formData;
  }
};
export default addOperationDataValidation;
