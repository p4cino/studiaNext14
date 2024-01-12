'use client';
import { useState } from 'react';
import { AdjustmentsVerticalIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Image from 'next/image';
import {
  Alert,
  Button,
  Card,
  Carousel,
  Textarea,
  Typography,
} from '@material-tailwind/react';

import CustomArrow from '@/components/CustomArrow/CustomArrow';
import CustomInput from '@/components/CustomInput/CustomInput';
import UploadIcon from '@/dodajProdukt/UploadIcon';
import ApiClient from '@/providers/axios-client';

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Nazwa produktu jest wymagana'),
  body: Yup.string().required('Opis produktu jest wymagany'),
  price: Yup.number().positive('Cena musi być liczbą dodatnią').required('Cena jest wymagana'),
  amount: Yup.number().positive('Ilość musi być liczbą dodatnią').required('Ilość jest wymagana'),
});

export default function Home() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState('');

  // @ts-ignore
  const onSelectFile = (setFieldValue, e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // @ts-ignore
      const images = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews(images);
      setFieldValue('image', files[0]);
    }
  };

  return (
    <main className="container mx-auto py-8 px-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Dodawanie Produktu
        </Typography>

        <Formik
          initialValues={{
            title: '',
            body: '',
            price: '',
            amount: '',
            image: '',
          }}
          validationSchema={ProductSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            const formData = new FormData();
            for (const key in values) {
              // @ts-ignore
              formData.append(key, values[key]);
            }

            try {
              const response = await ApiClient.post('/api/v1/products/add', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              setSubmissionStatus('success');
              resetForm();
              setImagePreviews([]);
            } catch (error) {
              setSubmissionStatus('error');
              console.error('Error:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, isSubmitting, handleChange, values, handleBlur }) => (
            <Form className="mt-8 mb-2 w-80 w-full sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <CustomInput
                  label="Nazwa Produktu"
                  name="title"
                  type="text"
                  onBlur={handleBlur}
                  value={values.title}
                  onChange={handleChange}
                />
                <Textarea
                  label="Opis Produktu"
                  name="body"
                  onBlur={handleBlur}
                  value={values.body}
                  onChange={handleChange}
                />
                <ErrorMessage name="body" component="div" />
                <CustomInput
                  label="Cena"
                  name="price"
                  type="number"
                  step="0.01"
                  icon={<CurrencyDollarIcon />}
                  onBlur={handleBlur}
                  value={values.price}
                  onChange={handleChange}
                />
                <CustomInput
                  label="Ilość"
                  name="amount"
                  type="number"
                  icon={<AdjustmentsVerticalIcon />}
                  onBlur={handleBlur}
                  value={values.amount}
                  onChange={handleChange}
                />
                {imagePreviews && (
                  <div>
                    <Typography variant="small">
                      Podgląd obrazków został dostosowany do szerokości formularza
                    </Typography>
                    <Carousel
                      className="rounded-xl"
                      prevArrow={({ handlePrev, firstIndex }) => (
                        <CustomArrow
                          onClick={handlePrev}
                          direction="prev"
                          isDisabled={firstIndex}
                        />
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
                      <UploadIcon />
                      <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 text-center">
                        <span className="font-semibold">Kliknij by dodać obrazek</span> albo
                        przeciągnij i upuść
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        SVG, PNG, JPG bądź GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      onChange={(e) => onSelectFile(setFieldValue, e)}
                      id="dropzone-file"
                      name="image"
                      type="file"
                      className="hidden"
                      accept=".jpg,.png,.svg,.gif"
                      // multiple
                    />
                  </label>
                </div>
              </div>
              <Button className="mt-6" fullWidth type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Przetwarzanie...' : 'Dodaj Produkt'}
              </Button>
            </Form>
          )}
        </Formik>
        {submissionStatus === 'success' && (
          <Alert color="green">Produkt został dodany pomyślnie!.</Alert>
        )}
        {submissionStatus === 'error' && (
          <Alert color="red">Wystąpił błąd podczas dodawania produktu.</Alert>
        )}
      </Card>
    </main>
  );
}
