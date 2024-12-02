import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="min-w-[180px] relative flex items-center justify-start bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-medium text-base px-5 py-2.5 rounded-full shadow-lg transition-all duration-600 ease-out hover:shadow-2xl group uppercase"
      onClick={onClick}
    >
      <span className="pl-5">{label}</span>
      <div className="absolute right-1 bg-white flex items-center justify-center w-9 h-9 rounded-full transition-all duration-600 ease-out group-hover:w-[calc(100%-0.75rem)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 text-purple-600 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
};

export default CustomButton;
