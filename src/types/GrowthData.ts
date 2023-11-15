export type MeasurementType = "weight" | "height" | "bmi";

export interface GrowthDataEntry {
  Agemos: number;
  P3: number;
  P5: number;
  P10: number;
  P25: number;
  P50: number;
  P75: number;
  P90: number;
  P95: number;
  P97: number;
}

export interface Measurement {
  Agemos: number;
  value: number;
}

export interface PatientData {
  sex: number;
  weight: Measurement[];
  height: Measurement[];
  bmi: Measurement[];
}
