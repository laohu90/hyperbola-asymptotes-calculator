import {
  CompletingSquareStep,
  FocalAxis,
  GeneralEquationCoefficients,
  HyperbolaProperties,
  HyperbolaStandardState,
} from '../types/conic';
import { Language } from '../i18n/translations';

/**
 * Greatest common divisor
 */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/**
 * Format a rational number into reduced fraction string
 */
export function formatFraction(numerator: number, denominator: number): string {
  if (Math.abs(denominator) < 1e-9) return '未定义';
  if (Math.abs(numerator) < 1e-9) return '0';

  const val = numerator / denominator;
  const isNeg = val < 0;
  const sign = isNeg ? '-' : '';
  const absVal = Math.abs(val);

  if (Math.abs(absVal - Math.round(absVal)) < 1e-6) {
    return `${sign}${Math.round(absVal)}`;
  }

  // Find best rational approximation for denominator <= 120
  for (let d = 2; d <= 120; d++) {
    const n = Math.round(absVal * d);
    if (Math.abs(absVal - n / d) < 1e-4) {
      const common = gcd(n, d);
      const reducedN = n / common;
      const reducedD = d / common;
      if (reducedD === 1) return `${sign}${reducedN}`;
      return `${sign}${reducedN}/${reducedD}`;
    }
  }

  return `${sign}${absVal.toFixed(3).replace(/\.?0+$/, '')}`;
}

/**
 * Simplify radical: e.g. 13 -> "√13", 16 -> "4", 20 -> "2√5"
 */
export function simplifyRadical(val: number): string {
  if (val < 0) return '虚数';
  if (Math.abs(val) < 1e-9) return '0';

  const rounded = Math.round(val * 10000) / 10000;
  const sqrtVal = Math.sqrt(rounded);
  if (Math.abs(sqrtVal - Math.round(sqrtVal)) < 1e-7) {
    return Math.round(sqrtVal).toString();
  }

  // If it's an integer square root simplify
  if (Number.isInteger(rounded)) {
    let outside = 1;
    let inside = rounded;
    for (let i = 2; i * i <= inside; i++) {
      while (inside % (i * i) === 0) {
        outside *= i;
        inside /= (i * i);
      }
    }
    if (outside > 1) {
      return inside === 1 ? `${outside}` : `${outside}√${inside}`;
    }
    return `√${inside}`;
  }

  // Fraction under radical
  for (let den = 2; den <= 16; den++) {
    const num = Math.round(rounded * den * den);
    if (Math.abs(rounded * den * den - num) < 1e-5) {
      return `${simplifyRadical(num)}/${den}`;
    }
  }

  return sqrtVal.toFixed(3).replace(/\.?0+$/, '');
}

/**
 * Format algebraic term with variable (e.g. 4x², -9y², + 16x)
 */
export function formatCoeffTerm(coeff: number, varName: string, isFirst = false): string {
  if (Math.abs(coeff) < 1e-9) return '';
  const isNeg = coeff < 0;
  const absCoeff = Math.abs(coeff);
  const coeffStr = absCoeff === 1 && varName !== '' ? '' : formatFraction(absCoeff, 1);

  if (isFirst) {
    return isNeg ? `-${coeffStr}${varName}` : `${coeffStr}${varName}`;
  }
  return isNeg ? `- ${coeffStr}${varName}` : `+ ${coeffStr}${varName}`;
}

/**
 * Format linear term inside parentheses e.g. x² + 4x or x² - 2x
 */
export function formatLinearInBracket(coeff: number, varName: string): string {
  if (Math.abs(coeff) < 1e-9) return '';
  const isNeg = coeff < 0;
  const absCoeff = Math.abs(coeff);
  const coeffStr = absCoeff === 1 ? '' : `${formatFraction(absCoeff, 1)}`;
  return isNeg ? `- ${coeffStr}${varName}` : `+ ${coeffStr}${varName}`;
}

/**
 * Format factored group: factor * (inner) without "+ +" or "+ -" or redundant "1"
 */
export function formatFactorGroup(factor: number, innerContent: string, isFirst = false): string {
  if (Math.abs(factor) < 1e-9) return '';
  const isNeg = factor < 0;
  const absFactor = Math.abs(factor);
  const factorStr = absFactor === 1 ? '' : `${formatFraction(absFactor, 1)}`;

  if (isFirst) {
    return isNeg ? `-${factorStr}${innerContent}` : `${factorStr}${innerContent}`;
  }
  return isNeg ? `- ${factorStr}${innerContent}` : `+ ${factorStr}${innerContent}`;
}

/**
 * Format linear shift bracket: e.g. (x - 2) or (x + 3) or x
 */
export function formatBracketTerm(varName: string, shift: number): string {
  if (Math.abs(shift) < 1e-9) return varName;
  const absShift = Math.abs(shift);
  const shiftStr = formatFraction(absShift, 1);
  if (shift > 0) return `(${varName} - ${shiftStr})`;
  return `(${varName} + ${shiftStr})`;
}

/**
 * Calculate full geometric properties from standard form including 3 forms of asymptotes
 */
