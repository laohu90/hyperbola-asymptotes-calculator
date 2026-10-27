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
    about: string;
    privacy: string;
    tabViewMode?: string;
    scrollViewMode?: string;
    shareLink?: string;
    shareCopiedToast?: string;
    faq?: string;
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
    exportPng?: string;
    exportPngSuccess?: string;
    touchHint?: string;
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
    quickPasteLabel: string;
    quickPastePlaceholder: string;
    quickParseBtn: string;
    asymptote3Forms: string;
    pointSlopeForm: string;
    slopeInterceptForm: string;
    generalLinearForm: string;
    angleDefinitionNote: string;
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
    pasteHelpTip: string;
    threeAsymptoteForms: string;
    pointSlopeForm: string;
    slopeInterceptForm: string;
    generalLinearForm: string;
    angleDefinitionNote: string;
    categoryAll?: string;
    categoryBasic?: string;
    categoryExam?: string;
    categoryRadicals?: string;
    categoryDecimals?: string;
    quickSymbols?: string;
    copyLatex?: string;
    copiedLatex?: string;
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
    tabKE: string;
    tabAsymptotePoint: string;
    tabFociVertices: string;
    tool2Heading: string;
    tool2Sub: string;
    slopeKLabel: string;
    pointXLabel: string;
    pointYLabel: string;
    ex1Btn: string;
    ex2Btn: string;
    solvedEqTitle: string;
    applyToCanvasBtn: string;
    tool3Heading: string;
    tool3Sub: string;
    focalAxisLabel: string;
    semiALabel: string;
    semiCLabel: string;
    pythagoreanBtn: string;
    ex3Btn: string;
    solvedResultTitle: string;
    acuteIntersectionAngle: string;
    angleNoticeDetail: string;
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
    axisRuleEllipseDetail?: string;
    axisRuleHyperbolaDetail?: string;
    asymptoteNoneDetail?: string;
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
    walkthroughSubtitle: string;
    quizSubtitle: string;
    questionWord: string;
    trapWarningTitle: string;
    showStepsBtn: string;
    hideStepsBtn: string;
    yourAnswer: string;
    checkAnswerBtn: string;
    correctBadge: string;
    incorrectBadge: string;
    quizScore: string;
    resetQuiz: string;
    trapAlert: string;
    quizIntro: string;
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
    growthTip: string;
  };
  footer: {
    aboutLink: string;
    privacyLink: string;
    errataLink: string;
    rights: string;
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
      shareGuide: 'Growth & Share',
      about: 'About & Formulas',
      privacy: 'Privacy Policy',
      tabViewMode: 'Tab View Mode',
      scrollViewMode: 'Scroll All Mode',
      shareLink: 'Share Link',
      shareCopiedToast: 'Share link copied! Opening it restores these exact parameters and graph.',
      faq: 'FAQ & Formulas',
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
      title: 'Interactive Cartesian Coordinate Stage',
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
      exportPng: 'Export PNG Image',
      exportPngSuccess: 'High-res image downloaded successfully!',
      touchHint: '💡 Touch gestures: Single finger pan, two-finger pinch to zoom, double tap to center',
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
      denomA2: 'Transverse Denominator a²:',
      semiMinorB: 'Conjugate Semi-axis b (Imaginary):',
      denomB2: 'Conjugate Denominator b²:',
      centerOffset: 'Center Position (h, k):',
      realAxisLength: 'Transverse Axis Length 2a =',
      imaginaryAxisLength: 'Conjugate Axis Length 2b =',
      presetsLabel: 'Exam Presets:',
      presetPythagorean: 'a=3, b=4 (Pythagorean 3-4-5)',
      presetEquilateral: 'a=2, b=2 (Rectangular e=√2)',
      presetAngle60: 'a=1, b=√3 (30°-60°-90° Triangle)',
      currentEquation: 'Standard Hyperbola Equation:',
      asymptoteTitle: 'Asymptote Equations',
      asymptoteTrickTitle: 'Shortcut Rule (Set 1 to 0):',
      asymptoteTrickDesc: 'Replace 1 on the RHS of standard form with 0, then factor immediately:',
      asymptoteNotice: '★ Tip: Horizontal focus yields y = ±(b/a)x; Vertical focus yields y = ±(a/b)x.',
      focalDistanceC: 'Semi-Focal Distance c',
      eccentricityE: 'Eccentricity e (e > 1)',
      angleTheta: 'Branch Opening Angle θ',
      verticesLabel: 'Vertices A₁, A₂',
      fociLabel: 'Foci F₁, F₂',
      latusRectum: 'Focal Latus Rectum (2b²/a)',
      copySummaryBtn: 'Copy Full Properties Summary',
      copiedSuccess: 'Copied to Clipboard!',
      quickPasteLabel: 'Quick Paste / Parse Standard Form Equation:',
      quickPastePlaceholder: 'Paste standard equation e.g. (x-1)²/25 - (y+2)²/16 = 1',
      quickParseBtn: 'Parse & Load',
      asymptote3Forms: 'Asymptote Equations (3 Full Representations)',
      pointSlopeForm: '① Point-Slope Form',
      slopeInterceptForm: '② Slope-Intercept Form',
      generalLinearForm: '③ General Linear Form',
      angleDefinitionNote: 'Angle Note: θ is the opening angle enclosing the real axis branches (θ = 2·arctan(b/a)); the acute intersection angle between asymptotes is min(θ, 180° - θ).',
    },
    completingSquare: {
      title: 'Step-by-Step Completing the Square Solver',
      subtitle: 'Converts General Form Ax² + Cy² + Dx + Ey + F = 0 into Standard Hyperbola Form with 6 exam scoring checkpoints.',
      pasteLabel: 'Paste Any Conic Equation (General or Standard Form):',
      pastePlaceholder: 'e.g. 4x² - 9y² - 16x - 18y = 29 or (x-2)²/9 - (y+1)²/4 = 1',
      solveBtn: 'Solve Step-by-Step',
      manualLabel: 'Or Adjust Coefficients A, C, D, E, F Manually:',
      currentEq: 'Current General Equation:',
      isHyperbola: '✓ Valid Hyperbola (A·C < 0)',
      notHyperbola: '✗ Invalid (A·C ≥ 0 or Degenerate)',
      copyExamFormat: 'Copy Standard Exam Answer Sheet Format',
      copiedExam: 'Exam Format Copied!',
      togglePreview: 'Preview Exam Answer Sheet',
      hidePreview: 'Hide Answer Sheet Preview',
      printCard: 'Print / Save Solution',
      stepByStepTitle: '6-Step Algebraic Solution Walkthrough',
      applyToCanvas: 'Sync Solution to Interactive Graph',
      stepWord: 'Step',
      coreTip: 'Exam Marking Tip:',
      summaryTitle: 'Derived Geometric Properties Summary',
      focalAxisDirection: 'Focal Axis Direction:',
      centerCoords: 'Center C(h, k):',
      semiAxes: 'Semi-axes (a, b):',
      fociAndEccentricity: 'Focal Length c & Eccentricity e:',
      asymptoteEquations: 'Asymptote Equations:',
      asymptoteAngle: 'Branch Angle θ =',
      pasteHelpTip: 'Supports general form 4x² - 9y² - 16x - 18y = 29 and standard form (x-2)²/9 - (y+1)²/4 = 1.',
      threeAsymptoteForms: 'Asymptotes (3 Standard Representations):',
      pointSlopeForm: '① Point-Slope Form',
      slopeInterceptForm: '② Slope-Intercept Form',
      generalLinearForm: '③ General Linear Form',
      angleDefinitionNote: 'Angle Note: θ is the opening angle enclosing the real axis branches; the acute intersection angle is min(θ, 180° - θ).',
      categoryAll: 'All Presets',
      categoryBasic: 'Basic Integers',
      categoryExam: 'Exam Classic',
      categoryRadicals: 'Radicals & Fractions',
      categoryDecimals: 'Decimals & Complex',
      quickSymbols: 'Quick math symbols:',
      copyLatex: 'Copy LaTeX / Steps',
      copiedLatex: 'Steps copied to clipboard!',
    },
    eccentricityTool: {
      coreRelationTitle: 'Eccentricity e & Asymptote Slope k Core Theorem',
      coreRelationDesc: 'Because in hyperbolas c² = a² + b², dividing by a² gives e² = 1 + (b/a)². Slope k directly relates to eccentricity:',
      caseXTitle: 'Transverse Axis Horizontal (Parallel to x-axis)',
      caseYTitle: 'Transverse Axis Vertical (Parallel to y-axis)',
      tool1Title: 'Tool 1: Given Asymptote Slope k → Find Eccentricity e (Dual-Solution Trap Solver)',
      tool1Warning: '★ Exam Warning: If focal axis direction is not specified, you MUST calculate BOTH cases!',
      slopeInputLabel: 'Asymptote Line Slope k (for line y = ± kx):',
      typicalSlopes: 'Typical Exam Slopes:',
      caseASolution: 'Case A: Transverse Axis Horizontal',
      caseBSolution: 'Case B: Transverse Axis Vertical',
      tool2Title: 'Tool 2: Given Eccentricity e → Find Asymptote Slopes & Opening Angle θ',
      eccentricityInputLabel: 'Eccentricity Value e (e > 1):',
      typicalE: 'Typical Exam e Values:',
      ratioLabel: 'Semi-axis Ratio (b/a = √(e² - 1))',
      asymptoteIfX: 'Asymptotes (if Transverse Axis Horizontal)',
      asymptoteIfY: 'Asymptotes (if Transverse Axis Vertical)',
      angleBetween: 'Asymptote Angles',
      geometricInsight: 'Geometric Insight: As eccentricity e increases, the opening angle θ widens and hyperbola branches become flatter.',
      tabKE: 'Eccentricity e ↔ Slope k Dual Conversion',
      tabAsymptotePoint: '[Exam Focus] Asymptote + Point Solver',
      tabFociVertices: '[Classic Problem] Foci & Vertices Solver',
      tool2Heading: 'Solve Hyperbola Equation from Asymptotes + Point P(x₀, y₀)',
      tool2Sub: 'Uses the asymptotic hyperbola family k²(x-h)² - (y-k)² = λ to determine focal axis and standard form seamlessly.',
      slopeKLabel: 'Asymptote Slope k (y = ± kx)',
      pointXLabel: 'Point P x-coordinate x₀',
      pointYLabel: 'Point P y-coordinate y₀',
      ex1Btn: 'Example 1: P(5,0)',
      ex2Btn: 'Example 2: P(0,3)',
      solvedEqTitle: 'Derived Standard Equation:',
      applyToCanvasBtn: 'Sync to Interactive Graph',
      tool3Heading: 'Solve Hyperbola Equation from Foci & Vertices (a & c)',
      tool3Sub: 'Computes conjugate semi-axis b via c² = a² + b² and outputs standard equation, eccentricity e, and asymptotes.',
      focalAxisLabel: 'Focal Axis Direction',
      semiALabel: 'Transverse Semi-axis a',
      semiCLabel: 'Semi-focal Distance c',
      pythagoreanBtn: 'Pythagorean: a=3, c=5',
      ex3Btn: 'Example: a=2, c=4',
      solvedResultTitle: 'Standard Equation Result:',
      acuteIntersectionAngle: 'Acute Intersection Angle',
      angleNoticeDetail: 'Angle Definition Note: θ is the opening angle enclosing the real axis branches (θ = 2·arctan(b/a) or 2·arctan(a/b)). The acute intersection angle between lines is min(θ, 180° - θ) ≤ 90°.',
    },
    comparison: {
      title: 'Hyperbola vs Ellipse Anti-Confusion Comparison Matrix',
      desc: 'Master key differences in formulas, Pythagorean identities, axis determination rules, and eccentricity bounds to eliminate exam mistakes.',
      sloganTitle: '★ Mnemonics to Remember:',
      sloganText: 'Ellipse: "a is largest" (a² = b² + c², 0 < e < 1, no asymptotes). Hyperbola: "c is largest" (c² = a² + b², e > 1, 2 asymptotes).',
      tableTitle: '7-Dimension Formula & Property Contrast Table',
      tableSubtitle: 'Side-by-side comparison for exam preparation',
      colDimension: 'Dimension / Property',
      colEllipse: 'Ellipse',
      colHyperbola: 'Hyperbola',
      rowStandardEq: 'Standard Equations',
      rowIdentity: 'Pythagorean Identity',
      rowIdentityWarn: '★ CRITICAL DIFFERENCE',
      rowAxisRule: 'Major / Transverse Axis Determination',
      rowEccentricity: 'Eccentricity Range & Formula',
      rowAsymptote: 'Asymptotes',
      rowFocalTriangle: 'Focal Triangle Area Formula',
      rowDefinition: 'Locus Definition',
      axisRuleEllipseDetail: 'Check denominator sizes: larger denominator determines focal axis (e.g., x²/16 + y²/9 ⇒ x-axis)',
      axisRuleHyperbolaDetail: 'Check sign (+): positive term determines focal axis (e.g., x²/9 - y²/16 ⇒ x-axis, regardless of denominator)',
      asymptoteNoneDetail: 'None (ellipse is a smooth closed curve)',
      trap1Title: 'Trap 1: Confusing Pythagorean Identities',
      trap1Wrong: 'Wrong: Using a² = b² + c² for hyperbola',
      trap1Correct: 'Correct: Hyperbola has c² = a² + b² (c is the focal distance, always largest)',
      trap2Title: 'Trap 2: Determining Axis Direction',
      trap2Wrong: 'Wrong: Thinking largest denominator is a² in hyperbola',
      trap2Correct: 'Correct: In hyperbola, a² is under the POSITIVE term, regardless of magnitude!',
      trap3Title: 'Trap 3: Dual Solutions in Asymptotes',
      trap3Wrong: 'Wrong: Assuming slope k = b/a means horizontal axis only',
      trap3Correct: 'Correct: If axis is vertical, slope k = a/b, yielding two distinct eccentricity values',
    },
    problems: {
      title: 'Classic Exam Problems & Interactive Quiz Bank',
      tabWalkthrough: '4 Exam Problem Walkthroughs',
      tabQuiz: 'Interactive Practice Quiz',
      walkthroughSubtitle: 'Detailed solutions and scoring checkpoints for representative exam questions.',
      quizSubtitle: 'Test your mastery and learn to identify common exam traps.',
      questionWord: 'Question',
      trapWarningTitle: '★ Common Exam Trap:',
      showStepsBtn: 'View Detailed Solution Steps',
      hideStepsBtn: 'Hide Solution Steps',
      yourAnswer: 'Select your answer:',
      checkAnswerBtn: 'Submit Answer',
      correctBadge: 'Correct!',
      incorrectBadge: 'Incorrect - Review Trap Warning below',
      quizScore: 'Quiz Score',
      resetQuiz: 'Retry Quiz',
      trapAlert: 'Exam Trap Alert',
      quizIntro: 'Interactive quiz testing core hyperbola concepts and common exam pitfalls.',
      correctFeedback: 'Correct Answer! Mastered this concept.',
      wrongFeedback: 'Incorrect Answer - Review Trap Analysis below',
      trapAnalysis: 'Exam Trap Analysis',
    },
    modal: {
      title: 'SEO & Traffic Distribution Dashboard',
      subtitle: 'Analyze traffic acquisition strategies, search keyword optimization, and multi-language social distribution.',
      diagTitle: 'SEO & Content Competitor Analysis',
      diag1: '• Target Search Queries: "hyperbola asymptotes calculator", "completing the square hyperbola", "hyperbola eccentricity formula", "hyperbola vs ellipse".',
      diag2: '• User Search Intent: Students & teachers seeking step-by-step complete-the-square algebra breakdowns and instant asymptote slope calculations.',
      diag3: '• Advantage over generic calculators: Clean pure-white UI, zero ads, 5 languages, exact fraction/radical precision, and interactive geometry canvas.',
      strategyTitle: 'Growth & Organic Distribution Strategy',
      strat1Title: '1. Rich Snippets',
      strat1Desc: 'Pre-configured Schema.org WebApplication & FAQPage JSON-LD structured data for Google search results.',
      strat2Title: '2. Multilingual SEO',
      strat2Desc: 'Canonical tags & hreflang alternates for English, Spanish, French, Portuguese, and Chinese.',
      strat3Title: '3. Social Sharing',
      strat3Desc: 'OpenGraph and Twitter Card tags generate rich visual previews on Slack, Discord, X, and Reddit.',
      promoLabel: 'Quick Share Post Text (Matches Current Language):',
      copyPromoBtn: 'Copy Promo Post',
      copiedPromo: 'Post Copied!',
      copyLinkBtn: 'Copy Web Link',
      copiedLink: 'Link Copied!',
      closeBtn: 'Close',
      growthTip: 'Pro Tip: Share this link on STEM education forums, Reddit r/math, or Discord study servers.',
    },
    footer: {
      aboutLink: 'About & Formulas',
      privacyLink: 'Privacy Policy',
      errataLink: 'Report Errata',
      rights: '© 2026 Hyperbola & Conic Sections Lab. All rights reserved. Built for STEM education.',
    },
  },

  es: {
    meta: {
      title: 'Calculadora de Hipérbola: Asíntotas y Excentricidad | Completar el Cuadrado',
      description: 'Calculadora interactiva de hipérbolas: asíntotas, excentricidad, forma canónica paso a paso por completación de cuadrados y matriz comparativa con la elipse.',
      keywords: 'calculadora hiperbola, asintotas hiperbola, excentricidad hiperbola, completar el cuadrado hiperbola, secciones conicas',
    },
    nav: {
      brand: 'Laboratorio de Cónicas e Hipérbolas',
      standard: 'Calculadora Canónica',
      completingSquare: 'Completar el Cuadrado',
      eccentricity: 'Excentricidad y Asíntotas',
      comparison: 'Hipérbola vs Elipse',
      quiz: 'Ejercicios y Test',
      reset: 'Reiniciar',
      shareGuide: 'Compartir y Difusión',
      about: 'Acerca de y Fórmulas',
      privacy: 'Política de Privacidad',
    },
    hero: {
      badge: 'Geometría Analítica de Bachillerato y Universidad · Dominio de Cónicas',
      title: 'Calculadora de Asíntotas y Excentricidad de la Hipérbola',
      subtitle: 'Domina las secciones cónicas: reconocimiento de ecuaciones, completamiento de cuadrados en 6 pasos paso a paso y prevención de errores comunes.',
      ctaCompletingSquare: 'Resolver por Completación de Cuadrados',
      card1Title: '① Calculadora de Asíntotas',
      card1Sub: 'Asíntotas instantáneas y rectángulo',
      card2Title: '② Completar el Cuadrado',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Paso a Paso',
      card3Title: '③ Excentricidad y Doble Solución',
      card3Sub: 'Calcula e desde la pendiente k',
      card4Title: '④ Hipérbola vs Elipse',
      card4Sub: 'Comparativa c²=a²+b² vs a²=b²+c²',
    },
    canvas: {
      title: 'Lienzo Interactivo de Coordenadas Cartesianas',
      paramsSubtitle: 'Semieje a={a} · Semieje b={b} · Distancia focal c={c}',
      showAsymptotes: 'Asíntotas',
      showBox: 'Rectángulo Central (2a×2b)',
      showFoci: 'Focos F₁ F₂',
      showEllipse: 'Elipse Comparativa',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      resetView: 'Restablecer Vista',
      mainCurve: 'Ramas de la Hipérbola',
      asymptotes: 'Asíntotas y = ±(b/a)x',
      foci: 'Focos',
      comparisonEllipse: 'Elipse Comparativa',
      tip: 'Arrastre para desplazar · Rueda para zoom · Pase el cursor para comprobar ||PF₁| - |PF₂|| = 2a',
      pointP: 'Punto P sobre la hipérbola',
    },
    calculator: {
      title: 'Calculadora de Parámetros Geométricos y Asíntotas',
      horizontalAxis: 'Eje Focal Horizontal (x²/a² - y²/b² = 1)',
      verticalAxis: 'Eje Focal Vertical (y²/a² - x²/b² = 1)',
      modeSlider: 'Modo de Ajuste',
      modeLinear: 'Ingresar a, b (Semiejes)',
      modeSquared: 'Ingresar a², b² (Denominadores)',
      equilateralBadge: '★ Hipérbola Equilátera (a = b, e = √2, 90°)',
      semiMajorA: 'Semieje Real a (Transverso):',
      denomA2: 'Denominador Real a²:',
      semiMinorB: 'Semieje Imaginario b (Conjugado):',
      denomB2: 'Denominador Imaginario b²:',
      centerOffset: 'Posición del Centro (h, k):',
      realAxisLength: 'Longitud del Eje Real 2a =',
      imaginaryAxisLength: 'Longitud del Eje Imaginario 2b =',
      presetsLabel: 'Preajustes de Examen:',
      presetPythagorean: 'a=3, b=4 (Terna 3-4-5)',
      presetEquilateral: 'a=2, b=2 (Equilátera e=√2)',
      presetAngle60: 'a=1, b=√3 (Ángulos 30°-60°)',
      currentEquation: 'Ecuación Canónica:',
      asymptoteTitle: 'Ecuaciones de las Asíntotas',
      asymptoteTrickTitle: 'Regla Rápida (Sustituir 1 por 0):',
      asymptoteTrickDesc: 'Reemplaza el 1 del lado derecho por 0 y factoriza inmediatamente:',
      asymptoteNotice: '★ Nota: Eje horizontal da y = ±(b/a)x; Eje vertical da y = ±(a/b)x.',
      focalDistanceC: 'Semidistancia Focal c',
      eccentricityE: 'Excentricidad e (e > 1)',
      angleTheta: 'Ángulo entre Ramas θ',
      verticesLabel: 'Vértices A₁, A₂',
      fociLabel: 'Focos F₁, F₂',
      latusRectum: 'Latus Rectum (2b²/a)',
      copySummaryBtn: 'Copiar Resumen de Propiedades',
      copiedSuccess: '¡Copiado al Portapapeles!',
      quickPasteLabel: 'Pegar / Analizar Ecuación Canónica:',
      quickPastePlaceholder: 'Pegue ecuación ej. (x-1)²/25 - (y+2)²/16 = 1',
      quickParseBtn: 'Analizar y Cargar',
      asymptote3Forms: 'Asíntotas (3 Representaciones Completas)',
      pointSlopeForm: '① Forma Punto-Pendiente',
      slopeInterceptForm: '② Forma Explícita (y = mx + b)',
      generalLinearForm: '③ Forma General (Ax + By + C = 0)',
      angleDefinitionNote: 'Nota del ángulo: θ es el ángulo de apertura que encierra el eje real; el ángulo agudo de intersección es min(θ, 180° - θ).',
    },
    completingSquare: {
      title: 'Solucionador Paso a Paso por Completamiento de Cuadrados',
      subtitle: 'Convierte la Forma General Ax² + Cy² + Dx + Ey + F = 0 a Forma Canónica con 6 pasos de examen.',
      pasteLabel: 'Pegar Ecuación Cónica (General o Canónica):',
      pastePlaceholder: 'ej. 4x² - 9y² - 16x - 18y = 29 o (x-2)²/9 - (y+1)²/4 = 1',
      solveBtn: 'Resolver Paso a Paso',
      manualLabel: 'O Ajustar Coeficientes A, C, D, E, F Manualmente:',
      currentEq: 'Ecuación General Actual:',
      isHyperbola: '✓ Hipérbola Válida (A·C < 0)',
      notHyperbola: '✗ Inválida (A·C ≥ 0 o Degenerada)',
      copyExamFormat: 'Copiar Formato de Examen Estándar',
      copiedExam: '¡Formato Copiado!',
      togglePreview: 'Vista Previa del Examen',
      hidePreview: 'Ocultar Vista Previa',
      printCard: 'Imprimir / Guardar Solución',
      stepByStepTitle: 'Desglose en 6 Pasos Algebraicos',
      applyToCanvas: 'Sincronizar con el Lienzo Interactivo',
      stepWord: 'Paso',
      coreTip: 'Consejo de Examen:',
      summaryTitle: 'Resumen de Propiedades Obtenidas',
      focalAxisDirection: 'Dirección del Eje Focal:',
      centerCoords: 'Centro C(h, k):',
      semiAxes: 'Semiejes (a, b):',
      fociAndEccentricity: 'Distancia Focal c y Excentricidad e:',
      asymptoteEquations: 'Ecuaciones de Asíntotas:',
      asymptoteAngle: 'Ángulo entre Ramas θ =',
      pasteHelpTip: 'Admite forma general 4x² - 9y² - 16x - 18y = 29 y canónica (x-2)²/9 - (y+1)²/4 = 1.',
      threeAsymptoteForms: 'Asíntotas (3 Formas Estándar):',
      pointSlopeForm: '① Forma Punto-Pendiente',
      slopeInterceptForm: '② Forma Explícita',
      generalLinearForm: '③ Forma General',
      angleDefinitionNote: 'Nota: θ es el ángulo entre ramas que encierra el eje real; el ángulo agudo es min(θ, 180° - θ).',
    },
    eccentricityTool: {
      coreRelationTitle: 'Teorema de Relación entre Excentricidad e y Pendiente k',
      coreRelationDesc: 'Dado que en la hipérbola c² = a² + b², dividiendo entre a² se obtiene e² = 1 + (b/a)². La pendiente k se relaciona directamente con la excentricidad:',
      caseXTitle: 'Eje Focal Horizontal (Paralelo al eje x)',
      caseYTitle: 'Eje Focal Vertical (Paralelo al eje y)',
      tool1Title: 'Herramienta 1: Pendiente de Asíntota k → Excentricidad e (Trampa de Doble Solución)',
      tool1Warning: '★ Advertencia de Examen: Si no se especifica la dirección del eje focal, ¡DEBES calcular AMBOS casos!',
      slopeInputLabel: 'Pendiente de la asíntota k (para y = ± kx):',
      typicalSlopes: 'Pendientes Típicas:',
      caseASolution: 'Caso A: Eje Focal Horizontal',
      caseBSolution: 'Caso B: Eje Focal Vertical',
      tool2Title: 'Herramienta 2: Excentricidad e → Pendientes y Ángulo de Apertura θ',
      eccentricityInputLabel: 'Valor de Excentricidad e (e > 1):',
      typicalE: 'Valores Típicos de e:',
      ratioLabel: 'Razón de Semiejes (b/a = √(e² - 1))',
      asymptoteIfX: 'Asíntotas (si el Eje es Horizontal)',
      asymptoteIfY: 'Asíntotas (si el Eje es Vertical)',
      angleBetween: 'Ángulos de Asíntotas',
      geometricInsight: 'Perspectiva Geométrica: Conforme la excentricidad e aumenta, las ramas se vuelven más abiertas y planas.',
      tabKE: 'Conversión Doble e ↔ Pendiente k',
      tabAsymptotePoint: 'Asíntota + Punto (Tipo Examen)',
      tabFociVertices: 'Focos y Vértices → Ecuación',
      tool2Heading: 'Ecuación a partir de Asíntotas + Punto P(x₀, y₀)',
      tool2Sub: 'Aplica la familia de hipérbolas k²(x-h)² - (y-k)² = λ para determinar el eje y la ecuación canónica.',
      slopeKLabel: 'Pendiente k (y = ± kx)',
      pointXLabel: 'Coordenada x₀ del Punto P',
      pointYLabel: 'Coordenada y₀ del Punto P',
      ex1Btn: 'Ejemplo 1: P(5,0)',
      ex2Btn: 'Ejemplo 2: P(0,3)',
      solvedEqTitle: 'Ecuación Canónica Obtenida:',
      applyToCanvasBtn: 'Sincronizar con el Lienzo',
      tool3Heading: 'Ecuación a partir de Focos y Vértices (a y c)',
      tool3Sub: 'Calcula el semieje imaginario b mediante c² = a² + b² y obtiene la excentricidad e y asíntotas.',
      focalAxisLabel: 'Dirección del Eje Focal',
      semiALabel: 'Semieje Real a',
      semiCLabel: 'Semidistancia Focal c',
      pythagoreanBtn: 'Pitagórico: a=3, c=5',
      ex3Btn: 'Ejemplo: a=2, c=4',
      solvedResultTitle: 'Resultado de la Ecuación Canónica:',
      acuteIntersectionAngle: 'Ángulo Agudo de Intersección',
      angleNoticeDetail: 'Nota del ángulo: θ es el ángulo de apertura de las ramas que encierran el eje real (θ = 2·arctan(b/a) o 2·arctan(a/b)). El ángulo agudo es min(θ, 180° - θ) ≤ 90°.',
    },
    comparison: {
      title: 'Matriz Comparativa Hipérbola vs Elipse',
      desc: 'Compara las diferencias clave en fórmulas, identidades pitagóricas, reglas de ejes y excentricidad.',
      sloganTitle: '★ Reglas para Recordar:',
      sloganText: 'Elipse: "a es la mayor" (a² = b² + c², 0 < e < 1, sin asíntotas). Hipérbola: "c es la mayor" (c² = a² + b², e > 1, 2 asíntotas).',
      tableTitle: 'Tabla Comparativa de 7 Dimensiones',
      tableSubtitle: 'Análisis detallado para preparación de exámenes',
      colDimension: 'Dimensión / Propiedad',
      colEllipse: 'Elipse',
      colHyperbola: 'Hipérbola',
      rowStandardEq: 'Ecuaciones Canónicas',
      rowIdentity: 'Identidad Pitagórica',
      rowIdentityWarn: '★ DIFERENCIA CRUCIAL',
      rowAxisRule: 'Determinación del Eje Principal',
      rowEccentricity: 'Rango de Excentricidad y Fórmula',
      rowAsymptote: 'Asíntotas',
      rowFocalTriangle: 'Área del Triángulo Focal',
      rowDefinition: 'Lugar Geométrico',
      trap1Title: 'Trampa 1: Confundir Identidades Pitagóricas',
      trap1Wrong: 'Incorrecto: Usar a² = b² + c² en la hipérbola',
      trap1Correct: 'Correcto: La hipérbola cumple c² = a² + b² (c es la distancia focal, siempre la mayor)',
      trap2Title: 'Trampa 2: Determinar la Dirección del Eje',
      trap2Wrong: 'Incorrecto: Pensar que el denominador más grande es a²',
      trap2Correct: 'Correcto: En la hipérbola, a² está debajo del término POSITIVO',
      trap3Title: 'Trampa 3: Soluciones Dobles en Asíntotas',
      trap3Wrong: 'Incorrecto: Asumir que la pendiente k = b/a implica solo eje horizontal',
      trap3Correct: 'Correcto: Si el eje es vertical, la pendiente k = a/b, dando dos valores de excentricidad',
    },
    problems: {
      title: 'Ejercicios de Examen y Test Interactivo',
      tabWalkthrough: '4 Ejercicios Resueltos',
      tabQuiz: 'Test Interactivo de Opción Múltiple',
      walkthroughSubtitle: 'Soluciones detalladas con criterios de corrección.',
      quizSubtitle: 'Pone a prueba tus conocimientos e identifica trampas de examen.',
      questionWord: 'Pregunta',
      trapWarningTitle: '★ Trampa Común de Examen:',
      showStepsBtn: 'Ver Pasos de la Solución',
      hideStepsBtn: 'Ocultar Pasos',
      yourAnswer: 'Selecciona tu respuesta:',
      checkAnswerBtn: 'Enviar Respuesta',
      correctBadge: '¡Correcto!',
      incorrectBadge: 'Incorrecto - Revisa la advertencia',
      quizScore: 'Puntuación del Test',
      resetQuiz: 'Reiniciar Test',
      trapAlert: 'Alerta de Trampa de Examen',
      quizIntro: 'Cuestionario interactivo sobre conceptos clave de la hipérbola y trampas comunes.',
      correctFeedback: '¡Respuesta Correcta!',
      wrongFeedback: 'Respuesta Incorrecta - Revisa el análisis abajo',
      trapAnalysis: 'Análisis de la Trampa',
    },
    modal: {
      title: 'Panel de Estrategia SEO y Difusión',
      subtitle: 'Estrategias de adquisición de tráfico, optimización de palabras clave y distribución en redes sociales.',
      diagTitle: 'Análisis de Contenido y Búsqueda',
      diag1: '• Términos objetivo: "calculadora hiperbola", "completar el cuadrado hiperbola", "excentricidad hiperbola", "asintotas hiperbola".',
      diag2: '• Intención del usuario: Estudiantes y profesores que buscan resolución paso a paso.',
      diag3: '• Ventajas: Diseño limpio sin anuncios, 5 idiomas, precisión exacta con fracciones y lienzo interactivo.',
      strategyTitle: 'Estrategia de Crecimiento Orgánico',
      strat1Title: '1. Rich Snippets',
      strat1Desc: 'Datos estructurados Schema.org para mejores resultados en Google.',
      strat2Title: '2. SEO Multilingüe',
      strat2Desc: 'Etiquetas canonical y hreflang para 5 idiomas.',
      strat3Title: '3. Tarjetas Sociales',
      strat3Desc: 'Vista previa optimizada en OpenGraph y Twitter Cards.',
      promoLabel: 'Texto para Compartir:',
      copyPromoBtn: 'Copiar Texto',
      copiedPromo: '¡Copiado!',
      copyLinkBtn: 'Copiar Enlace Web',
      copiedLink: '¡Enlace Copiado!',
      closeBtn: 'Cerrar',
      growthTip: 'Consejo: Comparta este enlace en foros educativos y grupos de estudio.',
    },
    footer: {
      aboutLink: 'Acerca de y Fórmulas',
      privacyLink: 'Política de Privacidad',
      errataLink: 'Reportar Errata',
      rights: '© 2026 Laboratorio de Cónicas e Hipérbolas. Todos los derechos reservados.',
    },
  },

  fr: {
    meta: {
      title: 'Calculateur d\'Hyperbole : Asymptotes & Excentricité | Forme Canonique',
      description: 'Solveur visuel d\'hyperboles : asymptotes, excentricité, décomposition pas à pas par complétion de carrés et tableau comparatif hyperbole vs ellipse.',
      keywords: 'calculateur hyperbole, asymptotes hyperbole, excentricité hyperbole, forme canonique hyperbole, coniques',
    },
    nav: {
      brand: 'Laboratoire des Coniques & Hyperboles',
      standard: 'Calculateur Réduit',
      completingSquare: 'Complétion du Carré',
      eccentricity: 'Excentricité & Asymptotes',
      comparison: 'Hyperbole vs Ellipse',
      quiz: 'Exercices & Quiz',
      reset: 'Réinitialiser',
      shareGuide: 'Partage & Diffusion',
      about: 'À propos & Formules',
      privacy: 'Confidentialité',
    },
    hero: {
      badge: 'Géométrie Analytique du Lycée et du Supérieur · Maîtrise des Coniques',
      title: 'Solveur Visuel d\'Asymptotes et d\'Excentricité d\'Hyperbole',
      subtitle: 'Maîtrisez les coniques : reconnaissance d\'équations, forme canonique pas à pas en 6 étapes et prévention des erreurs classiques.',
      ctaCompletingSquare: 'Résoudre par Complétion du Carré',
      card1Title: '① Calculateur d\'Asymptotes',
      card1Sub: 'Asymptotes instantanées et rectangle',
      card2Title: '② Complétion du Carré',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Pas à Pas',
      card3Title: '③ Excentricité & Piège',
      card3Sub: 'Calcule e à partir de la pente k',
      card4Title: '④ Hyperbole vs Ellipse',
      card4Sub: 'Comparaison c²=a²+b² vs a²=b²+c²',
    },
    canvas: {
      title: 'Repère Cartésien Interactif',
      paramsSubtitle: 'Demi-axe a={a} · Demi-axe b={b} · Distance focale c={c}',
      showAsymptotes: 'Asymptotes',
      showBox: 'Rectangle Central (2a×2b)',
      showFoci: 'Foyers F₁ F₂',
      showEllipse: 'Ellipse Comparative',
      zoomIn: 'Agrandir',
      zoomOut: 'Réduire',
      resetView: 'Réinitialiser la Vue',
      mainCurve: 'Branches d\'Hyperbole',
      asymptotes: 'Asymptotes y = ±(b/a)x',
      foci: 'Foyers',
      comparisonEllipse: 'Ellipse Comparative',
      tip: 'Faites glisser pour déplacer · Molette pour zoomer · Survoler pour vérifier ||PF₁| - |PF₂|| = 2a',
      pointP: 'Point P sur l\'hyperbole',
    },
    calculator: {
      title: 'Calculateur de Grandeurs Géométriques & Asymptotes',
      horizontalAxis: 'Axe Focal Horizontal (x²/a² - y²/b² = 1)',
      verticalAxis: 'Axe Focal Vertical (y²/a² - x²/b² = 1)',
      modeSlider: 'Mode de Réglage',
      modeLinear: 'Saisir a, b (Demi-axes)',
      modeSquared: 'Saisir a², b² (Dénominateurs)',
      equilateralBadge: '★ Hyperbole Équilatère (a = b, e = √2, 90°)',
      semiMajorA: 'Demi-axe Transverse a (Réel) :',
      denomA2: 'Dénominateur Transverse a² :',
      semiMinorB: 'Demi-axe Conjugué b (Imaginaire) :',
      denomB2: 'Dénominateur Conjugué b² :',
      centerOffset: 'Position du Centre (h, k) :',
      realAxisLength: 'Longueur de l\'Axe Réel 2a =',
      imaginaryAxisLength: 'Longueur de l\'Axe Imaginaire 2b =',
      presetsLabel: 'Cas d\'Examen Prédéfinis :',
      presetPythagorean: 'a=3, b=4 (Triplet 3-4-5)',
      presetEquilateral: 'a=2, b=2 (Équilatère e=√2)',
      presetAngle60: 'a=1, b=√3 (Angles 30°-60°)',
      currentEquation: 'Équation Réduite Canonique :',
      asymptoteTitle: 'Équations des Asymptotes',
      asymptoteTrickTitle: 'Règle Rapide (Remplacer 1 par 0) :',
      asymptoteTrickDesc: 'Remplacez 1 à droite par 0 et factorisez immédiatement :',
      asymptoteNotice: '★ Remarque : Axe horizontal donne y = ±(b/a)x ; Axe vertical donne y = ±(a/b)x.',
      focalDistanceC: 'Demi-Distance Focale c',
      eccentricityE: 'Excentricité e (e > 1)',
      angleTheta: 'Angle d\'Ouverture θ',
      verticesLabel: 'Sommets A₁, A₂',
      fociLabel: 'Foyers F₁, F₂',
      latusRectum: 'Latus Rectum (2b²/a)',
      copySummaryBtn: 'Copier le Résumé Complet',
      copiedSuccess: 'Copié dans le Presse-papier !',
      quickPasteLabel: 'Coller / Analyser une Équation Canonique :',
      quickPastePlaceholder: 'Collez l\'équation ex. (x-1)²/25 - (y+2)²/16 = 1',
      quickParseBtn: 'Analyser et Charger',
      asymptote3Forms: 'Asymptotes (3 Représentations Complètes)',
      pointSlopeForm: '① Forme Point-Pente',
      slopeInterceptForm: '② Forme Réduite (y = mx + b)',
      generalLinearForm: '③ Forme Générale (Ax + By + C = 0)',
      angleDefinitionNote: 'Remarque : θ est l\'angle d\'ouverture contenant l\'axe réel ; l\'angle aigu d\'intersection est min(θ, 180° - θ).',
    },
    completingSquare: {
      title: 'Solveur Pas à Pas par Complétion du Carré',
      subtitle: 'Transforme la Forme Générale Ax² + Cy² + Dx + Ey + F = 0 en Forme Canonique en 6 étapes.',
      pasteLabel: 'Coller une Équation de Conique (Générale ou Canonique) :',
      pastePlaceholder: 'ex. 4x² - 9y² - 16x - 18y = 29 ou (x-2)²/9 - (y+1)²/4 = 1',
      solveBtn: 'Résoudre Pas à Pas',
      manualLabel: 'Ou Ajuster les Coefficients A, C, D, E, F Manuellement :',
      currentEq: 'Équation Générale Actuelle :',
      isHyperbola: '✓ Hyperbole Valide (A·C < 0)',
      notHyperbola: '✗ Invalide (A·C ≥ 0 ou Dégénérée)',
      copyExamFormat: 'Copier le Format de Rédaction d\'Examen',
      copiedExam: 'Format Copié !',
      togglePreview: 'Aperçu de la Copie d\'Examen',
      hidePreview: 'Masquer l\'Aperçu',
      printCard: 'Imprimer / Enregistrer la Solution',
      stepByStepTitle: 'Décomposition Algébrique en 6 Étapes',
      applyToCanvas: 'Synchroniser avec le Repère Interactif',
      stepWord: 'Étape',
      coreTip: 'Conseil de Rédaction :',
      summaryTitle: 'Résumé des Grandeurs Géométriques Obtenues',
      focalAxisDirection: 'Direction de l\'Axe Focal :',
      centerCoords: 'Centre C(h, k) :',
      semiAxes: 'Demi-axes (a, b) :',
      fociAndEccentricity: 'Distance Focale c & Excentricité e :',
      asymptoteEquations: 'Équations des Asymptotes :',
      asymptoteAngle: 'Angle d\'Ouverture θ =',
      pasteHelpTip: 'Accepte la forme générale 4x² - 9y² - 16x - 18y = 29 et canonique (x-2)²/9 - (y+1)²/4 = 1.',
      threeAsymptoteForms: 'Asymptotes (3 Formes Standards) :',
      pointSlopeForm: '① Forme Point-Pente',
      slopeInterceptForm: '② Forme Réduite',
      generalLinearForm: '③ Forme Générale',
      angleDefinitionNote: 'Remarque : θ est l\'angle d\'ouverture contenant l\'axe réel ; l\'angle aigu d\'intersection est min(θ, 180° - θ).',
    },
    eccentricityTool: {
      coreRelationTitle: 'Théorème de Relation entre Excentricité e et Pente k',
      coreRelationDesc: 'Comme dans l\'hyperbole c² = a² + b², en divisant par a² on obtient e² = 1 + (b/a)². La pente k est directement liée à l\'excentricité :',
      caseXTitle: 'Axe Focal Horizontal (Parallèle à l\'axe x)',
      caseYTitle: 'Axe Focal Vertical (Parallèle à l\'axe y)',
      tool1Title: 'Outil 1 : Pente k → Excentricité e (Résolution du Piège de Double Solution)',
      tool1Warning: '★ Attention Examen : Si la direction de l\'axe n\'est pas précisée, il FAUT calculer les DEUX cas !',
      slopeInputLabel: 'Pente de l\'asymptote k (pour y = ± kx) :',
      typicalSlopes: 'Pentes Classiques d\'Examen :',
      caseASolution: 'Cas A : Axe Focal Horizontal',
      caseBSolution: 'Cas B : Axe Focal Vertical',
      tool2Title: 'Outil 2 : Excentricité e → Pentes & Angle d\'Ouverture θ',
      eccentricityInputLabel: 'Valeur de l\'Excentricité e (e > 1) :',
      typicalE: 'Valeurs Classiques de e :',
      ratioLabel: 'Rapport des Demi-axes (b/a = √(e² - 1))',
      asymptoteIfX: 'Asymptotes (si l\'Axe est Horizontal)',
      asymptoteIfY: 'Asymptotes (si l\'Axe est Vertical)',
      angleBetween: 'Angles des Asymptotes',
      geometricInsight: 'Aperçu Géométrique : Quand e augmente, l\'ouverture θ s\'élargit et les branches deviennent plus meplates.',
      tabKE: 'Conversion Double e ↔ Pente k',
      tabAsymptotePoint: 'Asymptote + Point (Méthode Examen)',
      tabFociVertices: 'Foyers & Sommets → Équation',
      tool2Heading: 'Équation à partir des Asymptotes + Point P(x₀, y₀)',
      tool2Sub: 'Utilise le faisceau d\'hyperboles k²(x-h)² - (y-k)² = λ pour déterminer l\'axe focal et la forme réduite.',
      slopeKLabel: 'Pente k (y = ± kx)',
      pointXLabel: 'Coordonnée x₀ du Point P',
      pointYLabel: 'Coordonnée y₀ du Point P',
      ex1Btn: 'Exemple 1 : P(5,0)',
      ex2Btn: 'Exemple 2 : P(0,3)',
      solvedEqTitle: 'Équation Réduite Obtenue :',
      applyToCanvasBtn: 'Synchroniser avec le Repère',
      tool3Heading: 'Équation à partir des Foyers & Sommets (a et c)',
      tool3Sub: 'Calcule le demi-axe imaginaire b via c² = a² + b² et produit l\'équation réduite, l\'excentricité e et les asymptotes.',
      focalAxisLabel: 'Direction de l\'Axe Focal',
      semiALabel: 'Demi-axe Réel a',
      semiCLabel: 'Demi-distance Focale c',
      pythagoreanBtn: 'Pythagoricien : a=3, c=5',
      ex3Btn: 'Exemple : a=2, c=4',
      solvedResultTitle: 'Résultat de l\'Équation Réduite :',
      acuteIntersectionAngle: 'Angle Aigu d\'Intersection',
      angleNoticeDetail: 'Remarque : θ est l\'angle d\'ouverture contenant l\'axe réel (θ = 2·arctan(b/a) ou 2·arctan(a/b)). L\'angle aigu d\'intersection est min(θ, 180° - θ) ≤ 90°.',
    },
    comparison: {
      title: 'Matrice Comparative Hyperbole vs Ellipse',
      desc: 'Maîtrisez les différences clés dans les formules, identités pythagoriciennes, règles des axes et excentricité.',
      sloganTitle: '★ Règles Mnémoniques :',
      sloganText: 'Ellipse : "a est le plus grand" (a² = b² + c², 0 < e < 1, pas d\'asymptote). Hyperbole : "c est le plus grand" (c² = a² + b², e > 1, 2 asymptotes).',
      tableTitle: 'Tableau Comparatif en 7 Dimensions',
      tableSubtitle: 'Comparaison côte à côte pour la préparation des examens',
      colDimension: 'Dimension / Propriété',
      colEllipse: 'Ellipse',
      colHyperbola: 'Hyperbole',
      rowStandardEq: 'Équations Réduites',
      rowIdentity: 'Identité Pythagoricienne',
      rowIdentityWarn: '★ DIFFÉRENCE CRUCIALE',
      rowAxisRule: 'Règle de Détermination de l\'Axe Principal',
      rowEccentricity: 'Domaine de l\'Excentricité & Formule',
      rowAsymptote: 'Asymptotes',
      rowFocalTriangle: 'Aire du Triangle Focal',
      rowDefinition: 'Définition par Déplacement',
      trap1Title: 'Piège 1 : Confondre les Identités Pythagoriciennes',
      trap1Wrong: 'Incorrect : Utiliser a² = b² + c² pour l\'hyperbole',
      trap1Correct: 'Correct : L\'hyperbole vérifie c² = a² + b² (c est la distance focale, toujours la plus grande)',
      trap2Title: 'Piège 2 : Déterminer la Direction de l\'Axe',
      trap2Wrong: 'Incorrect : Penser que le plus grand dénominateur est a²',
      trap2Correct: 'Correct : Dans l\'hyperbole, a² est sous le terme POSITIF, quelle que soit sa valeur !',
      trap3Title: 'Piège 3 : Double Solution des Asymptotes',
      trap3Wrong: 'Incorrect : Supposer que la pente k = b/a implique uniquement un axe horizontal',
      trap3Correct: 'Correct : Si l\'axe est vertical, la pente k = a/b, donnant deux valeurs d\'excentricité',
    },
    problems: {
      title: 'Exercices d\'Examen & Quiz Interactif',
      tabWalkthrough: '4 Exercices Pratiques Détaillés',
      tabQuiz: 'Quiz Interactif à Choix Multiples',
      walkthroughSubtitle: 'Solutions détaillées avec barème d\'examen.',
      quizSubtitle: 'Testez vos connaissances et apprenez à déjouer les pièges.',
      questionWord: 'Question',
      trapWarningTitle: '★ Piège Classique d\'Examen :',
      showStepsBtn: 'Voir les Étapes de Solution',
      hideStepsBtn: 'Masquer les Étapes',
      yourAnswer: 'Sélectionnez votre réponse :',
      checkAnswerBtn: 'Valider la Réponse',
      correctBadge: 'Correct !',
      incorrectBadge: 'Incorrect - Consultez l\'explication ci-dessous',
      quizScore: 'Score du Quiz',
      resetQuiz: 'Recommencer le Quiz',
      trapAlert: 'Alerte Piège d\'Examen',
      quizIntro: 'Quiz interactif testant les notions clés et les pièges d\'examen.',
      correctFeedback: 'Réponse Correcte !',
      wrongFeedback: 'Réponse Incorrecte - Consultez l\'analyse ci-dessous',
      trapAnalysis: 'Analyse du Piège',
    },
    modal: {
      title: 'Tableau de Stratégie SEO & Diffusion',
      subtitle: 'Stratégies d\'acquisition de trafic, mots-clés et partage multilingue.',
      diagTitle: 'Analyse du Contenu & Recherche',
      diag1: '• Mots-clés cibles : "calculateur hyperbole", "forme canonique hyperbole", "excentricité hyperbole".',
      diag2: '• Intention de recherche : Élèves et enseignants recherchant une décomposition pas à pas.',
      diag3: '• Avantages : Interface épurée sans publicité, 5 langues, précision des fractions et repère interactif.',
      strategyTitle: 'Stratégie de Croissance Organique',
      strat1Title: '1. Rich Snippets',
      strat1Desc: 'Données structurées Schema.org pour Google.',
      strat2Title: '2. SEO Multilingue',
      strat2Desc: 'Balises canonical et hreflang pour 5 langues.',
      strat3Title: '3. Cartes Sociales',
      strat3Desc: 'Aperçus visuels enrichis sur OpenGraph et Twitter Cards.',
      promoLabel: 'Texte à Partager :',
      copyPromoBtn: 'Copier le Texte',
      copiedPromo: 'Texte Copié !',
      copyLinkBtn: 'Copier le Lien Web',
      copiedLink: 'Lien Copié !',
      closeBtn: 'Fermer',
      growthTip: 'Conseil : Partagez ce lien sur les forums éducatifs et groupes d\'entraide.',
    },
    footer: {
      aboutLink: 'À propos & Formules',
      privacyLink: 'Politique de Confidentialité',
      errataLink: 'Signaler une Erreur',
      rights: '© 2026 Laboratoire des Coniques & Hyperboles. Tous droits réservés.',
    },
  },

  pt: {
    meta: {
      title: 'Calculadora de Hipérbole: Assíntotas e Excentricidade | Forma Reduzida',
      description: 'Calculadora interativa de hipérboles: assíntotas, excentricidade, completamento de quadrados passo a passo e matriz comparativa hipérbole vs elipse.',
      keywords: 'calculadora hiperbole, assintotas hiperbole, excentricidade hiperbole, completamento de quadrados hiperbole, conicas',
    },
    nav: {
      brand: 'Laboratório de Cônicas e Hipérboles',
      standard: 'Calculadora Reduzida',
      completingSquare: 'Completamento de Quadrados',
      eccentricity: 'Excentricidade e Assíntotas',
      comparison: 'Hipérbole vs Elipse',
      quiz: 'Exercícios e Quiz',
      reset: 'Reiniciar',
      shareGuide: 'Compartilhar e Difusão',
      about: 'Sobre e Fórmulas',
      privacy: 'Privacidade',
    },
    hero: {
      badge: 'Geometria Analítica do Ensino Médio e Superior · Domínio de Cônicas',
      title: 'Calculadora Visual de Assíntotas e Excentricidade da Hipérbole',
      subtitle: 'Domine as seções cônicas: reconhecimento de equações, completamento de quadrados em 6 etapas passo a passo e prevenção de erros em exames.',
      ctaCompletingSquare: 'Resolver por Completamento de Quadrados',
      card1Title: '① Calculadora de Assíntotas',
      card1Sub: 'Assíntotas instantâneas e retângulo',
      card2Title: '② Completamento de Quadrados',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 Passo a Passo',
      card3Title: '③ Excentricidade e Armadilha',
      card3Sub: 'Calcula e a partir da inclinação k',
      card4Title: '④ Hipérbole vs Elipse',
      card4Sub: 'Comparação c²=a²+b² vs a²=b²+c²',
    },
    canvas: {
      title: 'Painel Interativo de Coordenadas Cartesianas',
      paramsSubtitle: 'Semieixo a={a} · Semieixo b={b} · Distância focal c={c}',
      showAsymptotes: 'Assíntotas',
      showBox: 'Retângulo Central (2a×2b)',
      showFoci: 'Focos F₁ F₂',
      showEllipse: 'Elipse Comparativa',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      resetView: 'Redefinir Vista',
      mainCurve: 'Ramos da Hipérbole',
      asymptotes: 'Assíntotas y = ±(b/a)x',
      foci: 'Focos',
      comparisonEllipse: 'Elipse Comparativa',
      tip: 'Arraste para mover · Role para zoom · Passe o cursor para verificar ||PF₁| - |PF₂|| = 2a',
      pointP: 'Ponto P na hipérbole',
    },
    calculator: {
      title: 'Calculadora de Parâmetros Geométricos e Assíntotas',
      horizontalAxis: 'Eixo Focal Horizontal (x²/a² - y²/b² = 1)',
      verticalAxis: 'Eixo Focal Vertical (y²/a² - x²/b² = 1)',
      modeSlider: 'Modo de Ajuste',
      modeLinear: 'Inserir a, b (Semieixos)',
      modeSquared: 'Inserir a², b² (Denominadores)',
      equilateralBadge: '★ Hipérbole Equilátera (a = b, e = √2, 90°)',
      semiMajorA: 'Semieixo Real a (Transverso):',
      denomA2: 'Denominador Real a²:',
      semiMinorB: 'Semieixo Imaginário b (Conjugado):',
      denomB2: 'Denominador Imaginário b²:',
      centerOffset: 'Posição do Centro (h, k):',
      realAxisLength: 'Comprimento do Eixo Real 2a =',
      imaginaryAxisLength: 'Comprimento do Eixo Imaginário 2b =',
      presetsLabel: 'Predefinições de Prova:',
      presetPythagorean: 'a=3, b=4 (Terno 3-4-5)',
      presetEquilateral: 'a=2, b=2 (Equilátera e=√2)',
      presetAngle60: 'a=1, b=√3 (Ângulos 30°-60°)',
      currentEquation: 'Equação Reduzida Padrão:',
      asymptoteTitle: 'Equações das Assíntotas',
      asymptoteTrickTitle: 'Regra Rápida (Substituir 1 por 0):',
      asymptoteTrickDesc: 'Substitua 1 no lado direito por 0 e fatore imediatamente:',
      asymptoteNotice: '★ Dica: Eixo horizontal produz y = ±(b/a)x; Eixo vertical produz y = ±(a/b)x.',
      focalDistanceC: 'Semidistância Focal c',
      eccentricityE: 'Excentricidade e (e > 1)',
      angleTheta: 'Ângulo de Abertura θ',
      verticesLabel: 'Vértices A₁, A₂',
      fociLabel: 'Focos F₁, F₂',
      latusRectum: 'Latus Rectum (2b²/a)',
      copySummaryBtn: 'Copiar Resumo de Propriedades',
      copiedSuccess: 'Copiado para a Área de Transferência!',
      quickPasteLabel: 'Colar / Analisar Equação Reduzida:',
      quickPastePlaceholder: 'Cole equação ex. (x-1)²/25 - (y+2)²/16 = 1',
      quickParseBtn: 'Analisar e Carregar',
      asymptote3Forms: 'Assíntotas (3 Representações Completas)',
      pointSlopeForm: '① Forma Ponto-Inclinação',
      slopeInterceptForm: '② Forma Reduzida (y = mx + b)',
      generalLinearForm: '③ Forma Geral (Ax + By + C = 0)',
      angleDefinitionNote: 'Nota do ângulo: θ é o ângulo de abertura que envolve o eixo real; o ângulo agudo de interseção é min(θ, 180° - θ).',
    },
    completingSquare: {
      title: 'Solucionador Passo a Passo por Completamento de Quadrados',
      subtitle: 'Converte a Forma Geral Ax² + Cy² + Dx + Ey + F = 0 para Forma Reduzida em 6 etapas.',
      pasteLabel: 'Colar Equação Cônica (Geral ou Reduzida):',
      pastePlaceholder: 'ex. 4x² - 9y² - 16x - 18y = 29 ou (x-2)²/9 - (y+1)²/4 = 1',
      solveBtn: 'Resolver Passo a Passo',
      manualLabel: 'Ou Ajustar Coeficientes A, C, D, E, F Manualmente:',
      currentEq: 'Equação Geral Atual:',
      isHyperbola: '✓ Hipérbole Válida (A·C < 0)',
      notHyperbola: '✗ Inválida (A·C ≥ 0 ou Degenerada)',
      copyExamFormat: 'Copiar Formato de Resolução para Provas',
      copiedExam: 'Formato Copiado!',
      togglePreview: 'Visualizar Folha de Resposta',
      hidePreview: 'Ocultar Visualização',
      printCard: 'Imprimir / Salvar Resolução',
      stepByStepTitle: 'Detalhamento em 6 Etapas Algébricas',
      applyToCanvas: 'Sincronizar com o Painel Interativo',
      stepWord: 'Etapa',
      coreTip: 'Dica de Correção:',
      summaryTitle: 'Resumo das Propriedades Geométricas',
      focalAxisDirection: 'Direção do Eixo Focal:',
      centerCoords: 'Centro C(h, k):',
      semiAxes: 'Semieixos (a, b):',
      fociAndEccentricity: 'Distância Focal c e Excentricidade e:',
      asymptoteEquations: 'Equações das Assíntotas:',
      asymptoteAngle: 'Ângulo de Abertura θ =',
      pasteHelpTip: 'Aceita forma geral 4x² - 9y² - 16x - 18y = 29 e reduzida (x-2)²/9 - (y+1)²/4 = 1.',
      threeAsymptoteForms: 'Assíntotas (3 Formas Padrão):',
      pointSlopeForm: '① Forma Ponto-Inclinação',
      slopeInterceptForm: '② Forma Reduzida',
      generalLinearForm: '③ Forma Geral',
      angleDefinitionNote: 'Nota: θ é o ângulo de abertura dos ramos que envolvem o eixo real; o ângulo agudo é min(θ, 180° - θ).',
    },
    eccentricityTool: {
      coreRelationTitle: 'Teorema de Relação entre Excentricidade e e Inclinação k',
      coreRelationDesc: 'Como na hipérbole c² = a² + b², dividindo por a² obtém-se e² = 1 + (b/a)². A inclinação k relaciona-se diretamente com a excentricidade:',
      caseXTitle: 'Eixo Focal Horizontal (Paralelo ao eixo x)',
      caseYTitle: 'Eixo Focal Vertical (Paralelo ao eixo y)',
      tool1Title: 'Ferramenta 1: Inclinação k → Excentricidade e (Resolução da Armadilha de Dupla Solução)',
      tool1Warning: '★ Atenção em Provas: Se a direção do eixo não for especificada, VOCÊ DEVE calcular AMBOS os casos!',
      slopeInputLabel: 'Inclinação da assíntota k (para y = ± kx):',
      typicalSlopes: 'Inclinações Típicas:',
      caseASolution: 'Caso A: Eixo Focal Horizontal',
      caseBSolution: 'Caso B: Eixo Focal Vertical',
      tool2Title: 'Ferramenta 2: Excentricidade e → Inclinações e Ângulo de Abertura θ',
      eccentricityInputLabel: 'Valor da Excentricidade e (e > 1):',
      typicalE: 'Valores Típicos de e:',
      ratioLabel: 'Razão dos Semieixos (b/a = √(e² - 1))',
      asymptoteIfX: 'Assíntotas (se o Eixo for Horizontal)',
      asymptoteIfY: 'Assíntotas (se o Eixo for Vertical)',
      angleBetween: 'Ângulos das Assíntotas',
      geometricInsight: 'Visão Geométrica: Conforme e aumenta, os ramos tornam-se mais abertos e planos.',
      tabKE: 'Conversão Dupla e ↔ Inclinação k',
      tabAsymptotePoint: 'Assíntota + Ponto (Tipo Vestibular)',
      tabFociVertices: 'Focos e Vértices → Equação',
      tool2Heading: 'Equação a partir de Assíntotas + Ponto P(x₀, y₀)',
      tool2Sub: 'Aplica o feixe de hipérboles k²(x-h)² - (y-k)² = λ para determinar o eixo e a forma reduzida.',
      slopeKLabel: 'Inclinação k (y = ± kx)',
      pointXLabel: 'Coordenada x₀ do Ponto P',
      pointYLabel: 'Coordenada y₀ do Ponto P',
      ex1Btn: 'Exemplo 1: P(5,0)',
      ex2Btn: 'Exemplo 2: P(0,3)',
      solvedEqTitle: 'Equação Reduzida Obtida:',
      applyToCanvasBtn: 'Sincronizar com o Painel',
      tool3Heading: 'Equação a partir de Focos e Vértices (a e c)',
      tool3Sub: 'Calcula o semieixo imaginário b por c² = a² + b² e obtém a excentricidade e e assíntotas.',
      focalAxisLabel: 'Direção do Eixo Focal',
      semiALabel: 'Semieixo Real a',
      semiCLabel: 'Semidistância Focal c',
      pythagoreanBtn: 'Pitagórico: a=3, c=5',
      ex3Btn: 'Exemplo: a=2, c=4',
      solvedResultTitle: 'Resultado da Equação Reduzida:',
      acuteIntersectionAngle: 'Ângulo Agudo de Interseção',
      angleNoticeDetail: 'Nota do ângulo: θ é o ângulo de abertura dos ramos que envolvem o eixo real (θ = 2·arctan(b/a) ou 2·arctan(a/b)). O ângulo agudo é min(θ, 180° - θ) ≤ 90°.',
    },
    comparison: {
      title: 'Matriz Comparativa Hipérbole vs Elipse',
      desc: 'Compare as principais diferenças em fórmulas, identidades pitagóricas, regras de eixos e excentricidade.',
      sloganTitle: '★ Regras Mnemônicas:',
      sloganText: 'Elipse: "a é o maior" (a² = b² + c², 0 < e < 1, sem assíntotas). Hipérbole: "c é o maior" (c² = a² + b², e > 1, 2 assíntotas).',
      tableTitle: 'Tabela Comparativa em 7 Dimensões',
      tableSubtitle: 'Comparação lado a lado para preparação de provas',
      colDimension: 'Dimensão / Propriedade',
      colEllipse: 'Elipse',
      colHyperbola: 'Hipérbole',
      rowStandardEq: 'Equações Reduzidas',
      rowIdentity: 'Identidade Pitagórica',
      rowIdentityWarn: '★ DIFERENÇA CRUCIAL',
      rowAxisRule: 'Determinação do Eixo Principal',
      rowEccentricity: 'Faixa de Excentricidade e Fórmula',
      rowAsymptote: 'Assíntotas',
      rowFocalTriangle: 'Área do Triângulo Focal',
      rowDefinition: 'Lugar Geométrico',
      trap1Title: 'Armadilha 1: Confundir Identidades Pitagóricas',
      trap1Wrong: 'Incorreto: Usar a² = b² + c² na hipérbole',
      trap1Correct: 'Correto: A hipérbole cumpre c² = a² + b² (c é a distância focal, sempre o maior)',
      trap2Title: 'Armadilha 2: Determinar a Direção do Eixo',
      trap2Wrong: 'Incorreto: Pensar que o maior denominador é a²',
      trap2Correct: 'Correto: Na hipérbole, a² está sob o termo POSITIVO',
      trap3Title: 'Armadilha 3: Soluções Duplas nas Assíntotas',
      trap3Wrong: 'Incorreto: Assumir que a inclinação k = b/a implica apenas eixo horizontal',
      trap3Correct: 'Correto: Se o eixo for vertical, a inclinação k = a/b, fornecendo dois valores de excentricidade',
    },
    problems: {
      title: 'Exercícios de Prova e Quiz Interativo',
      tabWalkthrough: '4 Exercícios Resolvidos',
      tabQuiz: 'Quiz Interativo de Múltipla Escolha',
      walkthroughSubtitle: 'Resoluções detalhadas com critérios de pontuação.',
      quizSubtitle: 'Teste seus conhecimentos e aprenda a identificar armadilhas.',
      questionWord: 'Questão',
      trapWarningTitle: '★ Armadilha Comum de Prova:',
      showStepsBtn: 'Ver Passos da Resolução',
      hideStepsBtn: 'Ocultar Passos',
      yourAnswer: 'Selecione sua resposta:',
      checkAnswerBtn: 'Enviar Resposta',
      correctBadge: 'Correto!',
      incorrectBadge: 'Incorreto - Veja a explicação',
      quizScore: 'Pontuação do Quiz',
      resetQuiz: 'Reiniciar Quiz',
      trapAlert: 'Alerta de Armadilha de Prova',
      quizIntro: 'Quiz interativo testando conceitos fundamentais e armadilhas comuns.',
      correctFeedback: 'Resposta Correta!',
      wrongFeedback: 'Resposta Incorreta - Veja a análise abaixo',
      trapAnalysis: 'Análise da Armadilha',
    },
    modal: {
      title: 'Painel de Estratégia SEO e Difusão',
      subtitle: 'Estratégias de aquisição de tráfego, otimização de palavras-chave e compartilhamento.',
      diagTitle: 'Análise de Conteúdo e Busca',
      diag1: '• Palavras-chave: "calculadora hiperbole", "completamento de quadrados hiperbole", "excentricidade hiperbole".',
      diag2: '• Intenção do usuário: Alunos e professores buscando resolução passo a passo.',
      diag3: '• Vantagens: Interface limpa sem anúncios, 5 idiomas, precisão exata com frações e painel interativo.',
      strategyTitle: 'Estratégia de Crescimento Orgânico',
      strat1Title: '1. Rich Snippets',
      strat1Desc: 'Dados estruturados Schema.org para o Google.',
      strat2Title: '2. SEO Multilíngue',
      strat2Desc: 'Tags canonical e hreflang para 5 idiomas.',
      strat3Title: '3. Cartões Sociais',
      strat3Desc: 'Pré-visualização otimizada no OpenGraph e Twitter Cards.',
      promoLabel: 'Texto para Compartilhar:',
      copyPromoBtn: 'Copiar Texto',
      copiedPromo: 'Copiado!',
      copyLinkBtn: 'Copiar Link Web',
      copiedLink: 'Link Copiado!',
      closeBtn: 'Fechar',
      growthTip: 'Dica: Compartilhe este link em fóruns de educação e grupos de estudo.',
    },
    footer: {
      aboutLink: 'Sobre e Fórmulas',
      privacyLink: 'Política de Privacidade',
      errataLink: 'Reportar Erro',
      rights: '© 2026 Laboratório de Cônicas e Hipérboles. Todos os direitos reservados.',
    },
  },

  zh: {
    meta: {
      title: '双曲线渐近线与离心率计算器 | 配方法全自动求解与高考规范答题卡',
      description: '高中数学圆锥曲线救命神器：一般方程 Ax²+Cy²+Dx+Ey+F=0 一秒识别，全自动配方法六步推导，双曲线离心率与渐近线互化防漏解，椭圆 vs 双曲线 7 大公式避坑对照速查。',
      keywords: '双曲线计算器, 双曲线渐近线计算器, 双曲线离心率, 配方法双曲线, 圆锥曲线求解器, 椭圆vs双曲线, 解析几何, 渐近线夹角',
    },
    nav: {
      brand: '双曲线与圆锥曲线精算实验室',
      standard: '标准型参数计算器',
      completingSquare: '配方法全流程推导',
      eccentricity: '离心率与渐近线反求',
      comparison: '双曲线 vs 椭圆对照',
      quiz: '高考真题与自测题库',
      reset: '重置',
      shareGuide: '流量与分享指南',
      about: '关于与公式来源',
      privacy: '隐私政策',
      tabViewMode: '分栏标签模式',
      scrollViewMode: '全景长卷模式',
      shareLink: '分享本题链接',
      shareCopiedToast: '已复制专属分享链接！同学或老师打开即可复现当前计算参数与几何图形。',
      faq: '疑难与公式速查',
    },
    hero: {
      badge: '高中数学选择性必修一 · 圆锥曲线高频考点突破',
      title: '双曲线渐近线与离心率可视化精算工具',
      subtitle: '彻底破解高考圆锥曲线失分陷阱：支持标准型与一般方程自由粘贴、配方法全自动六步拆解（带高考踩分点）、离心率双解破坑与椭圆vs双曲线避坑速查表。',
      ctaCompletingSquare: '体验全自动配方法推导',
      card1Title: '① 渐近线速算',
      card1Sub: '一秒令1为0 & 特征矩形画板',
      card2Title: '② 配方法六步推导',
      card2Sub: 'Ax²+Cy²+Dx+Ey+F=0 全过程',
      card3Title: '③ 离心率双解破坑',
      card3Sub: '已知斜率求 e 防漏解',
      card4Title: '④ 双曲线 vs 椭圆',
      card4Sub: 'c²=a²+b² 与 a²=b²+c² 深度对照',
    },
    canvas: {
      title: '动态直角坐标系几何画板',
      paramsSubtitle: '实半轴 a={a} · 虚半轴 b={b} · 半焦距 c={c}',
      showAsymptotes: '渐近线',
      showBox: '特征矩形 (2a×2b)',
      showFoci: '焦点 F₁ F₂',
      showEllipse: '共焦椭圆对照',
      zoomIn: '放大',
      zoomOut: '缩小',
      resetView: '复位视区',
      mainCurve: '双曲线分支',
      asymptotes: '渐近线 y = ±(b/a)x',
      foci: '焦点',
      comparisonEllipse: '对照椭圆',
      tip: '拖拽画布平移 · 滚轮缩放 · 悬停探针实测 ||PF₁| - |PF₂|| = 2a',
      pointP: '双曲线上动点 P',
      exportPng: '导出高清图片',
      exportPngSuccess: '已成功导出高清几何图像！',
      touchHint: '💡 移动端触控：单指平移拖拽，双指捏合缩放，双击居中',
    },
    calculator: {
      title: '双曲线标准方程与几何特征量计算器',
      horizontalAxis: '焦点在 x 轴 (x²/a² - y²/b² = 1)',
      verticalAxis: '焦点在 y 轴 (y²/a² - x²/b² = 1)',
      modeSlider: '调节模式',
      modeLinear: '输入 a, b (半轴长)',
      modeSquared: '输入 a², b² (分母值)',
      equilateralBadge: '★ 等轴双曲线 / 矩形双曲线 (a = b, e = √2, 渐近线垂直 90°)',
      semiMajorA: '实半轴长 a (Real):',
      denomA2: '实轴分母 a²:',
      semiMinorB: '虚半轴长 b (Imaginary):',
      denomB2: '虚轴分母 b²:',
      centerOffset: '中心坐标 (h, k):',
      realAxisLength: '实轴长 2a =',
      imaginaryAxisLength: '虚轴长 2b =',
      presetsLabel: '高考高频预设:',
      presetPythagorean: 'a=3, b=4 (勾股数 3-4-5)',
      presetEquilateral: 'a=2, b=2 (等轴双曲线 e=√2)',
      presetAngle60: 'a=1, b=√3 (含30°-60°直角三角形)',
      currentEquation: '当前双曲线标准方程:',
      asymptoteTitle: '渐近线方程',
      asymptoteTrickTitle: '速算秘籍（令 1 为 0 法）：',
      asymptoteTrickDesc: '将标准方程右边的常数 1 直接替换为 0，因式分解立刻得到渐近线：',
      asymptoteNotice: '★ 踩分点提醒：焦点在 x 轴上为 y = ±(b/a)x；焦点在 y 轴上为 y = ±(a/b)x，分母千万别颠倒！',
      focalDistanceC: '半焦距 c',
      eccentricityE: '离心率 e (e > 1)',
      angleTheta: '实轴开口夹角 θ',
      verticesLabel: '顶点 A₁, A₂',
      fociLabel: '焦点 F₁, F₂',
      latusRectum: '通径长 (2b²/a)',
      copySummaryBtn: '一键复制完整几何特征数据',
      copiedSuccess: '已成功复制到剪贴板！',
      quickPasteLabel: '快速粘贴 / 解析标准方程：',
      quickPastePlaceholder: '直接粘贴标准方程，如 (x-1)²/25 - (y+2)²/16 = 1',
      quickParseBtn: '一键解析载入',
      asymptote3Forms: '渐近线方程（3 种完备表示形式）',
      pointSlopeForm: '① 点斜式 (Point-Slope)',
      slopeInterceptForm: '② 斜截式 (Slope-Intercept)',
      generalLinearForm: '③ 一般式 (General Linear)',
      angleDefinitionNote: '渐近线夹角定义说明：此处 θ 为包含双曲线实轴（分支开口所夹）的顶角（横轴时 θ = 2·arctan(b/a)）；两直线自身的最小相交锐角为 min(θ, 180° - θ)。',
    },
    completingSquare: {
      title: '全自动配方法六步拆解求解器',
      subtitle: '将一般二次方程 Ax² + Cy² + Dx + Ey + F = 0 归一化为双曲线标准方程，包含 6 大高考评分关键步骤。',
      pasteLabel: '粘贴任意圆锥曲线方程（标准型或一般式均可）：',
      pastePlaceholder: '如 4x² - 9y² - 16x - 18y = 29 或 (x-2)²/9 - (y+1)²/4 = 1',
      solveBtn: '全自动配方推导',
      manualLabel: '或手动调整各项系数 A, C, D, E, F：',
      currentEq: '当前展开一般方程:',
      isHyperbola: '✓ 标准双曲线 (A·C < 0)',
      notHyperbola: '✗ 无法构成双曲线 (A·C ≥ 0 或退化)',
      copyExamFormat: '一键复制高考规范答题卡书写示范',
      copiedExam: '已复制答题卡格式！',
      togglePreview: '预览规范答题卡样式',
      hidePreview: '隐藏答题卡预览',
      printCard: '打印 / 导出打印卡片',
      stepByStepTitle: '配方法六步拆解推导全过程',
      applyToCanvas: '一键同步方程到几何画板',
      stepWord: '第',
      coreTip: '高考踩分点提示：',
      summaryTitle: '推导求解核心几何特征量',
      focalAxisDirection: '焦点所在轴向:',
      centerCoords: '中心坐标 C(h, k):',
      semiAxes: '实虚半轴 (a, b):',
      fociAndEccentricity: '半焦距 c 与离心率 e:',
      asymptoteEquations: '渐近线方程:',
      asymptoteAngle: '实轴开口角 θ =',
      pasteHelpTip: '支持一般式 4x² - 9y² - 16x - 18y = 29 与标准型 (x-2)²/9 - (y+1)²/4 = 1。',
      threeAsymptoteForms: '渐近线方程（3 种标准表示形式）：',
      pointSlopeForm: '① 点斜式 (Point-Slope)',
      slopeInterceptForm: '② 斜截式 (Slope-Intercept)',
      generalLinearForm: '③ 一般式 (General Linear)',
      angleDefinitionNote: '说明：θ 为包含双曲线实轴（分支开口所夹）的顶角；两直线本身的最小相交锐角为 min(θ, 180° - θ)。',
      categoryAll: '全部预设',
      categoryBasic: '基础入门 (整系数)',
      categoryExam: '高考真题 (经典题)',
      categoryRadicals: '进阶根号 (非整根拆分)',
      categoryDecimals: '小数与复杂系数',
      quickSymbols: '快捷输入数学符号:',
      copyLatex: '复制 LaTeX / 答题过程',
      copiedLatex: '已复制步骤到剪贴板！',
    },
    eccentricityTool: {
      coreRelationTitle: '离心率 e 与渐近线斜率 k 核心互化定理',
      coreRelationDesc: '由于双曲线中 c² = a² + b²，两边同除以 a² 即得 e² = 1 + (b/a)²。渐近线斜率 k 与离心率 e 存在唯一直接对应关系：',
      caseXTitle: '焦点在 x 轴 (平行于 x 轴)',
      caseYTitle: '焦点在 y 轴 (平行于 y 轴)',
      tool1Title: '工具 1：已知渐近线斜率 k → 求离心率 e（高考双解漏解破坑器）',
      tool1Warning: '★ 高考特别提醒：若题目未说明焦点在哪个轴上，必须分类讨论输出双解！漏解扣 3-4 分！',
      slopeInputLabel: '渐近线直线斜率 k（直线方程 y = ± kx）：',
      typicalSlopes: '高考高频斜率预设:',
      caseASolution: '解法 A：焦点在 x 轴（水平双曲线）',
      caseBSolution: '解法 B：焦点在 y 轴（垂直双曲线）',
      tool2Title: '工具 2：已知离心率 e → 求渐近线斜率与开阔度角 θ',
      eccentricityInputLabel: '离心率数值 e (e > 1)：',
      typicalE: '高考高频离心率预设:',
      ratioLabel: '半轴比值 (b/a = √(e² - 1))',
      asymptoteIfX: '渐近线方程（若焦点在 x 轴）',
      asymptoteIfY: '渐近线方程（若焦点在 y 轴）',
      angleBetween: '渐近线夹角',
      geometricInsight: '几何直观总结：离心率 e 越大，双曲线开口角度 θ 越开阔，图像越趋近于平直。',
      tabKE: '离心率 e ↔ 渐近线斜率双解互化',
      tabAsymptotePoint: '【高考必考】已知渐近线 + 过定点求方程',
      tabFociVertices: '【经典题型】已知焦点/顶点求标准方程',
      tool2Heading: '【高考必考核心题型】已知渐近线方程及过某定点求双曲线方程',
      tool2Sub: '采用全国各省高考数学官方标准“待定系数法（渐近线系方程法）”，一步规避分类讨论遗漏纵轴双曲线的失分陷阱！',
      slopeKLabel: '渐近线斜率 k (y = ± kx)',
      pointXLabel: '所过点 P 的横坐标 x₀',
      pointYLabel: '所过点 P 的纵坐标 y₀',
      ex1Btn: '经典例1: P(5,0)',
      ex2Btn: '纵轴例2: P(0,3)',
      solvedEqTitle: '求得双曲线标准方程：',
      applyToCanvasBtn: '同步到交互几何画布',
      tool3Heading: '【经典题型】已知焦点与顶点（或实半轴 a 与半焦距 c）求解标准方程',
      tool3Sub: '根据双曲线第一定义及基本特征关系式 c² = a² + b²，快速推导并输出标准方程、虚半轴 b、离心率及渐近线。',
      focalAxisLabel: '焦点所在轴',
      semiALabel: '实半轴 a (顶点距中心)',
      semiCLabel: '半焦距 c (焦点距中心)',
      pythagoreanBtn: '勾股组: a=3, c=5',
      ex3Btn: '例: a=2, c=4',
      solvedResultTitle: '标准方程求解结果：',
      acuteIntersectionAngle: '相交锐角',
      angleNoticeDetail: '渐近线夹角定义说明：此处 θ 为包含双曲线实轴（分支开口）所夹的顶角（θ = 2·arctan(b/a) 或 2·arctan(a/b)）；两直线本身的最小相交锐角为 min(θ, 180° - θ) ≤ 90°。',
    },
    comparison: {
      title: '双曲线 vs 椭圆 避坑防混对照速查表',
      desc: '精准对比公式、勾股关系、轴向判定规则及离心率范围，彻底斩断高考做题时的混淆根源。',
      sloganTitle: '★ 口诀死记硬背不如深刻理解：',
      sloganText: '椭圆：“a 最长”（a² = b² + c²，0 < e < 1，无渐近线）。双曲线：“c 最长”（c² = a² + b²，e > 1，有 2 条渐近线）。',
      tableTitle: '7 大维度公式与几何特征深度对比表',
      tableSubtitle: '高考复习与考前速查对照',
      colDimension: '对比维度 / 几何特征',
      colEllipse: '椭圆 (Ellipse)',
      colHyperbola: '双曲线 (Hyperbola)',
      rowStandardEq: '标准方程 (Standard Eq)',
      rowIdentity: '三者关系恒等式',
      rowIdentityWarn: '★ 最核心区别',
      rowAxisRule: '焦点/主轴判定规则',
      rowEccentricity: '离心率范围与公式',
      rowAsymptote: '渐近线 (Asymptotes)',
      rowFocalTriangle: '焦点三角形面积公式',
      rowDefinition: '轨迹第一定义',
      axisRuleEllipseDetail: '看分母大小：哪个分母大，焦点就在哪个轴上（如 x²/16 + y²/9 ⇒ x 轴）',
      axisRuleHyperbolaDetail: '看正号所在项：正号所在项决定实轴与焦点（如 x²/9 - y²/16 ⇒ x 轴，与分母大小无关）',
      asymptoteNoneDetail: '无渐近线（椭圆为封闭光滑连续曲线）',
      trap1Title: '陷阱 1：混淆三者关系恒等式',
      trap1Wrong: '错误：在双曲线中套用 a² = b² + c²',
      trap1Correct: '正确：双曲线中 c 最长（焦距最长），恒满足 c² = a² + b²',
      trap2Title: '陷阱 2：判定焦点所在轴向',
      trap2Wrong: '错误：以为双曲线中分母大的才是 a²',
      trap2Correct: '正确：双曲线中 a² 永远在正项下面，与分母大小无关！',
      trap3Title: '陷阱 3：渐近线斜率求离心率漏解',
      trap3Wrong: '错误：以为斜率 k = b/a 就代表焦点一定在 x 轴',
      trap3Correct: '正确：若焦点在 y 轴上，斜率 k = a/b，会对应完全不同的离心率',
    },
    problems: {
      title: '高考真题精讲与互动考点自测题库',
      tabWalkthrough: '4 大高考典型真题精讲',
      tabQuiz: '互动考点自测题库',
      walkthroughSubtitle: '高考阅卷标准步骤拆解与踩分点说明。',
      quizSubtitle: '检测你的掌握程度，学会识别常见高考陷阱。',
      questionWord: '题目',
      trapWarningTitle: '★ 高考易错陷阱警告:',
      showStepsBtn: '查看高考规范解答步骤',
      hideStepsBtn: '隐藏解答步骤',
      yourAnswer: '选择你的答案:',
      checkAnswerBtn: '提交答案',
      correctBadge: '回答正确！',
      incorrectBadge: '回答错误 - 请仔细查看下方踩分点解析',
      quizScore: '自测得分',
      resetQuiz: '重新自测',
      trapAlert: '高考避坑易错警示',
      quizIntro: '高考/竞赛双曲线高频陷阱互动自测题库。',
      correctFeedback: '回答正确！满分理解！',
      wrongFeedback: '回答错误 - 踩中陷阱',
      trapAnalysis: '高考踩分点与陷阱剖析',
    },
    modal: {
      title: 'SEO 与流量分发控制台',
      subtitle: '分析搜索流量获取策略、关键词优化及多语言社交分发。',
      diagTitle: '搜索流量与竞品内容对比分析',
      diag1: '• 核心搜索词：双曲线渐近线计算器、配方法双曲线、双曲线离心率公式、双曲线vs椭圆。',
      diag2: '• 用户搜索意图：学生与教师寻找一步步配推导过程及离心率双解互化。',
      diag3: '• 对比竞品优势：纯白无广告 UI、5 种语言支持、无损分数/根式精度及动态几何画板。',
      strategyTitle: '自然搜索流量增长策略',
      strat1Title: '1. Rich Snippets',
      strat1Desc: '预配置 Schema.org 结构化数据，直通 Google 搜索卡片。',
      strat2Title: '2. 多语言 SEO',
      strat2Desc: '包含 5 种语言的 Canonical 及 hreflang 规范化链接。',
      strat3Title: '3. 社媒分享卡片',
      strat3Desc: 'OpenGraph 与 Twitter Cards 丰富卡片展示。',
      promoLabel: '一键复制推荐种草文案（自动适配当前语言）：',
      copyPromoBtn: '复制种草文案',
      copiedPromo: '文案已复制！',
      copyLinkBtn: '复制直达链接',
      copiedLink: '链接已复制！',
      closeBtn: '关闭',
      growthTip: '小贴士：可以将此链接分享到学习群、贴吧、Reddit 或知乎圈子。',
    },
    footer: {
      aboutLink: '关于与公式来源',
      privacyLink: '隐私政策',
      errataLink: '勘误反馈',
      rights: '© 2026 双曲线与圆锥曲线精算实验室. 保留所有权利. 为 STEM 教学与备考而建.',
    },
  },
};
