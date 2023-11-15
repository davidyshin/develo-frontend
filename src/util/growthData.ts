import { GrowthDataEntry } from "../types/GrowthData";

export const transformCsvData = (
  csvData: GrowthDataEntry[],
  patientSex: number
) => {
  return (
    csvData
      // Account for sex
      .filter((r) => r.Sex === patientSex)
      // Strip csv data for just the information we need
      // Ideally this would all be done in the backend?
      .map((row) => ({
        // To account for half months
        Agemos: row.Agemos === 0 ? 0 : Number(row.Agemos) - 0.5,
        P3: Number(row.P3),
        P97: Number(row.P97),
        Sex: Number(row.Sex),
        // For the area portion of my graph
        range: [Number(row.P3), Number(row.P97)],
      }))
  );
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
