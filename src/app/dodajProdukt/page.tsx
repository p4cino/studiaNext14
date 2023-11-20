'use client';
import React from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from '@material-tailwind/react';

export default function Home() {
  const [selectedFile, setSelectedFile] = React.useState();
  const [preview, setPreview] = React.useState(null);

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <main className="container mx-auto py-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Dodawanie Produktu
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input variant="static" size="lg" label="Nazwa Produktu" crossOrigin="" />
            <Textarea label="Opis Produktu" />
            <Select label="Kategoria">
              <Option>Słuchawki</Option>
              <Option>Telefony</Option>
              <Option>Akcesoria</Option>
            </Select>
            <Input label="Cena" icon={<CurrencyDollarIcon />} crossOrigin="" />
            {selectedFile && <img src={preview} alt="" />}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Kliknij by dodać obrazki</span> albo przeciągnij
                    i upuść
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG bądź GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={onSelectFile}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".jpg,.png,.svg,.gif"
                />
              </label>
            </div>
          </div>
          <Button className="mt-6" fullWidth>
            Dodaj Produkt
          </Button>
        </form>
      </Card>
    </main>
  );
}
