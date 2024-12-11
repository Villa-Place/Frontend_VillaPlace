import React from "react";

interface ButtonDeleteProps {
  onClick: () => void;
}

const ButtonDelete = ({ onClick }: ButtonDeleteProps) => {
  return (
    <button
      className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 "
      onClick={onClick}
    >
      <svg
        className="w-4 h-4 text-white dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ButtonDelete;
