import React from "react";
import classes from "./CheckOut.module.css";
import useCheckoutInputs from "../Hooks/use-CheckoutInputs";

const isEmpty = (val) => val.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const CheckoutLatest = (props) => {
  const {
    valueInput: enteredName,
    isValueValid: isNameInputValid,
    hasError: nameHasError,
    onInputChnageHandler: nameInputChangeHandler,
    onInputBlurHandler: nameInputBlurHandler,
    reset: resetInput,
  } = useCheckoutInputs(isEmpty);

  const {
    valueInput: enteredStreet,
    isValueValid: isStreetInputValid,
    hasError: streetHasError,
    onInputChnageHandler: streetInputChangeHandler,
    onInputBlurHandler: streetInputBlurHandler,
    reset: resetStreet,
  } = useCheckoutInputs(isEmpty);

  const {
    valueInput: enteredCode,
    isValueValid: isCodeInputValid,
    hasError: codeHasError,
    onInputChnageHandler: codeInputChangeHandler,
    onInputBlurHandler: codeInputBlurHandler,
    reset: resetCode,
  } = useCheckoutInputs(isFiveChars);

  const {
    valueInput: enteredCity,
    isValueValid: isCityInputValid,
    hasError: cityHasError,
    onInputChnageHandler: cityInputChangeHandler,
    onInputBlurHandler: cityInputBlurHandler,
    reset: resetCity,
  } = useCheckoutInputs(isEmpty);
  let isFormValid = false;

  if (
    isNameInputValid &&
    isStreetInputValid &&
    isCodeInputValid &&
    isCityInputValid
  ) {
    isFormValid = true;
  }
  const confirmHandler = (e) => {
    e.preventDefault();
    if (
      !isNameInputValid &&
      !isStreetInputValid &&
      isCodeInputValid &&
      !isCityInputValid
    ) {
      return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        code: enteredCode,
      });
    resetInput();
    resetStreet();
    resetCode();
    resetCity();
  };

  console.log(isFormValid);
  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const codeControlClasses = `${classes.control} ${
    codeHasError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetHasError && <p>Please enter a valid Street!</p>}
      </div>

      <div className={codeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredCode}
          onChange={codeInputChangeHandler}
          onBlur={codeInputBlurHandler}
        />
        {codeHasError && <p>Please enter a valid Code (5 char long )!</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onHideCheckOut}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckoutLatest;
