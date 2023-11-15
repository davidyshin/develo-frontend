
// Might've been better to use enum here
export type MeasurementType = "weight" | "height" | "bmi";

export interface GrowthDataEntry {
  Agemos: number;
  Sex: number;
  P3: number;
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
