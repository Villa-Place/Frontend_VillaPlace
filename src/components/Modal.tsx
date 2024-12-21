import React from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  className,
}) => {
  return (
    <div
      data-testid="modal-container"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        data-testid="modal-backdrop"
        className="absolute inset-0 bg-black opacity-50 backdrop-blur-md z-10"
        onClick={onClose}
      ></div>
      <div
        className={`bg-white rounded-lg shadow-lg p-10 z-20 flex mx-2 flex-col h-fit  max-h-[90%] md:w-3/5 w-full ${
          className && className
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            data-testid="modal-close-button"
            onClick={onClose}
            className="text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
