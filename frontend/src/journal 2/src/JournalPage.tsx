import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Card from './components/Card';

const cardData = Array(6).fill({
  title: 'Headache',
  description: 'Discover our cards benefits, with one tap.'
});

const JournalPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [value, setValue] = useState<Date | [Date, Date]>(new Date());

  return (
    <div className="flex min-h-screen bg-[#f6f8fc]">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Journal</h1>
        <p className="text-xl font-semibold text-gray-700 mb-6">
          March 19th, 2025 → March 19th, 2025
        </p>

        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-6">
          <button className="bg-[#4f46e5] text-white px-4 py-2 rounded-md">One day</button>
          <button className="bg-white text-gray-600 border px-4 py-2 rounded-md">Multiple days</button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          className="mb-6 w-full max-w-md px-4 py-2 rounded-md border border-gray-300 shadow-sm"
        />

        {/* Card Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              imageSrc="https://img.icons8.com/ios-filled/100/4f46e5/fingerprint.png"
              title={card.title}
              description={card.description}
              selected={selectedCard === index}
              onClick={() => setSelectedCard(index)}
            />
          ))}
        </div>

        {/* Textarea */}
        <textarea
          placeholder="How are you feeling?"
          className="min-h-[100px] max-w-4xl w-full p-4 rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      {/* Calendar Sidebar */}
      <div className="w-[300px] p-6 bg-white rounded-l-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">January</h2>
        
        <Calendar value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default JournalPage;
