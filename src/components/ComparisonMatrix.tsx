import React from 'react';
import { TranslationDictionary, Language } from '../i18n/translations';
import { AlertTriangle, Check, X, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface ComparisonMatrixProps {
  t: TranslationDictionary['comparison'];
  lang: Language;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ t }) => {
  return (
    <div className="space-y-6">
      {/* Intro Hook Banner */}
      <div className="p-6 sm:p-7 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              {t.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.desc}
            </p>
          </div>
        </div>

        {/* Mnemonic Slogan Card */}
        <div className="mt-5 p-4 sm:p-4.5 bg-amber-50/40 border border-amber-200/80 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm">
          <div className="flex items-start sm:items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-bold text-slate-900 shrink-0">{t.sloganTitle}:</span>
            <span className="text-slate-800 font-medium">
              {t.sloganText}
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Detailed Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            {t.tableTitle}
          </h4>
          <span className="text-xs text-slate-500 font-medium">{t.tableSubtitle}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-3.5 px-4 sm:px-5 w-1/4">{t.colDimension}</th>
                <th className="py-3.5 px-4 sm:px-5 w-3/8 text-emerald-800 bg-emerald-50/40 border-r border-slate-200">
                  {t.colEllipse}
                </th>
                <th className="py-3.5 px-4 sm:px-5 w-3/8 text-blue-800 bg-blue-50/40">
                  {t.colHyperbola}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1: Standard form */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 sm:px-5 font-semibold text-slate-900 bg-slate-50/30">
                  {t.rowStandardEq}
                </td>
                <td className="py-4 px-4 sm:px-5 text-emerald-950 border-r border-slate-200 font-mono">
                  <div className="font-bold text-base">x²/a² + y²/b² = 1</div>
                  <span className="font-sans text-xs text-slate-500 block mt-0.5">(+)</span>
                </td>
                <td className="py-4 px-4 sm:px-5 text-blue-950 font-mono">
                  <div className="font-bold text-base">x²/a² - y²/b² = 1</div>
                  <span className="font-sans text-xs text-slate-500 block mt-0.5">(-)</span>
                </td>
              </tr>

              {/* Row 2: a, b, c relationship */}
              <tr className="hover:bg-slate-50/50 transition-colors bg-amber-50/20">
                <td className="py-4 px-4 sm:px-5 font-semibold text-rose-950 bg-amber-50/40">
                  {t.rowIdentity}
                  <span className="block text-xs text-rose-600 font-medium mt-0.5">
                    {t.rowIdentityWarn}
                  </span>
                </td>
                <td className="py-4 px-4 sm:px-5 text-emerald-950 border-r border-slate-200">
                  <div className="font-mono font-bold text-base text-emerald-700">a² = b² + c²</div>
                  <div className="text-xs text-slate-600 mt-1">
                    a &gt; b &gt; 0, a &gt; c &gt; 0
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-5 text-blue-950">
                  <div className="font-mono font-bold text-base text-blue-700">c² = a² + b²</div>
                  <div className="text-xs text-slate-600 mt-1">
                    c &gt; a &gt; 0, c &gt; b &gt; 0 (a ⋛ b)
                  </div>
                </td>
              </tr>

              {/* Row 3: Focus determination rule */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 sm:px-5 font-semibold text-slate-900 bg-slate-50/30">
                  {t.rowAxisRule}
                </td>
                <td className="py-4 px-4 sm:px-5 text-slate-800 border-r border-slate-200">
                  <span className="font-bold text-emerald-800">
                    {t.axisRuleEllipseDetail || (lang === 'zh' ? '看分母大小（谁大在谁轴）' : 'max(denom)')}
                  </span>
                  <div className="text-xs text-slate-600 mt-1">
                    {lang === 'zh' ? 'x²/16 + y²/9 ⇒ 焦点在 x 轴 (16 > 9)' : 'x²/16 + y²/9 ⇒ x-axis (16 > 9)'}
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-5 text-slate-800">
                  <span className="font-bold text-blue-800">
                    {t.axisRuleHyperbolaDetail || (lang === 'zh' ? '看正号所在项（正号项决定实轴）' : 'sign(+) term')}
                  </span>
                  <div className="text-xs text-slate-600 mt-1">
                    {lang === 'zh' ? 'x²/9 - y²/16 ⇒ 焦点在 x 轴 (+x²)' : 'x²/9 - y²/16 ⇒ x-axis (+x²)'}
                  </div>
                </td>
              </tr>

              {/* Row 4: Eccentricity */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 sm:px-5 font-semibold text-slate-900 bg-slate-50/30">
                  {t.rowEccentricity}
                </td>
                <td className="py-4 px-4 sm:px-5 text-emerald-950 border-r border-slate-200 font-mono">
                  <div className="font-bold text-base">0 &lt; e &lt; 1</div>
                  <div className="font-sans text-xs text-slate-600 mt-1">
                    e = c/a = √(1 - b²/a²)
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-5 text-blue-950 font-mono">
                  <div className="font-bold text-base">e &gt; 1</div>
                  <div className="font-sans text-xs text-slate-600 mt-1">
                    e = c/a = √(1 + b²/a²)
                  </div>
                </td>
              </tr>

              {/* Row 5: Asymptote */}
              <tr className="hover:bg-slate-50/50 transition-colors bg-blue-50/15">
                <td className="py-4 px-4 sm:px-5 font-semibold text-slate-900 bg-slate-50/30">
                  {t.rowAsymptote}
                </td>
                <td className="py-4 px-4 sm:px-5 text-slate-500 border-r border-slate-200">
                  <div className="flex items-center gap-1.5 font-medium text-slate-600">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{t.asymptoteNoneDetail || (lang === 'zh' ? '无渐近线（封闭光滑曲线）' : 'None (closed curve)')}</span>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-5 text-blue-950 font-mono">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>y = ± (b/a)x / y = ± (a/b)x</span>
                  </div>
                  <div className="font-sans text-xs text-slate-600 mt-1">
                    x²/a² - y²/b² = 0
                  </div>
                </td>
              </tr>

              {/* Row 6: Focal triangle area */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 sm:px-5 font-semibold text-slate-900 bg-slate-50/30">
                  {t.rowFocalTriangle}
                </td>
                <td className="py-4 px-4 sm:px-5 text-emerald-950 border-r border-slate-200 font-mono">
                  <div className="font-bold text-sm sm:text-base">S = b² · tan(θ/2)</div>
                </td>
                <td className="py-4 px-4 sm:px-5 text-blue-950 font-mono">
                  <div className="font-bold text-sm sm:text-base">S = b² / tan(θ/2) = b² · cot(θ/2)</div>
                </td>
              </tr>

              {/* Row 7: Definition */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 sm:px-5 font-semibold text-slate-900 bg-slate-50/30">
                  {t.rowDefinition}
                </td>
                <td className="py-4 px-4 sm:px-5 text-emerald-950 border-r border-slate-200 font-mono">
                  <div className="font-bold">|PF₁| + |PF₂| = 2a</div>
                  <span className="font-sans text-xs text-slate-500 block mt-0.5">(2a &gt; 2c)</span>
                </td>
                <td className="py-4 px-4 sm:px-5 text-blue-950 font-mono">
                  <div className="font-bold">||PF₁| - |PF₂|| = 2a</div>
                  <span className="font-sans text-xs text-slate-500 block mt-0.5">(2a &lt; 2c)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Top 3 Typical Trap Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.trap1Title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.trap1Wrong}
            </p>
          </div>
          <div className="mt-3 p-3 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium">
            {t.trap1Correct}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.trap2Title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.trap2Wrong}
            </p>
          </div>
          <div className="mt-3 p-3 bg-blue-50/90 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-950 font-medium">
            {t.trap2Correct}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t.trap3Title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.trap3Wrong}
            </p>
          </div>
          <div className="mt-3 p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium">
            {t.trap3Correct}
          </div>
        </div>
      </div>
    </div>
  );
};
