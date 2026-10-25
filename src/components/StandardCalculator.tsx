import React, { useState } from 'react';
import { FocalAxis, HyperbolaStandardState } from '../types/conic';
import {
  calculateHyperbolaProperties,
  formatFraction,
  formatBracketTerm,
  simplifyRadical,
  parseAnyEquation,
} from '../utils/mathUtils';
import { MathView } from './MathView';
import {
  Sliders,
  Calculator,
  Zap,
  Copy,
  Check,
  Wand2,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { Language, TranslationDictionary } from '../i18n/translations';

interface StandardCalculatorProps {
  state: HyperbolaStandardState;
  onChange: (state: HyperbolaStandardState) => void;
  t: TranslationDictionary['calculator'];
  lang: Language;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({
  state,
  onChange,
  t,
  lang,
}) => {
  const { axis, h, k, a, b } = state;
  const properties = calculateHyperbolaProperties(state);
  const [inputMode, setInputMode] = useState<'linear' | 'squared'>('linear');
  const [copiedResults, setCopiedResults] = useState(false);

  // Quick standard equation paste input
  const [quickEqText, setQuickEqText] = useState('');
  const [pasteError, setPasteError] = useState<string | null>(null);
  const [pasteSuccess, setPasteSuccess] = useState<string | null>(null);

  const handleAxisChange = (newAxis: FocalAxis) => {
    onChange({ ...state, axis: newAxis });
  };

  const handleParamChange = (field: keyof HyperbolaStandardState, val: number) => {
    onChange({ ...state, [field]: val });
  };

  const handleSquaredParamChange = (field: 'a' | 'b', valSq: number) => {
    const positiveSq = Math.max(0.01, valSq);
    onChange({ ...state, [field]: Math.sqrt(positiveSq) });
  };

  const handleQuickParse = () => {
    setPasteError(null);
    setPasteSuccess(null);
    if (!quickEqText.trim()) return;

    const res = parseAnyEquation(quickEqText);
    if (!res.success) {
      setPasteError(res.error);
      return;
    }

    if (res.isStandardForm && res.standardState) {
      onChange(res.standardState);
      setPasteSuccess(res.description || t.copiedSuccess);
    } else {
      // General form: solve completing square to get standard state
      import('../utils/mathUtils').then(({ solveCompletingSquare }) => {
        const sol = solveCompletingSquare(res.coeffs, lang);
        if (sol.success && sol.standardForm) {
          onChange(sol.standardForm);
          setPasteSuccess(`a = ${sol.standardForm.a.toFixed(2)}, b = ${sol.standardForm.b.toFixed(2)}`);
        } else {
          setPasteError(sol.message || 'Cannot parse equation.');
        }
      });
    }
  };

  const handleCopySummary = () => {
    const isX = axis === 'x';
    const aSqStr = formatFraction(a * a, 1);
    const bSqStr = formatFraction(b * b, 1);
    const cSqStr = formatFraction(a * a + b * b, 1);
    const hStr = formatBracketTerm('x', h);
    const kStr = formatBracketTerm('y', k);

    const eq = isX
      ? `${hStr}²/${aSqStr} - ${kStr}²/${bSqStr} = 1`
      : `${kStr}²/${aSqStr} - ${hStr}²/${bSqStr} = 1`;

    const summary = `【${t.title}】
${t.currentEquation}: ${eq}
C(h, k): (${h}, ${k})
a = ${simplifyRadical(a * a)} (a² = ${aSqStr}, 2a = ${formatFraction(2 * a, 1)})
b = ${simplifyRadical(b * b)} (b² = ${bSqStr}, 2b = ${formatFraction(2 * b, 1)})
c = √(a² + b²) = ${simplifyRadical(a * a + b * b)} (c² = ${cSqStr})
${t.eccentricityE}: e = c/a = ${properties.eccentricity.toFixed(4).replace(/\.?0+$/, '')}
${t.pointSlopeForm}: ${properties.asymptoteEquations.join(' , ')}
${t.slopeInterceptForm}: ${properties.asymptoteSlopeInterceptEquations.join(' , ')}
${t.generalLinearForm}: ${properties.asymptoteGeneralEquations.join(' , ')}
θ = ${properties.asymptoteAngleDeg.toFixed(1)}°
${t.latusRectum}: ${properties.focalLatusRectum.toFixed(2)}`;

    navigator.clipboard.writeText(summary);
    setCopiedResults(true);
    setTimeout(() => setCopiedResults(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4.5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Axis Toggle Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => handleAxisChange('x')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              axis === 'x'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.horizontalAxis}
          </button>
          <button
            onClick={() => handleAxisChange('y')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              axis === 'y'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.verticalAxis}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Standard Equation Paste Bar */}
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-blue-600" />
              {t.quickPasteLabel}
            </label>
            <span className="text-xs text-slate-500 font-mono">
              e.g. (x-2)²/9 - (y+1)²/4 = 1 or x²/16 - y²/9 = 1
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={quickEqText}
              onChange={(e) => {
                setQuickEqText(e.target.value);
                setPasteError(null);
                setPasteSuccess(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleQuickParse();
              }}
              placeholder={t.quickPastePlaceholder}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
            <button
              onClick={handleQuickParse}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.quickParseBtn}
            </button>
          </div>

          {pasteError && (
            <div className="mt-2.5 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{pasteError}</span>
            </div>
          )}

          {pasteSuccess && (
            <div className="mt-2.5 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{pasteSuccess}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Input mode switcher */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1">
                <Sliders className="w-4 h-4" /> {t.modeSlider}
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
                <button
                  onClick={() => setInputMode('linear')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    inputMode === 'linear'
                      ? 'bg-white text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  {t.modeLinear}
                </button>
                <button
                  onClick={() => setInputMode('squared')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    inputMode === 'squared'
                      ? 'bg-white text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  {t.modeSquared}
                </button>
              </div>
            </div>

            {/* Parameter a or a^2 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  {inputMode === 'linear' ? t.semiMajorA : t.denomA2}
                </label>
                <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                  {inputMode === 'linear' ? (
                    <>
                      <span className="text-slate-500">a =</span>
                      <input
                        type="number"
                        min="0.2"
                        max="20"
                        step="0.5"
                        value={Math.round(a * 100) / 100}
                        onChange={(e) =>
                          handleParamChange('a', Math.max(0.1, parseFloat(e.target.value) || 1))
                        }
                        className="w-18 px-2 py-1 border border-slate-300 rounded text-center font-mono font-bold text-blue-700 bg-white"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-slate-500">a² =</span>
                      <input
                        type="number"
                        min="0.1"
                        max="200"
                        step="1"
                        value={Math.round(a * a * 100) / 100}
                        onChange={(e) =>
                          handleSquaredParamChange('a', parseFloat(e.target.value) || 1)
                        }
                        className="w-18 px-2 py-1 border border-slate-300 rounded text-center font-mono font-bold text-blue-700 bg-white"
                      />
                    </>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.25"
                value={a}
                onChange={(e) => handleParamChange('a', parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono mt-1.5">
                <span>a² = {formatFraction(a * a, 1)}</span>
                <span>{t.realAxisLength} {formatFraction(2 * a, 1)}</span>
                <span>a = {simplifyRadical(a * a)}</span>
              </div>
            </div>

            {/* Parameter b or b^2 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  {inputMode === 'linear' ? t.semiMinorB : t.denomB2}
                </label>
                <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                  {inputMode === 'linear' ? (
                    <>
                      <span className="text-slate-500">b =</span>
                      <input
                        type="number"
                        min="0.2"
                        max="20"
                        step="0.5"
                        value={Math.round(b * 100) / 100}
                        onChange={(e) =>
                          handleParamChange('b', Math.max(0.1, parseFloat(e.target.value) || 1))
                        }
                        className="w-18 px-2 py-1 border border-slate-300 rounded text-center font-mono font-bold text-blue-700 bg-white"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-slate-500">b² =</span>
                      <input
                        type="number"
                        min="0.1"
                        max="200"
                        step="1"
                        value={Math.round(b * b * 100) / 100}
                        onChange={(e) =>
                          handleSquaredParamChange('b', parseFloat(e.target.value) || 1)
                        }
                        className="w-18 px-2 py-1 border border-slate-300 rounded text-center font-mono font-bold text-blue-700 bg-white"
                      />
                    </>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.25"
                value={b}
                onChange={(e) => handleParamChange('b', parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono mt-1.5">
                <span>b² = {formatFraction(b * b, 1)}</span>
                <span>{t.imaginaryAxisLength} {formatFraction(2 * b, 1)}</span>
                <span>b = {simplifyRadical(b * b)}</span>
              </div>
            </div>

            {/* Center (h, k) offsets */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mb-2">
                {t.centerOffset}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-slate-500 font-mono font-semibold">h =</span>
                  <input
                    type="number"
                    value={h}
                    onChange={(e) => handleParamChange('h', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs sm:text-sm font-mono bg-white"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-slate-500 font-mono font-semibold">k =</span>
                  <input
                    type="number"
                    value={k}
                    onChange={(e) => handleParamChange('k', parseFloat(e.target.value) || 0)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs sm:text-sm font-mono bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5 text-xs sm:text-sm">
              <span className="text-slate-500 block font-semibold">{t.presetsLabel}</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onChange({ ...state, a: 3, b: 4, h: 0, k: 0 })}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-700 transition-colors cursor-pointer"
                >
                  {t.presetPythagorean}
                </button>
                <button
                  onClick={() => onChange({ ...state, a: 2, b: 2, h: 0, k: 0 })}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-700 transition-colors cursor-pointer"
                >
                  {t.presetEquilateral}
                </button>
                <button
                  onClick={() => onChange({ ...state, a: 1, b: Math.sqrt(3), h: 0, k: 0 })}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-700 transition-colors cursor-pointer"
                >
                  {t.presetAngle60}
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* Equation Badge */}
            <div className="p-4.5 bg-slate-900 text-white rounded-xl shadow-xs">
              <div className="text-xs sm:text-sm text-slate-400 mb-1.5 flex items-center justify-between">
                <span>{t.currentEquation}</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {axis === 'x' ? 'x-axis Transverse' : 'y-axis Transverse'}
                </span>
              </div>
              <div className="text-lg sm:text-xl font-mono text-center py-1.5">
                {axis === 'x' ? (
                  <MathView
                    formula={`\\frac{${formatBracketTerm('x', h)}²}{${formatFraction(
                      a * a,
                      1
                    )}} - \\frac{${formatBracketTerm('y', k)}²}{${formatFraction(
                      b * b,
                      1
                    )}} = 1`}
                    className="text-white"
                  />
                ) : (
                  <MathView
                    formula={`\\frac{${formatBracketTerm('y', k)}²}{${formatFraction(
                      a * a,
                      1
                    )}} - \\frac{${formatBracketTerm('x', h)}²}{${formatFraction(
                      b * b,
                      1
                    )}} = 1`}
                    className="text-white"
                  />
                )}
              </div>
            </div>

            {/* Asymptotes Card: 3 Full Forms */}
            <div className="p-4.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-rose-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-rose-600" />
                  {t.asymptote3Forms}
                </span>
                <span className="text-xs font-mono text-rose-700 bg-white px-2.5 py-0.5 rounded border border-rose-200 font-semibold">
                  k = ± {axis === 'x' ? formatFraction(b, a) : formatFraction(a, b)}
                </span>
              </div>

              {/* 3 Forms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs sm:text-sm">
                <div className="bg-white p-3 rounded-lg border border-rose-100">
                  <span className="text-slate-500 block mb-1 text-xs">{t.pointSlopeForm}</span>
                  <div className="font-mono font-bold text-rose-700 leading-snug">
                    {properties.asymptoteEquations.map((eq, i) => (
                      <div key={i}>{eq}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-rose-100">
                  <span className="text-slate-500 block mb-1 text-xs">{t.slopeInterceptForm}</span>
                  <div className="font-mono font-bold text-rose-700 leading-snug">
                    {properties.asymptoteSlopeInterceptEquations.map((eq, i) => (
                      <div key={i}>{eq}</div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-rose-100">
                  <span className="text-slate-500 block mb-1 text-xs">{t.generalLinearForm}</span>
                  <div className="font-mono font-bold text-rose-700 leading-snug">
                    {properties.asymptoteGeneralEquations.map((eq, i) => (
                      <div key={i}>{eq}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-xs text-rose-900 leading-relaxed bg-rose-100/60 p-2.5 rounded-lg">
                <strong>{t.asymptoteTrickTitle}</strong> {t.asymptoteTrickDesc}
                <span className="font-mono font-semibold ml-1">
                  {axis === 'x' ? '(x/a - y/b)(x/a + y/b) = 0' : '(y/a - x/b)(y/a + x/b) = 0'}
                </span>
              </div>
            </div>

            {/* Geometric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.focalDistanceC}</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  c = {simplifyRadical(a * a + b * b)} (≈ {properties.c.toFixed(2)})
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-0.5">
                  c² = a²+b² = {formatFraction(a * a + b * b, 1)}
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.eccentricityE}</span>
                <span className="font-mono font-bold text-blue-700 text-base">
                  e = {properties.eccentricity.toFixed(3)}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-0.5">
                  e = c/a = √(1 + (b/a)²)
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.angleTheta}</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  {properties.asymptoteAngleDeg.toFixed(1)}°
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-0.5">
                  min = {properties.asymptoteAcuteAngleDeg.toFixed(1)}°
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.verticesLabel}</span>
                <span className="font-mono text-slate-800 text-xs sm:text-sm block">
                  A₁({formatFraction(properties.vertices[0].x, 1)}, {formatFraction(properties.vertices[0].y, 1)})
                </span>
                <span className="font-mono text-slate-800 text-xs sm:text-sm block">
                  A₂({formatFraction(properties.vertices[1].x, 1)}, {formatFraction(properties.vertices[1].y, 1)})
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.fociLabel}</span>
                <span className="font-mono text-red-700 text-xs sm:text-sm block">
                  F₁({axis === 'x' ? (h === 0 ? `-${simplifyRadical(a * a + b * b)}` : `${formatFraction(h, 1)} - ${simplifyRadical(a * a + b * b)}`) : formatFraction(h, 1)}, {axis === 'y' ? (k === 0 ? `-${simplifyRadical(a * a + b * b)}` : `${formatFraction(k, 1)} - ${simplifyRadical(a * a + b * b)}`) : formatFraction(k, 1)})
                </span>
                <span className="font-mono text-red-700 text-xs sm:text-sm block">
                  F₂({axis === 'x' ? (h === 0 ? simplifyRadical(a * a + b * b) : `${formatFraction(h, 1)} + ${simplifyRadical(a * a + b * b)}`) : formatFraction(h, 1)}, {axis === 'y' ? (k === 0 ? simplifyRadical(a * a + b * b) : `${formatFraction(k, 1)} + ${simplifyRadical(a * a + b * b)}`) : formatFraction(k, 1)})
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.latusRectum}</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  {formatFraction(2 * b * b, a)}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-0.5">
                  2b²/a ≈ {properties.focalLatusRectum.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quick Angle Clarification Alert */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                {t.angleDefinitionNote}
              </div>
            </div>

            {/* Quick Copy Summary Action */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                {copiedResults ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{t.copiedSuccess}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copySummaryBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
