'use client';
import React, { FunctionComponent } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import {
  Button,
  Card,
  Carousel,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from '@material-tailwind/react';

interface IButtonIcon {
  onClick?: () => void;
  direction: 'prev' | 'next';
  isDisabled?: boolean;
}

const CustomArrow: FunctionComponent<IButtonIcon> = ({ onClick, direction, isDisabled }) => (
  <IconButton
    variant="text"
    color="gray"
    size="lg"
    onClick={onClick}
    className={`!absolute top-2/4 ${
      direction === 'prev' ? 'left-4' : '!right-4'
    } -translate-y-2/4 backdrop-blur-sm bg-white/30 ${isDisabled ? 'cursor-not-allowed' : ''}`}
    disabled={isDisabled}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      {direction === 'prev' ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      )}
    </svg>
  </IconButton>
);

export default function Home() {
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[] | []>([]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = [];
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }

      setSelectedFiles(files);
      setImagePreviews(images);
    }
  };

  return (
    <main className="container mx-auto py-8 px-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edycja Produktu
        </Typography>
        <form className="mt-8 mb-2 w-80 w-full sm:w-96" action="#send">
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
