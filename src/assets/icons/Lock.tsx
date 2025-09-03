import React from "react";
import type { IconProps } from "../../types/Icon";

const Lock: React.FC<IconProps> = ({
    size = 20,
    color,
    className,
    ...props
}) => {
    return (
        <svg
            className={`text-gray-800 dark:text-gray-200 ${className}`}
            stroke={color ?? "currentColor"}
            fill={color ?? "currentColor"}
            strokeWidth="0"
            viewBox="0 0 448 512"
            height={size}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
        </svg>
    );
};

export default Lock;