export function calculateHyperbolaProperties(state: HyperbolaStandardState): HyperbolaProperties {
  const { axis, h, k, a, b } = state;
  const safeA = Math.max(0.001, a);
  const safeB = Math.max(0.001, b);
  const aSq = safeA * safeA;
  const bSq = safeB * safeB;
  const cSq = aSq + bSq;
  const c = Math.sqrt(cSq);
  const eccentricity = c / safeA;

  let vertices: [{ x: number; y: number }, { x: number; y: number }];
  let foci: [{ x: number; y: number }, { x: number; y: number }];
  let asymptoteEquations: string[] = [];
  let asymptoteSlopeInterceptEquations: string[] = [];
  let asymptoteGeneralEquations: string[] = [];
  let asymptoteSlopes: [number, number];

  const yTerm = formatBracketTerm('y', k);
  const xTerm = formatBracketTerm('x', h);

  if (axis === 'x') {
    vertices = [
      { x: h - safeA, y: k },
      { x: h + safeA, y: k },
    ];
    foci = [
      { x: h - c, y: k },
      { x: h + c, y: k },
    ];
    const slope = safeB / safeA;
    asymptoteSlopes = [slope, -slope];
    const slopeStr = formatFraction(safeB, safeA);

    // 1. Point-slope form: (y - k) = ± (b/a)(x - h)
    asymptoteEquations = [
      `${yTerm} = ${slopeStr}${xTerm === 'x' ? 'x' : xTerm}`,
      `${yTerm} = -${slopeStr}${xTerm === 'x' ? 'x' : xTerm}`,
    ];

    // 2. Slope-intercept form: y = mx + (k - m*h)
    // Line 1: y = (b/a)x + (k - (b/a)h)
    // Line 2: y = -(b/a)x + (k + (b/a)h)
    const intercept1 = k - (safeB / safeA) * h;
    const intercept2 = k + (safeB / safeA) * h;

    const formatIntercept = (val: number) => {
      if (Math.abs(val) < 1e-9) return '';
      return val > 0 ? ` + ${formatFraction(val, 1)}` : ` - ${formatFraction(Math.abs(val), 1)}`;
    };

    asymptoteSlopeInterceptEquations = [
      `y = ${slopeStr}x${formatIntercept(intercept1)}`,
      `y = -${slopeStr}x${formatIntercept(intercept2)}`,
    ];

    // 3. General form: bx - ay + (ak - bh) = 0 and bx + ay - (ak + bh) = 0
    // Simplify with integers if rational
    const commonA = Math.round(safeA * 100);
    const commonB = Math.round(safeB * 100);
    const div = gcd(commonA, commonB);
    const intA = commonA / div;
    const intB = commonB / div;

    const const1 = intA * k - intB * h;
    const const2 = -intA * k - intB * h;

    const formatGeneralConst = (val: number) => {
      if (Math.abs(val) < 1e-9) return '';
      return val > 0 ? ` + ${formatFraction(val, 1)}` : ` - ${formatFraction(Math.abs(val), 1)}`;
    };

    asymptoteGeneralEquations = [
      `${formatCoeffTerm(intB, 'x', true)} - ${formatCoeffTerm(intA, 'y', true)}${formatGeneralConst(const1)} = 0`,
      `${formatCoeffTerm(intB, 'x', true)} + ${formatCoeffTerm(intA, 'y', true)}${formatGeneralConst(const2)} = 0`,
    ];
  } else {
    vertices = [
      { x: h, y: k - safeA },
      { x: h, y: k + safeA },
    ];
    foci = [
      { x: h, y: k - c },
      { x: h, y: k + c },
    ];
    const slope = safeA / safeB;
    asymptoteSlopes = [slope, -slope];
    const slopeStr = formatFraction(safeA, safeB);

    // 1. Point-slope form: (y - k) = ± (a/b)(x - h)
    asymptoteEquations = [
      `${yTerm} = ${slopeStr}${xTerm === 'x' ? 'x' : xTerm}`,
      `${yTerm} = -${slopeStr}${xTerm === 'x' ? 'x' : xTerm}`,
    ];

    // 2. Slope-intercept form
    const intercept1 = k - (safeA / safeB) * h;
    const intercept2 = k + (safeA / safeB) * h;

    const formatIntercept = (val: number) => {
      if (Math.abs(val) < 1e-9) return '';
      return val > 0 ? ` + ${formatFraction(val, 1)}` : ` - ${formatFraction(Math.abs(val), 1)}`;
    };

    asymptoteSlopeInterceptEquations = [
      `y = ${slopeStr}x${formatIntercept(intercept1)}`,
      `y = -${slopeStr}x${formatIntercept(intercept2)}`,
    ];

    // 3. General form
    const commonA = Math.round(safeA * 100);
    const commonB = Math.round(safeB * 100);
    const div = gcd(commonA, commonB);
    const intA = commonA / div;
    const intB = commonB / div;

    const const1 = intB * k - intA * h;
    const const2 = -intB * k - intA * h;

    const formatGeneralConst = (val: number) => {
      if (Math.abs(val) < 1e-9) return '';
      return val > 0 ? ` + ${formatFraction(val, 1)}` : ` - ${formatFraction(Math.abs(val), 1)}`;
    };

    asymptoteGeneralEquations = [
      `${formatCoeffTerm(intA, 'x', true)} - ${formatCoeffTerm(intB, 'y', true)}${formatGeneralConst(const1)} = 0`,
      `${formatCoeffTerm(intA, 'x', true)} + ${formatCoeffTerm(intB, 'y', true)}${formatGeneralConst(const2)} = 0`,
    ];
  }

  // Angle enclosing the real axis branches:
  // Horizontal: 2 * arctan(b/a); Vertical: 2 * arctan(a/b)
  const angleRad = axis === 'x' ? 2 * Math.atan(safeB / safeA) : 2 * Math.atan(safeA / safeB);
  const asymptoteAngleDeg = (angleRad * 180) / Math.PI;

  // Acute intersection angle between lines: min(theta, 180 - theta)
  const asymptoteAcuteAngleDeg = Math.min(asymptoteAngleDeg, 180 - asymptoteAngleDeg);

  return {
    axis,
    h,
    k,
    a: safeA,
    b: safeB,
    c,
    eccentricity,
    realAxisLength: 2 * safeA,
    imaginaryAxisLength: 2 * safeB,
    focalDistance: 2 * c,
    vertices,
    foci,
    asymptoteSlopes,
    asymptoteEquations,
    asymptoteSlopeInterceptEquations,
    asymptoteGeneralEquations,
    focalLatusRectum: (2 * safeB * safeB) / safeA,
    asymptoteAngleDeg,
    asymptoteAcuteAngleDeg,
  };
}

/**
 * Result of comprehensive equation parsing
 */
export type ParseEquationResult =
  | {
      success: true;
      coeffs: GeneralEquationCoefficients;
      isStandardForm?: boolean;
      standardState?: HyperbolaStandardState;
      description?: string;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Clean & sanitize user equation string:
 * - Normalizes Unicode dashes & minus signs (U+2212, U+2013, U+2014, U+FF0D, etc.) to ASCII '-'
 * - Normalizes superscripts ², ³ to ^2, ^3
 * - Normalizes fullwidth brackets & slashes
 * - Detects and rejects xy / yx rotated terms
 */
export function sanitizeEquationString(raw: string): { clean: string; error?: string } {
  let str = raw
    .replace(/[\u2212\u2013\u2014\uFF0D\uFE63]/g, '-') // Unicode minus / dashes
    .replace(/[\uFF0B\uFE62]/g, '+') // Fullwidth plus
    .replace(/[\uFF08\u3010]/g, '(') // Fullwidth brackets
    .replace(/[\uFF09\u3011]/g, ')')
    .replace(/[\uFF0F\u00F7]/g, '/') // Fullwidth slash / division
    .replace(/[\uFF1D]/g, '=')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/[*×·]/g, '')
    .replace(/[\s\u3000]+/g, ''); // Whitespace & fullwidth space

  if (/xy|yx/i.test(str)) {
    return {
      clean: str,
      error: '检测到方程含 xy 交叉项（旋转双曲线）。本工具专注标准方向（对称轴平行于坐标轴）的双曲线，暂不支持斜向旋转双曲线。',
    };
  }

  return { clean: str };
}

/**
 * Parse standard form equations like:
 * "x^2/9 - y^2/16 = 1"
 * "(x-2)^2/9 - (y+1)^2/4 = 1"
 * "(y-1)^2/16 - (x+2)^2/9 = 1"
 * "(y+3)^2/25 - (x-1)^2/16 = 1"
 */
