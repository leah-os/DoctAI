import React from "react";

export default function Card({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer  border rounded-lg shadow p-4 flex text-gray-700 items-center gap-2 hover:bg-gray-100 transition"
    >
      <img src={icon} alt={title} className="h-8 w-8" />
      <span className="font-semibold">{title}</span>
    </div>
  );
}
