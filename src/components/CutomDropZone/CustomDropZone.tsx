import { ChangeEvent, FC } from 'react';
import { ErrorMessage } from 'formik';

import UploadIcon from '@/dodajProdukt/UploadIcon';

interface IDropzone {
  name?: string;
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Dropzone: FC<IDropzone> = ({ name = '', onSelectFile }) => (
  <div className="flex flex-wrap items-center justify-center ">
    <ErrorMessage name={name} component="div" className="w-full" />
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
        <UploadIcon />
        <p className="text-sm mb-2 text-gray-500 dark:text-gray-400 text-center">
          <span className="font-semibold">Kliknij by dodać obrazek</span> albo przeciągnij i upuść
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          SVG, PNG, JPG bądź GIF (MAX. 800x400px)
        </p>
      </div>
      <input
        onChange={(e) => onSelectFile(e)}
        id="dropzone-file"
        name={name}
        type="file"
        className="hidden"
        accept=".jpg,.png,.svg,.gif"
        // multiple
      />
    </label>
  </div>
);

export default Dropzone;