function tryParseStandardForm(str: string): ParseEquationResult | null {
  // Check if equation has '=' and contains fractions
  if (!str.includes('=')) return null;

  const [lhs, rhsStr] = str.split('=');
  const rhsVal = parseFloat(rhsStr);
  if (isNaN(rhsVal) || rhsVal === 0) return null;

  // Pattern to match terms: e.g. +(x-2)^2/9 or -(y+1)^2/4 or x^2/9 or -y^2
  // We want to extract both terms from lhs
  // Replace leading '+' if any
  let normalizedLhs = lhs;
  if (!normalizedLhs.startsWith('+') && !normalizedLhs.startsWith('-')) {
    normalizedLhs = '+' + normalizedLhs;
  }

  // Regex for standard terms
  // Sign: [+-]
  // Variable bracket: (?:\(([xy])([+-]\d*(?:\.\d+)?)\)|([xy]))\^2
  // Denominator: (?:/(\d*(?:\.\d+)?))?
  const termRegex = /([+-])(?:\(([xy])([+-]\d*(?:\.\d+)?)\)|([xy]))\^2(?:\/(\d*(?:\.\d+)?))?/gi;
  const matches = [...normalizedLhs.matchAll(termRegex)];

  if (matches.length !== 2) {
    return null;
  }

  let xTerm: { sign: number; h: number; denom: number } | null = null;
  let yTerm: { sign: number; k: number; denom: number } | null = null;

  for (const m of matches) {
    const sign = m[1] === '-' ? -1 : 1;
    const varName = (m[2] || m[4]).toLowerCase();
    const shift = m[3] ? parseFloat(m[3]) : 0; // in (x - 2), shift is -2, so h = 2
    const denom = m[5] ? parseFloat(m[5]) : 1;

    if (denom <= 0) return null;

    if (varName === 'x') {
      xTerm = { sign, h: -shift, denom };
    } else if (varName === 'y') {
      yTerm = { sign, k: -shift, denom };
    }
  }

  if (!xTerm || !yTerm) return null;

  // Effective signs considering RHS: term.sign / rhsVal
  const effXSign = xTerm.sign * Math.sign(rhsVal);
  const effYSign = yTerm.sign * Math.sign(rhsVal);

  if (effXSign * effYSign > 0) {
    return {
      success: false,
      error: '识别为标准方程格式，但两个平方项符号相同，该方程表示椭圆或圆，而非双曲线！双曲线要求一正一负。',
    };
  }

  const absRhs = Math.abs(rhsVal);
  let axis: FocalAxis;
  let aSq: number;
  let bSq: number;
  const h = xTerm.h;
  const k = yTerm.k;

  if (effXSign > 0) {
    axis = 'x';
    aSq = xTerm.denom * absRhs;
    bSq = yTerm.denom * absRhs;
  } else {
    axis = 'y';
    aSq = yTerm.denom * absRhs;
    bSq = xTerm.denom * absRhs;
  }

  const a = Math.sqrt(aSq);
  const b = Math.sqrt(bSq);

  // Convert to general equation Ax^2 + Cy^2 + Dx + Ey + F = 0
  // Horizontal: bSq * (x - h)^2 - aSq * (y - k)^2 - aSq * bSq = 0
  // Vertical: -bSq * (x - h)^2 + aSq * (y - k)^2 - aSq * bSq = 0
  let A: number;
  let C: number;
  let D: number;
  let E: number;
  let F: number;

  if (axis === 'x') {
    A = bSq;
    C = -aSq;
    D = -2 * bSq * h;
    E = 2 * aSq * k;
    F = bSq * h * h - aSq * k * k - aSq * bSq;
  } else {
    A = -bSq;
    C = aSq;
    D = 2 * bSq * h;
    E = -2 * aSq * k;
    F = -bSq * h * h + aSq * k * k - aSq * bSq;
  }

  // Simplify coefficients by dividing by common factors if applicable
  const scale = gcd(Math.round(A), Math.round(C));
  if (scale > 1) {
    A /= scale;
    C /= scale;
    D /= scale;
    E /= scale;
    F /= scale;
  }

  return {
    success: true,
    coeffs: { A, C, D, E, F },
    isStandardForm: true,
    standardState: { axis, h, k, a, b },
    description: `标准型识别成功：${axis === 'x' ? '实轴在水平方向 (x轴)' : '实轴在垂直方向 (y轴)'}，中心 (${h}, ${k})，a = ${formatFraction(a, 1)}，b = ${formatFraction(b, 1)}`,
  };
}

/**
 * Universal equation parser: accepts general quadratic or standard form equations
 */
export function parseAnyEquation(inputStr: string): ParseEquationResult {
  const { clean, error } = sanitizeEquationString(inputStr);
  if (error) {
    return { success: false, error };
  }
  if (!clean) {
    return { success: false, error: '请输入有效的双曲线方程！' };
  }

  // 1. Try standard form first
  const standardResult = tryParseStandardForm(clean);
  if (standardResult) {
    return standardResult;
  }

  // 2. Parse general quadratic form Ax^2 + Cy^2 + Dx + Ey + F = 0
  let lhs = clean;
  let rhs = '0';
  if (clean.includes('=')) {
    const parts = clean.split('=');
    lhs = parts[0];
    rhs = parts[1] || '0';
  }

  let A = 0;
  let C = 0;
  let D = 0;
  let E = 0;
  let F = 0;

  const parseSide = (sideStr: string, multiplier: number) => {
    // Regex matching signed terms
    const regex = /([+-]?[^+-]+)/g;
    const matches = sideStr.match(regex);
    if (!matches) return;

    for (let term of matches) {
      term = term.trim();
      if (!term) continue;

      if (term.includes('x^2')) {
        let coeffStr = term.replace('x^2', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) A += val * multiplier;
      } else if (term.includes('y^2')) {
        let coeffStr = term.replace('y^2', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) C += val * multiplier;
      } else if (term.includes('x')) {
        let coeffStr = term.replace('x', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) D += val * multiplier;
      } else if (term.includes('y')) {
        let coeffStr = term.replace('y', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) E += val * multiplier;
      } else {
        const val = parseFloat(term);
        if (!isNaN(val)) F += val * multiplier;
      }
    }
  };

  parseSide(lhs, 1);
  parseSide(rhs, -1);

  if (A === 0 && C === 0) {
    return {
      success: false,
      error: '未能识别出二次项（缺少 x² 或 y²），请检查输入是否包含 x² 与 y²。',
    };
  }

  if (A === 0 || C === 0) {
    return {
      success: false,
      error: '二次项系数 A 或 C 为 0。双曲线必须同时包含 x² 和 y² 项，否则退化为抛物线或直线！',
    };
  }

  if (A * C > 0) {
    return {
      success: false,
      error: `二次项系数 A = ${A} 与 C = ${C} 同号（A·C > 0）。此方程表示椭圆或圆，而非双曲线！双曲线要求 A 与 C 异号。`,
    };
  }

  return {
    success: true,
    coeffs: { A, C, D, E, F },
    isStandardForm: false,
  };
}

/**
 * Legacy wrapper for compatibility
 */
export function parseEquationText(inputStr: string): GeneralEquationCoefficients | null {
  const result = parseAnyEquation(inputStr);
  return result.success ? result.coeffs : null;
}

/**
 * Detailed step-by-step Completing the Square solver for Ax^2 + Cy^2 + Dx + Ey + F = 0
 * Cleanly formatted with NO "+ +" or "- -" or "+ -9" or "1x^2" or "/ 1" glitches!
 */
