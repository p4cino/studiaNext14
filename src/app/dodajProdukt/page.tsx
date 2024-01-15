'use client';
import { useState } from 'react';
import { AdjustmentsVerticalIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '@/components/CustomInput/CustomInput';
import CustomTextarea from '@/components/CustomTextarea/CustomtextArea';
import CustomUploadCarousel from '@/components/CustomUploadCarousel/CustomUploadCarousel';
import CustomDropZone from '@/components/CutomDropZone/CustomDropZone';
import ApiClient from '@/providers/axios-client';
import { Alert, Button, Card, Typography } from '@/providers/ThemeProvider';

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Nazwa produktu jest wymagana'),
  body: Yup.string().required('Opis produktu jest wymagany'),
  price: Yup.number().positive('Cena musi być liczbą dodatnią').required('Cena jest wymagana'),
  amount: Yup.number().positive('Ilość musi być liczbą dodatnią').required('Ilość jest wymagana'),
  image: Yup.mixed()
    .test('fileSize', 'Plik jest zbyt duży. Maksymalny rozmiar to 800x400px.', (value) => {
      if (!value) return true;
      // @ts-ignore
      return value.size <= 800 * 400;
    })
    .test('fileType', 'Dozwolone formaty plików to JPG, PNG, SVG, GIF.', (value) => {
      if (!value) return true;
      // @ts-ignore
      return ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'].includes(value.type);
    }),
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
              const response = await ApiClient.post('/v1/products/add', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              setSubmissionStatus('success');
              resetForm();
              setImagePreviews([]);
              return response;
            } catch (error) {
              setSubmissionStatus('error');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, isSubmitting, handleChange, values, handleBlur }) => (
            <Form className="mt-8 mb-2 w-full sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <CustomInput
                  label="Nazwa Produktu"
                  name="title"
                  type="text"
                  onBlur={handleBlur}
                  value={values.title}
                  onChange={handleChange}
                />
                <CustomTextarea
                  label={'Opis produktu'}
                  name={'body'}
                  onBlur={handleBlur}
                  value={values.body}
                  onChange={handleChange}
                />
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
                {imagePreviews && <CustomUploadCarousel imagePreviews={imagePreviews} />}
                <CustomDropZone onSelectFile={(e) => onSelectFile(setFieldValue, e)} name="image" />
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
