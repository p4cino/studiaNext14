'use client';
import React from 'react';

import { Card, Typography } from '@material-tailwind/react';

const TABLE_HEAD = ['Nazwa Produktu', 'Cena', 'Stan na magazynie', 'Opcja'];

const TABLE_ROWS = [
  {
    name: 'Apple AirPods',
    price: '200$',
    stock: '23',
  },
  {
    name: 'Alexa Liras',
    price: '300$',
    stock: '4',
  },
  {
    name: 'Laurent Perrier',
    price: '400$',
    stock: '19',
  },
  {
    name: 'Michael Levi',
    price: '800$',
    stock: '24',
  },
  {
    name: 'Richard Gran',
    price: '100$',
    stock: '4',
  },
];

export function TableWithStripedRows() {
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
          {TABLE_ROWS.map(({ name, price, stock }, index) => (
            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {price}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {stock}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  Usun
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-8">
      <TableWithStripedRows />
    </main>
  );
}
