import React, { useState } from 'react';
import { GeneralEquationCoefficients, HyperbolaStandardState } from '../types/conic';
import {
  solveCompletingSquare,
  parseEquationText,
  generateExamPaperAnswer,
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
} from 'lucide-react';
import { Language, TranslationDictionary } from '../i18n/translations';

interface CompletingSquareSolverProps {
  onApplyToCanvas: (state: HyperbolaStandardState) => void;
  t: TranslationDictionary['completingSquare'];
  lang: Language;
}

const PRESET_PROBLEMS: Record<Language, { label: string; equation: string; coeffs: GeneralEquationCoefficients }[]> = {
  en: [
    {
      label: 'Exam Example 1 (x-axis)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Exam Example 2 (y-axis)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Standard Shifted 3',
      equation: 'x² - 4y² + 4x + 8y - 4 = 0',
      coeffs: { A: 1, C: -4, D: 4, E: 8, F: -4 },
    },
    {
      label: 'Classic Integer 4',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  es: [
    {
      label: 'Examen 1 (Eje x)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Examen 2 (Eje y)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Desplazada 3',
      equation: 'x² - 4y² + 4x + 8y - 4 = 0',
      coeffs: { A: 1, C: -4, D: 4, E: 8, F: -4 },
    },
    {
      label: 'Enteros 4',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  fr: [
    {
      label: 'Exemple 1 (Axe x)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Exemple 2 (Axe y)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Cas Translaté 3',
      equation: 'x² - 4y² + 4x + 8y - 4 = 0',
      coeffs: { A: 1, C: -4, D: 4, E: 8, F: -4 },
    },
    {
      label: 'Coefficients 4',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  pt: [
    {
      label: 'Vestibular 1 (Eixo x)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: 'Vestibular 2 (Eixo y)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: 'Transladada 3',
      equation: 'x² - 4y² + 4x + 8y - 4 = 0',
      coeffs: { A: 1, C: -4, D: 4, E: 8, F: -4 },
    },
    {
      label: 'Inteiros 4',
      equation: '9x² - 16y² - 36x + 64y - 172 = 0',
      coeffs: { A: 9, C: -16, D: -36, E: 64, F: -172 },
    },
  ],
  zh: [
    {
      label: '高考典型 1 (焦点在x轴)',
      equation: '4x² - 9y² - 16x - 18y - 29 = 0',
      coeffs: { A: 4, C: -9, D: -16, E: -18, F: -29 },
    },
    {
      label: '高考典型 2 (焦点在y轴)',
      equation: '16y² - 9x² + 32y - 54x - 209 = 0',
      coeffs: { A: -9, C: 16, D: -54, E: 32, F: -209 },
    },
    {
      label: '经典考题 3 (含平移与特殊比值)',
      equation: 'x² - 4y² + 4x + 8y - 4 = 0',
      coeffs: { A: 1, C: -4, D: 4, E: 8, F: -4 },
    },
    {
      label: '经典考题 4 (整除标准型)',
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
  const [copied, setCopied] = useState<boolean>(false);
  const [showExamTemplate, setShowExamTemplate] = useState<boolean>(false);

  const presets = PRESET_PROBLEMS[lang] || PRESET_PROBLEMS.en;

  const handleInputChange = (field: keyof GeneralEquationCoefficients, value: string) => {
    const num = parseFloat(value);
    setCoeffs((prev) => ({
      ...prev,
      [field]: isNaN(num) ? 0 : num,
    }));
  };

  const handleParseText = () => {
    const parsed = parseEquationText(textInput);
    if (parsed) {
      setCoeffs(parsed);
    }
  };

  const loadPreset = (preset: { label: string; equation: string; coeffs: GeneralEquationCoefficients }) => {
    setCoeffs(preset.coeffs);
    setTextInput(preset.equation);
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
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Natural Language Equation Paste Box */}
        <div className="mb-6 p-4 bg-blue-50/40 rounded-xl border border-blue-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <label className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-blue-600" />
              {t.pasteLabel}
            </label>
            <span className="text-xs text-blue-700 font-mono">
              e.g. 4x² - 9y² - 16x - 18y = 29
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleParseText();
              }}
              placeholder={t.pastePlaceholder}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-white border border-blue-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
            <button
              onClick={handleParseText}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              {t.solveBtn}
            </button>
          </div>
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
                {coeffs.D >= 0 ? `+ ${coeffs.D}` : `- ${Math.abs(coeffs.D)}`}x{' '}
                {coeffs.E >= 0 ? `+ ${coeffs.E}` : `- ${Math.abs(coeffs.E)}`}y{' '}
                {coeffs.F >= 0 ? `+ ${coeffs.F}` : `- ${Math.abs(coeffs.F)}`} = 0
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
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
              className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 underline px-2 py-1"
            >
              {showExamTemplate ? t.hidePreview : t.togglePreview}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
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
              <h4 className="font-semibold text-sm sm:text-base">Warning / Avis:</h4>
              <p className="text-xs sm:text-sm mt-1 text-amber-800">{solution.message}</p>
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
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors"
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
                      {solution.properties.axis === 'x' ? 'x-axis (Horizontal)' : 'y-axis (Vertical)'}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.centerCoords}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      ({solution.properties.h}, {solution.properties.k})
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.semiAxes}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      a = {solution.properties.a.toFixed(2)}, b = {solution.properties.b.toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-2xs">
                    <span className="text-slate-500 block mb-0.5">{t.fociAndEccentricity}</span>
                    <span className="font-semibold text-slate-900 font-mono text-sm sm:text-base">
                      c = {solution.properties.c.toFixed(2)}, e = {solution.properties.eccentricity.toFixed(3)}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 bg-white p-3.5 rounded-lg border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm shadow-2xs">
                  <div>
                    <span className="text-slate-500">{t.asymptoteEquations}</span>
                    <span className="font-mono font-bold text-red-600 ml-2">
                      {solution.properties.asymptoteEquations.join(' ; ')}
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono">
                    {t.asymptoteAngle} {solution.properties.asymptoteAngleDeg.toFixed(1)}°
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
