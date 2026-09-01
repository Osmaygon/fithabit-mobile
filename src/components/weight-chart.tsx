"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function WeightChart({ data }: { data: { date: string; weight: number }[] }) {
  if (data.length < 2) return <p className="text-sm text-[#607169]">Añade al menos dos registros para ver la evolución.</p>;
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fontSize: 11 }} width={34} />
          <Tooltip formatter={(value) => [`${value} kg`, "Peso"]} />
          <Line type="monotone" dataKey="weight" stroke="#3f7c5c" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
