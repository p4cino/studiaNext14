'use client';
import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard/ProductCard';
import ApiClient from '@/providers/axios-client';

export type Product = {
  created_at: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  updated_at: string;
};

export interface DataResponse {
  data: Product[];
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await ApiClient.get<DataResponse>('/api/v1/products');
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }

    fetchProducts();
  }, []);

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
