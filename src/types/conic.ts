export type FocalAxis = 'x' | 'y';

export interface HyperbolaStandardState {
  axis: FocalAxis; // 'x' means x^2/a^2 - y^2/b^2 = 1; 'y' means y^2/a^2 - x^2/b^2 = 1
  h: number; // center x
  k: number; // center y
  a: number; // real semi-axis
  b: number; // imaginary semi-axis
}

export interface GeneralEquationCoefficients {
  A: number; // coefficient of x^2
  C: number; // coefficient of y^2 (must have opposite sign to A for hyperbola)
  D: number; // coefficient of x
  E: number; // coefficient of y
  F: number; // constant term
}

export interface CompletingSquareStep {
  title: string;
  math: string;
  explanation: string;
  highlight?: string;
}

export interface HyperbolaProperties {
  axis: FocalAxis;
  h: number;
  k: number;
  a: number;
  b: number;
  c: number;
  eccentricity: number; // e = c / a
  realAxisLength: number; // 2a
  imaginaryAxisLength: number; // 2b
  focalDistance: number; // 2c
  vertices: [{ x: number; y: number }, { x: number; y: number }];
  foci: [{ x: number; y: number }, { x: number; y: number }];
  asymptoteSlopes: [number, number]; // e.g. +b/a and -b/a
  asymptoteEquations: string[];
  directrixEquations?: string[];
  focalLatusRectum: number; // 2b^2 / a
  asymptoteAngleDeg: number; // angle between asymptotes in degrees
}

export interface QuizQuestion {
  id: string;
  title: string;
  category: 'eccentricity' | 'asymptote' | 'standard_form' | 'completing_square' | 'dual_conic';
  question: string;
  options: string[];
  correctIndex: number;
  trapWarning: string;
  detailedSteps: string[];
}
