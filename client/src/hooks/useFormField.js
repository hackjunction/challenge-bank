import { useState } from "react";

const useFormField = (initialValue, validate = () => null) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();

  return {
    value,
    onChange: e => {
      const value = e.target.value;
      setValue(value);
      if (error) {
        const newError = validate(value);
        if (newError) {
          setError(newError);
        } else {
          setError(null);
        }
      }
    },
    error,
    setError,
    validate
  };
};

export default useFormField;
