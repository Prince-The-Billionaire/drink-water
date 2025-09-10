import React, { useState } from "react";

const TimeInput = () => {
  const [hours, setHours] = useState(6);
  const [minutes, setMinutes] = useState(0);

  const formatValue = (val: number) => String(val).padStart(2, "0");

  // Wrap values correctly (works with negatives too)
  const wrapValue = (val: number, max: number) => ((val % max) + max) % max;

  return (
    <div className="flex items-center text-lg">
      <input
        className="size-14 bg-gray-100 pl-4 text-center rounded-xl"
        type="number"
        value={formatValue(hours)}
        onChange={(e) => setHours(wrapValue(Number(e.target.value), 24))}
      />
      <span className="mx-2 text-black/50">:</span>
      <input
        className="size-14 bg-gray-100 pl-4 text-center rounded-xl"
        type="number"
        value={formatValue(minutes)}
        onChange={(e) => setMinutes(wrapValue(Number(e.target.value), 60))}
      />
    </div>
  );
};

export default TimeInput;