export function solveCompletingSquare(
  coeffs: GeneralEquationCoefficients,
  lang: Language = 'en'
): {
  success: boolean;
  message?: string;
  steps: CompletingSquareStep[];
  standardForm?: HyperbolaStandardState;
  properties?: HyperbolaProperties;
} {
  const { A, C, D, E, F } = coeffs;

  const messages = {
    zeroCoeff: {
      en: 'Coefficients A or C cannot be 0, otherwise it degenerates into a parabola or line!',
      es: '¡Los coeficientes A o C no pueden ser 0, de lo contrario degenera en parábola o recta!',
      fr: 'Les coefficients A ou C ne peuvent être nuls, sinon l\'équation dégénère en parabole ou droite !',
      pt: 'Os coeficientes A ou C não podem ser 0, caso contrário degenera em parábola ou reta!',
      zh: '二次项系数 A 或 C 不能为 0，否则退化为抛物线或直线！',
    },
    sameSign: {
      en: `Coefficients A (${A}) and C (${C}) have the same sign (A·C > 0). This represents an ellipse or circle, not a hyperbola! Hyperbolas require opposite signs (A·C < 0).`,
      es: `Los coeficientes A (${A}) y C (${C}) tienen el mismo signo. ¡Esto representa una elipse o circunferencia, no una hipérbola!`,
      fr: `Les coefficients A (${A}) et C (${C}) sont de même signe. Cela représente une ellipse, et non une hyperbole !`,
      pt: `Os coeficientes A (${A}) e C (${C}) têm o mesmo sinal. Isto representa uma elipse, não uma hipérbole!`,
      zh: `二次项系数 A (${A}) 与 C (${C}) 同号（A·C > 0），该方程表示椭圆或圆，而非双曲线！双曲线要求 A 与 C 异号。`,
    },
    degenerate: {
      en: 'RHS constant evaluates to 0. The equation degenerates into two intersecting linear asymptotes, not a hyperbola.',
      es: 'La constante del lado derecho es 0. La ecuación degenera en dos rectas secantes, no en una hipérbola.',
      fr: 'La constante de droite est nulle. L\'équation dégénère en deux droites sécantes.',
      pt: 'A constante do segundo membro é 0. A equação degenera em duas retas concorrentes.',
      zh: '等式右侧常数计算为 0，该方程退化为两条相交直线（渐近线），不构成标准双曲线。',
    },
  };

  if (A === 0 || C === 0) {
    return {
      success: false,
      message: messages.zeroCoeff[lang] || messages.zeroCoeff.en,
      steps: [],
    };
  }

  if (A * C > 0) {
    return {
      success: false,
      message: messages.sameSign[lang] || messages.sameSign.en,
      steps: [],
    };
  }

  const steps: CompletingSquareStep[] = [];

  // Step 1: Move constant term to RHS
  const step1Titles = {
    en: 'Step 1: Move constant to the RHS and group variables',
    es: 'Paso 1: Trasladar el término constante al lado derecho y agrupar x e y',
    fr: 'Étape 1 : Transposer la constante à droite et regrouper les variables',
    pt: 'Passo 1: Mover o termo constante para a direita e agrupar variáveis',
    zh: '第 1 步：移项分组，常数移到等号右边，左侧变量分别归类',
  };
  const step1Expl = {
    en: `Move constant F = ${F} to the RHS to become ${formatFraction(-F, 1)}. Group x terms and y terms separately on the LHS.`,
    es: `Se traslada la constante F = ${F} a la derecha como ${formatFraction(-F, 1)}. Se agrupan los términos en x y los términos en y.`,
    fr: `On transpose la constante F = ${F} à droite qui devient ${formatFraction(-F, 1)}. On regroupe les termes en x et en y.`,
    pt: `Move-se a constante F = ${F} para a direita como ${formatFraction(-F, 1)}. Agrupam-se os termos em x e em y.`,
    zh: `将常数项 F = ${F} 移到等号右边变为 ${formatFraction(-F, 1)}，左边分别排列 x 的一二次项与 y 的一二次项。`,
  };

  const xInitial = `${formatCoeffTerm(A, 'x²', true)}${formatCoeffTerm(D, 'x', false)}`;
  const yInitial = `${formatCoeffTerm(C, 'y²', false)}${formatCoeffTerm(E, 'y', false)}`;

  steps.push({
    title: step1Titles[lang] || step1Titles.en,
    math: `${xInitial} ${yInitial} = ${formatFraction(-F, 1)}`,
    explanation: step1Expl[lang] || step1Expl.en,
    highlight: `F → ${formatFraction(-F, 1)}`,
  });

  // Step 2: Factor out leading coefficients A and C
  const xLinearCoeff = D / A;
  const yLinearCoeff = E / C;

  const xBracketContent = `(x²${formatLinearInBracket(xLinearCoeff, 'x')})`;
  const yBracketContent = `(y²${formatLinearInBracket(yLinearCoeff, 'y')})`;

  const xGroup = formatFactorGroup(A, xBracketContent, true);
  const yGroup = formatFactorGroup(C, yBracketContent, false);

  const step2Titles = {
    en: 'Step 2: Factor out the leading coefficients of x² and y²',
    es: 'Paso 2: Factorizar los coeficientes principales de x² e y²',
    fr: 'Étape 2 : Mettre en facteur les coefficients dominants de x² et y²',
    pt: 'Passo 2: Fatorar os coeficientes líderes de x² e y²',
    zh: '第 2 步：提公因数，提出 x² 和 y² 项前面的系数',
  };
  const step2Expl = {
    en: `Extract leading coefficient A = ${A} from x-terms and C = ${C} from y-terms. Bracket linear terms become ${formatFraction(xLinearCoeff, 1)}x and ${formatFraction(yLinearCoeff, 1)}y.`,
    es: `Se extrae A = ${A} para x y C = ${C} para y. Los coeficientes lineales entre paréntesis son ${formatFraction(xLinearCoeff, 1)} y ${formatFraction(yLinearCoeff, 1)}.`,
    fr: `On factorise A = ${A} pour x et C = ${C} pour y. Les coefficients intérieurs deviennent ${formatFraction(xLinearCoeff, 1)} et ${formatFraction(yLinearCoeff, 1)}.`,
    pt: `Fatora-se A = ${A} em x e C = ${C} em y. Os coeficientes internos tornam-se ${formatFraction(xLinearCoeff, 1)} e ${formatFraction(yLinearCoeff, 1)}.`,
    zh: `提取 x² 项系数 A = ${A} 与 y² 项系数 C = ${C}。括号内一次项系数分别除以 A 和 C。`,
  };

  steps.push({
    title: step2Titles[lang] || step2Titles.en,
    math: `${xGroup} ${yGroup} = ${formatFraction(-F, 1)}`,
    explanation: step2Expl[lang] || step2Expl.en,
    highlight: `x: ${formatFraction(xLinearCoeff, 1)}, y: ${formatFraction(yLinearCoeff, 1)}`,
  });

  // Step 3: Complete square
  const xHalf = D / (2 * A);
  const yHalf = E / (2 * C);
  const xAddInside = xHalf * xHalf;
  const yAddInside = yHalf * yHalf;

  const xAddedTotal = A * xAddInside;
  const yAddedTotal = C * yAddInside;
  const rightSideTotal = -F + xAddedTotal + yAddedTotal;

  const step3Titles = {
    en: 'Step 3: Complete the squares inside brackets and balance RHS',
    es: 'Paso 3: Completar cuadrados en los paréntesis y equilibrar el lado derecho',
    fr: 'Étape 3 : Compléter les carrés dans les parenthèses et compenser à droite',
    pt: 'Passo 3: Completar quadrados nos parênteses e balancear à direita',
    zh: '第 3 步：关键配方！括号内加上一次项半系数的平方，等式右侧同步补偿',
  };
  const step3Expl = {
    en: `Apply (x ± d)² formula: Add (${formatFraction(Math.abs(xHalf), 1)})² = ${formatFraction(xAddInside, 1)} inside x-brackets (adds ${A} × ${formatFraction(xAddInside, 1)} = ${formatFraction(xAddedTotal, 1)} to RHS). Add (${formatFraction(Math.abs(yHalf), 1)})² = ${formatFraction(yAddInside, 1)} inside y-brackets (adds ${C} × ${formatFraction(yAddInside, 1)} = ${formatFraction(yAddedTotal, 1)} to RHS).`,
    es: `Regla (x ± d)²: Se añade (${formatFraction(Math.abs(xHalf), 1)})² en x (suma ${formatFraction(xAddedTotal, 1)} a la derecha) y (${formatFraction(Math.abs(yHalf), 1)})² en y (suma ${formatFraction(yAddedTotal, 1)} a la derecha).`,
    fr: `Formule (x ± d)² : On ajoute (${formatFraction(Math.abs(xHalf), 1)})² pour x et (${formatFraction(Math.abs(yHalf), 1)})² pour y, compensant le membre de droite.`,
    pt: `Regra (x ± d)²: Adiciona-se (${formatFraction(Math.abs(xHalf), 1)})² em x e (${formatFraction(Math.abs(yHalf), 1)})² em y, balanceando o segundo membro.`,
    zh: `依据完全平方公式 a² ± 2ab + b² = (a ± b)²：
• x 项括号内补上 (${formatFraction(Math.abs(xHalf), 1)})² = ${formatFraction(xAddInside, 1)}，等号右侧增加 A × (${formatFraction(xAddInside, 1)}) = ${formatFraction(xAddedTotal, 1)}；
• y 项括号内补上 (${formatFraction(Math.abs(yHalf), 1)})² = ${formatFraction(yAddInside, 1)}，等号右侧增加 C × (${formatFraction(yAddInside, 1)}) = ${formatFraction(yAddedTotal, 1)}。`,
  };
  const step3High = {
    en: 'CRUCIAL: Balance RHS with [Leading Coeff × Added Term], not just the inner term!',
    es: '¡CRUCIAL: Sumar a la derecha el [Coeficiente × Término interior], no solo el interior!',
    fr: 'ATTENTION : Multiplier le terme intérieur par le coefficient externe pour équilibrer la droite !',
    pt: 'ATENÇÃO: Multiplicar pelo coeficiente externo antes de somar ao segundo membro!',
    zh: '千万注意：右侧加的不是括号内单项，而是「括号外系数 × 括号内补项」！这是高考最常见失分点！',
  };

  const xCompleteInside = `[x²${formatLinearInBracket(xLinearCoeff, 'x')} + (${formatFraction(Math.abs(xHalf), 1)})²]`;
  const yCompleteInside = `[y²${formatLinearInBracket(yLinearCoeff, 'y')} + (${formatFraction(Math.abs(yHalf), 1)})²]`;

  const xGroup3 = formatFactorGroup(A, xCompleteInside, true);
  const yGroup3 = formatFactorGroup(C, yCompleteInside, false);

  const rhsAddX = xAddedTotal >= 0 ? `+ ${formatFraction(xAddedTotal, 1)}` : `- ${formatFraction(Math.abs(xAddedTotal), 1)}`;
  const rhsAddY = yAddedTotal >= 0 ? `+ ${formatFraction(yAddedTotal, 1)}` : `- ${formatFraction(Math.abs(yAddedTotal), 1)}`;

  steps.push({
    title: step3Titles[lang] || step3Titles.en,
    math: `${xGroup3} ${yGroup3} = ${formatFraction(-F, 1)} ${rhsAddX} ${rhsAddY}`,
    explanation: step3Expl[lang] || step3Expl.en,
    highlight: step3High[lang] || step3High.en,
  });

  // Step 4: Write as perfect squares
  const h = -xHalf;
  const k = -yHalf;

  const xBracket = formatBracketTerm('x', h);
  const yBracket = formatBracketTerm('y', k);

  const xGroup4 = formatFactorGroup(A, `${xBracket}²`, true);
  const yGroup4 = formatFactorGroup(C, `${yBracket}²`, false);

  const step4Titles = {
    en: 'Step 4: Factor into perfect square binomials and combine RHS constants',
    es: 'Paso 4: Formar binomios al cuadrado y consolidar la constante del lado derecho',
    fr: 'Étape 4 : Former les carrés parfaits et consolider la constante droite',
    pt: 'Passo 4: Formar os binômios ao quadrado e somar as constantes à direita',
    zh: '第 4 步：化为完全平方式并合并等式右边常数',
  };
  const step4Expl = {
    en: `Left side compresses into perfect squares. Right side evaluates to ${formatFraction(rightSideTotal, 1)}. Center (h, k) = (${formatFraction(h, 1)}, ${formatFraction(k, 1)}).`,
    es: `La izquierda se condensa en cuadrados perfectos. A la derecha queda ${formatFraction(rightSideTotal, 1)}. Centro (h, k) = (${formatFraction(h, 1)}, ${formatFraction(k, 1)}).`,
    fr: `La gauche devient des carrés parfaits. À droite : ${formatFraction(rightSideTotal, 1)}. Centre (h, k) = (${formatFraction(h, 1)}, ${formatFraction(k, 1)}).`,
    pt: `A esquerda vira quadrados perfeitos. À direita : ${formatFraction(rightSideTotal, 1)}. Centro (h, k) = (${formatFraction(h, 1)}, ${formatFraction(k, 1)}).`,
    zh: `左侧两个括号分别收束为完全平方，右侧常数累加为 ${formatFraction(rightSideTotal, 1)}。双曲线中心坐标为 (${formatFraction(h, 1)}, ${formatFraction(k, 1)})。`,
  };

  steps.push({
    title: step4Titles[lang] || step4Titles.en,
    math: `${xGroup4} ${yGroup4} = ${formatFraction(rightSideTotal, 1)}`,
    explanation: step4Expl[lang] || step4Expl.en,
    highlight: `Center / Centro / 中心: (${formatFraction(h, 1)}, ${formatFraction(k, 1)})`,
  });

  if (Math.abs(rightSideTotal) < 1e-7) {
    return {
      success: false,
      message: messages.degenerate[lang] || messages.degenerate.en,
      steps,
    };
  }

  // Step 5: Divide by rightSideTotal
  const xDenom = rightSideTotal / A;
  const yDenom = rightSideTotal / C;

  let axis: FocalAxis;
  let aSq: number;
  let bSq: number;
  let finalEquationStr = '';

  if (xDenom > 0 && yDenom < 0) {
    axis = 'x';
    aSq = xDenom;
    bSq = -yDenom;
    finalEquationStr = `${xBracket}² / ${formatFraction(aSq, 1)} - ${yBracket}² / ${formatFraction(bSq, 1)} = 1`;
  } else if (yDenom > 0 && xDenom < 0) {
    axis = 'y';
    aSq = yDenom;
    bSq = -xDenom;
    finalEquationStr = `${yBracket}² / ${formatFraction(aSq, 1)} - ${xBracket}² / ${formatFraction(bSq, 1)} = 1`;
  } else {
    return {
      success: false,
      message: 'Sign error after division.',
      steps,
    };
  }

  const a = Math.sqrt(aSq);
  const b = Math.sqrt(bSq);

  const step5Titles = {
    en: `Step 5: Divide both sides by ${formatFraction(rightSideTotal, 1)} to normalize to standard form`,
    es: `Paso 5: Dividir ambos miembros por ${formatFraction(rightSideTotal, 1)} para obtener la forma canónica`,
    fr: `Étape 5 : Diviser par ${formatFraction(rightSideTotal, 1)} pour obtenir la forme réduite standard`,
    pt: `Passo 5: Dividir ambos os lados por ${formatFraction(rightSideTotal, 1)} para obter a forma reduzida`,
    zh: `第 5 步：等式两边同除以 ${formatFraction(rightSideTotal, 1)}，化为标准形式`,
  };
  const step5Expl = {
    en: `Dividing by ${formatFraction(rightSideTotal, 1)} normalizes RHS to 1. The positive term determines the transverse axis! Currently ${axis === 'x' ? 'x' : 'y'} is positive, so the focal axis is horizontal.`,
    es: `Al dividir por ${formatFraction(rightSideTotal, 1)}, el lado derecho queda en 1. ¡El término positivo determina el eje focal! Actualmente el término en ${axis === 'x' ? 'x' : 'y'} es positivo.`,
    fr: `En divisant par ${formatFraction(rightSideTotal, 1)}, le membre de droite est normalisé à 1. Le terme positif indique l'axe focal (${axis === 'x' ? 'horizontal x' : 'vertical y'}).`,
    pt: `Dividindo por ${formatFraction(rightSideTotal, 1)}, o segundo membro normaliza para 1. O termo positivo determina o eixo focal (${axis === 'x' ? 'eixo x' : 'eixo y'}).`,
    zh: `两边同除以 ${formatFraction(rightSideTotal, 1)}，使得等号右侧归一为 1。正项所对应的变量决定焦点所在轴！当前正项为 ${axis === 'x' ? 'x' : 'y'} 项。`,
  };

  steps.push({
    title: step5Titles[lang] || step5Titles.en,
    math: finalEquationStr,
    explanation: step5Expl[lang] || step5Expl.en,
    highlight: `a² = ${formatFraction(aSq, 1)} (a = ${simplifyRadical(aSq)}), b² = ${formatFraction(bSq, 1)} (b = ${simplifyRadical(bSq)})`,
  });

  // Step 6: Solve for c, e, asymptotes
  const cSq = aSq + bSq;
  const c = Math.sqrt(cSq);
  const e = c / a;
  const slopeRatio = axis === 'x' ? b / a : a / b;

  const step6Titles = {
    en: 'Step 6: Compute geometric properties (Foci c, Eccentricity e, Asymptotes)',
    es: 'Paso 6: Calcular parámetros geométricos (Focos c, Excentricidad e, Asíntotas)',
    fr: 'Étape 6 : Calculer les grandeurs géométriques (Foyers c, Excentricité e, Asymptotes)',
    pt: 'Passo 6: Calcular os parâmetros geométricos (Focos c, Excentricidade e, Assíntotas)',
    zh: '第 6 步：计算核心特征几何量（c、离心率 e、渐近线）',
  };
  const step6Expl = {
    en: `In hyperbola, c is the longest distance: c² = a² + b² = ${formatFraction(aSq, 1)} + ${formatFraction(bSq, 1)} = ${formatFraction(cSq, 1)} (unlike ellipse where a² = b² + c²!). Asymptote equations: set RHS = 0 to get ${axis === 'x' ? `${yBracket} = ± ${formatFraction(b, a)}${xBracket}` : `${yBracket} = ± ${formatFraction(a, b)}${xBracket}`}.`,
    es: `En la hipérbola, c es la mayor distancia: c² = a² + b² (a diferencia de la elipse donde a² = b² + c²). Para las asíntotas, iguala a 0 el lado derecho.`,
    fr: `Pour l'hyperbole, c est le plus grand : c² = a² + b² (contrairement à l'ellipse où a² = b² + c²). Pour les asymptotes, remplacer le second membre par 0.`,
    pt: `Na hipérbole, c é a maior distância: c² = a² + b² (diferente da elipse onde a² = b² + c²). Para as assíntotas, iguale o segundo membro a 0.`,
    zh: `【双曲线 vs 椭圆 核心区别】：双曲线中 c 最长，满足关系式 c² = a² + b² （绝不是 a² = b² + c²！）。令标准方程右边为 0 即得渐近线。`,
  };

  const eExact = simplifyRadical(cSq) === `${Math.round(c)}` && simplifyRadical(aSq) === `${Math.round(a)}`
    ? formatFraction(c, a)
    : `${simplifyRadical(cSq)} / ${simplifyRadical(aSq)}`;

  steps.push({
    title: step6Titles[lang] || step6Titles.en,
    math: `c² = a² + b² = ${formatFraction(aSq, 1)} + ${formatFraction(bSq, 1)} = ${formatFraction(cSq, 1)} ⇒ c = ${simplifyRadical(cSq)}
e = c/a = ${eExact} (≈ ${e.toFixed(3)})
Asymptotes (RHS = 0): ${axis === 'x' ? `${yBracket} = ± ${formatFraction(b, a)}${xBracket}` : `${yBracket} = ± ${formatFraction(a, b)}${xBracket}`}`,
    explanation: step6Expl[lang] || step6Expl.en,
    highlight: `e = ${eExact} > 1, slope k = ± ${formatFraction(slopeRatio, 1)}`,
  });

  const standardForm: HyperbolaStandardState = {
    axis,
    h,
    k,
    a,
    b,
  };

  const properties = calculateHyperbolaProperties(standardForm);

  return {
    success: true,
    steps,
    standardForm,
    properties,
  };
}

