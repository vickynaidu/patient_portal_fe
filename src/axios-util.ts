import axios from 'axios';
import Cookies from 'js-cookie';

export const authenticatedRequest = axios.create({
  baseURL: `${process.env.API_URL}`,
});

authenticatedRequest.interceptors.request.use(
  config => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } 

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

setInterval(() => {
  const refreshToken = Cookies.get('refreshToken');
  ////console.log("Tokens refreshed ", refreshToken);
}, 30000);

