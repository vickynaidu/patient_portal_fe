import axios from 'axios';
import cookies from 'js-cookie';
import { REFRESH_TOKEN_URL } from './common/api';

export const authenticatedRequest = axios.create({
  baseURL: `${process.env.API_URL}`,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

authenticatedRequest.interceptors.request.use(
  config => {
    const authToken = cookies.get('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } 

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

authenticatedRequest.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return authenticatedRequest(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = cookies.get('refreshToken');

      return new Promise(function (resolve, reject) {
        authenticatedRequest
          .post(`${process.env.REACT_APP_API_URL}/${REFRESH_TOKEN_URL}`, { refresh_token: refreshToken })
          .then(({ data }) => {
            console.log("Refresh token res: ", data);
            cookies.set('authToken', data.authToken);
            cookies.set('refreshToken', data.refreshToken);
            authenticatedRequest.defaults.headers.common['Authorization'] =
              'Bearer ' + data.authToken;
            originalRequest.headers['Authorization'] =
              'Bearer ' + data.authToken;
            processQueue(null, data.authToken);
            resolve(authenticatedRequest(originalRequest));
          })
          .catch(err => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);