/**
 * Generate formatted answer sheet text matching high school exam grading rubrics
 * Uses exact fractions and radicals without precision loss!
 */
export function generateExamPaperAnswer(
  coeffs: GeneralEquationCoefficients,
  lang: Language = 'en'
): string {
  const result = solveCompletingSquare(coeffs, lang);
  if (!result.success || !result.properties) {
    return result.message || 'Cannot generate solution';
  }
  const p = result.properties;
  const isX = p.axis === 'x';
  const hStr = formatBracketTerm('x', p.h);
  const kStr = formatBracketTerm('y', p.k);

  const aSq = p.a * p.a;
  const bSq = p.b * p.b;
  const cSq = aSq + bSq;

  const aSqStr = formatFraction(aSq, 1);
  const bSqStr = formatFraction(bSq, 1);
  const cSqStr = formatFraction(cSq, 1);
  const aExact = simplifyRadical(aSq);
  const bExact = simplifyRadical(bSq);
  const cExact = simplifyRadical(cSq);

  const eExact = (Number.isInteger(p.c) && Number.isInteger(p.a))
    ? formatFraction(p.c, p.a)
    : `${cExact}/${aExact}`;

  const xGroupStr = formatFactorGroup(coeffs.A, `(x²${formatLinearInBracket(coeffs.D / coeffs.A, 'x')})`, true);
  const yGroupStr = formatFactorGroup(coeffs.C, `(y²${formatLinearInBracket(coeffs.E / coeffs.C, 'y')})`, false);

  const rhsTotal = isX ? aSq * Math.abs(coeffs.A) : aSq * Math.abs(coeffs.C);
  const rhsStr = formatFraction(rhsTotal, 1);

  const formatCoordWithC = (base: number, cSqVal: number, sign: -1 | 1) => {
    const sqrtC = Math.sqrt(cSqVal);
    if (Math.abs(sqrtC - Math.round(sqrtC)) < 1e-6) {
      return formatFraction(base + sign * Math.round(sqrtC), 1);
    }
    const radStr = simplifyRadical(cSqVal);
    if (base === 0) {
      return sign === 1 ? radStr : `-${radStr}`;
    }
    const baseStr = formatFraction(base, 1);
    return sign === 1 ? `${baseStr} + ${radStr}` : `${baseStr} - ${radStr}`;
  };

  const focus1Str = isX
    ? `(${formatCoordWithC(p.h, cSq, -1)}, ${formatFraction(p.k, 1)})`
    : `(${formatFraction(p.h, 1)}, ${formatCoordWithC(p.k, cSq, -1)})`;
  const focus2Str = isX
    ? `(${formatCoordWithC(p.h, cSq, 1)}, ${formatFraction(p.k, 1)})`
    : `(${formatFraction(p.h, 1)}, ${formatCoordWithC(p.k, cSq, 1)})`;

  if (lang === 'zh') {
    return `【高考数学解析几何 · 规范答题卡书写示范】
题目：化简双曲线方程，求其中心、焦点坐标、离心率及渐近线方程。

解：
一、【配方法化简 (踩分点 4分)】
原方程为：${formatCoeffTerm(coeffs.A, 'x²', true)}${formatCoeffTerm(coeffs.C, 'y²', false)}${formatCoeffTerm(coeffs.D, 'x', false)}${formatCoeffTerm(coeffs.E, 'y', false)} ${coeffs.F >= 0 ? '+ ' + formatFraction(coeffs.F, 1) : '- ' + formatFraction(Math.abs(coeffs.F), 1)} = 0
移项分组得：${xGroupStr} ${yGroupStr} = ${formatFraction(-coeffs.F, 1)}
两边配方整理得：${formatFactorGroup(coeffs.A, `${hStr}²`, true)} ${formatFactorGroup(coeffs.C, `${kStr}²`, false)} = ${rhsStr}
两边同除常数项，化为双曲线标准方程：
${isX ? `${hStr}² / ${aSqStr} - ${kStr}² / ${bSqStr} = 1` : `${kStr}² / ${aSqStr} - ${hStr}² / ${bSqStr} = 1`}

二、【几何特征量求解 (踩分点 3分)】
由标准方程可知：
中心坐标为 (${formatFraction(p.h, 1)}, ${formatFraction(p.k, 1)})；
焦点所在轴：${isX ? '焦点在与 x 轴平行的直线 y = ' + formatFraction(p.k, 1) + ' 上' : '焦点在与 y 轴平行的直线 x = ' + formatFraction(p.h, 1) + ' 上'}；
实半轴 a = ${aExact}，虚半轴 b = ${bExact}；
半焦距 c = √(a² + b²) = √(${aSqStr} + ${bSqStr}) = ${cExact}。
焦点坐标为：F₁${focus1Str}，F₂${focus2Str}。

三、【离心率与渐近线结论 (踩分点 3分)】
1. 离心率 e = c / a = ${eExact} (≈ ${p.eccentricity.toFixed(3)})；
2. 令标准方程右侧常数 1 为 0，因式分解得渐近线方程：
   • 点斜式：${p.asymptoteEquations.join(' 与 ')}
   • 斜截式：${p.asymptoteSlopeInterceptEquations.join(' 与 ')}
   • 一般式：${p.asymptoteGeneralEquations.join(' 与 ')}
（全题解毕，规范满分）`;
  }

  if (lang === 'es') {
    return `【Modelo de Resolución Estándar para Exámenes · Secciones Cónicas】
Problema: Reducir la ecuación a su forma canónica y hallar centro, focos, excentricidad y asíntotas.

Solución:
I. [Completar el Cuadrado - 4 Puntos]
Ecuación inicial: ${formatCoeffTerm(coeffs.A, 'x²', true)}${formatCoeffTerm(coeffs.C, 'y²', false)}${formatCoeffTerm(coeffs.D, 'x', false)}${formatCoeffTerm(coeffs.E, 'y', false)} = ${formatFraction(-coeffs.F, 1)}
Agrupando y factorizando: ${xGroupStr} ${yGroupStr} = ${formatFraction(-coeffs.F, 1)}
Forma Canónica Estándar:
${isX ? `${hStr}² / ${aSqStr} - ${kStr}² / ${bSqStr} = 1` : `${kStr}² / ${aSqStr} - ${hStr}² / ${bSqStr} = 1`}

II. [Parámetros Geométricos - 3 Puntos]
Centro C(${formatFraction(p.h, 1)}, ${formatFraction(p.k, 1)});
Semieje real a = ${aExact}, Semieje imaginario b = ${bExact};
Semidistancia focal c = √(a² + b²) = ${cExact};
Focos: F₁${focus1Str}, F₂${focus2Str}.

III. [Excentricidad y Asíntotas - 3 Puntos]
1. Excentricidad e = c / a = ${eExact} (≈ ${p.eccentricity.toFixed(3)});
2. Ecuaciones de las Asíntotas:
   • Forma punto-pendiente: ${p.asymptoteEquations.join(' y ')}
   • Forma explícita: ${p.asymptoteSlopeInterceptEquations.join(' y ')}
   • Forma general: ${p.asymptoteGeneralEquations.join(' y ')}.`;
  }

  if (lang === 'fr') {
    return `【Modèle de Rédaction Conforme aux Examens · Coniques】
Problème : Mettre l'équation sous forme réduite et déterminer centre, foyers, excentricité et asymptotes.

Solution :
I. [Complétion du Carré - 4 Points]
Forme canonique réduite :
${isX ? `${hStr}² / ${aSqStr} - ${kStr}² / ${bSqStr} = 1` : `${kStr}² / ${aSqStr} - ${hStr}² / ${bSqStr} = 1`}

II. [Grandeurs Géométriques - 3 Points]
Centre C(${formatFraction(p.h, 1)}, ${formatFraction(p.k, 1)});
Demi-axe réel a = ${aExact}, Demi-axe imaginaire b = ${bExact};
Demi-distance focale c = √(a² + b²) = ${cExact};
Foyers : F₁${focus1Str}, F₂${focus2Str}.

III. [Excentricité & Asymptotes - 3 Points]
1. Excentricité e = c / a = ${eExact} (≈ ${p.eccentricity.toFixed(3)});
2. Équations des asymptotes :
   • Forme point-pente : ${p.asymptoteEquations.join(' et ')}
   • Forme réduite : ${p.asymptoteSlopeInterceptEquations.join(' et ')}
   • Forme générale : ${p.asymptoteGeneralEquations.join(' et ')}.`;
  }

  if (lang === 'pt') {
    return `【Resolução Padrão para Provas · Geometria Analítica】
Problema: Reduzir a equação à forma canônica e determinar centro, focos, excentricidade e assíntotas.

Solução:
I. [Completamento de Quadrados - 4 Pontos]
Forma Canônica Reduzida:
${isX ? `${hStr}² / ${aSqStr} - ${kStr}² / ${bSqStr} = 1` : `${kStr}² / ${aSqStr} - ${hStr}² / ${bSqStr} = 1`}

II. [Parâmetros Geométricos - 3 Pontos]
Centro C(${formatFraction(p.h, 1)}, ${formatFraction(p.k, 1)});
Semieixo real a = ${aExact}, Semieixo imaginário b = ${bExact};
Semidistância focal c = √(a² + b²) = ${cExact};
Focos: F₁${focus1Str}, F₂${focus2Str}.

III. [Excentricidade e Assíntotas - 3 Pontos]
1. Excentricidade e = c / a = ${eExact} (≈ ${p.eccentricity.toFixed(3)});
2. Equações das assíntotas:
   • Forma ponto-inclinação: ${p.asymptoteEquations.join(' e ')}
   • Forma reduzida: ${p.asymptoteSlopeInterceptEquations.join(' e ')}
   • Forma geral: ${p.asymptoteGeneralEquations.join(' e ')}.`;
  }

  // Default English
  return `【Standard Exam Solution Sheet · Conic Sections】
Problem: Reduce the hyperbola equation to standard form and determine center, foci, eccentricity, and asymptotes.

Solution:
I. [Completing the Square - 4 Points]
Initial Equation: ${formatCoeffTerm(coeffs.A, 'x²', true)}${formatCoeffTerm(coeffs.C, 'y²', false)}${formatCoeffTerm(coeffs.D, 'x', false)}${formatCoeffTerm(coeffs.E, 'y', false)} = ${formatFraction(-coeffs.F, 1)}
Grouping and Factoring: ${xGroupStr} ${yGroupStr} = ${formatFraction(-coeffs.F, 1)}
Standard Form Equation:
${isX ? `${hStr}² / ${aSqStr} - ${kStr}² / ${bSqStr} = 1` : `${kStr}² / ${aSqStr} - ${hStr}² / ${bSqStr} = 1`}

II. [Geometric Parameters - 3 Points]
Center C(${formatFraction(p.h, 1)}, ${formatFraction(p.k, 1)});
Transverse semi-axis a = ${aExact}, Conjugate semi-axis b = ${bExact};
Focal distance c = √(a² + b²) = ${cExact};
Foci: F₁${focus1Str}, F₂${focus2Str}.

III. [Eccentricity & Asymptotes - 3 Points]
1. Eccentricity e = c / a = ${eExact} (≈ ${p.eccentricity.toFixed(3)});
2. Asymptote Equations:
   • Point-Slope Form: ${p.asymptoteEquations.join(' and ')}
   • Slope-Intercept Form: ${p.asymptoteSlopeInterceptEquations.join(' and ')}
   • General Linear Form: ${p.asymptoteGeneralEquations.join(' and ')}.
(Full solution complete)`;
}

