'use server';

import { DataResponse } from '@/page';
import ApiServerClient from '@/providers/axios-server';

export async function fetchData() {
  const res = (await ApiServerClient)
    .get<DataResponse>('/v1/products')
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.error(err);
    });
}
