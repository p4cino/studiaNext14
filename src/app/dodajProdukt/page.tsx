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
          Dodawanie Produktu
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
            {imagePreviews && (
              <div>
                <Typography variant="small">
                  Podgląd obrazków został dostosowany do szerokości formularza
                </Typography>
                <Carousel
                  className="rounded-xl"
                  prevArrow={({ handlePrev, firstIndex }) => (
                    <CustomArrow onClick={handlePrev} direction="prev" isDisabled={firstIndex} />
                  )}
                  nextArrow={({ handleNext, activeIndex }) => (
                    <CustomArrow
                      onClick={handleNext}
                      direction="next"
                      isDisabled={activeIndex === imagePreviews.length - 1}
                    />
                  )}
                >
                  {imagePreviews.map((img, i) => {
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%' }}
                        src={img}
                        alt={'image-' + i}
                        key={i}
                        className="object-cover h-48 w-96"
                      />
                    );
                  })}
                </Carousel>
              </div>
            )}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
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
                  <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">Kliknij by dodać obrazki</span> albo przeciągnij
                    i upuść
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    SVG, PNG, JPG bądź GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  onChange={onSelectFile}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".jpg,.png,.svg,.gif"
                  multiple
                />
              </label>
            </div>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Dodaj Produkt
          </Button>
        </form>
      </Card>
    </main>
  );
}
