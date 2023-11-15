import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { readRemoteFile } from "react-papaparse";
import {
  GrowthDataEntry,
  PatientData,
  Measurement,
  MeasurementType,
} from "../../types/GrowthData";
import {
  transformCsvData,
  calculateMaxYValue,
  measurementToLabel,
} from "../../util/growthData";

// Dummy patient data
const patientData: PatientData = {
  sex: 1,
  weight: [
    { Agemos: 24, value: 10.3 },
    { Agemos: 25, value: 11.7 },
    { Agemos: 26, value: 10.8 },
    { Agemos: 27, value: 10.9 },
    { Agemos: 28, value: 15.4 },
    { Agemos: 29, value: 17.3 },
    { Agemos: 30, value: 17.5 },
    { Agemos: 31, value: 17.8 },
    { Agemos: 32, value: 18.1 },
    { Agemos: 33, value: 18.3 },
    { Agemos: 34, value: 18.6 },
    { Agemos: 35, value: 18.9 },
  ],
  height: [
    { Agemos: 24, value: 84.7 },
    { Agemos: 25, value: 81.1 },
    { Agemos: 26, value: 94.3 },
    { Agemos: 27, value: 83.2 },
    { Agemos: 28, value: 93.4 },
    { Agemos: 29, value: 104.2 },
    { Agemos: 30, value: 110.5 },
    { Agemos: 31, value: 110.6 },
    { Agemos: 32, value: 110.9 },
    { Agemos: 33, value: 111.0 },
    { Agemos: 34, value: 111.3 },
    { Agemos: 35, value: 111.3 },
  ],
  bmi: [
    { Agemos: 24, value: 16 },
    { Agemos: 25, value: 16.1 },
    { Agemos: 26, value: 15.3 },
    { Agemos: 27, value: 15.7 },
    { Agemos: 28, value: 17.3 },
    { Agemos: 29, value: 19 },
    { Agemos: 30, value: 16.2 },
    { Agemos: 31, value: 16.4 },
    { Agemos: 32, value: 16.6 },
    { Agemos: 33, value: 16.8 },
    { Agemos: 34, value: 17.0 },
    { Agemos: 35, value: 17.2 },
  ],
};

const ageLabelFormatter = (value: string) => {
  return `Age in months: ${value}`;
};

const GrowthLineGraph = () => {
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<MeasurementType>("weight");
  const [growthData, setGrowthData] = useState<GrowthDataEntry[]>([]);
  const [maxYValue, setMaxYValue] = useState<number>(0);

  useEffect(() => {
    const filePath = `/data/${selectedMeasurement}-for-age.csv`;

    readRemoteFile(filePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        const transformedData = transformCsvData(
          result.data as GrowthDataEntry[],
          patientData.sex
        );

        setGrowthData(transformedData);
        setMaxYValue(calculateMaxYValue(transformedData));
      },
    });
  }, [selectedMeasurement]);

  // Extracting the correct patient data based on the selected measurement
  const patientMeasurementData: Measurement[] =
    patientData[selectedMeasurement];

  return (
    <div style={{ padding: "50px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="measurement-select">Select Measurement: </label>
        <select
          id="measurement-select"
          value={selectedMeasurement}
          onChange={(e) =>
            setSelectedMeasurement(e.target.value as MeasurementType)
          }
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="weight">Weight</option>
          <option value="height">Height</option>
          <option value="bmi">BMI</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={growthData} style={{ backgroundColor: "white" }}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis
            dataKey="Agemos"
            label={{
              value: "Age (Months)",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            domain={[0, maxYValue]}
            allowDataOverflow
            label={{
              value: measurementToLabel(selectedMeasurement),
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip labelFormatter={ageLabelFormatter} />
          <Legend />

          <Line dataKey="P3" stroke="#8BC34A" dot={false} />
          <Line dataKey="P97" stroke="#42A5F5" dot={false} />

          <Line
            type="monotone"
            data={patientMeasurementData}
            dataKey="value"
            // Maybe `${patient.name} ${selectedMeasurement}`
            name={`Patient ${measurementToLabel(selectedMeasurement)}`}
            stroke="#000000"
            strokeWidth={2}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthLineGraph;
