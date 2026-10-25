import React, { useState } from 'react';
import { GeneralEquationCoefficients, HyperbolaStandardState } from '../types/conic';
import {
  solveCompletingSquare,
  parseAnyEquation,
  generateExamPaperAnswer,
  simplifyRadical,
  formatFraction,
} from '../utils/mathUtils';
import { MathView } from './MathView';
import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ArrowRight,
  Copy,
  Printer,
  ClipboardCheck,
  Wand2,
  Info,
} from 'lucide-react';
import { Language, TranslationDictionary } from '../i18n/translations';

interface CompletingSquareSolverProps {
  onApplyToCanvas: (state: HyperbolaStandardState) => void;
  t: TranslationDictionary['completingSquare'];
  lang: Language;
}

const PRESET_PROBLEMS: Record<
  Language,
  { label: string; equation: string; isStandard?: boolean; coeffs?: GeneralEquationCoefficients }[]
> = {
  en: [
    {
      label: 'Standard Form 1 (x-axis)',
      equation: 'x²/9 - y²/16 = 1',
      isStandard: true,
    },
    {
      label: 'Standard Shifted 2 (y-axis)',
      equation: '(y-1)²/16 - (x+2)²/9 = 1',
      isStandard: true,
    },
    {
      label: 'Exam General 3',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Vertical General 4',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Classic Integer 5',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  es: [
    {
      label: 'Forma Canónica 1 (Eje x)',
      equation: 'x²/9 - y²/16 = 1',
      isStandard: true,
    },
    {
      label: 'Canónica Trasladada 2 (Eje y)',
      equation: '(y-1)²/16 - (x+2)²/9 = 1',
      isStandard: true,
    },
    {
      label: 'Examen General 3',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Vertical General 4',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Enteros 5',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  fr: [
    {
      label: 'Forme Réduite 1 (Axe x)',
      equation: 'x²/9 - y²/16 = 1',
      isStandard: true,
    },
    {
      label: 'Forme Translatée 2 (Axe y)',
      equation: '(y-1)²/16 - (x+2)²/9 = 1',
      isStandard: true,
    },
    {
      label: 'Exemple 3 (Générale)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Vertical 4 (Générale)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Coefficients Entiers 5',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  pt: [
    {
      label: 'Forma Reduzida 1 (Eixo x)',
      equation: 'x²/9 - y²/16 = 1',
      isStandard: true,
    },
    {
      label: 'Transladada 2 (Eixo y)',
      equation: '(y-1)²/16 - (x+2)²/9 = 1',
      isStandard: true,
    },
    {
      label: 'Vestibular 3 (Geral)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Vertical 4 (Geral)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Inteiros 5',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  zh: [
    {
      label: '标准方程 1 (x轴简单型)',
      equation: 'x²/9 - y²/16 = 1',
      isStandard: true,
    },
    {
      label: '标准平移 2 (y轴平移型)',
      equation: '(y-1)²/16 - (x+2)²/9 = 1',
      isStandard: true,
    },
    {
      label: '高考典型 3 (一般式焦点在x轴)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: '高考典型 4 (一般式焦点在y轴)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: '经典整除 5 (9x² - 16y²)',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
};

export const CompletingSquareSolver: React.FC<CompletingSquareSolverProps> = ({
  onApplyToCanvas,
  t,
  lang,
}) => {
  const [coeffs, setCoeffs] = useState<GeneralEquationCoefficients>({
    A: 4,
    C: -9,
    D: -16,
    E: -18,
    F: -29,
  });

  const [textInput, setTextInput] = useState<string>('4x² - 9y² - 16x - 18y - 29 = 0');
  const [parseError, setParseError] = useState<string | null>(null);
  const [parseNotice, setParseNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showExamTemplate, setShowExamTemplate] = useState<boolean>(false);

  const presets = PRESET_PROBLEMS[lang] || PRESET_PROBLEMS.en;

  const handleInputChange = (field: keyof GeneralEquationCoefficients, value: string) => {
    const num = parseFloat(value);
    setParseError(null);
    setParseNotice(null);
    setCoeffs((prev) => ({
      ...prev,
      [field]: isNaN(num) ? 0 : num,
    }));
  };

  const handleParseText = () => {
    setParseError(null);
    setParseNotice(null);
    if (!textInput.trim()) {
      const emptyMsg: Record<Language, string> = {
        zh: '请输入方程后再点击求解，例如：4x² - 9y² - 16x - 18y - 29 = 0 或 x²/9 - y²/16 = 1',
        en: 'Please enter an equation before solving, e.g. 4x² - 9y² - 16x - 18y - 29 = 0 or x²/9 - y²/16 = 1',
        es: 'Por favor ingrese una ecuación antes de resolver, ej. 4x² - 9y² - 16x - 18y - 29 = 0',
        fr: 'Veuillez entrer une équation avant de résoudre, ex. 4x² - 9y² - 16x - 18y - 29 = 0',
        pt: 'Por favor insira uma equação antes de resolver, ex. 4x² - 9y² - 16x - 18y - 29 = 0',
      };
      setParseError(emptyMsg[lang] || emptyMsg.en);
      return;
    }
    const res = parseAnyEquation(textInput, lang);
    if (!res.success) {
      setParseError(res.error);
      return;
    }
    setCoeffs(res.coeffs);
    if (res.isStandardForm && res.description) {
      setParseNotice(res.description);
    }
  };

  const loadPreset = (preset: (typeof presets)[0]) => {
    setParseError(null);
    setParseNotice(null);
    setTextInput(preset.equation);
    if (preset.coeffs) {
      setCoeffs(preset.coeffs);
    } else {
      const res = parseAnyEquation(preset.equation, lang);
      if (res.success) {
        setCoeffs(res.coeffs);
        if (res.description) setParseNotice(res.description);
      }
    }
  };

  const solution = solveCompletingSquare(coeffs, lang);

  const handleCopyStandardAnswer = () => {
    const text = generateExamPaperAnswer(coeffs, lang);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded font-mono bg-blue-100 text-blue-800 font-semibold">
              Ax² + Cy² + Dx + Ey + F = 0
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Natural Language & Standard Form Equation Paste Box */}
        <div className="mb-6 p-4 bg-blue-50/40 rounded-xl border border-blue-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <label className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-blue-600" />
              {t.pasteLabel}
            </label>
            <span className="text-xs text-blue-700 font-mono">
              {t.pasteHelpTip}
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
                setParseError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleParseText();
              }}
              placeholder={t.pastePlaceholder}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-white border border-blue-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
            <button
              onClick={handleParseText}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              {t.solveBtn}
            </button>
          </div>

          {/* Real-time Parse Error Notification */}
          {parseError && (
            <div className="mt-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-800 text-xs sm:text-sm animate-in fade-in duration-150">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                {parseError}
              </div>
            </div>
          )}

          {/* Standard Form Success Notice */}
          {parseNotice && (
            <div className="mt-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-800 text-xs sm:text-sm animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                {parseNotice}
              </div>
            </div>
          )}
        </div>

        {/* Input Matrix */}
        <div className="mb-6">
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2.5 tracking-wide">
            {t.manualLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <span className="text-xs font-mono text-slate-500 block mb-1">A (x²)</span>
              <input
                type="number"
                value={coeffs.A}
                onChange={(e) => handleInputChange('A', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm sm:text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 block mb-1">C (y²)</span>
              <input
                type="number"
                value={coeffs.C}
                onChange={(e) => handleInputChange('C', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm sm:text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 block mb-1">D (x)</span>
              <input
                type="number"
                value={coeffs.D}
                onChange={(e) => handleInputChange('D', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm sm:text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 block mb-1">E (y)</span>
              <input
                type="number"
                value={coeffs.E}
                onChange={(e) => handleInputChange('E', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm sm:text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 block mb-1">F (const)</span>
              <input
                type="number"
                value={coeffs.F}
                onChange={(e) => handleInputChange('F', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm sm:text-base font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Current equation readout */}
          <div className="mt-3 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">{t.currentEq}</span>
              <span className="font-mono text-slate-800 font-semibold">
                {coeffs.A}x² {coeffs.C >= 0 ? `+ ${coeffs.C}` : `- ${Math.abs(coeffs.C)}`}y²{' '}
                {coeffs.D !== 0 ? (coeffs.D > 0 ? `+ ${coeffs.D}x` : `- ${Math.abs(coeffs.D)}x`) : ''}{' '}
                {coeffs.E !== 0 ? (coeffs.E > 0 ? `+ ${coeffs.E}y` : `- ${Math.abs(coeffs.E)}y`) : ''}{' '}
                {coeffs.F !== 0 ? (coeffs.F > 0 ? `+ ${coeffs.F}` : `- ${Math.abs(coeffs.F)}`) : ''} = 0
              </span>
            </div>
            <span className="text-slate-500 font-medium">
              {coeffs.A * coeffs.C < 0 ? t.isHyperbola : t.notHyperbola}
            </span>
          </div>
        </div>

        {/* Action bar: 1-click copy exam response + print */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyStandardAnswer}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Copy Exam Paper Format"
            >
              {copied ? (
                <>
                  <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{t.copiedExam}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>{t.copyExamFormat}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowExamTemplate(!showExamTemplate)}
              className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 underline px-2 py-1 cursor-pointer"
            >
              {showExamTemplate ? t.hidePreview : t.togglePreview}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              {t.printCard}
            </button>
          </div>
        </div>

        {/* Optional Exam Template Preview */}
        {showExamTemplate && (
          <div className="p-4.5 mb-5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            {generateExamPaperAnswer(coeffs, lang)}
          </div>
        )}

        {/* Error or Warning if not valid hyperbola */}
        {!solution.success && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-3 my-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm sm:text-base">
                {lang === 'zh' ? '提示：' : lang === 'es' ? 'Aviso:' : lang === 'fr' ? 'Avis :' : lang === 'pt' ? 'Aviso:' : 'Notice:'}
              </h4>
              <p className="text-xs sm:text-sm mt-1 text-amber-800 leading-relaxed">{solution.message}</p>
            </div>
          </div>
        )}

        {/* Detailed Steps Container */}
        {solution.success && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                {t.stepByStepTitle}
              </h3>
              {solution.standardForm && (
                <button
                  onClick={() => onApplyToCanvas(solution.standardForm!)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  {t.applyToCanvas}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3.5">
              {solution.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {step.title}
                    </span>
                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {t.stepWord} {idx + 1}
                    </span>
                  </div>

                  {/* Math line */}
                  <div className="bg-slate-50 px-3.5 py-3 rounded-lg border border-slate-100 font-mono text-sm sm:text-base text-blue-900 overflow-x-auto my-2.5">
                    <MathView formula={step.math} />
                  </div>

                  {/* Plain explanation */}
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mt-1.5">
                    {step.explanation}
                  </div>

                  {/* Highlight warning/tip */}
                  {step.highlight && (
                    <div className="mt-2.5 text-xs sm:text-sm font-medium text-amber-850 bg-amber-50/70 border border-amber-100 px-3 py-2 rounded-lg">
                      💡 {t.coreTip} {step.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Resolved Key Properties Summary Bar */}
            {solution.properties && (
              <div className="mt-6 p-5 bg-blue-50/60 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-3.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm sm:text-base font-bold text-blue-950">
                    {t.summaryTitle}
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.focalAxisDirection}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      {solution.properties.axis === 'x' ? 'x-axis Transverse' : 'y-axis Transverse'}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.centerCoords}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      ({formatFraction(solution.properties.h, 1)}, {formatFraction(solution.properties.k, 1)})
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.semiAxes}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      a = {simplifyRadical(solution.properties.a * solution.properties.a)}, b = {simplifyRadical(solution.properties.b * solution.properties.b)}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.fociAndEccentricity}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      c = {simplifyRadical(solution.properties.c * solution.properties.c)}, e = {solution.properties.eccentricity.toFixed(3)}
                    </span>
                  </div>
                </div>

                {/* 3 Forms of Asymptote Equations + Detailed Angles */}
                <div className="mt-3.5 bg-white p-4 rounded-lg border border-blue-100 space-y-2.5 text-xs sm:text-sm shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-800">
                      {t.threeAsymptoteForms}
                    </span>
                    <div className="text-xs text-slate-500 font-mono">
                      θ = {solution.properties.asymptoteAngleDeg.toFixed(1)}° ; min = {solution.properties.asymptoteAcuteAngleDeg.toFixed(1)}°
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block mb-1 text-xs">{t.pointSlopeForm}</span>
                      <span className="font-mono font-bold text-blue-700 text-xs sm:text-sm block">
                        {solution.properties.asymptoteEquations.join(' ; ')}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block mb-1 text-xs">{t.slopeInterceptForm}</span>
                      <span className="font-mono font-bold text-emerald-700 text-xs sm:text-sm block">
                        {solution.properties.asymptoteSlopeInterceptEquations.join(' ; ')}
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block mb-1 text-xs">{t.generalLinearForm}</span>
                      <span className="font-mono font-bold text-purple-700 text-xs sm:text-sm block">
                        {solution.properties.asymptoteGeneralEquations.join(' ; ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500 text-xs pt-1">
                    <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>
                      {t.angleDefinitionNote}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
