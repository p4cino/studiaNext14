import { FC } from 'react';

import Image from 'next/image';
import { Carousel } from '@material-tailwind/react';

import CustomArrow from '@/components/CustomArrow/CustomArrow';
import { Typography } from '@/providers/ThemeProvider';

export interface IImageCarousel {
  imagePreviews: string[]; // Assuming imagePreviews is an array of strings (URLs)
}

const CustomUploadCarousel: FC<IImageCarousel> = ({ imagePreviews }) => {
  return (
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
        {imagePreviews.map((img, i) => (
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
        ))}
      </Carousel>
    </div>
  );
};

export default CustomUploadCarousel;
