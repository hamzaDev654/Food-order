import { useReducer } from "react";

const initialValue = {
  value: "",
  isTouched: false,
};

const reducerFunction = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      ...state,
      value: action.valueInput,
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === "RESET") {
    return initialValue;
  }
};
const useCheckoutInputs = (validate) => {
  const [stateValue, dispatch] = useReducer(reducerFunction, initialValue);

  const isValueValid = validate(stateValue.value);
  const isValueInputValid = !isValueValid && stateValue.isTouched;

  
  const onInputChnageHandler = (e) => {
    dispatch({ type: "CHANGE", valueInput: e.target.value });
  };

  const onInputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    valueInput: stateValue.value,
    isValueValid,
    hasError: isValueInputValid,
    onInputChnageHandler,
    onInputBlurHandler,
    reset,
  };
};

export default useCheckoutInputs;
