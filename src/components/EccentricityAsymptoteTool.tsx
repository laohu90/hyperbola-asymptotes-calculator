import React, { useState } from 'react';
import { TranslationDictionary, Language } from '../i18n/translations';
import { ArrowLeftRight, Compass, Lightbulb } from 'lucide-react';

interface EccentricityAsymptoteToolProps {
  t: TranslationDictionary['eccentricityTool'];
  lang: Language;
}

export const EccentricityAsymptoteTool: React.FC<EccentricityAsymptoteToolProps> = ({ t }) => {
  // Mode 1: Given Asymptote slope k -> find e
  const [slopeK, setSlopeK] = useState<number>(0.5); // k = 1/2 or b/a

  // Mode 2: Given Eccentricity e -> find Asymptotes & ratio
  const [givenE, setGivenE] = useState<number>(1.667); // e > 1

  // Calculations for Mode 1:
  // If focus on x-axis: k = b/a => e_x = sqrt(1 + k^2)
  const eXAxis = Math.sqrt(1 + slopeK * slopeK);
  // If focus on y-axis: k = a/b => b/a = 1/k => e_y = sqrt(1 + 1/(k*k))
  const eYAxis = slopeK > 0 ? Math.sqrt(1 + 1 / (slopeK * slopeK)) : 0;

  // Calculations for Mode 2:
  // e > 1 => b/a = sqrt(e^2 - 1)
  const ratioBOverA = givenE > 1 ? Math.sqrt(givenE * givenE - 1) : 0;
  // Half angle tan(theta/2) = b/a
  const halfAngleRad = Math.atan(ratioBOverA);
  const totalAngleDeg = (2 * halfAngleRad * 180) / Math.PI;

  return (
    <div className="space-y-6">
      {/* Top Banner Warning & Core Theorem */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
            <Compass className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              {t.coreRelationTitle}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.coreRelationDesc}{' '}
              <span className="inline-block font-mono font-bold text-blue-700 bg-blue-50/70 px-2 py-0.5 rounded border border-blue-200">
                e² = c²/a² = (a² + b²)/a² = 1 + (b/a)²
              </span>
            </p>
          </div>
        </div>

        {/* 2-Column Relation Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100 text-sm">
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block mb-2 text-base">
              {t.caseXTitle}
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <span className="font-mono text-slate-900 font-semibold">y = ± (b/a) x</span></li>
              <li>• k = b/a</li>
              <li>• <span className="font-mono text-blue-700 font-bold">e = √(1 + k²)</span></li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block mb-2 text-base">
              {t.caseYTitle}
            </span>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <span className="font-mono text-slate-900 font-semibold">y = ± (a/b) x</span></li>
              <li>• k = a/b ⇒ b/a = 1/k</li>
              <li>• <span className="font-mono text-blue-700 font-bold">e = √(1 + 1/k²)</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Tool 1: Given Asymptotes -> Find Eccentricity (Highlighting DUAL SOLUTION TRAP) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <ArrowLeftRight className="w-5 h-5 text-rose-600 shrink-0" />
            <h4 className="font-bold text-slate-900 text-base sm:text-lg">
              {t.tool1Title}
            </h4>
          </div>
          <div className="text-xs sm:text-sm text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg font-medium border border-rose-200">
            {t.tool1Warning}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="text-sm font-semibold text-slate-700 block mb-2">
                {t.slopeInputLabel}
              </label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="number"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={slopeK}
                  onChange={(e) => setSlopeK(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                  className="w-24 px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm text-slate-900 bg-white"
                />
                <span className="text-sm text-slate-600 font-mono">
                  y = ± {slopeK}x
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.05"
                value={slopeK}
                onChange={(e) => setSlopeK(parseFloat(e.target.value))}
                className="w-full mt-4 accent-rose-600 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium py-1">{t.typicalSlopes}:</span>
              <button
                onClick={() => setSlopeK(0.5)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                k = 1/2
              </button>
              <button
                onClick={() => setSlopeK(0.75)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                k = 3/4
              </button>
              <button
                onClick={() => setSlopeK(1)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                k = 1
              </button>
              <button
                onClick={() => setSlopeK(Math.sqrt(3))}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                k = √3 (≈1.732)
              </button>
            </div>
          </div>

          {/* Results: Dual Solutions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Solution A */}
            <div className="p-4.5 bg-blue-50/70 rounded-xl border border-blue-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-blue-900 text-sm sm:text-base">
                    {t.caseASolution}
                  </span>
                  <span className="text-xs font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                    b/a = k = {slopeK}
                  </span>
                </div>
                <div className="my-3 p-3 bg-white rounded-lg border border-blue-100 font-mono text-center">
                  <span className="text-xs text-slate-500 block mb-1">e = √(1 + k²)</span>
                  <span className="text-lg font-bold text-blue-700">
                    e = {eXAxis.toFixed(4).replace(/\.?0+$/, '')}
                  </span>
                </div>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  e² = 1 + ({slopeK})² = {(1 + slopeK * slopeK).toFixed(3)}.
                </p>
              </div>
            </div>

            {/* Solution B */}
            <div className="p-4.5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-emerald-900 text-sm sm:text-base">
                    {t.caseBSolution}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    a/b = k ⇒ b/a = {slopeK > 0 ? (1 / slopeK).toFixed(3) : 0}
                  </span>
                </div>
                <div className="my-3 p-3 bg-white rounded-lg border border-emerald-100 font-mono text-center">
                  <span className="text-xs text-slate-500 block mb-1">e = √(1 + 1/k²)</span>
                  <span className="text-lg font-bold text-emerald-700">
                    e = {eYAxis.toFixed(4).replace(/\.?0+$/, '')}
                  </span>
                </div>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  b/a = 1/k ⇒ e² = 1 + (1/{slopeK})².
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool 2: Given Eccentricity -> Find Asymptotes & Opening Angle */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 mb-5">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
          <h4 className="font-bold text-slate-900 text-base sm:text-lg">
            {t.tool2Title}
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  {t.eccentricityInputLabel}
                </label>
                <input
                  type="number"
                  min="1.01"
                  max="5"
                  step="0.05"
                  value={givenE}
                  onChange={(e) => setGivenE(Math.max(1.001, parseFloat(e.target.value) || 1.1))}
                  className="w-24 px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono text-sm font-bold text-blue-700 bg-white"
                />
              </div>
              <input
                type="range"
                min="1.05"
                max="3.5"
                step="0.05"
                value={givenE}
                onChange={(e) => setGivenE(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono mt-1.5">
                <span>1.05</span>
                <span>e = √2 (90°)</span>
                <span>3.5</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium py-1">{t.typicalE}:</span>
              <button
                onClick={() => setGivenE(Math.SQRT2)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                e = √2 (≈1.414)
              </button>
              <button
                onClick={() => setGivenE(2)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                e = 2
              </button>
              <button
                onClick={() => setGivenE(5 / 3)}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                e = 5/3 (≈1.667)
              </button>
              <button
                onClick={() => setGivenE(Math.sqrt(5))}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition"
              >
                e = √5 (≈2.236)
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-sm space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-slate-600">{t.ratioLabel}:</span>
                <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                  b/a = {ratioBOverA.toFixed(3)} (b²/a² = {(givenE * givenE - 1).toFixed(2)})
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 flex-wrap gap-2">
                <span className="text-slate-600">{t.asymptoteIfX}:</span>
                <span className="font-mono font-bold text-blue-700 text-sm sm:text-base">
                  y = ± {ratioBOverA.toFixed(3)}x
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 flex-wrap gap-2">
                <span className="text-slate-600">{t.asymptoteIfY}:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm sm:text-base">
                  y = ± {ratioBOverA > 0 ? (1 / ratioBOverA).toFixed(3) : '0'}x
                </span>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 flex-wrap gap-2">
                <span className="text-slate-600">{t.angleBetween}:</span>
                <span className="font-mono font-bold text-purple-700 text-base">
                  θ = {totalAngleDeg.toFixed(1)}°
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>💡 {t.geometricInsight}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
