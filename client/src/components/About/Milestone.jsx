import React from 'react';

function Milestone() {
  const milestones = [
    { number: '10+', label: 'Years of Experience' },
    { number: '5K+', label: 'Happy Customers' },
    { number: '300+', label: 'Custom Furniture Pieces' },
    { number: '25+', label: 'Design Awards' },
  ];

  return (
    <section className=" py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-10">OUR MILESTONES</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {milestones.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-5xl font-extrabold text-orange-500">{item.number}</span>
              <p className="text-sm text-gray-600 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Milestone;
