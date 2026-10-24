import React, { useState } from 'react';
import { FocalAxis, HyperbolaStandardState } from '../types/conic';
import { calculateHyperbolaProperties, formatFraction } from '../utils/mathUtils';
import { MathView } from './MathView';
import { Sliders, Calculator, Zap, Copy, Check } from 'lucide-react';
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

  const isEquilateral = Math.abs(a - b) < 0.05;

  const handleCopySummary = () => {
    const isX = axis === 'x';
    const eq = isX
      ? `x²/${(a * a).toFixed(2)} - y²/${(b * b).toFixed(2)} = 1`
      : `y²/${(a * a).toFixed(2)} - x²/${(b * b).toFixed(2)} = 1`;

    const summary = `【${t.title}】
${t.currentEquation}: ${eq}
a = ${a.toFixed(2)} (${t.realAxisLength} ${(2 * a).toFixed(2)})
b = ${b.toFixed(2)} (${t.imaginaryAxisLength} ${(2 * b).toFixed(2)})
c = √(a² + b²) = ${properties.c.toFixed(2)}
${t.eccentricityE}: e = ${properties.eccentricity.toFixed(4).replace(/\.?0+$/, '')}
${t.asymptoteTitle}: ${properties.asymptoteEquations.join(' , ')}
${t.angleTheta}: ${properties.asymptoteAngleDeg.toFixed(1)}°
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
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              axis === 'x'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.horizontalAxis}
          </button>
          <button
            onClick={() => handleAxisChange('y')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
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
                  className={`px-2.5 py-1 rounded transition-colors ${
                    inputMode === 'linear'
                      ? 'bg-white text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  {t.modeLinear}
                </button>
                <button
                  onClick={() => setInputMode('squared')}
                  className={`px-2.5 py-1 rounded transition-colors ${
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
                <span>a² = {(a * a).toFixed(2)}</span>
                <span>{t.realAxisLength} {(2 * a).toFixed(2)}</span>
                <span>a = {a.toFixed(2)}</span>
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
                <span>b² = {(b * b).toFixed(2)}</span>
                <span>{t.imaginaryAxisLength} {(2 * b).toFixed(2)}</span>
                <span>b = {b.toFixed(2)}</span>
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
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-700 transition-colors"
                >
                  {t.presetPythagorean}
                </button>
                <button
                  onClick={() => onChange({ ...state, a: 2, b: 2, h: 0, k: 0 })}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-700 transition-colors"
                >
                  {t.presetEquilateral}
                </button>
                <button
                  onClick={() => onChange({ ...state, a: 1, b: Math.sqrt(3), h: 0, k: 0 })}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-mono text-slate-700 transition-colors"
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
                  {axis === 'x' ? 'Transverse on x-axis' : 'Transverse on y-axis'}
                </span>
              </div>
              <div className="text-lg sm:text-xl font-mono text-center py-1.5">
                {axis === 'x' ? (
                  <MathView
                    formula={`\\frac{${h === 0 ? 'x²' : `(x - ${h})²`}}{${formatFraction(
                      a * a,
                      1
                    )}} - \\frac{${k === 0 ? 'y²' : `(y - ${k})²`}}{${formatFraction(
                      b * b,
                      1
                    )}} = 1`}
                    className="text-white"
                  />
                ) : (
                  <MathView
                    formula={`\\frac{${k === 0 ? 'y²' : `(y - ${k})²`}}{${formatFraction(
                      a * a,
                      1
                    )}} - \\frac{${h === 0 ? 'x²' : `(x - ${h})²`}}{${formatFraction(
                      b * b,
                      1
                    )}} = 1`}
                    className="text-white"
                  />
                )}
              </div>
            </div>

            {/* Asymptotes Card */}
            <div className="p-4.5 bg-rose-50/70 border border-rose-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-rose-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-rose-600" />
                  {t.asymptoteTitle}
                </span>
                <span className="text-xs font-mono text-rose-700 bg-white px-2.5 py-0.5 rounded border border-rose-200 font-semibold">
                  k = ± {axis === 'x' ? formatFraction(b, a) : formatFraction(a, b)}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-rose-100 font-mono text-rose-700 text-center text-base sm:text-lg my-2 font-bold">
                {properties.asymptoteEquations.join('　;　')}
              </div>

              <div className="text-xs sm:text-sm text-rose-900 leading-relaxed space-y-1.5">
                <p>
                  <strong>{t.asymptoteTrickTitle}</strong> {t.asymptoteTrickDesc}
                </p>
                <div className="bg-rose-100/70 p-2.5 rounded font-mono text-xs sm:text-sm text-rose-950">
                  {axis === 'x'
                    ? `x²/a² - y²/b² = 0 ⇒ (x/a - y/b)(x/a + y/b) = 0 ⇒ y = ± (b/a)x`
                    : `y²/a² - x²/b² = 0 ⇒ (y/a - x/b)(y/a + x/b) = 0 ⇒ y = ± (a/b)x`}
                </div>
                <p className="text-xs text-rose-700">
                  {t.asymptoteNotice}
                </p>
              </div>
            </div>

            {/* Geometric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.focalDistanceC}</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  c = {properties.c.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-0.5">
                  c² = a²+b² = {(a * a + b * b).toFixed(2)}
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
                  tan(θ/2) = {formatFraction(b, a)}
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.verticesLabel}</span>
                <span className="font-mono text-slate-800 text-xs sm:text-sm block">
                  A₁({properties.vertices[0].x.toFixed(1)}, {properties.vertices[0].y.toFixed(1)})
                </span>
                <span className="font-mono text-slate-800 text-xs sm:text-sm block">
                  A₂({properties.vertices[1].x.toFixed(1)}, {properties.vertices[1].y.toFixed(1)})
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.fociLabel}</span>
                <span className="font-mono text-red-700 text-xs sm:text-sm block">
                  F₁({properties.foci[0].x.toFixed(1)}, {properties.foci[0].y.toFixed(1)})
                </span>
                <span className="font-mono text-red-700 text-xs sm:text-sm block">
                  F₂({properties.foci[1].x.toFixed(1)}, {properties.foci[1].y.toFixed(1)})
                </span>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-500 block mb-1 text-xs">{t.latusRectum}</span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  {properties.focalLatusRectum.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 block font-mono mt-0.5">
                  2b²/a
                </span>
              </div>
            </div>

            {/* Quick Copy Summary Action */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shadow-2xs"
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
