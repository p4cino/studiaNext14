'use client';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from '@/providers/ThemeProvider';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edycja Produktu
        </Typography>
        <form className="mt-8 mb-2 w-full sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input variant="static" size="lg" label="Nazwa Produktu" crossOrigin="" />
            <Textarea label="Opis Produktu" />
            <Select label="Kategoria">
              <Option>Słuchawki</Option>
              <Option>Telefony</Option>
              <Option>Akcesoria</Option>
            </Select>
            <Input label="Cena" icon={<CurrencyDollarIcon />} crossOrigin="" />
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                alt=""
              />
            </div>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Zapisz Edycje
          </Button>
        </form>
      </Card>
    </main>
  );
}