/**
 * Solve Hyperbola from Asymptote slope k (y = ± kx) and a Point P(x0, y0)
 * High-frequency exam problem: Undetermined coefficients method
 */
export interface AsymptoteAndPointSolution {
  success: boolean;
  message?: string;
  axis?: FocalAxis;
  lambda?: number;
  standardState?: HyperbolaStandardState;
  properties?: HyperbolaProperties;
  steps: {
    title: string;
    math: string;
    explanation: string;
  }[];
}

export function solveHyperbolaFromAsymptoteAndPoint(
  slopeK: number,
  x0: number,
  y0: number,
  centerH = 0,
  centerK = 0,
  lang: Language = 'en'
): AsymptoteAndPointSolution {
  if (Math.abs(slopeK) < 1e-5) {
    return {
      success: false,
      message: '渐近线斜率 k 不能为 0！',
      steps: [],
    };
  }

  const kAbs = Math.abs(slopeK);
  const kSq = kAbs * kAbs;
  const dx = x0 - centerH;
  const dy = y0 - centerK;

  // Hyperbola family sharing asymptotes y - k = ± k (x - h):
  // k² (x - h)² - (y - k)² = λ
  // Substitute P(x0, y0):
  const lambda = kSq * dx * dx - dy * dy;

  if (Math.abs(lambda) < 1e-7) {
    return {
      success: false,
      message: `点 P(${x0}, ${y0}) 恰好落在渐近线 y - ${centerK} = ± ${formatFraction(kAbs, 1)}(x - ${centerH}) 上！渐近线上的点无法构成实双曲线（λ = 0 退化为相交直线）。`,
      steps: [],
    };
  }

  const steps = [];

  // Step 1: Set up family equation
  steps.push({
    title: '步骤 1：设共渐近线的双曲线方程系（待定系数法）',
    math: `k²(x - h)² - (y - k)² = λ  ⇒  ${formatFraction(kSq, 1)}(x - ${centerH})² - (y - ${centerK})² = λ`,
    explanation: `由于所求双曲线与已知渐近线 y - ${centerK} = ± ${formatFraction(kAbs, 1)}(x - ${centerH}) 拥有相同渐近线，因此可直接设双曲线系为 k²(x - h)² - (y - k)² = λ （其中 λ ≠ 0 为待定常数）。该设法无需预先假设焦点在 x 轴还是 y 轴，由 λ 的符号自动决定！`,
  });

  // Step 2: Plug in point
  steps.push({
    title: '步骤 2：代入已知点 P(x₀, y₀) 求解待定参数 λ',
    math: `λ = ${formatFraction(kSq, 1)}·(${dx})² - (${dy})² = ${formatFraction(kSq * dx * dx, 1)} - ${formatFraction(dy * dy, 1)} = ${formatFraction(lambda, 1)}`,
    explanation: `将点 P(${x0}, ${y0}) 代入方程系，计算得出常数 λ = ${formatFraction(lambda, 1)}。`,
  });

  let axis: FocalAxis;
  let aSq: number;
  let bSq: number;

  if (lambda > 0) {
    axis = 'x';
    // k² (x-h)² - (y-k)² = lambda => (x-h)² / (lambda / k²) - (y-k)² / lambda = 1
    aSq = lambda / kSq;
    bSq = lambda;
    steps.push({
      title: '步骤 3：根据 λ > 0 判定焦点轴向并化为标准方程',
      math: `\\frac{(x - ${centerH})²}{${formatFraction(aSq, 1)}} - \\frac{(y - ${centerK})²}{${formatFraction(bSq, 1)}} = 1`,
      explanation: `因为 λ = ${formatFraction(lambda, 1)} > 0，所以 (x - h)² 项系数为正，双曲线的实轴平行于 x 轴（水平开口）！两边同除以 λ 即得标准方程。`,
    });
  } else {
    axis = 'y';
    // k² (x-h)² - (y-k)² = lambda => (y-k)² / (-lambda) - (x-h)² / (-lambda / k²) = 1
    const absLambda = -lambda;
    aSq = absLambda;
    bSq = absLambda / kSq;
    steps.push({
      title: '步骤 3：根据 λ < 0 判定焦点轴向并化为标准方程',
      math: `\\frac{(y - ${centerK})²}{${formatFraction(aSq, 1)}} - \\frac{(x - ${centerH})²}{${formatFraction(bSq, 1)}} = 1`,
      explanation: `因为 λ = ${formatFraction(lambda, 1)} < 0，等式两边反号后 (y - k)² 项系数为正，双曲线的实轴平行于 y 轴（垂直开口）！两边同除以 ${formatFraction(absLambda, 1)} 即得标准方程。`,
    });
  }

  const a = Math.sqrt(aSq);
  const b = Math.sqrt(bSq);
  const standardState: HyperbolaStandardState = {
    axis,
    h: centerH,
    k: centerK,
    a,
    b,
  };
  const properties = calculateHyperbolaProperties(standardState);

  steps.push({
    title: '步骤 4：求得双曲线几何参数',
    math: `a² = ${formatFraction(aSq, 1)} (a = ${simplifyRadical(aSq)}), \\quad b² = ${formatFraction(bSq, 1)} (b = ${simplifyRadical(bSq)}) \\\\ c = √(a² + b²) = ${simplifyRadical(aSq + bSq)}, \\quad e = c/a = ${properties.eccentricity.toFixed(3)}`,
    explanation: `实半轴 a = ${simplifyRadical(aSq)}，虚半轴 b = ${simplifyRadical(bSq)}，半焦距 c = ${simplifyRadical(aSq + bSq)}，离心率 e = ${properties.eccentricity.toFixed(3)}。`,
  });

  return {
    success: true,
    axis,
    lambda,
    standardState,
    properties,
    steps,
  };
}

