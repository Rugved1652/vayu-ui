import React from 'react';

interface MinusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const MinusIcon: React.FC<MinusIconProps> = ({ size = 14, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export { MinusIcon };
export default MinusIcon;
