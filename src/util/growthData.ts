import { GrowthDataEntry } from "../types/GrowthData";

export const transformCsvData = (csvData: GrowthDataEntry[]) => {
  return csvData.map((row) => ({
    Agemos: Number(row.Agemos),
    P3: Number(row.P3),
    P5: Number(row.P5),
    P10: Number(row.P10),
    P25: Number(row.P25),
    P50: Number(row.P50),
    P75: Number(row.P75),
    P90: Number(row.P90),
    P95: Number(row.P95),
    P97: Number(row.P97),
  }));
};

// Calculates the maximum Y value according to the highest value in the P97 column.
// This is a very heavy assumption, that P97 has the highest values in the CSv.
export const calculateMaxYValue = (growthData: GrowthDataEntry[]): number => {
  const maxGrowthValue = Math.max(
    ...growthData.map((d) => d.P97).filter((p97) => !isNaN(p97))
  );
  return Math.ceil(maxGrowthValue);
};


// Just a small util function to get cleaner labels for measurement type
export const measurementToLabel = (label: string) => {
  if (label === "bmi") {
    return "BMI";
  } else if (label === "age") {
    return "Age";
  } else {
    // Capitalize the first letter of the label and return
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
};
