'use client';
import { useEffect, useState } from 'react';
import { AdjustmentsVerticalIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Alert, Button, Card, Typography } from '@material-tailwind/react';

import CustomInput from '@/components/CustomInput/CustomInput';
import CustomTextarea from '@/components/CustomTextarea/CustomtextArea';
import CustomUploadCarousel from '@/components/CustomUploadCarousel/CustomUploadCarousel';
import CustomDropZone from '@/components/CutomDropZone/CustomDropZone';
import ApiClient from '@/providers/axios-client';

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

// @ts-ignore
export default function EditProduct({ params }) {
  const { id } = params;
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrlPreviews, setImageUrlPreviews] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [productData, setProductData] = useState({
    title: '',
    body: '',
    price: '',
    amount: '',
    image: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiClient.get(`/v1/products/${id}`);
        console.log(response.data);
        const { image, ...restResponse } = response.data.data;
        setProductData(restResponse);
        setImageUrlPreviews([image]);
      } catch (error) {
        console.error('Błąd podczas pobierania danych produktu:', error);
      }
    };

    fetchData().then(() => setIsDataLoaded(true));
  }, [id]);

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
          Edycja Produktu
        </Typography>
        {isDataLoaded && (
          <Formik
            initialValues={productData}
            validationSchema={ProductSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);

              const formData = new FormData();
              for (const key in values) {
                // @ts-ignore
                formData.append(key, values[key]);
              }

              try {
                await ApiClient.post('/v1/products/1/edit', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                setSubmissionStatus('success');
                resetForm();
                setImagePreviews([]);
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrlPreviews[0]} alt="product" className="w-full" />
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
                  <CustomDropZone
                    onSelectFile={(e) => onSelectFile(setFieldValue, e)}
                    name="image"
                  />
                </div>
                <Button className="mt-6" fullWidth type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Przetwarzanie...' : 'Edytuj Produkt'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
        {submissionStatus === 'success' && (
          <Alert color="green">Produkt został zaktualizowany pomyślnie!</Alert>
        )}
        {submissionStatus === 'error' && (
          <Alert color="red">Wystąpił błąd podczas edycji produktu.</Alert>
        )}
      </Card>
    </main>
  );
}
