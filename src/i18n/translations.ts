export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brand: string;
    standard: string;
    completingSquare: string;
    eccentricity: string;
    comparison: string;
    quiz: string;
    reset: string;
    shareGuide: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaCompletingSquare: string;
    card1Title: string;
    card1Sub: string;
    card2Title: string;
    card2Sub: string;
    card3Title: string;
    card3Sub: string;
    card4Title: string;
    card4Sub: string;
  };
  canvas: {
    title: string;
    paramsSubtitle: string;
    showAsymptotes: string;
    showBox: string;
    showFoci: string;
    showEllipse: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    mainCurve: string;
    asymptotes: string;
    foci: string;
    comparisonEllipse: string;
    tip: string;
    pointP: string;
  };
  calculator: {
    title: string;
    horizontalAxis: string;
    verticalAxis: string;
    modeSlider: string;
    modeLinear: string;
    modeSquared: string;
    equilateralBadge: string;
    semiMajorA: string;
    denomA2: string;
    semiMinorB: string;
    denomB2: string;
    centerOffset: string;
    realAxisLength: string;
    imaginaryAxisLength: string;
    presetsLabel: string;
    presetPythagorean: string;
    presetEquilateral: string;
    presetAngle60: string;
    currentEquation: string;
    asymptoteTitle: string;
    asymptoteTrickTitle: string;
    asymptoteTrickDesc: string;
    asymptoteNotice: string;
    focalDistanceC: string;
    eccentricityE: string;
    angleTheta: string;
    verticesLabel: string;
    fociLabel: string;
    latusRectum: string;
    copySummaryBtn: string;
    copiedSuccess: string;
  };
  completingSquare: {
    title: string;
    subtitle: string;
    pasteLabel: string;
    pastePlaceholder: string;
    solveBtn: string;
    manualLabel: string;
    currentEq: string;
    isHyperbola: string;
    notHyperbola: string;
    copyExamFormat: string;
    copiedExam: string;
    togglePreview: string;
    hidePreview: string;
    printCard: string;
    stepByStepTitle: string;
    applyToCanvas: string;
    stepWord: string;
    coreTip: string;
    summaryTitle: string;
    focalAxisDirection: string;
    centerCoords: string;
    semiAxes: string;
    fociAndEccentricity: string;
    asymptoteEquations: string;
    asymptoteAngle: string;
  };
  eccentricityTool: {
    coreRelationTitle: string;
    coreRelationDesc: string;
    caseXTitle: string;
    caseYTitle: string;
    tool1Title: string;
    tool1Warning: string;
    slopeInputLabel: string;
    typicalSlopes: string;
    caseASolution: string;
    caseBSolution: string;
    tool2Title: string;
    eccentricityInputLabel: string;
    typicalE: string;
    ratioLabel: string;
    asymptoteIfX: string;
    asymptoteIfY: string;
    angleBetween: string;
    geometricInsight: string;
  };
  comparison: {
    title: string;
    desc: string;
    sloganTitle: string;
    sloganText: string;
    tableTitle: string;
    tableSubtitle: string;
    colDimension: string;
    colEllipse: string;
    colHyperbola: string;
    rowStandardEq: string;
    rowIdentity: string;
    rowIdentityWarn: string;
    rowAxisRule: string;
    rowEccentricity: string;
    rowAsymptote: string;
    rowFocalTriangle: string;
    rowDefinition: string;
    trap1Title: string;
    trap1Wrong: string;
    trap1Correct: string;
    trap2Title: string;
    trap2Wrong: string;
    trap2Correct: string;
    trap3Title: string;
    trap3Wrong: string;
    trap3Correct: string;
  };
  problems: {
    title: string;
    tabWalkthrough: string;
    tabQuiz: string;
    trapAlert: string;
    stepSolution: string;
    quizIntro: string;
    resetQuiz: string;
    questionWord: string;
    correctFeedback: string;
    wrongFeedback: string;
    trapAnalysis: string;
  };
  modal: {
    title: string;
    subtitle: string;
    diagTitle: string;
    diag1: string;
    diag2: string;
    diag3: string;
    strategyTitle: string;
    strat1Title: string;
    strat1Desc: string;
    strat2Title: string;
    strat2Desc: string;
    strat3Title: string;
    strat3Desc: string;
    promoLabel: string;
    copyPromoBtn: string;
    copiedPromo: string;
    copyLinkBtn: string;
    copiedLink: string;
    closeBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    meta: {
      title: 'Hyperbola Asymptotes & Eccentricity Calculator | Step-by-Step Completing the Square',
      description: 'Master conic sections: Instant hyperbola asymptotes, eccentricity, 6-step completing the square solver, hyperbola vs ellipse comparison matrix, and dynamic interactive graph.',
      keywords: 'hyperbola calculator, hyperbola asymptotes calculator, hyperbola eccentricity, completing the square hyperbola, conic sections, hyperbola vs ellipse, analytic geometry',
    },
    nav: {
      brand: 'Hyperbola & Conic Sections Lab',
      standard: 'Standard Calculator',
      completingSquare: 'Completing the Square',
      eccentricity: 'Eccentricity & Asymptotes',
      comparison: 'Hyperbola vs Ellipse',
      quiz: 'Problems & Quiz',
      reset: 'Reset',
      shareGuide: 'Growth & Share Guide',
    },
    hero: {
      badge: 'High School & College Analytic Geometry · Conic Sections Mastery',
      title: 'Hyperbola Asymptotes & Eccentricity Visual Solver',
      subtitle: 'Conquer conic sections with ease: natural equation paste recognition, step-by-step completing the square breakdown, dual-solution trap prevention, and hyperbola vs ellipse anti-confusion matrix.',
      ctaCompletingSquare: 'Solve by Completing the Square',
      card1Title: '① Asymptotes Calculator',
      card1Sub: 'Instant y=±(b/a)x & Box method',
      card2Title: '② Completing the Square',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Step-by-Step',
      card3Title: '③ Eccentricity Dual-Solver',
      card3Sub: 'Find e from slope & prevent traps',
      card4Title: '④ Hyperbola vs Ellipse',
      card4Sub: 'c²=a²+b² vs a²=b²+c² Comparison',
    },
    canvas: {
      title: 'Interactive Cartesian Coordinate Canvas',
      paramsSubtitle: 'Semi-axis a={a} · Semi-axis b={b} · Focal length c={c}',
      showAsymptotes: 'Asymptotes',
      showBox: 'Central Box (2a×2b)',
      showFoci: 'Foci F₁ F₂',
      showEllipse: 'Compare Ellipse',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetView: 'Reset View',
      mainCurve: 'Hyperbola Branches',
      asymptotes: 'Asymptotes y = ±(b/a)x',
      foci: 'Foci',
      comparisonEllipse: 'Comparison Ellipse',
      tip: 'Drag canvas to pan · Scroll to zoom · Hover to verify ||PF₁| - |PF₂|| = 2a',
      pointP: 'Point P on hyperbola',
    },
    calculator: {
      title: 'Hyperbola Asymptotes & Geometric Parameters Calculator',
      horizontalAxis: 'Horizontal Transverse Axis (x²/a² - y²/b² = 1)',
      verticalAxis: 'Vertical Transverse Axis (y²/a² - x²/b² = 1)',
      modeSlider: 'Adjustment Mode',
      modeLinear: 'Enter a, b (Semi-axes)',
      modeSquared: 'Enter a², b² (Denominators)',
      equilateralBadge: '★ Equilateral / Rectangular Hyperbola (a = b, e = √2, 90°)',
      semiMajorA: 'Transverse Semi-axis a (Real):',
      denomA2: 'Denominator a²:',
      semiMinorB: 'Conjugate Semi-axis b (Imaginary):',
      denomB2: 'Denominator b²:',
      centerOffset: 'Center Position Offset (h, k):',
      realAxisLength: 'Transverse axis length 2a =',
      imaginaryAxisLength: 'Conjugate axis length 2b =',
      presetsLabel: 'Classic Exam Ratios:',
      presetPythagorean: 'Pythagorean 3:4 (c=5, e=5/3)',
      presetEquilateral: 'Equilateral a=b=2 (e=√2)',
      presetAngle60: 'Special Angle 1:√3 (e=2)',
      currentEquation: 'Current Standard Equation Form',
      asymptoteTitle: 'Asymptote Equations & Derivation',
      asymptoteTrickTitle: '💡 The "Change 1 to 0" Speed Trick:',
      asymptoteTrickDesc: 'Replace 1 on the RHS of standard form with 0, then factor immediately:',
      asymptoteNotice: '* Remember: Transverse on x-axis has slope ±b/a; Transverse on y-axis has slope ±a/b!',
      focalDistanceC: 'Semi-focal Distance c',
      eccentricityE: 'Eccentricity e (e > 1)',
      angleTheta: 'Asymptote Angle θ',
      verticesLabel: 'Vertices Coordinates',
      fociLabel: 'Foci Coordinates',
      latusRectum: 'Latus Rectum (2b²/a)',
      copySummaryBtn: 'Copy All Parameters Summary',
      copiedSuccess: 'Copied All Parameters!',
    },
    completingSquare: {
      title: 'General Equation Completing the Square Solver',
      subtitle: 'Conic section master solver: reveals every step of grouping, factoring, completing squares, balancing RHS, and reducing to standard form.',
      pasteLabel: 'Paste or Type Full Equation directly:',
      pastePlaceholder: 'e.g. 4x² - 9y² - 16x - 18y - 29 = 0 or 9x² - 16y² + 54x + 64y = 127',
      solveBtn: 'Solve Step-by-Step',
      manualLabel: 'Manual Coefficient Adjustments:',
      currentEq: 'Current Equation:',
      isHyperbola: '✓ A·C < 0 (Hyperbola)',
      notHyperbola: '⚠️ A·C ≥ 0 (Not a hyperbola - ellipse or degenerate)',
      copyExamFormat: 'Copy Standard Exam Solution (With Grading Points)',
      copiedExam: 'Copied Exam Answer!',
      togglePreview: 'Preview Exam Paper Sheet',
      hidePreview: 'Hide Exam Paper Sheet',
      printCard: 'Print Solution Sheet',
      stepByStepTitle: 'Step-by-Step Algebraic Derivation Breakdown',
      applyToCanvas: 'Sync to Interactive Canvas',
      stepWord: 'Step',
      coreTip: 'Exam Key Trap Point:',
      summaryTitle: 'Completing the Square Complete! Extracted Geometric Properties:',
      focalAxisDirection: 'Focal Axis Orientation',
      centerCoords: 'Center Coordinates (h, k)',
      semiAxes: 'Semi-axes a and b',
      fociAndEccentricity: 'Focal Distance c & Eccentricity e',
      asymptoteEquations: 'Asymptote Equations:',
      asymptoteAngle: 'Asymptote Angle:',
    },
    eccentricityTool: {
      coreRelationTitle: 'Bridge Relationship: Eccentricity e and Asymptote Slope k',
      coreRelationDesc: 'In conic sections, eccentricity and asymptotes are inseparable twin properties. Remember the fundamental identity: e² = c²/a² = (a² + b²)/a² = 1 + (b/a)². The slope of the asymptotes directly determines how wide the hyperbola opens and its eccentricity!',
      caseXTitle: '① Transverse Axis on x-axis (x²/a² - y²/b² = 1)',
      caseYTitle: '② Transverse Axis on y-axis (y²/a² - x²/b² = 1)',
      tool1Title: 'Tool 1: Given Asymptote Slope k ⇒ Calculate Eccentricity e (Avoid Missing Solutions)',
      tool1Warning: '⚠️ Common Exam Trap: If the transverse axis is not specified, there are ALWAYS TWO SOLUTIONS!',
      slopeInputLabel: 'Set absolute slope k for asymptote y = ±kx:',
      typicalSlopes: 'Common Exam Slopes:',
      caseASolution: 'Case A: Transverse on x-axis (b/a = k)',
      caseBSolution: 'Case B: Transverse on y-axis (a/b = k ⇒ b/a = 1/k)',
      tool2Title: 'Tool 2: Given Eccentricity e ⇒ Find Asymptote Equations & Opening Angle θ',
      eccentricityInputLabel: 'Enter Eccentricity e (must be > 1):',
      typicalE: 'Common Exam Values for e:',
      ratioLabel: 'Derived ratio b/a = √(e² - 1):',
      asymptoteIfX: 'If Transverse on x-axis, Asymptotes:',
      asymptoteIfY: 'If Transverse on y-axis, Asymptotes:',
      angleBetween: 'Angle Between Asymptotes θ:',
      geometricInsight: '💡 Geometric Insight: As eccentricity e increases, ratio b/a increases, the angle between asymptotes widens, and the hyperbola opens more broadly. When e = √2, θ = 90°, yielding an equilateral (rectangular) hyperbola.',
    },
    comparison: {
      title: 'Hyperbola vs Ellipse: Anti-Confusion Core Comparison Matrix',
      desc: 'Over 70% of student mistakes in conic sections stem from confusing the ellipse identity a² = b² + c² with hyperbola identity c² = a² + b². Master these 7 essential differences to guarantee full marks!',
      sloganTitle: 'Core Mnemonic Slogan:',
      sloganText: '"In Ellipse, a rules (a²=b²+c²); in Hyperbola, c reigns (c²=a²+b²); for Ellipse look at magnitude, for Hyperbola look at signs; for Asymptotes change 1 to 0!"',
      tableTitle: 'Conic Sections Comprehensive Side-by-Side Comparison Matrix',
      tableSubtitle: 'Side-by-Side Comparison · Key Traps Highlighted',
      colDimension: 'Dimension',
      colEllipse: 'Ellipse (Closed)',
      colHyperbola: 'Hyperbola (Open)',
      rowStandardEq: 'Standard Equation (Horizontal)',
      rowIdentity: 'Core Identity (a, b, c)',
      rowIdentityWarn: '🔥 Top Confusion Point',
      rowAxisRule: 'Focal Axis Determination Rule',
      rowEccentricity: 'Eccentricity Range & Meaning',
      rowAsymptote: 'Asymptotes',
      rowFocalTriangle: 'Focal Triangle Area △PF₁F₂',
      rowDefinition: 'First Definition (Focal Distances)',
      trap1Title: 'Trap 1: Determining Foci by Comparing Denominators',
      trap1Wrong: 'Mistake: Thinking x²/9 - y²/16 = 1 has foci on y-axis because 16 > 9.',
      trap1Correct: '✓ Correction: In hyperbola, x² is positive, so foci are on x-axis! a=3, b=4. Magnitudes do not determine the axis!',
      trap2Title: 'Trap 2: Inverting the Pythagorean Formula',
      trap2Wrong: 'Mistake: Applying a² = b² + c² to hyperbola, obtaining negative or imaginary c².',
      trap2Correct: '✓ Correction: In hyperbola, the foci are outermost, so c is the largest value: always c² = a² + b²!',
      trap3Title: 'Trap 3: Inverting Asymptote Slopes (b/a vs a/b)',
      trap3Wrong: 'Mistake: Blindly writing y = ±(b/a)x for every hyperbola.',
      trap3Correct: '✓ Correction: Always use the "Change 1 to 0" rule: y²/a² - x²/b² = 0 ⇒ y = ±(a/b)x for vertical hyperbolas!',
    },
    problems: {
      title: 'Classic Exam Walkthroughs & Interactive Diagnostic Quiz',
      tabWalkthrough: 'Exam Problems Walkthrough (3 Deep Dives)',
      tabQuiz: 'Anti-Confusion Diagnostic Quiz (4 Questions)',
      trapAlert: 'Exam Trap Breakdown:',
      stepSolution: 'Step-by-Step Solution:',
      quizIntro: 'Click any option to get instant validation and diagnosis of common conceptual misconceptions.',
      resetQuiz: 'Reset Quiz',
      questionWord: 'Question',
      correctFeedback: 'Correct! Rigorous logical reasoning.',
      wrongFeedback: 'Incorrect. Caught in the classic examiner trap!',
      trapAnalysis: 'Trap & Misconception Analysis:',
    },
    modal: {
      title: 'Why is no one clicking or using this tool yet?',
      subtitle: 'Understanding web traffic reality and the 3-step student acquisition roadmap',
      diagTitle: 'Objective Diagnostic (Why zero visits initially?):',
      diag1: '1. Search Engines Haven’t Indexed It Yet: Brand new domains require time for Google, Bing, and search engines to crawl. Natural search queries cannot find it on day 1.',
      diag2: '2. Lack of Initial Community Seed: High school and college students search for conic section solutions in homework communities, Reddit (r/learnmath), Discord study servers, or TikTok/Instagram study tags.',
      diag3: '3. Missing Viral Triggers: Tools without 1-click exam copying or printable study cheatsheets were hard to share.',
      strategyTitle: 'How to get 1,000+ active students & teachers quickly:',
      strat1Title: '① Social Media & Study Communities',
      strat1Desc: 'Post a screenshot of the "Hyperbola vs Ellipse Cheatsheet" with the title: "Stop confusing a²=b²+c² with c²=a²+b²! Free clean tool".',
      strat2Title: '② Class & Study Group Chats',
      strat2Desc: 'Share in student Discord / WhatsApp / Telegram study groups: "Paste your homework equation to get step-by-step completing the square answers".',
      strat3Title: '③ Reddit & Q&A Forums',
      strat3Desc: 'Answer questions on r/learnmath or Quora about hyperbola asymptotes, providing the 1-to-0 trick and tool link.',
      promoLabel: 'Ready-to-use share text (Click to copy):',
      copyPromoBtn: 'Copy Recommendation Text',
      copiedPromo: 'Copied Promo Text!',
      copyLinkBtn: 'Copy URL',
      copiedLink: 'URL Copied!',
      closeBtn: 'Close Window',
    },
  },

  es: {
    meta: {
      title: 'Calculadora de Asíntotas y Excentricidad de la Hipérbola | Completar el Cuadrado Paso a Paso',
      description: 'Herramienta de geometría analítica: cálculo de asíntotas, excentricidad, resolución paso a paso para completar el cuadrado, tabla comparativa hipérbola vs elipse y gráfica interactiva.',
      keywords: 'calculadora de hiperbola, asintotas de la hiperbola, excentricidad hiperbola, completar el cuadrado hiperbola, secciones conicas, hiperbola vs elipse',
    },
    nav: {
      brand: 'Laboratorio de Hipérbolas y Cónicas',
      standard: 'Calculadora Estándar',
      completingSquare: 'Completar el Cuadrado',
      eccentricity: 'Excentricidad y Asíntotas',
      comparison: 'Hipérbola vs Elipse',
      quiz: 'Ejercicios y Test',
      reset: 'Reiniciar',
      shareGuide: 'Guía de Difusión',
    },
    hero: {
      badge: 'Geometría Analítica de Bachillerato y Universidad · Secciones Cónicas',
      title: 'Calculadora Visual de Asíntotas y Excentricidad de la Hipérbola',
      subtitle: 'Domina las secciones cónicas: reconocimiento inteligente de ecuaciones por pegado, resolución detallada paso a paso completando el cuadrado, prevención de dobles soluciones y tabla anti-confusión hipérbola vs elipse.',
      ctaCompletingSquare: 'Resolver Completando el Cuadrado',
      card1Title: '① Calculadora de Asíntotas',
      card1Sub: 'y=±(b/a)x y caja rectangular',
      card2Title: '② Completar el Cuadrado',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Paso a Paso',
      card3Title: '③ Excentricidad y Doble Solución',
      card3Sub: 'Halla e a partir de la pendiente',
      card4Title: '④ Hipérbola vs Elipse',
      card4Sub: 'c²=a²+b² frente a a²=b²+c²',
    },
    canvas: {
      title: 'Plano Cartesiano Interactivo',
      paramsSubtitle: 'Semieje a={a} · Semieje b={b} · Distancia focal c={c}',
      showAsymptotes: 'Asíntotas',
      showBox: 'Caja Central (2a×2b)',
      showFoci: 'Focos F₁ F₂',
      showEllipse: 'Comparar Elipse',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      resetView: 'Restablecer',
      mainCurve: 'Ramas de la Hipérbola',
      asymptotes: 'Asíntotas y = ±(b/a)x',
      foci: 'Focos',
      comparisonEllipse: 'Elipse de Comparación',
      tip: 'Arrastra el lienzo para mover · Rueda para zoom · Pasa el cursor para comprobar ||PF₁| - |PF₂|| = 2a',
      pointP: 'Punto P en la hipérbola',
    },
    calculator: {
      title: 'Calculadora de Asíntotas y Parámetros Geométricos',
      horizontalAxis: 'Eje focal horizontal (x²/a² - y²/b² = 1)',
      verticalAxis: 'Eje focal vertical (y²/a² - x²/b² = 1)',
      modeSlider: 'Modo de Entrada',
      modeLinear: 'Ingresar a, b (Semiejes)',
      modeSquared: 'Ingresar a², b² (Denominadores)',
      equilateralBadge: '★ Hipérbola Equilátera (a = b, e = √2, 90°)',
      semiMajorA: 'Semieje real a (Transverso):',
      denomA2: 'Denominador a²:',
      semiMinorB: 'Semieje imaginario b (Conjugado):',
      denomB2: 'Denominador b²:',
      centerOffset: 'Desplazamiento del Centro (h, k):',
      realAxisLength: 'Longitud del eje real 2a =',
      imaginaryAxisLength: 'Longitud del eje imaginario 2b =',
      presetsLabel: 'Proporciones Clásicas:',
      presetPythagorean: 'Pitagórica 3:4 (c=5, e=5/3)',
      presetEquilateral: 'Equilátera a=b=2 (e=√2)',
      presetAngle60: 'Ángulo Especial 1:√3 (e=2)',
      currentEquation: 'Forma de la Ecuación Canónica Actual',
      asymptoteTitle: 'Ecuaciones de las Asíntotas y Deducción',
      asymptoteTrickTitle: '💡 El Truco Rápido "Cambiar 1 por 0":',
      asymptoteTrickDesc: 'Reemplaza el 1 del lado derecho por 0 y factoriza inmediatamente:',
      asymptoteNotice: '* ¡Atención: Si el eje focal está en x la pendiente es ±b/a; si está en y es ±a/b!',
      focalDistanceC: 'Semidistancia Focal c',
      eccentricityE: 'Excentricidad e (e > 1)',
      angleTheta: 'Ángulo entre Asíntotas θ',
      verticesLabel: 'Coordenadas de los Vértices',
      fociLabel: 'Coordenadas de los Focos',
      latusRectum: 'Lado Recto (2b²/a)',
      copySummaryBtn: 'Copiar Resumen de Parámetros',
      copiedSuccess: '¡Parámetros copiados!',
    },
    completingSquare: {
      title: 'Completar el Cuadrado en la Ecuación General Paso a Paso',
      subtitle: 'Muestra con detalle cada paso: agrupar variables, factorizar coeficientes principales, sumar términos en ambos lados y obtener la ecuación canónica.',
      pasteLabel: 'Pega o Escribe la Ecuación Completa:',
      pastePlaceholder: 'ej. 4x² - 9y² - 16x - 18y - 29 = 0 o 9x² - 16y² + 54x + 64y = 127',
      solveBtn: 'Resolver Paso a Paso',
      manualLabel: 'Ajuste Manual de Coeficientes:',
      currentEq: 'Ecuación Actual:',
      isHyperbola: '✓ A·C < 0 (Hipérbola)',
      notHyperbola: '⚠️ A·C ≥ 0 (No es hipérbola - elipse o degenerada)',
      copyExamFormat: 'Copiar Formato de Examen Estándar',
      copiedExam: '¡Copiado formato de examen!',
      togglePreview: 'Vista previa de hoja de examen',
      hidePreview: 'Ocultar vista previa',
      printCard: 'Imprimir Solución',
      stepByStepTitle: 'Desglose del Procedimiento Algebraico Paso a Paso',
      applyToCanvas: 'Sincronizar con el Lienzo',
      stepWord: 'Paso',
      coreTip: 'Punto Crítico en Exámenes:',
      summaryTitle: '¡Procedimiento Completo! Parámetros Geométricos Obtenidos:',
      focalAxisDirection: 'Orientación del Eje Focal',
      centerCoords: 'Coordenadas del Centro (h, k)',
      semiAxes: 'Semiejes a y b',
      fociAndEccentricity: 'Distancia Focal c y Excentricidad e',
      asymptoteEquations: 'Ecuaciones de las Asíntotas:',
      asymptoteAngle: 'Ángulo entre Asíntotas:',
    },
    eccentricityTool: {
      coreRelationTitle: 'Puente Fundamental: Excentricidad e y Pendiente de las Asíntotas k',
      coreRelationDesc: 'En la hipérbola, la excentricidad y las asíntotas están indisolublemente ligadas por la identidad: e² = c²/a² = 1 + (b/a)². La pendiente de las asíntotas determina directamente la apertura de las ramas y el valor de la excentricidad.',
      caseXTitle: '① Eje focal en el eje x (x²/a² - y²/b² = 1)',
      caseYTitle: '② Eje focal en el eje y (y²/a² - x²/b² = 1)',
      tool1Title: 'Herramienta 1: Dada la Pendiente k ⇒ Hallar la Excentricidad e (Evita Olvidar Soluciones)',
      tool1Warning: '⚠️ Trampa Frecuente: Si el problema no especifica el eje focal, ¡SIEMPRE HAY DOS SOLUCIONES!',
      slopeInputLabel: 'Pendiente absoluta k de las asíntotas y = ±kx:',
      typicalSlopes: 'Pendientes Típicas:',
      caseASolution: 'Caso A: Eje focal en x (b/a = k)',
      caseBSolution: 'Caso B: Eje focal en y (a/b = k ⇒ b/a = 1/k)',
      tool2Title: 'Herramienta 2: Dada la Excentricidad e ⇒ Hallar Asíntotas y Ángulo de Apertura θ',
      eccentricityInputLabel: 'Ingresa la Excentricidad e (debe ser > 1):',
      typicalE: 'Valores Típicos de e:',
      ratioLabel: 'Razón b/a = √(e² - 1):',
      asymptoteIfX: 'Si el eje está en x, Asíntotas:',
      asymptoteIfY: 'Si el eje está en y, Asíntotas:',
      angleBetween: 'Ángulo entre Asíntotas θ:',
      geometricInsight: '💡 Visión Geométrica: A mayor excentricidad e, mayor es la razón b/a, más se abren las ramas de la hipérbola. Cuando e = √2, el ángulo entre las asíntotas es de 90° (hipérbola equilátera).',
    },
    comparison: {
      title: 'Hipérbola vs Elipse: Guía Comparativa Anti-Confusión',
      desc: 'Más del 70% de los errores en cónicas surgen de confundir a² = b² + c² (elipse) con c² = a² + b² (hipérbola). Domina estas 7 diferencias clave para asegurar la nota máxima.',
      sloganTitle: 'Regla Mnemotécnica:',
      sloganText: '"En la elipse manda a (a²=b²+c²); en la hipérbola reina c (c²=a²+b²); en la elipse mira cuál es mayor, en la hipérbola mira el signo positivo; ¡para las asíntotas cambia 1 por 0!"',
      tableTitle: 'Tabla Comparativa Completa Elipse frente a Hipérbola',
      tableSubtitle: 'Comparación Lado a Lado · Alertas de Errores',
      colDimension: 'Aspecto',
      colEllipse: 'Elipse (Cerrada)',
      colHyperbola: 'Hipérbola (Abierta)',
      rowStandardEq: 'Ecuación Canónica (Horizontal)',
      rowIdentity: 'Relación Pitagórica (a, b, c)',
      rowIdentityWarn: '🔥 Mayor Causa de Confusión',
      rowAxisRule: 'Regla del Eje Focal',
      rowEccentricity: 'Rango de Excentricidad e',
      rowAsymptote: 'Asíntotas',
      rowFocalTriangle: 'Área del Triángulo Focal △PF₁F₂',
      rowDefinition: 'Primera Definición (Distancias)',
      trap1Title: 'Trampa 1: Juzgar el Eje por el Tamaño de los Denominadores',
      trap1Wrong: 'Error: Pensar que en x²/9 - y²/16 = 1 los focos están en y porque 16 > 9.',
      trap1Correct: '✓ Corrección: En la hipérbola, el término positivo determina el eje focal. ¡Aquí x² es positivo, por tanto está en el eje x! a=3, b=4.',
      trap2Title: 'Trampa 2: Invertir la Ecuación Pitagórica',
      trap2Wrong: 'Error: Aplicar a² = b² + c² a la hipérbola, obteniendo c² negativo o imaginario.',
      trap2Correct: '✓ Corrección: En la hipérbola los focos están en los extremos exteriores, c es el elemento más largo: ¡siempre c² = a² + b²!',
      trap3Title: 'Trampa 3: Invertir la Pendiente de las Asíntotas',
      trap3Wrong: 'Error: Aplicar ciegamente y = ±(b/a)x a toda hipérbola.',
      trap3Correct: '✓ Corrección: Usa la regla "Cambiar 1 por 0": y²/a² - x²/b² = 0 ⇒ y = ±(a/b)x para hipérbolas verticales.',
    },
    problems: {
      title: 'Ejercicios Típicos Resueltos y Test de Autoevaluación',
      tabWalkthrough: 'Problemas de Examen Paso a Paso (3 Casos Clave)',
      tabQuiz: 'Test de Diagnóstico Rápido (4 Preguntas)',
      trapAlert: 'Análisis de la Trampa del Examen:',
      stepSolution: 'Solución Paso a Paso:',
      quizIntro: 'Haz clic en una opción para ver la validación instantánea y el análisis de errores frecuentes.',
      resetQuiz: 'Reiniciar Test',
      questionWord: 'Pregunta',
      correctFeedback: '¡Correcto! Razonamiento matemático impecable.',
      wrongFeedback: 'Incorrecto. ¡Caíste en la trampa típica!',
      trapAnalysis: 'Explicación del Error y Fundamento:',
    },
    modal: {
      title: '¿Por qué esta herramienta aún no tiene visitas masivas?',
      subtitle: 'Comprendiendo la realidad del tráfico web y el plan de difusión para estudiantes',
      diagTitle: 'Diagnóstico Objetivo (¿Por qué cero visitas al principio?):',
      diag1: '1. Los buscadores aún no la han indexado: Los dominios nuevos tardan días o semanas en aparecer en Google o Bing de forma orgánica.',
      diag2: '2. Falta de difusión en comunidades estudiantiles: Los estudiantes buscan ayuda en foros, grupos de WhatsApp/Telegram de clase o TikTok.',
      diag3: '3. Antes faltaba el botón de copiar solución directa para deberes.',
      strategyTitle: 'Cómo conseguir tus primeros 1.000 estudiantes y profesores:',
      strat1Title: '① Redes Sociales e Infografías',
      strat1Desc: 'Publica la tabla comparativa "Hipérbola vs Elipse" con el título: "¡Deja de confundir c²=a²+b² con a²=b²+c²!".',
      strat2Title: '② Grupos de Clase y Deberes',
      strat2Desc: 'Comparte en grupos de estudiantes: "Pega cualquier ecuación de cónica y te da el procedimiento completo para entregar los deberes".',
      strat3Title: '③ Foros y Canales Educativos',
      strat3Desc: 'Responde dudas de geometría analítica en foros y enlaza la calculadora de asíntotas.',
      promoLabel: 'Texto de recomendación listo para copiar:',
      copyPromoBtn: 'Copiar Mensaje Recomendado',
      copiedPromo: '¡Mensaje Copiado!',
      copyLinkBtn: 'Copiar Enlace',
      copiedLink: '¡Enlace Copiado!',
      closeBtn: 'Cerrar Ventana',
    },
  },

  fr: {
    meta: {
      title: 'Calculateur d\'Asymptotes et d\'Excentricité d\'Hyperbole | Complétion du Carré',
      description: 'Outil de géométrie analytique pour coniques: calcul des asymptotes, excentricité, résolution étape par étape par complétion du carré, tableau comparatif hyperbole vs ellipse et graphe interactif.',
      keywords: 'calculateur hyperbole, asymptotes hyperbole, excentricité hyperbole, completion du carre hyperbole, sections coniques, hyperbole vs ellipse',
    },
    nav: {
      brand: 'Laboratoire Hyperboles & Coniques',
      standard: 'Calculateur Standard',
      completingSquare: 'Complétion du Carré',
      eccentricity: 'Excentricité & Asymptotes',
      comparison: 'Hyperbole vs Ellipse',
      quiz: 'Exercices & Quiz',
      reset: 'Réinitialiser',
      shareGuide: 'Guide de Partage',
    },
    hero: {
      badge: 'Géométrie Analytique Lycée & Supérieur · Sections Coniques',
      title: 'Solveur Visuel d\'Asymptotes et d\'Excentricité d\'Hyperbole',
      subtitle: 'Maîtrisez les coniques sans confusion: reconnaissance par collage d\'équations, décomposition pas à pas de la complétion du carré, évitement du piège des doubles solutions et tableau comparatif hyperbole vs ellipse.',
      ctaCompletingSquare: 'Résoudre par Complétion du Carré',
      card1Title: '① Calculateur d\'Asymptotes',
      card1Sub: 'y=±(b/a)x et rectangle caractéristique',
      card2Title: '② Complétion du Carré',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Étape par Étape',
      card3Title: '③ Excentricité & Doubles Solutions',
      card3Sub: 'Trouver e selon la pente',
      card4Title: '④ Hyperbole vs Ellipse',
      card4Sub: 'c²=a²+b² contre a²=b²+c²',
    },
    canvas: {
      title: 'Repère Cartésien Interactif',
      paramsSubtitle: 'Demi-axe a={a} · Demi-axe b={b} · Distance focale c={c}',
      showAsymptotes: 'Asymptotes',
      showBox: 'Boîte Centrale (2a×2b)',
      showFoci: 'Foyers F₁ F₂',
      showEllipse: 'Comparer avec l\'Ellipse',
      zoomIn: 'Zoomer',
      zoomOut: 'Dézoomer',
      resetView: 'Réinitialiser',
      mainCurve: 'Branches de l\'Hyperbole',
      asymptotes: 'Asymptotes y = ±(b/a)x',
      foci: 'Foyers',
      comparisonEllipse: 'Ellipse de Comparaison',
      tip: 'Glisser pour déplacer · Molette pour zoomer · Survoler pour vérifier ||PF₁| - |PF₂|| = 2a',
      pointP: 'Point P sur l\'hyperbole',
    },
    calculator: {
      title: 'Calculateur d\'Asymptotes et de Paramètres Géométriques',
      horizontalAxis: 'Axe transverse horizontal (x²/a² - y²/b² = 1)',
      verticalAxis: 'Axe transverse vertical (y²/a² - x²/b² = 1)',
      modeSlider: 'Mode de Réglage',
      modeLinear: 'Saisir a, b (Demi-axes)',
      modeSquared: 'Saisir a², b² (Dénominateurs)',
      equilateralBadge: '★ Hyperbole Équilatère (a = b, e = √2, 90°)',
      semiMajorA: 'Demi-axe réel a (Transverse) :',
      denomA2: 'Dénominateur a² :',
      semiMinorB: 'Demi-axe imaginaire b (Conjugué) :',
      denomB2: 'Dénominateur b² :',
      centerOffset: 'Décalage du Centre (h, k) :',
      realAxisLength: 'Longueur de l\'axe réel 2a =',
      imaginaryAxisLength: 'Longueur de l\'axe imaginaire 2b =',
      presetsLabel: 'Rapports Classiques :',
      presetPythagorean: 'Pythagoricien 3:4 (c=5, e=5/3)',
      presetEquilateral: 'Équilatère a=b=2 (e=√2)',
      presetAngle60: 'Angle Remarquable 1:√3 (e=2)',
      currentEquation: 'Forme de l\'Équation Réduite Actuelle',
      asymptoteTitle: 'Équations des Asymptotes et Démonstration',
      asymptoteTrickTitle: '💡 L\'Astuce Rapide "Changer 1 en 0" :',
      asymptoteTrickDesc: 'Remplacez 1 par 0 à droite dans l\'équation réduite et factorisez immédiatement :',
      asymptoteNotice: '* Attention : Axe focal sur x implique une pente ±b/a ; sur y elle vaut ±a/b !',
      focalDistanceC: 'Demi-distance Focale c',
      eccentricityE: 'Excentricité e (e > 1)',
      angleTheta: 'Angle entre Asymptotes θ',
      verticesLabel: 'Coordonnées des Sommets',
      fociLabel: 'Coordonnées des Foyers',
      latusRectum: 'Paramètre Focal (2b²/a)',
      copySummaryBtn: 'Copier le Résumé des Paramètres',
      copiedSuccess: 'Paramètres Copiés !',
    },
    completingSquare: {
      title: 'Complétion du Carré sur l\'Équation Générale Pas à Pas',
      subtitle: 'Détaille chaque étape algébrique : regroupement des termes, factorisation des coefficients dominants, équilibrage du membre de droite et réduction en forme canonique.',
      pasteLabel: 'Coller ou Écrire l\'Équation Complète :',
      pastePlaceholder: 'ex: 4x² - 9y² - 16x - 18y - 29 = 0 ou 9x² - 16y² + 54x + 64y = 127',
      solveBtn: 'Résoudre Pas à Pas',
      manualLabel: 'Ajustement Manuel des Coefficients :',
      currentEq: 'Équation Actuelle :',
      isHyperbola: '✓ A·C < 0 (Hyperbole)',
      notHyperbola: '⚠️ A·C ≥ 0 (Pas une hyperbole - ellipse ou forme dégénérée)',
      copyExamFormat: 'Copier la Rédaction Conforme aux Examens',
      copiedExam: 'Rédaction d\'Examen Copiée !',
      togglePreview: 'Aperçu de la Copie d\'Examen',
      hidePreview: 'Masquer l\'Aperçu',
      printCard: 'Imprimer la Fiche Solution',
      stepByStepTitle: 'Détail Algébrique Étape par Étape',
      applyToCanvas: 'Synchroniser avec le Graphe',
      stepWord: 'Étape',
      coreTip: 'Piège Fréquent aux Épreuves :',
      summaryTitle: 'Complétion Réussie ! Caractéristiques Géométriques Déduites :',
      focalAxisDirection: 'Orientation de l\'Axe Focal',
      centerCoords: 'Coordonnées du Centre (h, k)',
      semiAxes: 'Demi-axes a et b',
      fociAndEccentricity: 'Distance Focale c et Excentricité e',
      asymptoteEquations: 'Équations des Asymptotes :',
      asymptoteAngle: 'Angle entre Asymptotes :',
    },
    eccentricityTool: {
      coreRelationTitle: 'Relation Fondamentale : Excentricité e et Pente des Asymptotes k',
      coreRelationDesc: 'Pour l\'hyperbole, l\'excentricité et les asymptotes sont liées par l\'identité : e² = c²/a² = 1 + (b/a)². La pente des asymptotes détermine directement l\'ouverture des branches et la valeur de l\'excentricité.',
      caseXTitle: '① Axe transverse sur l\'axe x (x²/a² - y²/b² = 1)',
      caseYTitle: '② Axe transverse sur l\'axe y (y²/a² - x²/b² = 1)',
      tool1Title: 'Outil 1 : Pente k Donnée ⇒ Trouver l\'Excentricité e (Éviter d\'Oublier la 2ème Solution)',
      tool1Warning: '⚠️ Piège Classique : Si l\'orientation de l\'axe n\'est pas précisée, IL Y A TOUJOURS DEUX SOLUTIONS !',
      slopeInputLabel: 'Pente absolue k des asymptotes y = ±kx :',
      typicalSlopes: 'Pentes Fréquentes aux Examens :',
      caseASolution: 'Cas A : Axe transverse sur x (b/a = k)',
      caseBSolution: 'Cas B : Axe transverse sur y (a/b = k ⇒ b/a = 1/k)',
      tool2Title: 'Outil 2 : Excentricité e Donnée ⇒ Trouver Asymptotes & Angle d\'Ouverture θ',
      eccentricityInputLabel: 'Saisir l\'Excentricité e (doit être > 1) :',
      typicalE: 'Valeurs Typiques de e :',
      ratioLabel: 'Rapport b/a = √(e² - 1) :',
      asymptoteIfX: 'Si l\'axe est sur x, Asymptotes :',
      asymptoteIfY: 'Si l\'axe est sur y, Asymptotes :',
      angleBetween: 'Angle entre Asymptotes θ :',
      geometricInsight: '💡 Intuition Géométrique : Plus e est grand, plus b/a augmente et plus les branches s\'écartent. Quand e = √2, θ = 90° (hyperbole équilatère).',
    },
    comparison: {
      title: 'Hyperbole vs Ellipse : Tableau Comparatif Anti-Confusion',
      desc: 'Plus de 70% des erreurs sur les coniques proviennent de la confusion entre a² = b² + c² (ellipse) et c² = a² + b² (hyperbole). Maîtrisez ces 7 différences fondamentales pour décrocher la note maximale.',
      sloganTitle: 'Formule Mnémotechnique :',
      sloganText: '"Dans l\'ellipse c\'est a le roi (a²=b²+c²) ; dans l\'hyperbole c\'est c qui règne (c²=a²+b²) ; dans l\'ellipse on regarde le plus grand, dans l\'hyperbole le signe plus ; pour les asymptotes on remplace 1 par 0 !"',
      tableTitle: 'Tableau Comparatif Complet Ellipse contre Hyperbole',
      tableSubtitle: 'Comparaison Face à Face · Alertes Pièges',
      colDimension: 'Dimension',
      colEllipse: 'Ellipse (Fermée)',
      colHyperbola: 'Hyperbole (Ouverte)',
      rowStandardEq: 'Équation Réduite (Horizontale)',
      rowIdentity: 'Relation Pythagoricienne (a, b, c)',
      rowIdentityWarn: '🔥 Piège n°1 aux Examens',
      rowAxisRule: 'Règle de Détermination de l\'Axe Focal',
      rowEccentricity: 'Domaine de l\'Excentricité e',
      rowAsymptote: 'Asymptotes',
      rowFocalTriangle: 'Aire du Triangle Focal △PF₁F₂',
      rowDefinition: 'Première Définition (Distances)',
      trap1Title: 'Piège 1 : Juger l\'Axe selon la Taille des Dénominateurs',
      trap1Wrong: 'Erreur : Penser que x²/9 - y²/16 = 1 a ses foyers sur y parce que 16 > 9.',
      trap1Correct: '✓ Correction : Pour l\'hyperbole, c\'est le terme positif qui décide ! Ici x² est positif, donc l\'axe est x ! a=3, b=4.',
      trap2Title: 'Piège 2 : Inversion de la Formule de Pythagore',
      trap2Wrong: 'Erreur : Appliquer a² = b² + c² à l\'hyperbole et trouver un c² négatif ou imaginaire.',
      trap2Correct: '✓ Correction : Dans l\'hyperbole, les foyers sont aux extrémités extérieures, c est le plus grand : toujours c² = a² + b² !',
      trap3Title: 'Piège 3 : Inversion des Pentes des Asymptotes',
      trap3Wrong: 'Erreur : Écrire aveuglément y = ±(b/a)x pour toute hyperbole.',
      trap3Correct: '✓ Correction : Utilisez toujours la méthode "Remplacer 1 par 0" : y²/a² - x²/b² = 0 ⇒ y = ±(a/b)x pour les verticales.',
    },
    problems: {
      title: 'Exercices Corrigés d\'Examens & Quiz d\'Auto-évaluation',
      tabWalkthrough: 'Problèmes d\'Examens Détaillés (3 Cas Types)',
      tabQuiz: 'Quiz de Diagnostic Anti-Pièges (4 Questions)',
      trapAlert: 'Analyse du Piège des Épreuves :',
      stepSolution: 'Résolution Pas à Pas :',
      quizIntro: 'Cliquez sur une option pour un diagnostic instantané et l\'analyse des fausses intuitions.',
      resetQuiz: 'Réinitialiser le Quiz',
      questionWord: 'Question',
      correctFeedback: 'Correct ! Raisonnement mathématique irréprochable.',
      wrongFeedback: 'Incorrect. Vous êtes tombé dans le piège classique !',
      trapAnalysis: 'Analyse de l\'Erreur & Méthode :',
    },
    modal: {
      title: 'Pourquoi cet outil n\'a-t-il pas encore beaucoup de visites ?',
      subtitle: 'Comprendre la réalité du trafic web et le plan de diffusion auprès des élèves',
      diagTitle: 'Diagnostic Objectif (Pourquoi zéro visite au départ ?) :',
      diag1: '1. Les moteurs de recherche ne l\'ont pas encore indexé : Un nouveau nom de domaine met plusieurs jours ou semaines avant d\'apparaître sur Google.',
      diag2: '2. Absence de diffusion initiale : Les lycéens cherchent des résolutions sur des groupes de devoirs WhatsApp/Discord ou Reddit.',
      diag3: '3. Il manquait le bouton de copie directe conforme aux copies d\'examens.',
      strategyTitle: 'Comment obtenir vos 1 000 premiers élèves et professeurs :',
      strat1Title: '① Réseaux Sociaux & Fiches de Révision',
      strat1Desc: 'Partagez le tableau "Hyperbole vs Ellipse" avec le titre : "Arrêtez de confondre a²=b²+c² et c²=a²+b² !".',
      strat2Title: '② Groupes de Classe et Devoirs',
      strat2Desc: 'Partagez dans les groupes d\'élèves : "Collez n\'importe quelle équation pour avoir la rédaction complète étape par étape".',
      strat3Title: '③ Forums d\'Aide aux Devoirs',
      strat3Desc: 'Répondez aux questions de coniques en citant l\'astuce "Changer 1 en 0" et le lien du calculateur.',
      promoLabel: 'Texte prêt à copier pour le partage :',
      copyPromoBtn: 'Copier le Message de Partage',
      copiedPromo: 'Message Copié !',
      copyLinkBtn: 'Copier l\'URL',
      copiedLink: 'URL Copiée !',
      closeBtn: 'Fermer la Fenêtre',
    },
  },

  pt: {
    meta: {
      title: 'Calculadora de Assíntotas e Excentricidade da Hipérbole | Completar Quadrados Passo a Passo',
      description: 'Ferramenta de geometria analítica para cônicas: cálculo de assíntotas, excentricidade, resolução passo a passo completando quadrados, tabela comparativa hipérbole vs elipse e gráfico interativo.',
      keywords: 'calculadora de hiperbole, assintotas da hiperbole, excentricidade hiperbole, completar quadrados hiperbole, secoes conicas, hiperbole vs elipse',
    },
    nav: {
      brand: 'Laboratório de Hipérboles & Cônicas',
      standard: 'Calculadora Padrão',
      completingSquare: 'Completar Quadrados',
      eccentricity: 'Excentricidade e Assíntotas',
      comparison: 'Hipérbole vs Elipse',
      quiz: 'Problemas & Teste',
      reset: 'Reiniciar',
      shareGuide: 'Guia de Divulgação',
    },
    hero: {
      badge: 'Geometria Analítica de Ensino Médio e Superior · Seções Cônicas',
      title: 'Calculadora Visual de Assíntotas e Excentricidade da Hipérbole',
      subtitle: 'Domine as cônicas sem confusão: reconhecimento inteligente colando a equação, resolução detalhada passo a passo completando quadrados, prevenção de dupla solução e tabela comparativa hipérbole vs elipse.',
      ctaCompletingSquare: 'Resolver Completando Quadrados',
      card1Title: '① Calculadora de Assíntotas',
      card1Sub: 'y=±(b/a)x e retângulo central',
      card2Title: '② Completar Quadrados',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Passo a Passo',
      card3Title: '③ Excentricidade e Dupla Solução',
      card3Sub: 'Encontre e a partir da inclinação',
      card4Title: '④ Hipérbole vs Elipse',
      card4Sub: 'c²=a²+b² contra a²=b²+c²',
    },
    canvas: {
      title: 'Plano Cartesiano Interativo',
      paramsSubtitle: 'Semieixo a={a} · Semieixo b={b} · Distância focal c={c}',
      showAsymptotes: 'Assíntotas',
      showBox: 'Caixa Central (2a×2b)',
      showFoci: 'Focos F₁ F₂',
      showEllipse: 'Comparar Elipse',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      resetView: 'Restaurar',
      mainCurve: 'Ramos da Hipérbole',
      asymptotes: 'Assíntotas y = ±(b/a)x',
      foci: 'Focos',
      comparisonEllipse: 'Elipse de Comparação',
      tip: 'Arraste para mover · Roda do mouse para zoom · Passe o cursor para verificar ||PF₁| - |PF₂|| = 2a',
      pointP: 'Ponto P na hipérbole',
    },
    calculator: {
      title: 'Calculadora de Assíntotas e Parâmetros Geométricos',
      horizontalAxis: 'Eixo focal horizontal (x²/a² - y²/b² = 1)',
      verticalAxis: 'Eixo focal vertical (y²/a² - x²/b² = 1)',
      modeSlider: 'Modo de Entrada',
      modeLinear: 'Inserir a, b (Semieixos)',
      modeSquared: 'Inserir a², b² (Denominadores)',
      equilateralBadge: '★ Hipérbole Equilátera (a = b, e = √2, 90°)',
      semiMajorA: 'Semieixo real a (Transverso):',
      denomA2: 'Denominador a²:',
      semiMinorB: 'Semieixo imaginário b (Conjugado):',
      denomB2: 'Denominador b²:',
      centerOffset: 'Deslocamento do Centro (h, k):',
      realAxisLength: 'Comprimento do eixo real 2a =',
      imaginaryAxisLength: 'Comprimento do eixo imaginário 2b =',
      presetsLabel: 'Proporções Clássicas:',
      presetPythagorean: 'Pitagórica 3:4 (c=5, e=5/3)',
      presetEquilateral: 'Equilátera a=b=2 (e=√2)',
      presetAngle60: 'Ângulo Notável 1:√3 (e=2)',
      currentEquation: 'Forma da Equação Padrão Atual',
      asymptoteTitle: 'Equações das Assíntotas e Dedução',
      asymptoteTrickTitle: '💡 O Macete Rápido "Trocar 1 por 0":',
      asymptoteTrickDesc: 'Substitua 1 por 0 no lado direito da equação padrão e fatore imediatamente:',
      asymptoteNotice: '* Atenção: Eixo focal em x tem inclinação ±b/a; no eixo y é ±a/b!',
      focalDistanceC: 'Semidistância Focal c',
      eccentricityE: 'Excentricidade e (e > 1)',
      angleTheta: 'Ângulo entre Assíntotas θ',
      verticesLabel: 'Coordenadas dos Vértices',
      fociLabel: 'Coordenadas dos Focos',
      latusRectum: 'Latus Rectum (2b²/a)',
      copySummaryBtn: 'Copiar Resumo dos Parâmetros',
      copiedSuccess: 'Parâmetros Copiados!',
    },
    completingSquare: {
      title: 'Completar Quadrados na Equação Geral Passo a Passo',
      subtitle: 'Mostra em detalhes cada etapa: agrupamento dos termos, fatoração dos coeficientes líderes, balanceamento no segundo membro e redução à equação canônica.',
      pasteLabel: 'Cole ou Digite a Equação Completa:',
      pastePlaceholder: 'ex: 4x² - 9y² - 16x - 18y - 29 = 0 ou 9x² - 16y² + 54x + 64y = 127',
      solveBtn: 'Resolver Passo a Passo',
      manualLabel: 'Ajuste Manual dos Coeficientes:',
      currentEq: 'Equação Atual:',
      isHyperbola: '✓ A·C < 0 (Hipérbole)',
      notHyperbola: '⚠️ A·C ≥ 0 (Não é hipérbole - elipse ou degenerada)',
      copyExamFormat: 'Copiar Resolução Padrão para Provas',
      copiedExam: 'Resolução para Prova Copiada!',
      togglePreview: 'Pré-visualizar Folha de Prova',
      hidePreview: 'Ocultar Pré-visualização',
      printCard: 'Imprimir Folha de Resolução',
      stepByStepTitle: 'Detalhamento Algébrico Passo a Passo',
      applyToCanvas: 'Sincronizar com o Gráfico',
      stepWord: 'Passo',
      coreTip: 'Ponto de Armadilha Comum em Vestibulares:',
      summaryTitle: 'Completamento Concluído! Parâmetros Geométricos Obtidos:',
      focalAxisDirection: 'Orientação do Eixo Focal',
      centerCoords: 'Coordenadas do Centro (h, k)',
      semiAxes: 'Semieixos a e b',
      fociAndEccentricity: 'Distância Focal c e Excentricidade e',
      asymptoteEquations: 'Equações das Assíntotas:',
      asymptoteAngle: 'Ângulo entre Assíntotas:',
    },
    eccentricityTool: {
      coreRelationTitle: 'Relação Fundamental: Excentricidade e e Inclinação das Assíntotas k',
      coreRelationDesc: 'Nas hipérboles, a excentricidade e as assíntotas estão ligadas pela identidade: e² = c²/a² = 1 + (b/a)². A inclinação das assíntotas determina diretamente a abertura dos ramos e o valor da excentricidade.',
      caseXTitle: '① Eixo transverso no eixo x (x²/a² - y²/b² = 1)',
      caseYTitle: '② Eixo transverso no eixo y (y²/a² - x²/b² = 1)',
      tool1Title: 'Ferramenta 1: Dada a Inclinação k ⇒ Achar a Excentricidade e (Evita Perder Soluções)',
      tool1Warning: '⚠️ Armadilha Frequente: Se o eixo focal não for especificado, SEMPRE EXISTEM DUAS SOLUÇÕES!',
      slopeInputLabel: 'Inclinação absoluta k das assíntotas y = ±kx:',
      typicalSlopes: 'Inclinações Típicas de Vestibular:',
      caseASolution: 'Caso A: Eixo transverso em x (b/a = k)',
      caseBSolution: 'Caso B: Eixo transverso em y (a/b = k ⇒ b/a = 1/k)',
      tool2Title: 'Ferramenta 2: Dada a Excentricidade e ⇒ Achar Assíntotas e Ângulo de Abertura θ',
      eccentricityInputLabel: 'Insira a Excentricidade e (deve ser > 1):',
      typicalE: 'Valores Típicos de e:',
      ratioLabel: 'Razão b/a = √(e² - 1):',
      asymptoteIfX: 'Se o eixo estiver em x, Assíntotas:',
      asymptoteIfY: 'Se o eixo estiver em y, Assíntotas:',
      angleBetween: 'Ângulo entre Assíntotas θ:',
      geometricInsight: '💡 Visão Geométrica: Quanto maior a excentricidade e, maior é a razão b/a e mais abertos são os ramos da hipérbole. Quando e = √2, o ângulo é de 90° (hipérbole equilátera).',
    },
    comparison: {
      title: 'Hipérbole vs Elipse: Tabela Comparativa Anti-Confusão',
      desc: 'Mais de 70% dos erros em cônicas acontecem pela confusão entre a² = b² + c² (elipse) e c² = a² + b² (hipérbole). Domine estas 7 diferenças fundamentais para garantir a nota máxima.',
      sloganTitle: 'Regra Mnemônica Prática:',
      sloganText: '"Na elipse o a manda (a²=b²+c²); na hipérbole o c reina (c²=a²+b²); na elipse olhe qual denominador é maior, na hipérbole olhe o sinal positivo; nas assíntotas troque 1 por 0!"',
      tableTitle: 'Tabela Comparativa Completa Elipse versus Hipérbole',
      tableSubtitle: 'Comparação Lado a Lado · Alertas de Erros',
      colDimension: 'Aspecto',
      colEllipse: 'Elipse (Fechada)',
      colHyperbola: 'Hipérbole (Aberta)',
      rowStandardEq: 'Equação Reduzida (Horizontal)',
      rowIdentity: 'Relação Pitagórica (a, b, c)',
      rowIdentityWarn: '🔥 Principal Ponto de Confusão',
      rowAxisRule: 'Regra de Determinação do Eixo Focal',
      rowEccentricity: 'Intervalo de Excentricidade e',
      rowAsymptote: 'Assíntotas',
      rowFocalTriangle: 'Área do Triângulo Focal △PF₁F₂',
      rowDefinition: 'Primeira Definição (Distâncias Focais)',
      trap1Title: 'Armadilha 1: Julgar o Eixo pelo Tamanho dos Denominadores',
      trap1Wrong: 'Erro: Pensar que em x²/9 - y²/16 = 1 os focos estão no eixo y porque 16 > 9.',
      trap1Correct: '✓ Correção: Na hipérbole, é o termo positivo que define o eixo focal! Aqui o x² é positivo, logo está no eixo x! a=3, b=4.',
      trap2Title: 'Armadilha 2: Inverter a Relação de Pitágoras',
      trap2Wrong: 'Erro: Aplicar a² = b² + c² à hipérbole, resultando em c² negativo ou imaginário.',
      trap2Correct: '✓ Correção: Na hipérbole os focos estão nas extremidades externas, c é o maior elemento: sempre c² = a² + b²!',
      trap3Title: 'Armadilha 3: Inverter as Inclinações das Assíntotas',
      trap3Wrong: 'Erro: Aplicar cegamente y = ±(b/a)x a qualquer hipérbole.',
      trap3Correct: '✓ Correção: Use sempre o macete "Trocar 1 por 0": y²/a² - x²/b² = 0 ⇒ y = ±(a/b)x para hipérboles verticais.',
    },
    problems: {
      title: 'Problemas Clássicos Resolvidos & Teste Diagnóstico',
      tabWalkthrough: 'Resoluções Passo a Passo de Prova (3 Casos Típicos)',
      tabQuiz: 'Teste Rápido Anti-Armadilhas (4 Questões)',
      trapAlert: 'Análise da Pegadinha da Prova:',
      stepSolution: 'Resolução Passo a Passo:',
      quizIntro: 'Clique em uma alternativa para validação imediata e explicação do erro conceitual.',
      resetQuiz: 'Reiniciar Teste',
      questionWord: 'Questão',
      correctFeedback: 'Correto! Raciocínio matemático rigoroso.',
      wrongFeedback: 'Incorreto. Você caiu na pegadinha clássica!',
      trapAnalysis: 'Explicação do Erro e Fundamento:',
    },
    modal: {
      title: 'Por que esta ferramenta ainda não tem muitos cliques?',
      subtitle: 'Entendendo a realidade do tráfego orgânico e o plano de divulgação para estudantes',
      diagTitle: 'Diagnóstico Objetivo (Por que zero visitas no início?):',
      diag1: '1. Os buscadores ainda não indexaram o site: Novos domínios levam dias ou semanas para aparecer no Google de forma orgânica.',
      diag2: '2. Falta de divulgação inicial em grupos de estudantes: Alunos buscam respostas em grupos de WhatsApp/Discord ou TikTok.',
      diag3: '3. Faltava a função de copiar a resposta pronta com critérios de pontuação.',
      strategyTitle: 'Como conseguir seus primeiros 1.000 alunos e professores:',
      strat1Title: '① Redes Sociais e Infográficos',
      strat1Desc: 'Poste a tabela "Hipérbole vs Elipse" com o título: "Chega de errar c²=a²+b² e a²=b²+c²!".',
      strat2Title: '② Grupos de Estudos e Tarefas',
      strat2Desc: 'Compartilhe com a turma: "Cole qualquer equação de cônica e veja o passo a passo completo".',
      strat3Title: '③ Fóruns e Tiradúvidas',
      strat3Desc: 'Responda dúvidas sobre cônicas indicando o macete de trocar 1 por 0 e o link do site.',
      promoLabel: 'Texto pronto para copiar e divulgar:',
      copyPromoBtn: 'Copiar Mensagem Recomendada',
      copiedPromo: 'Mensagem Copiada!',
      copyLinkBtn: 'Copiar Link',
      copiedLink: 'Link Copiado!',
      closeBtn: 'Fechar Janela',
    },
  },

  zh: {
    meta: {
      title: '双曲线渐近线与离心率精算器 | 高中圆锥曲线解题与配方法拆解',
      description: '高中数学圆锥曲线攻坚平台：双曲线渐近线与离心率智能计算，一般方程六步配方法详细拆解，双曲线与椭圆公式防混淆对照表，动态几何画板。',
      keywords: '双曲线渐近线计算器, 双曲线离心率公式, 双曲线配方法解题步骤, 高中圆锥曲线, 双曲线和椭圆区别, 高考数学解析几何',
    },
    nav: {
      brand: '双曲线渐近线与离心率精算器',
      standard: '标准计算',
      completingSquare: '配方法拆解',
      eccentricity: '离心率与渐近线',
      comparison: '椭圆与双曲线对比',
      quiz: '典例与自测',
      reset: '重置',
      shareGuide: '分享与获客指南',
    },
    hero: {
      badge: '高中数学选修 / 新高考解析几何 · 圆锥曲线高频考点攻坚',
      title: '双曲线渐近线与离心率精算研习平台',
      subtitle: '专治高中圆锥曲线公式混淆与大题丢分：支持自然方程整串粘贴一键拆解、详细配方法六步推导全过程、双解漏解智能诊断、及椭圆双曲线全景公式对照。',
      ctaCompletingSquare: '智能配方法拆解 (贴方程秒解)',
      card1Title: '① 渐近线计算器',
      card1Sub: '1 变 0 秒杀法与动态特征矩形',
      card2Title: '② 配方法拆解',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 六步推导',
      card3Title: '③ 离心率双解器',
      card3Sub: '由斜率求离心率，防漏解错解',
      card4Title: '④ 双曲线 vs 椭圆',
      card4Sub: 'c²=a²+b² vs a²=b²+c² 避坑口诀',
    },
    canvas: {
      title: '动态直角坐标系几何画板 (Interactive Coordinate Stage)',
      paramsSubtitle: '实半轴 a={a} · 虚半轴 b={b} · 半焦距 c={c}',
      showAsymptotes: '渐近线',
      showBox: '特征矩形 (2a×2b)',
      showFoci: '焦点 F₁ F₂',
      showEllipse: '对比同参椭圆',
      zoomIn: '放大',
      zoomOut: '缩小',
      resetView: '重置视角',
      mainCurve: '双曲线主体',
      asymptotes: '渐近线 y = ±(b/a)x',
      foci: '焦点',
      comparisonEllipse: '同 a,b 椭圆 (封闭内嵌)',
      tip: '拖拽移动画布 · 滚轮缩放 · 悬停观察双曲线定义 ||PF₁| - |PF₂|| = 2a',
      pointP: '双曲线上动点 P',
    },
    calculator: {
      title: '双曲线渐近线与几何参数计算器',
      horizontalAxis: '焦点在 x 轴 (x²/a² - y²/b² = 1)',
      verticalAxis: '焦点在 y 轴 (y²/a² - x²/b² = 1)',
      modeSlider: '参数调节模式',
      modeLinear: '输入 a, b (半轴)',
      modeSquared: '输入 a², b² (分母)',
      equilateralBadge: '★ 等轴双曲线 (a = b, e = √2, 渐近线夹角90°)',
      semiMajorA: '实半轴 a (长半轴)：',
      denomA2: '分母 a² (实轴分母)：',
      semiMinorB: '虚半轴 b (短半轴)：',
      denomB2: '分母 b² (虚轴分母)：',
      centerOffset: '中心位置偏移 (h, k)：',
      realAxisLength: '实轴长 2a =',
      imaginaryAxisLength: '虚轴长 2b =',
      presetsLabel: '经典高考比例快捷填入：',
      presetPythagorean: '勾股比 3:4 (c=5, e=5/3)',
      presetEquilateral: '等轴 a=b=2 (e=√2)',
      presetAngle60: '特殊角 1:√3 (e=2)',
      currentEquation: '当前标准方程形式',
      asymptoteTitle: '渐近线方程推导与结论',
      asymptoteTrickTitle: '💡 高考秒杀记忆法（1变0口诀）：',
      asymptoteTrickDesc: '将标准方程右端的常数 1 改为 0，直接移项分解因式：',
      asymptoteNotice: '* 重点牢记：焦点在 x 轴时斜率为 ±b/a；焦点在 y 轴时斜率为 ±a/b！',
      focalDistanceC: '半焦距 c',
      eccentricityE: '离心率 e (e > 1)',
      angleTheta: '渐近线夹角 θ',
      verticesLabel: '顶点坐标',
      fociLabel: '焦点坐标',
      latusRectum: '通径长 (2b²/a)',
      copySummaryBtn: '一键复制全部几何特征量',
      copiedSuccess: '已复制全部特征量！',
    },
    completingSquare: {
      title: '一般方程配方法拆解器 (Completing the Square)',
      subtitle: '针对高中圆锥曲线大题难点：展示每一步提公因式、两端补项、完全平方式合并及标准式推导。',
      pasteLabel: '作业/试卷方程一键粘贴智能识别：',
      pastePlaceholder: '直接粘贴或输入整道方程，例如 4x² - 9y² - 16x - 18y = 29 或 9x² - 16y² + 54x + 64y = 127',
      solveBtn: '一键拆解',
      manualLabel: '各项系数手动微调：',
      currentEq: '当前方程：',
      isHyperbola: '✓ A·C < 0 (双曲线)',
      notHyperbola: '⚠️ A·C ≥ 0 (非双曲线 - 椭圆或退化)',
      copyExamFormat: '一键复制高考大题答题规范 (含踩分点)',
      copiedExam: '已复制规范答题卡！',
      togglePreview: '预览答题卡书写版面',
      hidePreview: '收起答题纸预览',
      printCard: '打印解题卡',
      stepByStepTitle: '详细配方演练步骤 (Step-by-Step Breakdown)',
      applyToCanvas: '同步载入动态几何画板',
      stepWord: '第',
      coreTip: '核心提要：',
      summaryTitle: '配方完成！解得几何特征量清单：',
      focalAxisDirection: '焦点轴向',
      centerCoords: '中心坐标 (h, k)',
      semiAxes: '半轴 a 与 b',
      fociAndEccentricity: '半焦距 c 与 离心率 e',
      asymptoteEquations: '渐近线方程：',
      asymptoteAngle: '渐近线夹角：',
    },
    eccentricityTool: {
      coreRelationTitle: '双曲线离心率 e 与 渐近线斜率 k 核心桥梁关系式',
      coreRelationDesc: '在圆锥曲线高考中，离心率与渐近线是出题频率极高的一对“孪生特征”。切记恒等式：e² = c²/a² = (a² + b²)/a² = 1 + (b/a)²。渐近线斜率直接决定了双曲线张开的阔度与离心率大小！',
      caseXTitle: '① 焦点在 x 轴 (x²/a² - y²/b² = 1)',
      caseYTitle: '② 焦点在 y 轴 (y²/a² - x²/b² = 1)',
      tool1Title: '工具一：已知渐近线斜率 k ⇒ 求离心率 e（防漏解避坑器）',
      tool1Warning: '⚠️ 高考常见失分点：焦点未指明在 x 轴还是 y 轴时，必有两解！',
      slopeInputLabel: '设定渐近线方程 y = ± kx 的斜率绝对值 k：',
      typicalSlopes: '典型真题斜率：',
      caseASolution: '情况 A：焦点在 x 轴 (b/a = k)',
      caseBSolution: '情况 B：焦点在 y 轴 (a/b = k ⇒ b/a = 1/k)',
      tool2Title: '工具二：已知离心率 e ⇒ 求渐近线方程与开口夹角 θ',
      eccentricityInputLabel: '输入离心率 e (必须 > 1)：',
      typicalE: '常用真题 e：',
      ratioLabel: '推导比值 b/a = √(e² - 1)：',
      asymptoteIfX: '若焦点在 x 轴，渐近线方程：',
      asymptoteIfY: '若焦点在 y 轴，渐近线方程：',
      angleBetween: '两渐近线夹角 θ (开口大小)：',
      geometricInsight: '💡 几何直观规律：离心率 e 越大，比值 b/a 越大，渐近线夹角 θ 越大，双曲线的两支张角越开阔！当 e = √2 时，θ = 90°，两渐近线互相垂直，此时为等轴双曲线。',
    },
    comparison: {
      title: '高考圆锥曲线「双曲线 vs 椭圆」公式极易搞混避坑指南',
      desc: '高中阶段超过 70% 的圆锥曲线失分，源于将椭圆的 a² = b² + c² 与双曲线的 c² = a² + b² 张冠李戴，或是错用焦点判定规则。掌握以下 7 大核心差异，考场秒解不丢分！',
      sloganTitle: '秒记核心口诀：',
      sloganText: '“椭圆 a 当家 (a²=b²+c²)，双曲线 c 称霸 (c²=a²+b²)；椭圆看大小，双曲看正负；渐近线 1 变 0！”',
      tableTitle: '椭圆与双曲线几何性质全景对照表',
      tableSubtitle: '横向对比 · 重点高亮',
      colDimension: '对比维度',
      colEllipse: '椭圆 (Ellipse)',
      colHyperbola: '双曲线 (Hyperbola)',
      rowStandardEq: '标准方程 (焦点在 x 轴)',
      rowIdentity: 'a, b, c 核心恒等式',
      rowIdentityWarn: '🔥 最致命混淆点',
      rowAxisRule: '焦点所在轴判断法则',
      rowEccentricity: '离心率 e 范围与含义',
      rowAsymptote: '渐近线 (Asymptotes)',
      rowFocalTriangle: '焦点三角形 △PF₁F₂ 面积',
      rowDefinition: '第一定义 (到两焦点距离)',
      trap1Title: '陷阱 1：根据 a² 与 b² 大小乱判焦点',
      trap1Wrong: '【错误习惯】：受椭圆影响，看到 x²/9 - y²/16 = 1 就以为焦点在 y 轴（因为 16 > 9）。',
      trap1Correct: '✓ 纠错：双曲线中 x² 是正项，焦点必然在 x 轴！a=3, b=4，与谁大谁小毫不相关！',
      trap2Title: '陷阱 2：勾股关系式公式倒置',
      trap2Wrong: '【错误习惯】：在双曲线中套用 a² = b² + c²，导致算出的 c² 为负数或虚数。',
      trap2Correct: '✓ 纠错：双曲线焦点在两端最外侧，半焦距 c 是最长的量，永远满足 c² = a² + b²！',
      trap3Title: '陷阱 3：渐近线斜率倒置 (b/a vs a/b)',
      trap3Wrong: '【错误习惯】：所有双曲线一律套用 y = ± (b/a)x，遇到焦点在 y 轴就全错。',
      trap3Correct: '✓ 纠错：永远使用“令常数 1 变 0 移项法”！y²/a² - x²/b² = 0 ⇒ y = ± (a/b)x。',
    },
    problems: {
      title: '高考典型真题精解 & 随堂智能自测',
      tabWalkthrough: '典型真题拆解 (3题深度精讲)',
      tabQuiz: '防混淆易错自测题 (4题速刷)',
      trapAlert: '失分陷阱透析：',
      stepSolution: '详细解题步骤：',
      quizIntro: '点击选项即可实时校验，针对常见易混淆概念进行诊断式练习。',
      resetQuiz: '清空重做',
      questionWord: '第',
      correctFeedback: '回答正确！逻辑严密。',
      wrongFeedback: '回答错误，踩中命题人预设陷阱！',
      trapAnalysis: '避坑解析：',
    },
    modal: {
      title: '为什么这个工具刚做出来“没人点、没人用”？',
      subtitle: '深度诊断互联网教育工具冷启动法则与 3 步破局引流方案',
      diagTitle: '客观原因剖析（为什么当前没有访问量？）：',
      diag1: '1. 搜索引擎尚未收录：刚发布的新域名，百度、搜狗、微信“搜一搜”、Google 需要几天到数周的时间爬取与索引，目前自然搜索是搜不到的。',
      diag2: '2. 缺乏种子圈层冷启动：高中生在做圆锥曲线题时，通常只在作业本、题拍拍、作业帮或小红书搜解法，不知道这个工具的独立网址。',
      diag3: '3. 缺少直接的社交裂变动作：工具之前是纯计算界面，缺乏“一键复制标准大题答题步骤”、“一键转发班级群/小红书”的传播触点。',
      strategyTitle: '如何让更多高中生和老师快速用起来？（实操 3 步走）：',
      strat1Title: '① 小红书图文引流',
      strat1Desc: '截取本站的“双曲线配方法拆解”和“椭圆对比表”，配标题《圆锥曲线防混淆小抄》，流量极大！',
      strat2Title: '② 班级与作业群安利',
      strat2Desc: '发在高中生QQ群、微信年级群：“遇到双曲线大题算不出渐近线的，用这个工具可以直接出标准答题步骤”。',
      strat3Title: '③ 知乎/B站高考答疑',
      strat3Desc: '在“高考数学解析几何如何拿满分”相关高赞问题下分享本工具的“双解防漏解法则”。',
      promoLabel: '现成推广文案（点击直接复制到微信 / QQ / 小红书）：',
      copyPromoBtn: '一键复制推荐文案',
      copiedPromo: '已复制推广文案！',
      copyLinkBtn: '复制网址',
      copiedLink: '链接已复制！',
      closeBtn: '关闭窗口',
    },
  },
};
