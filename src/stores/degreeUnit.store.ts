import { create } from "zustand";

export const Unit = {
  Celsius: "c",
  Fahrenheit: "f",
} as const;

export type Unit = typeof Unit[keyof typeof Unit];

interface IDegreeUnit {
  degreeUnit: Unit;
  setDegreeUnit: (unit: Unit) => void;
}

export const useDegreeUnit = create<IDegreeUnit>((set) => ({
  degreeUnit: Unit.Celsius,
  setDegreeUnit: (degreeUnit: Unit) => set({ degreeUnit }),
}));
