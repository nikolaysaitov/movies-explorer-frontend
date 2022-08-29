import React from "react";

import validation from "./validation";
import { useState } from "react";


export function useValidationForm(defaultValues = {}, config) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const isCheckbox = target.type === "checkbox";
    const name = target.name;
    const value = isCheckbox ? target.checked : target.value;
    const isNotValidValue = !config?.REGEX[name]?.test(value);

    setValues({ ...values, [name]: value });
    isNotValidValue && config?.INPUTS.includes(name) && value.length
      ? setErrors({ ...errors, [name]: config.MESSAGES[name] })
      : setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("input").checkValidity());
  };

  return { values, errors, isValid, handleChange, setValues, setIsValid };
}




function CallbackValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const handleChange2 = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    const error = validation(name, value);
    setErrors(validation(name, value));
    setValues({ ...values, [name]: value });
    if (Object.keys(error).length === 0) {
      setIsValid(target.closest("form").checkValidity());
    }
  };

  const resetForm = React.useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );

  return {
    values,
    handleChange2,
    errors,
    isValid,
    resetForm,
    onFocus,
    isFocused,
    setValues,
  };
}

export default CallbackValidation;