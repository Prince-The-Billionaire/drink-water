"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  modal: boolean;
  setModal: (v: boolean) => void;
}

export default function AlarmModal({ modal, setModal }: Props) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/alarm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: "test-user", // TODO: replace with actual logged-in user
          name,
          time,
        }),
      });
      if (!res.ok) throw new Error("Failed to create alarm");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
      setModal(false);
      setName("");
      setTime("");
    },
  });

  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-80">
        <h2 className="font-bold text-lg mb-4">Add Alarm</h2>

        <input
          type="text"
          placeholder="Alarm name"
          className="border w-full mb-2 p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="time"
          className="border w-full mb-4 p-2 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={() => setModal(false)}
            className="flex-1 border rounded p-2"
          >
            Cancel
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="flex-1 bg-blue-500 text-white rounded p-2 disabled:opacity-50"
          >
            {mutation.isPending ? "Saving..." : "Save Alarm"}
          </button>
        </div>

        {mutation.isError && (
          <p className="text-red-500 mt-2 text-sm">
            Failed to create alarm. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
