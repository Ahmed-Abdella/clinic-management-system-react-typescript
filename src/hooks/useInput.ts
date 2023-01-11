import React, { useState } from "react";

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = isTouched && !valueIsValid;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
    // setIsTouched(false); // to remove the error warnning once the user start typing, remove  this line if you want  to remove the warning only when the value is valid
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
    if (enteredValue.trim() === "") {
      setEnteredValue("");
    }
  };

  return {
    value: enteredValue,
    setValue: setEnteredValue,
    setIsTouched,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
