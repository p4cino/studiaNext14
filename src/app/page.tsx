'use client';
import React from 'react';

import { Typography } from '@material-tailwind/react';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-3 gap-12">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
}
