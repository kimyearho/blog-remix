import axios, {
 AxiosError,
} from 'axios';
import { defaultEnv } from '../config/env';

export interface ErrorResponse {
 status?: number;
 timestamp?: Date;
 errorResponse?: {
  errorCode?: string;
  message?: string;
 };
}

interface CustomResponse<T = any> extends ErrorResponse {
 data: T;
}

export const http = axios.create({
 baseURL: defaultEnv.API_URL,
 timeout: 3000,
 withCredentials: true,
})

http.interceptors.request.use((config) => {
 console.log('Request config >>>', config)
 if (typeof window !== 'undefined') {
  if (config.headers) {
   config.headers['Authorization'] = `Bearer ${defaultEnv.API_KEY}`;
  }
 }
 return config;
});

http.interceptors.response.use(
 (response) => {
  console.log('Response config >>>', response)
  return response.data;
 },
 async (error: AxiosError<ErrorResponse>) => {
  if (!error.response) return error;
  const originalConfig = error.config;
 },
);