import { Card } from "@/components/ui/card";
import React from "react";
import { getFearAndGreed } from "../../../actions";
import Countdown from "./Countdown";

export async function FearAndGreed() {
  const data = await getFearAndGreed();
  const timeUpdate = data.time_until_update;
  const fng = data.value;

  const getFNGColor = (value: number) => {
    if (value <= 25) return { color: "text-red-500", label: "Extreme Fear" };
    if (value <= 45) return { color: "text-orange-500", label: "Fear" };
    if (value <= 55) return { color: "text-yellow-500", label: "Neutral" };
    if (value <= 75) return { color: "text-lime-500", label: "Greed" };
    return { color: "text-green-500", label: "Extreme Greed" };
  };

  const { color, label } = getFNGColor(fng);

  return (
    <Card className="w-full h-full p-6 shadow-lg dark:bg-slate-900 rounded-xl flex flex-col justify-between">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Fear and Greed Index
        </h2>
        <div className={`text-6xl font-extrabold ${color}`}>{fng}</div>
        <div className={`text-xl font-semibold ${color}`}>{label}</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
          <div
            className={`h-2.5 rounded-full ${color.replace("text-", "bg-")}`}
            style={{ width: `${fng}%` }}
          ></div>
        </div>
      </div>
      <div className="text-sm text-gray-600 text-center dark:text-gray-400 mt-4">
        Time until update: <Countdown initialSeconds={timeUpdate} />
      </div>
    </Card>
  );
}

export default FearAndGreed;
