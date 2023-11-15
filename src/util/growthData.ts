import { GrowthDataEntry } from "../types/GrowthData";

export const transformCsvData = (
  csvData: GrowthDataEntry[],
  patientSex: number
) => {
  return csvData
  // Strip csv data for just the information we need
  // Ideally this would all be done in the backend?
    .map((row) => ({
      Agemos: Number(row.Agemos),
      Sex: Number(row.Sex),
      P3: Number(row.P3),
      P97: Number(row.P97),
    }))
    .filter((entry) => entry.Sex === patientSex);
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
// I want to use measurement units, but I actually don't know what measurement unit WHO/CDC uses..
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
