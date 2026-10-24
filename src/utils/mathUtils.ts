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
  if (denominator === 0) return '未定义';
  if (numerator === 0) return '0';

  let num = Math.round(numerator * 1000) / 1000;
  let den = Math.round(denominator * 1000) / 1000;

  let sign = (num < 0) !== (den < 0) ? '-' : '';
  num = Math.abs(num);
  den = Math.abs(den);

  // If numbers are clean integers
  if (Number.isInteger(num) && Number.isInteger(den)) {
    const common = gcd(num, den);
    num = num / common;
    den = den / common;
    if (den === 1) return `${sign}${num}`;
    return `${sign}${num}/${den}`;
  }

  // Floating point fallback
  const val = (numerator / denominator);
  return Number.isInteger(val) ? val.toString() : val.toFixed(3).replace(/\.?0+$/, '');
}

/**
 * Format radical: returns reduced form like "2√3" or integer
 */
export function simplifyRadical(val: number): string {
  if (val < 0) return '虚数';
  const rounded = Math.round(val * 10000) / 10000;
  const sqrtVal = Math.sqrt(rounded);
  if (Number.isInteger(sqrtVal)) {
    return sqrtVal.toString();
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

  return sqrtVal.toFixed(3).replace(/\.?0+$/, '');
}

/**
 * Helper to display terms with correct signs
 */
export function formatSignedTerm(val: number, variable: string, isFirst = false): string {
  if (Math.abs(val) < 1e-9) return '';
  const sign = val > 0 ? (isFirst ? '' : '+ ') : '- ';
  const absVal = Math.abs(val);
  const coeff = absVal === 1 && variable !== '' ? '' : `${absVal}`;
  return `${sign}${coeff}${variable}`;
}

/**
 * Format linear bracket: e.g. (x - 2) or (x + 3) or x
 */
export function formatBracketTerm(varName: string, shift: number): string {
  if (Math.abs(shift) < 1e-9) return varName;
  if (shift > 0) return `(${varName} - ${shift})`;
  return `(${varName} + ${Math.abs(shift)})`;
}

/**
 * Calculate full geometric properties from standard form
 */
export function calculateHyperbolaProperties(state: HyperbolaStandardState): HyperbolaProperties {
  const { axis, h, k, a, b } = state;
  const safeA = Math.max(0.001, a);
  const safeB = Math.max(0.001, b);
  const c = Math.sqrt(safeA * safeA + safeB * safeB);
  const eccentricity = c / safeA;

  let vertices: [{ x: number; y: number }, { x: number; y: number }];
  let foci: [{ x: number; y: number }, { x: number; y: number }];
  let asymptoteEquations: string[] = [];
  let asymptoteSlopes: [number, number];

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
    if (h === 0 && k === 0) {
      asymptoteEquations = [`y = ${slopeStr}x`, `y = -${slopeStr}x`];
    } else {
      asymptoteEquations = [
        `y - (${k}) = ${slopeStr}(x - (${h}))`,
        `y - (${k}) = -${slopeStr}(x - (${h}))`,
      ];
    }
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
    if (h === 0 && k === 0) {
      asymptoteEquations = [`y = ${slopeStr}x`, `y = -${slopeStr}x`];
    } else {
      asymptoteEquations = [
        `y - (${k}) = ${slopeStr}(x - (${h}))`,
        `y - (${k}) = -${slopeStr}(x - (${h}))`,
      ];
    }
  }

  // Angle between asymptotes: 2 * arctan(slope of asymptote relative to transverse axis)
  const angleRad = 2 * Math.atan(safeB / safeA);
  const asymptoteAngleDeg = (angleRad * 180) / Math.PI;

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
    focalLatusRectum: (2 * safeB * safeB) / safeA,
    asymptoteAngleDeg,
  };
}

