import { FunctionComponent } from 'react';

import { IconButton } from '@material-tailwind/react';

const CustomArrow: FunctionComponent<ICustomArrow> = ({ onClick, direction, isDisabled }) => (
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

export default CustomArrow;
