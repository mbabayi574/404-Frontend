import { useState, useEffect } from 'react';

const useForm = (callback, validate, initialData={}) => {

  const [values, setValues] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const clearForm = () => {
    setValues(initialData);
  }

  return {
    handleChange,
    handleSubmit,
    clearForm,
    values,
    errors,
  }
};

export default useForm;