import axios from 'axios';

const baseURL = `http://localhost:4200/api/v1`;

export default axios.create({
  baseURL,
  withCredentials: true,
});

export const useAxiosPrivate = () => {};