/**
 * Detailed step-by-step Completing the Square solver for Ax^2 + Cy^2 + Dx + Ey + F = 0
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
      en: 'Coefficients A and C have the same sign (A·C > 0). This represents an ellipse or circle, not a hyperbola! Hyperbolas require opposite signs (A·C < 0).',
      es: 'Los coeficientes A y C tienen el mismo signo (A·C > 0). ¡Esto representa una elipse o circunferencia, no una hipérbola! La hipérbola requiere signos opuestos.',
      fr: 'Les coefficients A et C sont de même signe (A·C > 0). Cela représente une ellipse ou un cercle, et non une hyperbole ! L\'hyperbole exige des signes opposés.',
      pt: 'Os coeficientes A e C têm o mesmo sinal (A·C > 0). Isto representa uma elipse ou circunferência, não uma hipérbole! A hipérbole exige sinais opostos.',
      zh: '二次项系数 A 与 C 同号（A·C > 0），该方程表示椭圆或圆，而非双曲线！双曲线要求 A 与 C 异号。',
    },
    degenerate: {
      en: 'RHS constant evaluates to 0. The equation degenerates into two intersecting lines, not a hyperbola.',
      es: 'La constante del lado derecho es 0. La ecuación degenera en dos rectas secantes, no en una hipérbola.',
      fr: 'La constante de droite est nulle. L\'équation dégénère en deux droites sécantes.',
      pt: 'A constante do segundo membro é 0. A equação degenera em duas retas concorrentes.',
      zh: '等式右侧常数计算为 0，该方程退化为两条相交直线，不构成标准双曲线。',
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

  // Step 1: Move constant
  const step1Titles = {
    en: 'Step 1: Move the constant term to the RHS and group variables',
    es: 'Paso 1: Trasladar el término constante al lado derecho y agrupar x e y',
    fr: 'Étape 1 : Transposer la constante à droite et regrouper les variables',
    pt: 'Passo 1: Mover o termo constante para a direita e agrupar variáveis',
    zh: '第 1 步：移项，将常数项移到等式右侧，变量项按 x、y 分组',
  };
  const step1Expl = {
    en: `Move constant F = ${F} to the RHS to become ${-F}. Group x terms and y terms separately on the LHS.`,
    es: `Se traslada la constante F = ${F} a la derecha como ${-F}. Se agrupan los términos en x y los términos en y a la izquierda.`,
    fr: `On transpose la constante F = ${F} à droite qui devient ${-F}. On regroupe les termes en x et en y à gauche.`,
    pt: `Move-se a constante F = ${F} para o segundo membro tornando-se ${-F}. Agrupam-se os termos em x e em y à esquerda.`,
    zh: `将常数项 F = ${F} 移到等号右边变为 ${-F}，左边分别排列 x 的一二次项与 y 的一二次项。`,
  };

  steps.push({
    title: step1Titles[lang] || step1Titles.en,
    math: `${A}x² ${D !== 0 ? (D > 0 ? '+ ' + D : '- ' + Math.abs(D)) + 'x ' : ''}${C > 0 ? '+ ' + C : '- ' + Math.abs(C)}y² ${E !== 0 ? (E > 0 ? '+ ' + E : '- ' + Math.abs(E)) + 'y ' : ''}= ${-F}`,
    explanation: step1Expl[lang] || step1Expl.en,
    highlight: `F → ${-F}`,
  });

  // Step 2: Factor out leading coefficients A and C
  const xLinearCoeff = D / A;
  const yLinearCoeff = E / C;

  const xGroup = D !== 0
    ? `${A}(x² ${xLinearCoeff > 0 ? '+ ' + formatFraction(D, A) : '- ' + formatFraction(Math.abs(D), A)}x)`
    : `${A}x²`;

  const yGroup = E !== 0
    ? `${C > 0 ? '+ ' + C : '- ' + Math.abs(C)}(y² ${yLinearCoeff > 0 ? '+ ' + formatFraction(E, C) : '- ' + formatFraction(Math.abs(E), C)}y)`
    : `${C > 0 ? '+ ' + C : '- ' + Math.abs(C)}y²`;

  const step2Titles = {
    en: 'Step 2: Factor out the leading coefficients of x² and y²',
    es: 'Paso 2: Factorizar los coeficientes principales de x² e y²',
    fr: 'Étape 2 : Mettre en facteur les coefficients dominants de x² et y²',
    pt: 'Passo 2: Fatorar os coeficientes líderes de x² e y²',
    zh: '第 2 步：提公因数，提出 x² 和 y² 前面的系数',
  };
  const step2Expl = {
    en: `Extract leading coefficient A = ${A} from x-terms and C = ${C} from y-terms. Linear coefficients become ${formatFraction(D, A)} and ${formatFraction(E, C)}.`,
    es: `Se extrae A = ${A} para x y C = ${C} para y. Los coeficientes lineales dentro del paréntesis son ${formatFraction(D, A)} y ${formatFraction(E, C)}.`,
    fr: `On factorise A = ${A} pour x et C = ${C} pour y. Les coefficients linéaires intérieurs deviennent ${formatFraction(D, A)} et ${formatFraction(E, C)}.`,
    pt: `Fatora-se A = ${A} em x e C = ${C} em y. Os coeficientes lineares internos tornam-se ${formatFraction(D, A)} e ${formatFraction(E, C)}.`,
    zh: `提取 x² 项系数 A = ${A} 与 y² 项系数 C = ${C}。括号内一次项系数分别除以 A 和 C。`,
  };

  steps.push({
    title: step2Titles[lang] || step2Titles.en,
    math: `${xGroup} ${yGroup.startsWith('-') ? yGroup : '+ ' + yGroup} = ${-F}`,
    explanation: step2Expl[lang] || step2Expl.en,
    highlight: `x: ${formatFraction(D, A)}, y: ${formatFraction(E, C)}`,
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
    zh: '第 3 步：关键配方！在括号内加上一次项系数一半的平方，等式右侧同步补偿',
  };
  const step3Expl = {
    en: `Apply (x ± d)² formula: Add (${formatFraction(Math.abs(D), 2 * Math.abs(A))})² = ${formatFraction(xAddInside, 1)} inside x-brackets, adding ${A} × ${formatFraction(xAddInside, 1)} = ${formatFraction(xAddedTotal, 1)} to RHS. Add (${formatFraction(Math.abs(E), 2 * Math.abs(C))})² = ${formatFraction(yAddInside, 1)} inside y-brackets, adding ${C} × ${formatFraction(yAddInside, 1)} = ${formatFraction(yAddedTotal, 1)} to RHS.`,
    es: `Regla (x ± d)²: Se añade (${formatFraction(Math.abs(D), 2 * Math.abs(A))})² en x y se suma ${A}×(${formatFraction(xAddInside, 1)}) = ${formatFraction(xAddedTotal, 1)} a la derecha. En y se añade (${formatFraction(Math.abs(E), 2 * Math.abs(C))})² y se suma ${C}×(${formatFraction(yAddInside, 1)}) = ${formatFraction(yAddedTotal, 1)} a la derecha.`,
    fr: `Formule (x ± d)² : On ajoute (${formatFraction(Math.abs(D), 2 * Math.abs(A))})² pour x en ajoutant ${A}×(${formatFraction(xAddInside, 1)}) à droite. De même pour y en ajoutant ${C}×(${formatFraction(yAddInside, 1)}) à droite.`,
    pt: `Regra (x ± d)²: Adiciona-se (${formatFraction(Math.abs(D), 2 * Math.abs(A))})² em x somando ${A}×(${formatFraction(xAddInside, 1)}) à direita. Em y adiciona-se (${formatFraction(Math.abs(E), 2 * Math.abs(C))})² somando ${C}×(${formatFraction(yAddInside, 1)}) à direita.`,
    zh: `依据完全平方公式 a² ± 2ab + b² = (a ± b)²：
• x 项括号内补上 (${formatFraction(Math.abs(D), 2 * Math.abs(A))})² = ${formatFraction(xAddInside, 1)}，等号右侧增加 A × ${formatFraction(xAddInside, 1)} = ${formatFraction(xAddedTotal, 1)}；
• y 项括号内补上 (${formatFraction(Math.abs(E), 2 * Math.abs(C))})² = ${formatFraction(yAddInside, 1)}，等号右侧增加 C × ${formatFraction(yAddInside, 1)} = ${formatFraction(yAddedTotal, 1)}。`,
  };
  const step3High = {
    en: 'CRUCIAL: Balance RHS with [Leading Coeff × Added Term], not just the inner term!',
    es: '¡CRUCIAL: Sumar a la derecha el [Coeficiente × Término interior], no solo el interior!',
    fr: 'ATTENTION : Multiplier le terme intérieur par le coefficient externe pour équilibrer la droite !',
    pt: 'ATENÇÃO: Multiplicar pelo coeficiente externo antes de somar ao segundo membro!',
    zh: '千万注意：右侧加的不是括号内的数值，而是「括号外系数 × 括号内补项」！这是高考最常见失分点！',
  };

  steps.push({
    title: step3Titles[lang] || step3Titles.en,
    math: `${A}[x² ${xLinearCoeff >= 0 ? '+' : ''}${formatFraction(D, A)}x + (${formatFraction(Math.abs(D), 2 * Math.abs(A))})²] + ${C}[y² ${yLinearCoeff >= 0 ? '+' : ''}${formatFraction(E, C)}y + (${formatFraction(Math.abs(E), 2 * Math.abs(C))})²] = ${-F} + (${A})·(${formatFraction(xAddInside, 1)}) + (${C})·(${formatFraction(yAddInside, 1)})`,
    explanation: step3Expl[lang] || step3Expl.en,
    highlight: step3High[lang] || step3High.en,
  });

  // Step 4: Write as perfect squares
  const h = -xHalf;
  const k = -yHalf;

  const xBracket = formatBracketTerm('x', Math.round(h * 1000) / 1000);
  const yBracket = formatBracketTerm('y', Math.round(k * 1000) / 1000);

  const step4Titles = {
    en: 'Step 4: Factor into perfect square binomials and combine RHS constants',
    es: 'Paso 4: Formar binomios al cuadrado y consolidar la constante del lado derecho',
    fr: 'Étape 4 : Former les carrés parfaits et consolider la constante droite',
    pt: 'Passo 4: Formar os binômios ao quadrado e somar as constantes à direita',
    zh: '第 4 步：化为完全平方式并合并等式右边常数',
  };
  const step4Expl = {
    en: `Left side compresses into perfect squares. Right side evaluates to: -(${F}) + (${formatFraction(xAddedTotal, 1)}) + (${formatFraction(yAddedTotal, 1)}) = ${formatFraction(rightSideTotal, 1)}. Center (h, k) = (${h}, ${k}).`,
    es: `La izquierda se condensa en cuadrados perfectos. A la derecha: -(${F}) + (${formatFraction(xAddedTotal, 1)}) + (${formatFraction(yAddedTotal, 1)}) = ${formatFraction(rightSideTotal, 1)}. Centro (h, k) = (${h}, ${k}).`,
    fr: `La gauche devient des carrés parfaits. À droite : -(${F}) + (${formatFraction(xAddedTotal, 1)}) + (${formatFraction(yAddedTotal, 1)}) = ${formatFraction(rightSideTotal, 1)}. Centre (h, k) = (${h}, ${k}).`,
    pt: `A esquerda vira quadrados perfeitos. À direita: -(${F}) + (${formatFraction(xAddedTotal, 1)}) + (${formatFraction(yAddedTotal, 1)}) = ${formatFraction(rightSideTotal, 1)}. Centro (h, k) = (${h}, ${k}).`,
    zh: `左侧两个括号分别收束为完全平方，右侧常数累加：-(${F}) + (${formatFraction(xAddedTotal, 1)}) + (${formatFraction(yAddedTotal, 1)}) = ${formatFraction(rightSideTotal, 1)}。`,
  };

  steps.push({
    title: step4Titles[lang] || step4Titles.en,
    math: `${A}${xBracket}² ${C > 0 ? '+ ' + C : '- ' + Math.abs(C)}${yBracket}² = ${formatFraction(rightSideTotal, 1)}`,
    explanation: step4Expl[lang] || step4Expl.en,
    highlight: `Center / Centro / 中心: (${h}, ${k})`,
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
    finalEquationStr = `\\frac{${xBracket}²}{${formatFraction(aSq, 1)}} - \\frac{${yBracket}²}{${formatFraction(bSq, 1)}} = 1`;
  } else if (yDenom > 0 && xDenom < 0) {
    axis = 'y';
    aSq = yDenom;
    bSq = -xDenom;
    finalEquationStr = `\\frac{${yBracket}²}{${formatFraction(aSq, 1)}} - \\frac{${xBracket}²}{${formatFraction(bSq, 1)}} = 1`;
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
    en: `Dividing by ${formatFraction(rightSideTotal, 1)} normalizes RHS to 1. The positive term determines the transverse axis! Currently ${axis === 'x' ? 'x' : 'y'} is positive, so the focal axis is horizontal (parallel to x-axis).`,
    es: `Al dividir por ${formatFraction(rightSideTotal, 1)}, el lado derecho queda normalizado en 1. ¡El término positivo determina el eje focal! Actualmente el término en ${axis === 'x' ? 'x' : 'y'} es positivo.`,
    fr: `En divisant par ${formatFraction(rightSideTotal, 1)}, le membre de droite est normalisé à 1. Le terme positif indique l'axe focal (${axis === 'x' ? 'axe horizontal x' : 'axe vertical y'}).`,
    pt: `Dividindo por ${formatFraction(rightSideTotal, 1)}, o segundo membro normaliza para 1. O termo positivo determina o eixo focal (${axis === 'x' ? 'eixo x' : 'eixo y'}).`,
    zh: `两边同除以 ${formatFraction(rightSideTotal, 1)}，使得等号右侧归一为 1。正项所对应的变量决定焦点所在轴！当前正项为 ${axis === 'x' ? 'x' : 'y'} 项。`,
  };

  steps.push({
    title: step5Titles[lang] || step5Titles.en,
    math: finalEquationStr.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 / $2'),
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
    en: `In hyperbola, c is the longest distance: c² = a² + b² (unlike ellipse where a² = b² + c²!). Asymptote equations: set RHS = 0 to get ${axis === 'x' ? `${yBracket} = ± ${formatFraction(b, a)}${xBracket}` : `${xBracket} = ± ${formatFraction(b, a)}${yBracket}`}.`,
    es: `En la hipérbola, c es la mayor distancia: c² = a² + b² (a diferencia de la elipse donde a² = b² + c²). Para las asíntotas, iguala a 0 el lado derecho.`,
    fr: `Pour l'hyperbole, c est le plus grand : c² = a² + b² (contrairement à l'ellipse où a² = b² + c²). Pour les asymptotes, remplacer le second membre par 0.`,
    pt: `Na hipérbole, c é a maior distância: c² = a² + b² (diferente da elipse onde a² = b² + c²). Para as assíntotas, iguale o segundo membro a 0.`,
    zh: `【双曲线 vs 椭圆 核心区别】：双曲线中 c 最长，满足关系式 c² = a² + b² （绝不是 a² = b² + c²！）。令标准方程右边为 0 即得渐近线。`,
  };

  steps.push({
    title: step6Titles[lang] || step6Titles.en,
    math: `c² = a² + b² = ${formatFraction(aSq, 1)} + ${formatFraction(bSq, 1)} = ${formatFraction(cSq, 1)} ⇒ c = ${simplifyRadical(cSq)}
e = c/a = ${e.toFixed(4).replace(/\.?0+$/, '')}
Asymptotes: RHS = 0`,
    explanation: step6Expl[lang] || step6Expl.en,
    highlight: `e = ${e.toFixed(4).replace(/\.?0+$/, '')} > 1, slope k = ± ${formatFraction(slopeRatio, 1)}`,
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
 * Smart parser for natural equation strings like:
 * "4x^2 - 9y^2 - 16x - 18y - 29 = 0"
 * "9x² - 16y² + 54x + 64y = 127"
 */
