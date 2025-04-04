import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description, selected = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 cursor-pointer transition border-2 shadow-sm bg-white hover:shadow-md ${
        selected ? 'border-yellow-400' : 'border-transparent'
      }`}
    >
      <div className="flex flex-col items-center">
        <img src={imageSrc} alt={title} className="h-12 mb-4" />
        <h3 className="font-bold text-xl text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 text-center">{description}</p>
      </div>
    </div>
  );
};

export default Card;
