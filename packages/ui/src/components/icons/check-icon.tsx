import React from "react";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
    size = 14,
    className,
    ...props
}) => {
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
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
};

export { CheckIcon };
export default CheckIcon;
