// import { useState } from "react";
// import useAPI from "useAPI";

// const useForm = ({
//   getValidationError,
//   prepareData,
//   makeApiConfig,
//   onPostSuccess,
//   onPostError,
// }) => {
//   const api = useAPI();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const trySubmit = (formData) => {
//     const validateData = () => {
//       const newError = getValidationError(formData);
//       setError(newError);
//       return newError === null;
//     }

//     if (!validateData(formData)) {
//       return;
//     }
//     prepareData(formData);
//     var config = makeApiConfig(formData);
//     postData(config);
//   };

//   const clearFormStatus = () => {
//     setLoading(false);
//     setSuccess(false);
//     setError(null);
//   }

//   return {
//     loading,
//     success,
//     error,
//     trySubmit,
//     clearFormStatus,
//   };
// }

// export default useForm;

import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
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

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default useForm;