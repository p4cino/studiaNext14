interface ICustomArrow {
  onClick?: () => void;
  direction: 'prev' | 'next';
  isDisabled?: boolean;
}
