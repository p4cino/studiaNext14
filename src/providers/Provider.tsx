'use client';
import { createContext, ReactNode, useState } from 'react';

import { SessionProvider } from 'next-auth/react';

import { Product } from '@/page';

export interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  emptyCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
});

interface Props {
  children: ReactNode;
}

function Provider({ children }: Props) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const emptyCart = () => {
    setCart([]);
  };
  return (
    <SessionProvider>
      <CartContext.Provider value={{ cart, addToCart, emptyCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}

export default Provider;
