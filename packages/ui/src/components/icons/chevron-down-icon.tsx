import React from "react";

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
    width = 20,
    height = 20,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};

export { ChevronDownIcon };
export default ChevronDownIcon;
