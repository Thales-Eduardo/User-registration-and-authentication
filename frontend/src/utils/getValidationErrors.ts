import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

function getValidationError(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path || ''] = error.message;
  });

  return validationErrors;
} // para pegar a messagem de erro pelo nome de cada input

export default getValidationError;
