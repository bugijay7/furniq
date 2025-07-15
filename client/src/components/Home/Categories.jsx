import React from 'react';
import {
  LuArmchair,
  LuSofa,
  LuTv,
  LuLampDesk,
  LuTable2,
  LuPanelTop,
  LuUtensilsCrossed,
  LuFan,
  LuBedDouble,
  LuPanelBottomClose,
  LuArchive,
  LuBookOpenCheck,
} from 'react-icons/lu';

import livingImg from '../../assets/living.jpeg';
import kitchenImg from '../../assets/kitchen.jpeg';
import bedroomImg from '../../assets/bedroom.jpeg';

const groupedCategories = [
  {
    room: 'Living Room',
    image: livingImg,
    items: [
      { icon: <LuSofa size={32} />, label: 'Sofas', desc: 'Comfortable seating for family & guests' },
      { icon: <LuArmchair size={32} />, label: 'Chairs', desc: 'Accent & lounge chairs for any corner' },
      { icon: <LuTv size={32} />, label: 'TV Units', desc: 'Stylish media centers and consoles' },
      { icon: <LuLampDesk size={32} />, label: 'Lamps', desc: 'Ambient lighting to set the mood' },
      { icon: <LuPanelTop size={32} />, label: 'Coffee Tables', desc: 'Central tables for convenience and style' },
      { icon: <LuBookOpenCheck size={32} />, label: 'Shelves', desc: 'Display books, decor, and more' },
    ],
  },
  {
    room: 'Dining / Kitchen',
    image: kitchenImg,
    items: [
      { icon: <LuTable2 size={32} />, label: 'Dining Tables', desc: 'Spacious tables for meals & gatherings' },
      { icon: <LuPanelTop size={32} />, label: 'Cabinets', desc: 'Storage units for kitchen essentials' },
      { icon: <LuUtensilsCrossed size={32} />, label: 'Cutlery', desc: 'Elegant and durable tableware' },
      { icon: <LuFan size={32} />, label: 'Storage', desc: 'Functional storage for all utensils' },
      { icon: <LuBookOpenCheck size={32} />, label: 'Cookware', desc: 'Pots, pans, and essentials for cooking' },
      { icon: <LuLampDesk size={32} />, label: 'Lighting', desc: 'Overhead and task lighting solutions' },
    ],
  },
  {
    room: 'Bedroom',
    image: bedroomImg,
    items: [
      { icon: <LuBedDouble size={32} />, label: 'Beds', desc: 'Cozy beds for restful nights' },
      { icon: <LuPanelBottomClose size={32} />, label: 'Wardrobes', desc: 'Spacious wardrobes to organize clothes' },
      { icon: <LuArchive size={32} />, label: 'Dressers', desc: 'Drawer units for folded essentials' },
      { icon: <LuBookOpenCheck size={32} />, label: 'Nightstands', desc: 'Bedside storage for daily items' },
      { icon: <LuLampDesk size={32} />, label: 'Bedroom Lamps', desc: 'Soft lighting for a restful atmosphere' },
      { icon: <LuPanelTop size={32} />, label: 'Mirrors', desc: 'Stylish mirrors for grooming and decor' },
    ],
  },
];

function Categories() {
  return (
    <section className="py-16 px-4 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
        Shop by Room
      </h2>

      {groupedCategories.map(({ room, items, image }, index) => (
        <div
          key={index}
          className={`mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
            index === 1 ? 'md:flex md:flex-row-reverse md:gap-10' : ''
          }`}
        >
          {/* Category Items */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="w-full p-3 flex flex-col text-left border shadow-sm"
              >
                <div className="text-blue-600 mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Room Image */}
          <div className="text-center md:text-left">
            <img
              src={image}
              alt={room}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
}


export default Categories;
