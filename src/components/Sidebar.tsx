import React from "react";
import Example from "./MyCombobox";

export default function Sidebar({
  value,
  handleChange,
}: {
  value: string | null;
  handleChange: (value: string) => void;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-start h-dvh">
      <Example value={value} handleChange={handleChange} />
      <div className="flex justify-start w-full px-10">
        <ul className="text-xl font-bold text-white gap-0 flex flex-col w-full">
          <li 
          onClick={() => handleChange("Washington")}
          className="border-b w-full py-5 cursor-pointer hover:rounded-br-2xl hover:scale-105 transition-all delay-100 px-3">
            Washington
          </li>
          <li 
          onClick={() => handleChange("London")}
          className="border-b w-full py-5 cursor-pointer hover:rounded-br-2xl hover:scale-105 transition-all delay-100 px-3">
            London
          </li>
          <li 
          onClick={() => handleChange("Paris")}
          className="border-b w-full py-5 cursor-pointer hover:rounded-br-2xl hover:scale-105 transition-all delay-100 px-3">
            Paris
          </li>
          <li 
          onClick={() => handleChange("Tokyo")}
          className="border-b w-full py-5 cursor-pointer hover:rounded-br-2xl hover:scale-105 transition-all delay-100 px-3">
            Tokyo
          </li>
        </ul>
      </div>
    </div>
  );
}
