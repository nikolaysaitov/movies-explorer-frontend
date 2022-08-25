import { useState } from "react";

export function useValidationForm(defaultValues = {}, config) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const isCheckbox = target.type === 'checkbox'
        const name = target.name;
        const value = isCheckbox ? target.checked : target.value;
        const isNotValidValue = !config?.REGEX[name]?.test(value)

        setValues({ ...values, [name]: value });
        isNotValidValue && config?.INPUTS.includes(name) && value.length
            ? setErrors({ ...errors, [name]: config.MESSAGES[name] })
            : setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    return { values, errors, isValid, handleChange, setValues, setIsValid };
}