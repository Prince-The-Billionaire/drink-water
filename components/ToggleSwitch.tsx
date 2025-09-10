"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleSwitchProps {
  alarmId: string;
  enabled: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ alarmId, enabled }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newState: boolean) => {
      await fetch(`/api/alarm/${alarmId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOn: newState }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alarms"] });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate(!enabled)}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
