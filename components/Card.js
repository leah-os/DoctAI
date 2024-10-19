import React from "react";
import Image from 'next/image';

export default function Card({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer  border rounded-lg shadow p-4 flex text-gray-700 items-center gap-2 hover:bg-gray-100 transition"
    >
      <Image src={icon} alt={title} className="h-8 w-8" width={32} height={32} />
      <span className="font-semibold">{title}</span>
    </div>
  );
}
