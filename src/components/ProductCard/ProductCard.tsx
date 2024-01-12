import { FunctionComponent, useContext } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import { Product } from '@/page';
import { CartContext } from '@/providers/Provider';

interface ProductCardProps {
  data: Product;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ data }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(data);
  };

  return (
    <Card className="w-full md:w-96">
      <CardHeader shadow={false} floated={false} className="h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.image} alt="card-image" className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {data.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${data.price}
          </Typography>
        </div>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          {data.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={handleAddToCart}
          className="bg-blue-600/80 hover:bg-blue-500 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
