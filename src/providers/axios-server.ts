import axios from 'axios';

import { getSession } from 'next-auth/react';

import { auth } from '@/api/auth/[...nextauth]/auth';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://127.0.0.1:8000';

const ApiServerClient = async () => {
  const defaultOptions = {
    baseURL: baseURL + `/api`,
  };

  const test = await auth();
  console.log('test', test);

  const instance = axios.create(defaultOptions);

  // instance.interceptors.request.use(async (request) => {
  //   const session = await getSession();
  //   if (session) {
  //     request.headers.Authorization = `Bearer ${session?.user.access_token}`;
  //     request.headers.Accept = 'application/json';
  //   }
  //   return request;
  // });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log('error', error);
      return Promise.reject(error);
    },
  );

  return instance;
};

export default ApiServerClient();
