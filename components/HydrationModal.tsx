import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const HydrationModal = ({ modal, setModal }: { modal: boolean; setModal: (val: boolean) => void }) => {
  const [time, setTime] = useState("");
  const [reminderName, setReminderName] = useState("");

  const handleSave = () => {
    console.log("Hydration Reminder Saved:", { time, reminderName });
    setModal(false); // close modal after saving
  };

  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 relative">
        {/* Close Button */}
        <button
          onClick={() => setModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <AiOutlineClose size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">New Hydration Reminder</h2>

        {/* Time Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reminder Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Reminder Name</label>
          <input
            type="text"
            placeholder="E.g., Drink Water"
            value={reminderName}
            onChange={(e) => setReminderName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Reminder
        </button>
      </div>
    </div>
  );
};

export default HydrationModal;
