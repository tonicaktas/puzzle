import React from "react";

// TypeScript props that the component needs
interface BoxenProps {
  value: number | null;
  onClick: () => void;
  isEmpty: boolean;
}

// Functional component that takes 3 props
const Boxen: React.FC<BoxenProps> = ({ value, onClick, isEmpty }) => {
  // Apply styles based on whether the box is empty
  const BoxenStyle = isEmpty
    ? "bg-gray-200 rounded-md border border-gray-300 flex items-center justify-center text-gray-400"
    : "bg-indigo-600 rounded-md border border-blue-700 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-600";

  return (
    <div
      className={`${BoxenStyle} aspect-square w-full h-full transition-all duration-200`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Boxen;
