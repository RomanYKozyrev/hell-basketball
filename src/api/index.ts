import axios from 'axios';

const key = `X-RapidAPI-Key`;
const host = 'X-RapidAPI-Host';

export const instance = axios.create({
  baseURL: 'https://free-nba.p.rapidapi.com',
  headers: {
    [key]: 'd33e0145d6mshcb5aa475fa0e5f4p15d523jsn043d50f054f7',
    [host]: 'free-nba.p.rapidapi.com',
  },
});

// Response interceptor for API calls
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
