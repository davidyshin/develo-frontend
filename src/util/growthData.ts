import { GrowthDataEntry } from "../types/GrowthData";

export const transformCsvData = (csvData: GrowthDataEntry[], sex: number) => {
  return csvData
    .filter((row) => row.Sex === sex)
    .map((row) => ({
      Agemos: Number(row.Agemos),
      P3: Number(row.P3),
      P97: Number(row.P97),
      Sex: Number(row.Sex),
      // For the area portion of my graph
      range: [Number(row.P3), Number(row.P97)],
    }));
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