/**
 * Solve Hyperbola from Foci Distance (2c) & Real Axis (2a)
 */
export function solveHyperbolaFromFociAndVertices(
  axis: FocalAxis,
  a: number,
  c: number,
  h = 0,
  k = 0
): {
  success: boolean;
  message?: string;
  standardState?: HyperbolaStandardState;
  properties?: HyperbolaProperties;
  steps: { title: string; math: string; explanation: string }[];
} {
  if (a <= 0 || c <= 0) {
    return {
      success: false,
      message: 'a 与 c 必须为大于 0 的正数！',
      steps: [],
    };
  }

  if (c <= a) {
    return {
      success: false,
      message: `在双曲线中，焦距 c 必须严格大于实半轴 a（c > a，离心率 e = c/a > 1）！当前 c = ${c} ≤ a = ${a}，不构成双曲线（若 a > c 则为椭圆）。`,
      steps: [],
    };
  }

  const bSq = c * c - a * a;
  const b = Math.sqrt(bSq);

  const standardState: HyperbolaStandardState = { axis, h, k, a, b };
  const properties = calculateHyperbolaProperties(standardState);

  const steps = [
    {
      title: '步骤 1：利用双曲线特征恒等式求解虚半轴 b',
      math: `b² = c² - a² = (${c})² - (${a})² = ${c * c} - ${a * a} = ${formatFraction(bSq, 1)} ⇒ b = ${simplifyRadical(bSq)}`,
      explanation: `【双曲线核心恒等式】：c² = a² + b² ⇒ b² = c² - a²。计算得 b² = ${formatFraction(bSq, 1)}。`,
    },
    {
      title: '步骤 2：代入标准方程',
      math: axis === 'x'
        ? `\\frac{${formatBracketTerm('x', h)}²}{${formatFraction(a * a, 1)}} - \\frac{${formatBracketTerm('y', k)}²}{${formatFraction(bSq, 1)}} = 1`
        : `\\frac{${formatBracketTerm('y', k)}²}{${formatFraction(a * a, 1)}} - \\frac{${formatBracketTerm('x', h)}²}{${formatFraction(bSq, 1)}} = 1`,
      explanation: `焦点在 ${axis === 'x' ? 'x 轴' : 'y 轴'} 上，实轴为 ${axis === 'x' ? 'x' : 'y'} 项。`,
    },
    {
      title: '步骤 3：求解离心率与渐近线',
      math: `e = c/a = ${c}/${a} = ${formatFraction(c, a)} (≈ ${(c / a).toFixed(3)}) \\\\ Asymptotes: ${properties.asymptoteEquations.join(' , ')}`,
      explanation: `离心率 e > 1，渐近线斜率 k = ± ${axis === 'x' ? formatFraction(b, a) : formatFraction(a, b)}。`,
    },
  ];

  return {
    success: true,
    standardState,
    properties,
    steps,
  };
}
