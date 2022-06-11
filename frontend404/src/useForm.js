import { useState } from "react";
import useAPI from "useAPI";

const useForm = ({
  getValidationError,
  prepareData,
  makeApiConfig,
  onPostSuccess,
  onPostError,
}) => {
  const api = useAPI();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const trySubmit = (formData) => {
    const validateData = () => {
      const newError = getValidationError(formData);
      setError(newError);
      return newError === null;
    }

    if (!validateData(formData)) {
      return;
    }
    prepareData(formData);
    var config = makeApiConfig(formData);
    postData(config);
  };

  const postData = (config) => {
    setLoading(true);
    api(config)
      .then(response => {
        setSuccess(true);
        onPostSuccess(response);
      })
      .catch(error => {
        setPostError(error);
        onPostError(error);
      })
      .finally(() => setLoading(false));
  }

  const setPostError = (error) => {
    error.response.data.forEach(key => {
      setError(error.response.data[key]);
      return;
    })
  }

  const clearFormStatus = () => {
    setLoading(false);
    setSuccess(false);
    setError(null);
  }

  return {
    loading,
    success,
    error,
    trySubmit,
    clearFormStatus,
  };
}

export default useForm;