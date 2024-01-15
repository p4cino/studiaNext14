'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { Card, Typography } from '@material-tailwind/react';

import ApiClient from '@/providers/axios-client';

const TABLE_HEAD = ['Nazwa Produktu', 'Cena', 'Stan na magazynie', 'Edytuj', 'Usuń'];

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
  amount: number;
  created_at: string;
  updated_at: string;
  image: string;
}

type AllProductsApiResponse = {
  data?: Product[];
};

function TableWithStripedRows() {
  const [products, setProducts] = useState<AllProductsApiResponse>();

  useEffect(() => {
    ApiClient.get('/v1/products')
      .then((response: AllProductsApiResponse) => {
        // @ts-ignore
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the products', error);
      });
  }, []);

  const deleteProduct = (id: number) => {
    ApiClient.delete(`/v1/products/${id}`)
      .then(() => {
        // @ts-ignore
        setProducts({ data: products?.data.filter((product) => product.id !== id) });
      })
      .catch((error) => {
        console.error('There was an error deleting the product', error);
      });
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products?.data &&
            products?.data.map(({ id, title, price, amount }) => (
              <tr key={id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {title}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {`${price}$`}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {amount}
                  </Typography>
                </td>
                <td className="p-4">
                  <Link href={`/edycjaProduktu/` + id}>Edycja</Link>
                </td>
                <td className="p-4">
                  <button onClick={() => deleteProduct(id)} className="text-red-200 font-medium">
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Card>
  );
}

export default function Page() {
  return (
    <main className="container mx-auto py-8 px-8">
      <TableWithStripedRows />
    </main>
  );
}
