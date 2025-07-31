import { AxiosError, isAxiosError } from 'axios';

export const errorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Return the data response if the backend doesnt return object in data.
    if (typeof axiosError.response?.data === 'string') {
      return axiosError.response.data;
    }

    // Return the message in data object from backend response
    if (typeof axiosError.response?.data === 'object') {
      return axiosError.response.data.message
        ? axiosError.response.data.message
        : 'error';
    }
  }
  console.log('Unexpected error!', error);
  return error;
};
