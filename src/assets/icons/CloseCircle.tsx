import React from "react";
import type { IconProps } from "../../types/Icon";

const CloseCircle: React.FC<IconProps> = ({
    size = 20,
    color,
    className,
    ...props
}) => {
    return (
        <svg
            stroke={color ?? "currentColor"}
            fill={color ?? "currentColor"}
            strokeWidth="0"
            viewBox="0 0 512 512"
            height={size}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            {...props}
        >
            <path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z"></path>
            <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
        </svg>
    );
};

export default CloseCircle;
