'use client';
import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard/ProductCard';
import ApiClient from '@/providers/axios-client';

export type Product = {
  created_at: Date | string;
  body: string;
  id: number;
  image: string;
  price: number;
  title: string;
  updated_at: Date | string;
};

export interface DataResponse {
  data: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    ApiClient.get<DataResponse>('/v1/products')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="container mx-auto py-8">
      <div className="grid md:grid-cols-3 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </main>
  );
}
