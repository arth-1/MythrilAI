"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Papa from "papaparse";
import Header from "@/components/Header";

const CSVGraphPage = () => {
  const router = useRouter();
  const [data, setData] = useState<Record<string, any>[]>([]);

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  Papa.parse<Record<string, any>>(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      setData(result.data as Record<string, any>[]);
    },
  });
};


  return (
    <div>
      <Header />
      <br />
      <Heading
        title="CSV Data Visualization"
        description="Upload a CSV file to visualize data as a graph."
        icon={Upload}
        iconColor="text-blue-700"
        bgColor="bg-blue-700/10"
      />
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <div className="mt-4">
          {data.length > 0 ? (
            <LineChart width={800} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(data[0])[0]} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={Object.keys(data[0])[1]} stroke="#8884d8" />
            </LineChart>
          ) : (
            <p className="text-gray-500">Upload a CSV file to generate a graph.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVGraphPage;
