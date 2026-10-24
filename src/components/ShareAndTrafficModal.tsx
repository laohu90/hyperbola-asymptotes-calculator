import React, { useState } from 'react';
import { TranslationDictionary, Language } from '../i18n/translations';
import {
  X,
  TrendingUp,
  Copy,
  CheckCircle2,
  Sparkles,
  Search,
  MessageCircle,
} from 'lucide-react';

interface ShareAndTrafficModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary['modal'];
  lang: Language;
}

export const ShareAndTrafficModal: React.FC<ShareAndTrafficModalProps> = ({
  isOpen,
  onClose,
  t,
  lang,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' && window.location.origin.includes('formulacalckit.com')
    ? window.location.href
    : 'https://hyperbola-asymptotes-calculator.formulacalckit.com';

  const promoPosts: Record<Language, string> = {
    en: `📐 [Conic Sections Mastery: Hyperbola & Ellipse Tool]
Confused by hyperbola asymptotes, eccentricity, or formula differences with ellipses?
Check out this free, clean, ad-free interactive visual solver:
✨ 1. Natural equation parser & 6-step completing the square solver (with exam-ready formatting)
✨ 2. Asymptote & eccentricity dual-solution trap calculator (prevents missing vertical hyperbola solutions)
✨ 3. Hyperbola vs Ellipse 7-point formula comparison matrix
✨ 4. Real-time dynamic focal rectangle geometry canvas
🔗 Explore now: ${appUrl}`,
    es: `📐 [Dominio de Cónicas: Hipérbola y Elipse]
¿Confundido con las asíntotas, la excentricidad o las diferencias entre elipse e hipérbola?
Prueba este solucionador visual interactivo, limpio y gratuito:
✨ 1. Completar el cuadrado en 6 pasos paso a paso
✨ 2. Calculadora de excentricidad y asíntotas (evita trampas de doble solución)
✨ 3. Matriz comparativa: Hipérbola vs Elipse
✨ 4. Lienzo geométrico interactivo dinámico
🔗 Pruébalo aquí: ${appUrl}`,
    fr: `📐 [Maîtrise des Coniques : Hyperbole & Ellipse]
Des doutes sur les asymptotes d'hyperboles, l'excentricité ou les formules par rapport à l'ellipse ?
Découvrez ce solveur visuel interactif, clair et gratuit :
✨ 1. Forme canonique et décomposition pas à pas en 6 étapes
✨ 2. Calculateur d'asymptotes et d'excentricité (double solution sans omission)
✨ 3. Tableau comparatif : Hyperbole vs Ellipse
✨ 4. Tableau géométrique interactif en temps réel
🔗 Accédez ici : ${appUrl}`,
    pt: `📐 [Domínio de Cônicas: Hipérbole e Elipse]
Confuso com as assíntotas, excentricidade ou fórmulas entre hipérbole e elipse?
Confira este solucionador visual interativo, limpo e gratuito:
✨ 1. Completamento de quadrados passo a passo em 6 etapas
✨ 2. Calculadora de excentricidade e assíntotas (previne armadilha de dupla solução)
✨ 3. Matriz comparativa: Hipérbole vs Elipse
✨ 4. Painel geométrico dinâmico interativo
🔗 Acesse aqui: ${appUrl}`,
    zh: `【高中数学圆锥曲线救命神器】
一直在双曲线和椭圆公式之间搞混？
试试这个免费纯白免广告的高中圆锥曲线精算工具：
✨ 1. 一般方程 Ax²+Cy²+Dx+Ey+F=0 一秒识别，全自动六步配方法拆解（带高考踩分点）
✨ 2. 双曲线离心率与渐近线互化（彻底解决漏解双解陷阱）
✨ 3. 椭圆 vs 双曲线 7 大核心公式避坑对照速查表
✨ 4. 动态特征矩形几何画板，实测 ||PF₁|-|PF₂||=2a
🔗 直达使用网址：${appUrl}`,
  };

  const promoPostContent = promoPosts[lang] || promoPosts.en;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(promoPostContent);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-start gap-3.5 mb-5 pr-8">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Diagnostic Breakdown */}
        <div className="space-y-5 text-sm">
          <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-500 shrink-0" />
              {t.diagTitle}
            </span>
            <ul className="space-y-2 text-slate-600 leading-relaxed pl-1 text-xs sm:text-sm">
              <li>{t.diag1}</li>
              <li>{t.diag2}</li>
              <li>{t.diag3}</li>
            </ul>
          </div>

          {/* Actionable Strategy */}
          <div className="p-4 sm:p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-3">
            <span className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              {t.strategyTitle}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                <span className="font-bold text-slate-800 block text-xs sm:text-sm">{t.strat1Title}</span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {t.strat1Desc}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                <span className="font-bold text-slate-800 block text-xs sm:text-sm">{t.strat2Title}</span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {t.strat2Desc}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-emerald-100 space-y-1">
                <span className="font-bold text-slate-800 block text-xs sm:text-sm">{t.strat3Title}</span>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {t.strat3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Copy Promo Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5 text-xs sm:text-sm">
                <MessageCircle className="w-4 h-4 text-blue-600 shrink-0" />
                {t.promoLabel}
              </span>
              <button
                onClick={handleCopyPost}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPost ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {t.copiedPromo}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t.copyPromoBtn}
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              value={promoPostContent}
              rows={5}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none"
            />
          </div>

          {/* Share links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                readOnly
                value={appUrl}
                className="flex-1 sm:w-80 px-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono text-slate-600 bg-slate-50"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedLink ? t.copiedLink : t.copyLinkBtn}
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-sm text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