export function parseEquationText(inputStr: string): GeneralEquationCoefficients | null {
  let str = inputStr.trim().replace(/²/g, '^2').replace(/\s+/g, '');
  if (!str) return null;

  let lhs = str;
  let rhs = '0';
  if (str.includes('=')) {
    const parts = str.split('=');
    lhs = parts[0];
    rhs = parts[1] || '0';
  }

  let A = 0;
  let C = 0;
  let D = 0;
  let E = 0;
  let F = 0;

  const parseSide = (sideStr: string, multiplier: number) => {
    const regex = /([+-]?[^+-]+)/g;
    const matches = sideStr.match(regex);
    if (!matches) return;

    for (let term of matches) {
      term = term.trim();
      if (!term) continue;

      if (term.includes('x^2')) {
        let coeffStr = term.replace('x^2', '').replace('*', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) A += val * multiplier;
      } else if (term.includes('y^2')) {
        let coeffStr = term.replace('y^2', '').replace('*', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) C += val * multiplier;
      } else if (term.includes('x')) {
        let coeffStr = term.replace('x', '').replace('*', '');
        if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        const val = parseFloat(coeffStr);
        if (!isNaN(val)) D += val * multiplier;
      } else if (term.includes('y')) {
        let coeffStr = term.replace('y', '').replace('*', '');
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

  if (A === 0 && C === 0) return null;
  return { A, C, D, E, F };
}

/**
 * Generate formatted answer sheet text matching high school exam grading rubrics
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
  const hStr = p.h === 0 ? 'x' : `(x ${p.h > 0 ? '- ' + p.h : '+ ' + Math.abs(p.h)})`;
  const kStr = p.k === 0 ? 'y' : `(y ${p.k > 0 ? '- ' + p.k : '+ ' + Math.abs(p.k)})`;

  if (lang === 'zh') {
    return `【高考数学解析几何 · 规范答题卡书写示范】
题目：化简双曲线方程，求其中心、焦点坐标、离心率及渐近线方程。

解：
一、【配方法化简 (踩分点 4分)】
原方程为：${coeffs.A}x² ${coeffs.C >= 0 ? '+ ' + coeffs.C : '- ' + Math.abs(coeffs.C)}y² ${coeffs.D >= 0 ? '+ ' + coeffs.D : '- ' + Math.abs(coeffs.D)}x ${coeffs.E >= 0 ? '+ ' + coeffs.E : '- ' + Math.abs(coeffs.E)}y ${coeffs.F >= 0 ? '+ ' + coeffs.F : '- ' + Math.abs(coeffs.F)} = 0
移项分组得：${coeffs.A}(x² ${coeffs.D/coeffs.A >= 0 ? '+ ' : '- '}${Math.abs(coeffs.D/coeffs.A)}x) ${coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.C)}(y² ${coeffs.E/coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.E/coeffs.C)}y) = ${-coeffs.F}
两边配方整理得：${coeffs.A}${hStr}² ${coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.C)}${kStr}² = ${(p.a*p.a*Math.abs(coeffs.A)).toFixed(1).replace(/\.0$/, '')}
两边同除常数项，化为双曲线标准方程：
${isX ? `${hStr}² / ${(p.a*p.a).toFixed(2)} - ${kStr}² / ${(p.b*p.b).toFixed(2)} = 1` : `${kStr}² / ${(p.a*p.a).toFixed(2)} - ${hStr}² / ${(p.b*p.b).toFixed(2)} = 1`}

二、【几何特征量求解 (踩分点 3分)】
由标准方程可知：
中心坐标为 (${p.h}, ${p.k})；
焦点所在轴：${isX ? '焦点在与 x 轴平行的直线 y = ' + p.k + ' 上' : '焦点在与 y 轴平行的直线 x = ' + p.h + ' 上'}；
实半轴 a = ${p.a.toFixed(2)}，虚半轴 b = ${p.b.toFixed(2)}；
半焦距 c = √(a² + b²) = √(${(p.a*p.a).toFixed(2)} + ${(p.b*p.b).toFixed(2)}) = ${p.c.toFixed(2)}。
焦点坐标为：F₁(${p.foci[0].x.toFixed(1)}, ${p.foci[0].y.toFixed(1)})，F₂(${p.foci[1].x.toFixed(1)}, ${p.foci[1].y.toFixed(1)})。

三、【离心率与渐近线结论 (踩分点 3分)】
1. 离心率 e = c / a = ${p.c.toFixed(2)} / ${p.a.toFixed(2)} = ${p.eccentricity.toFixed(4).replace(/\.?0+$/, '')}；
2. 令标准方程右侧常数 1 为 0，移项因式分解，解得渐近线方程为：
${p.asymptoteEquations.join(' 与 ')}。
（全题解毕，规范满分）`;
  }

  if (lang === 'es') {
    return `【Modelo de Resolución Estándar para Exámenes · Secciones Cónicas】
Problema: Reducir la ecuación a su forma canónica y hallar centro, focos, excentricidad y asíntotas.

Solución:
I. [Completar el Cuadrado - 4 Puntos]
Ecuación inicial: ${coeffs.A}x² ${coeffs.C >= 0 ? '+ ' + coeffs.C : '- ' + Math.abs(coeffs.C)}y² ${coeffs.D >= 0 ? '+ ' + coeffs.D : '- ' + Math.abs(coeffs.D)}x ${coeffs.E >= 0 ? '+ ' + coeffs.E : '- ' + Math.abs(coeffs.E)}y ${coeffs.F >= 0 ? '+ ' + coeffs.F : '- ' + Math.abs(coeffs.F)} = 0
Agrupando y factorizando: ${coeffs.A}(x² ${coeffs.D/coeffs.A >= 0 ? '+ ' : '- '}${Math.abs(coeffs.D/coeffs.A)}x) ${coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.C)}(y² ${coeffs.E/coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.E/coeffs.C)}y) = ${-coeffs.F}
Completando cuadrados: ${coeffs.A}${hStr}² ${coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.C)}${kStr}² = ${(p.a*p.a*Math.abs(coeffs.A)).toFixed(1).replace(/\.0$/, '')}
Forma Canónica Estándar:
${isX ? `${hStr}² / ${(p.a*p.a).toFixed(2)} - ${kStr}² / ${(p.b*p.b).toFixed(2)} = 1` : `${kStr}² / ${(p.a*p.a).toFixed(2)} - ${hStr}² / ${(p.b*p.b).toFixed(2)} = 1`}

II. [Parámetros Geométricos - 3 Puntos]
Centro C(${p.h}, ${p.k});
Semieje real a = ${p.a.toFixed(2)}, Semieje imaginario b = ${p.b.toFixed(2)};
Semidistancia focal c = √(a² + b²) = ${p.c.toFixed(2)};
Focos: F₁(${p.foci[0].x.toFixed(1)}, ${p.foci[0].y.toFixed(1)}), F₂(${p.foci[1].x.toFixed(1)}, ${p.foci[1].y.toFixed(1)}).

III. [Excentricidad y Asíntotas - 3 Puntos]
1. Excentricidad e = c / a = ${p.eccentricity.toFixed(4).replace(/\.?0+$/, '')};
2. Ecuaciones de las Asíntotas:
${p.asymptoteEquations.join(' y ')}.`;
  }

  if (lang === 'fr') {
    return `【Modèle de Rédaction Conforme aux Examens · Coniques】
Problème : Mettre l'équation sous forme réduite et déterminer centre, foyers, excentricité et asymptotes.

Solution :
I. [Complétion du Carré - 4 Points]
Équation initiale : ${coeffs.A}x² ${coeffs.C >= 0 ? '+ ' + coeffs.C : '- ' + Math.abs(coeffs.C)}y² ${coeffs.D >= 0 ? '+ ' + coeffs.D : '- ' + Math.abs(coeffs.D)}x ${coeffs.E >= 0 ? '+ ' + coeffs.E : '- ' + Math.abs(coeffs.E)}y ${coeffs.F >= 0 ? '+ ' + coeffs.F : '- ' + Math.abs(coeffs.F)} = 0
Forme réduite canonique :
${isX ? `${hStr}² / ${(p.a*p.a).toFixed(2)} - ${kStr}² / ${(p.b*p.b).toFixed(2)} = 1` : `${kStr}² / ${(p.a*p.a).toFixed(2)} - ${hStr}² / ${(p.b*p.b).toFixed(2)} = 1`}

II. [Grandeurs Géométriques - 3 Points]
Centre C(${p.h}, ${p.k});
Demi-axe réel a = ${p.a.toFixed(2)}, Demi-axe imaginaire b = ${p.b.toFixed(2)};
Demi-distance focale c = √(a² + b²) = ${p.c.toFixed(2)};
Foyers : F₁(${p.foci[0].x.toFixed(1)}, ${p.foci[0].y.toFixed(1)}), F₂(${p.foci[1].x.toFixed(1)}, ${p.foci[1].y.toFixed(1)}).

III. [Excentricité & Asymptotes - 3 Points]
1. Excentricité e = c / a = ${p.eccentricity.toFixed(4).replace(/\.?0+$/, '')};
2. Équations des asymptotes :
${p.asymptoteEquations.join(' et ')}.`;
  }

  if (lang === 'pt') {
    return `【Resolução Padrão para Provas · Geometria Analítica】
Problema: Reduzir a equação à forma canônica e determinar centro, focos, excentricidade e assíntotas.

Solução:
I. [Completamento de Quadrados - 4 Pontos]
Equação inicial: ${coeffs.A}x² ${coeffs.C >= 0 ? '+ ' + coeffs.C : '- ' + Math.abs(coeffs.C)}y² ${coeffs.D >= 0 ? '+ ' + coeffs.D : '- ' + Math.abs(coeffs.D)}x ${coeffs.E >= 0 ? '+ ' + coeffs.E : '- ' + Math.abs(coeffs.E)}y ${coeffs.F >= 0 ? '+ ' + coeffs.F : '- ' + Math.abs(coeffs.F)} = 0
Forma Canônica Reduzida:
${isX ? `${hStr}² / ${(p.a*p.a).toFixed(2)} - ${kStr}² / ${(p.b*p.b).toFixed(2)} = 1` : `${kStr}² / ${(p.a*p.a).toFixed(2)} - ${hStr}² / ${(p.b*p.b).toFixed(2)} = 1`}

II. [Parâmetros Geométricos - 3 Pontos]
Centro C(${p.h}, ${p.k});
Semieixo real a = ${p.a.toFixed(2)}, Semieixo imaginário b = ${p.b.toFixed(2)};
Semidistância focal c = √(a² + b²) = ${p.c.toFixed(2)};
Focos: F₁(${p.foci[0].x.toFixed(1)}, ${p.foci[0].y.toFixed(1)}), F₂(${p.foci[1].x.toFixed(1)}, ${p.foci[1].y.toFixed(1)}).

III. [Excentricidade e Assíntotas - 3 Pontos]
1. Excentricidade e = c / a = ${p.eccentricity.toFixed(4).replace(/\.?0+$/, '')};
2. Equações das assíntotas:
${p.asymptoteEquations.join(' e ')}.`;
  }

  // Default English
  return `【Standard Exam Solution Sheet · Conic Sections】
Problem: Reduce the hyperbola equation to standard form and determine center, foci, eccentricity, and asymptotes.

Solution:
I. [Completing the Square - 4 Points]
Initial Equation: ${coeffs.A}x² ${coeffs.C >= 0 ? '+ ' + coeffs.C : '- ' + Math.abs(coeffs.C)}y² ${coeffs.D >= 0 ? '+ ' + coeffs.D : '- ' + Math.abs(coeffs.D)}x ${coeffs.E >= 0 ? '+ ' + coeffs.E : '- ' + Math.abs(coeffs.E)}y ${coeffs.F >= 0 ? '+ ' + coeffs.F : '- ' + Math.abs(coeffs.F)} = 0
Grouping and Factoring: ${coeffs.A}(x² ${coeffs.D/coeffs.A >= 0 ? '+ ' : '- '}${Math.abs(coeffs.D/coeffs.A)}x) ${coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.C)}(y² ${coeffs.E/coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.E/coeffs.C)}y) = ${-coeffs.F}
Perfect square form: ${coeffs.A}${hStr}² ${coeffs.C >= 0 ? '+ ' : '- '}${Math.abs(coeffs.C)}${kStr}² = ${(p.a*p.a*Math.abs(coeffs.A)).toFixed(1).replace(/\.0$/, '')}
Standard Form Equation:
${isX ? `${hStr}² / ${(p.a*p.a).toFixed(2)} - ${kStr}² / ${(p.b*p.b).toFixed(2)} = 1` : `${kStr}² / ${(p.a*p.a).toFixed(2)} - ${hStr}² / ${(p.b*p.b).toFixed(2)} = 1`}

II. [Geometric Parameters - 3 Points]
Center C(${p.h}, ${p.k});
Transverse semi-axis a = ${p.a.toFixed(2)}, Conjugate semi-axis b = ${p.b.toFixed(2)};
Focal distance c = √(a² + b²) = ${p.c.toFixed(2)};
Foci: F₁(${p.foci[0].x.toFixed(1)}, ${p.foci[0].y.toFixed(1)}), F₂(${p.foci[1].x.toFixed(1)}, ${p.foci[1].y.toFixed(1)}).

III. [Eccentricity & Asymptotes - 3 Points]
1. Eccentricity e = c / a = ${p.eccentricity.toFixed(4).replace(/\.?0+$/, '')};
2. Asymptote Equations:
${p.asymptoteEquations.join(' and ')}.
(Full solution complete)`;
}

