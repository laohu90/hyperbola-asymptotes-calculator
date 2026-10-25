import React, { useState } from 'react';
import { TranslationDictionary, Language } from '../i18n/translations';
import {
  ArrowLeftRight,
  Compass,
  Lightbulb,
  Crosshair,
  Target,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import {
  solveHyperbolaFromAsymptoteAndPoint,
  solveHyperbolaFromFociAndVertices,
  formatFraction,
  simplifyRadical,
} from '../utils/mathUtils';
import { MathView } from './MathView';
import { HyperbolaStandardState, FocalAxis } from '../types/conic';

interface EccentricityAsymptoteToolProps {
  t: TranslationDictionary['eccentricityTool'];
  lang: Language;
  onApplyToCanvas?: (state: HyperbolaStandardState) => void;
}

export const EccentricityAsymptoteTool: React.FC<EccentricityAsymptoteToolProps> = ({
  t,
  lang,
  onApplyToCanvas,
}) => {
  const [activeTab, setActiveTab] = useState<'k_e_relation' | 'asymptote_point' | 'foci_vertices'>('k_e_relation');

  // Tool 1: Given Asymptote slope k -> find e
  const [slopeK, setSlopeK] = useState<number>(0.5); // k = 1/2 or b/a
  const [givenE, setGivenE] = useState<number>(1.667); // e > 1

  // Calculations for Tool 1:
  const eXAxis = Math.sqrt(1 + slopeK * slopeK);
  const eYAxis = slopeK > 0 ? Math.sqrt(1 + 1 / (slopeK * slopeK)) : 0;
  const ratioBOverA = givenE > 1 ? Math.sqrt(givenE * givenE - 1) : 0;
  const halfAngleRad = Math.atan(ratioBOverA);
  const totalAngleDeg = (2 * halfAngleRad * 180) / Math.PI;
  const acuteAngleDeg = Math.min(totalAngleDeg, 180 - totalAngleDeg);

  // Tool 2: Asymptote + Point -> Equation
  const [tool2SlopeK, setTool2SlopeK] = useState<number>(0.75); // 3/4
  const [pointX0, setPointX0] = useState<number>(5);
  const [pointY0, setPointY0] = useState<number>(0);
  const [centerH, setCenterH] = useState<number>(0);
  const [centerK, setCenterK] = useState<number>(0);

  const tool2Solution = solveHyperbolaFromAsymptoteAndPoint(
    tool2SlopeK,
    pointX0,
    pointY0,
    centerH,
    centerK,
    lang
  );

  // Tool 3: Foci & Vertices -> Equation
  const [tool3Axis, setTool3Axis] = useState<FocalAxis>('x');
  const [tool3A, setTool3A] = useState<number>(3);
  const [tool3C, setTool3C] = useState<number>(5);
  const [tool3H, setTool3H] = useState<number>(0);
  const [tool3K, setTool3K] = useState<number>(0);

  const tool3Solution = solveHyperbolaFromFociAndVertices(
    tool3Axis,
    tool3A,
    tool3C,
    tool3H,
    tool3K
  );

  return (
    <div className="space-y-6">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('k_e_relation')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'k_e_relation'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          {t.tabKE}
        </button>

        <button
          onClick={() => setActiveTab('asymptote_point')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'asymptote_point'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Crosshair className="w-4 h-4" />
          {t.tabAsymptotePoint}
        </button>

        <button
          onClick={() => setActiveTab('foci_vertices')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'foci_vertices'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          {t.tabFociVertices}
        </button>
      </div>

      {/* TAB 1: K <-> E RELATION */}
      {activeTab === 'k_e_relation' && (
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
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    k = 1/2
                  </button>
                  <button
                    onClick={() => setSlopeK(0.75)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    k = 3/4
                  </button>
                  <button
                    onClick={() => setSlopeK(1)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    k = 1
                  </button>
                  <button
                    onClick={() => setSlopeK(Math.sqrt(3))}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
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
                        e = {simplifyRadical(1 + slopeK * slopeK)} (≈ {eXAxis.toFixed(3)})
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                      e² = 1 + ({slopeK})² = {formatFraction(1 + slopeK * slopeK, 1)}.
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
                        e = {simplifyRadical(1 + 1 / (slopeK * slopeK))} (≈ {eYAxis.toFixed(3)})
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                      b/a = 1/k ⇒ e² = 1 + (1/{slopeK})² = {formatFraction(1 + 1 / (slopeK * slopeK), 1)}.
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
                      step="0.05"
                      value={givenE}
                      onChange={(e) => setGivenE(parseFloat(e.target.value) || 0)}
                      className={`w-24 px-2.5 py-1.5 border rounded-lg font-mono text-sm font-bold bg-white ${
                        givenE <= 1
                          ? 'border-rose-400 text-rose-700 bg-rose-50/50'
                          : 'border-slate-300 text-blue-700'
                      }`}
                    />
                  </div>
                  <input
                    type="range"
                    min="1.05"
                    max="3.5"
                    step="0.05"
                    value={givenE <= 1 ? 1.05 : givenE}
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
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    e = √2 (≈1.414)
                  </button>
                  <button
                    onClick={() => setGivenE(2)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    e = 2
                  </button>
                  <button
                    onClick={() => setGivenE(5 / 3)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    e = 5/3 (≈1.667)
                  </button>
                  <button
                    onClick={() => setGivenE(Math.sqrt(5))}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-mono text-slate-700 transition cursor-pointer"
                  >
                    e = √5 (≈2.236)
                  </button>
                </div>
              </div>

              {givenE <= 1 ? (
                <div className="lg:col-span-7 p-5 bg-rose-50/90 border border-rose-200 rounded-xl text-rose-900 text-xs sm:text-sm space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-rose-800 text-sm sm:text-base">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>
                      {lang === 'zh'
                        ? '非法离心率输入：双曲线离心率必须大于 1 (e > 1)'
                        : lang === 'es'
                        ? 'Excentricidad inválida: e debe ser mayor que 1 (e > 1)'
                        : lang === 'fr'
                        ? 'Excentricité invalide : e doit être supérieur à 1 (e > 1)'
                        : lang === 'pt'
                        ? 'Excentricidade inválida: e deve ser maior que 1 (e > 1)'
                        : 'Invalid Eccentricity: e must be strictly greater than 1 (e > 1)'}
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    {lang === 'zh'
                      ? `在双曲线中，半焦距 c 严格大于实半轴 a (c > a)，因此离心率 e = c/a 必须严格大于 1 (e > 1)。您当前输入的 e = ${givenE} 不满足双曲线定义。`
                      : `In a hyperbola, focal distance c strictly exceeds semi-axis a (c > a), so eccentricity e = c/a must strictly exceed 1 (e > 1). Your current input e = ${givenE} violates hyperbola definition.`}
                  </p>
                  <div className="p-3 bg-white/90 rounded-lg border border-rose-200 font-mono text-xs text-rose-950 space-y-1">
                    <div>• 0 &lt; e &lt; 1: {lang === 'zh' ? '椭圆 (Ellipse)' : 'Ellipse'}</div>
                    <div>• e = 1: {lang === 'zh' ? '抛物线 (Parabola)' : 'Parabola'}</div>
                    <div>• e &gt; 1: {lang === 'zh' ? '双曲线 (Hyperbola)' : 'Hyperbola'}</div>
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 text-sm space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-slate-600">{t.ratioLabel}:</span>
                      <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                        b/a = {ratioBOverA.toFixed(3)} (b²/a² = {formatFraction(givenE * givenE - 1, 1)})
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
                      <div className="text-right">
                        <span className="font-mono font-bold text-purple-700 text-base block">
                          θ = {totalAngleDeg.toFixed(1)}°
                        </span>
                        <span className="text-xs text-slate-500 font-mono block">
                          {t.acuteIntersectionAngle}: {acuteAngleDeg.toFixed(1)}°
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 leading-relaxed space-y-1">
                    <strong>💡 {t.geometricInsight}</strong>
                    <div className="text-xs text-amber-900">
                      {t.angleNoticeDetail}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ASYMPTOTE + POINT -> EQUATION SOLVER */}
      {activeTab === 'asymptote_point' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-blue-600" />
                {t.tool2Heading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.tool2Sub}
              </p>
            </div>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {t.slopeKLabel}
              </label>
              <input
                type="number"
                step="0.05"
                min="0.1"
                value={tool2SlopeK}
                onChange={(e) => setTool2SlopeK(parseFloat(e.target.value) || 0.5)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white"
              />
              <span className="text-slate-500 text-xs mt-1 block">0.75 (3/4) / 0.5 (1/2)</span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {t.pointXLabel}
              </label>
              <input
                type="number"
                value={pointX0}
                onChange={(e) => setPointX0(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {t.pointYLabel}
              </label>
              <input
                type="number"
                value={pointY0}
                onChange={(e) => setPointY0(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white"
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setTool2SlopeK(0.75);
                    setPointX0(5);
                    setPointY0(0);
                  }}
                  className="px-2.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-mono text-xs text-slate-700 cursor-pointer"
                >
                  {t.ex1Btn}
                </button>
                <button
                  onClick={() => {
                    setTool2SlopeK(1.5);
                    setPointX0(0);
                    setPointY0(3);
                  }}
                  className="px-2.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-mono text-xs text-slate-700 cursor-pointer"
                >
                  {t.ex2Btn}
                </button>
              </div>
            </div>
          </div>

          {/* Solution Breakdown */}
          {!tool2Solution.success ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong>
                <p className="mt-1">{tool2Solution.message}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <div>
                  <span className="text-xs text-blue-700 font-bold block mb-0.5">
                    {t.solvedEqTitle}
                  </span>
                  <div className="font-mono text-base sm:text-lg font-bold text-blue-900">
                    {tool2Solution.axis === 'x'
                      ? `x² / ${formatFraction(tool2Solution.standardState!.a ** 2, 1)} - y² / ${formatFraction(tool2Solution.standardState!.b ** 2, 1)} = 1`
                      : `y² / ${formatFraction(tool2Solution.standardState!.a ** 2, 1)} - x² / ${formatFraction(tool2Solution.standardState!.b ** 2, 1)} = 1`}
                  </div>
                </div>

                {onApplyToCanvas && (
                  <button
                    onClick={() => onApplyToCanvas(tool2Solution.standardState!)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t.applyToCanvasBtn}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Step By Step */}
              <div className="space-y-3">
                {tool2Solution.steps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-800 text-xs sm:text-sm block mb-1">
                      {step.title}
                    </span>
                    <div className="my-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 font-mono text-sm text-blue-900">
                      <MathView formula={step.math} />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FOCI & VERTICES -> EQUATION SOLVER */}
      {activeTab === 'foci_vertices' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                {t.tool3Heading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.tool3Sub}
              </p>
            </div>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <label className="font-bold text-slate-700 block mb-1">{t.focalAxisLabel}</label>
              <select
                value={tool3Axis}
                onChange={(e) => setTool3Axis(e.target.value as FocalAxis)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white"
              >
                <option value="x">Horizontal (x-axis)</option>
                <option value="y">Vertical (y-axis)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">{t.semiALabel}</label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                value={tool3A}
                onChange={(e) => setTool3A(Math.max(0.1, parseFloat(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">{t.semiCLabel}</label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                value={tool3C}
                onChange={(e) => setTool3C(Math.max(0.1, parseFloat(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white"
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setTool3A(3);
                    setTool3C(5);
                  }}
                  className="px-2.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-mono text-xs text-slate-700 cursor-pointer"
                >
                  {t.pythagoreanBtn}
                </button>
                <button
                  onClick={() => {
                    setTool3A(2);
                    setTool3C(4);
                  }}
                  className="px-2.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg font-mono text-xs text-slate-700 cursor-pointer"
                >
                  {t.ex3Btn}
                </button>
              </div>
            </div>
          </div>

          {/* Solution Output */}
          {!tool3Solution.success ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong>
                <p className="mt-1">{tool3Solution.message}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-emerald-50/80 p-4 rounded-xl border border-emerald-200">
                <div>
                  <span className="text-xs text-emerald-800 font-bold block mb-0.5">
                    {t.solvedResultTitle}
                  </span>
                  <div className="font-mono text-base sm:text-lg font-bold text-emerald-950">
                    {tool3Axis === 'x'
                      ? `x² / ${formatFraction(tool3A ** 2, 1)} - y² / ${formatFraction(tool3Solution.standardState!.b ** 2, 1)} = 1`
                      : `y² / ${formatFraction(tool3A ** 2, 1)} - x² / ${formatFraction(tool3Solution.standardState!.b ** 2, 1)} = 1`}
                  </div>
                </div>

                {onApplyToCanvas && (
                  <button
                    onClick={() => onApplyToCanvas(tool3Solution.standardState!)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t.applyToCanvasBtn}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {tool3Solution.steps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-800 text-xs sm:text-sm block mb-1">
                      {step.title}
                    </span>
                    <div className="my-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 font-mono text-sm text-blue-900">
                      <MathView formula={step.math} />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
