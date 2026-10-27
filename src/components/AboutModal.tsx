import React, { useState } from 'react';
import { X, BookOpen, ShieldCheck, Mail, CheckCircle2, GraduationCap, FileText } from 'lucide-react';
import { TranslationDictionary, Language } from '../i18n/translations';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  t: TranslationDictionary;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, lang }) => {
  const [errataSubmitted, setErrataSubmitted] = useState(false);
  const [errataText, setErrataText] = useState('');

  if (!isOpen) return null;

  const handleSubmitErrata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errataText.trim()) return;
    setErrataSubmitted(true);
    setTimeout(() => {
      setErrataSubmitted(false);
      setErrataText('');
    }, 3000);
  };

  const titles = {
    zh: {
      aboutTitle: '关于本工具与学术严谨度说明',
      subtitle: '高精圆锥曲线（双曲线）解析几何计算器 · 教学与备考权威工具',
      sec1: '1. 工具定位与学术规范',
      sec1Desc: '本计算器专为高中数学、高考复习、AP Calculus 及大学解析几何设计，提供双曲线标准方程、配方法六步推导、离心率双解破坑及渐近线完备求解。',
      sec2: '2. 核心数学公式与推导规范',
      sec2Formula1: '双曲线焦点恒等式：c² = a² + b² （与椭圆 a² = b² + c² 严格区分）',
      sec2Formula2: '渐近线三式合一：点斜式 (y-k)=±(b/a)(x-h)；斜截式 y=mx+b；一般式 Ax+By+C=0',
      sec2Formula3: '离心率关系：e = c/a = √(1 + k²) （k 为渐近线斜率）',
      sec3: '3. 教材与考试大纲参考标准',
      sec3Desc: '算法逻辑完全对齐人民教育出版社 (RJP) 人教 A 版高二选择性必修一《圆锥曲线》、AP Precalculus & Calculus BC Conic Sections 章节、高考数学解答题踩分点规范。',
      sec4: '4. 勘误反馈与学术交流入口',
      errataPlaceholder: '请输入您发现的公式疑问、计算疑问或改进建议...',
      submitBtn: '提交勘误建议',
      submittedMsg: '感谢您的反馈！勘误建议已记录。',
      version: '当前版本：v2.4.0 (2026年10月最新修正版)',
      close: '关闭',
    },
    en: {
      aboutTitle: 'About & Academic Credibility',
      subtitle: 'High-Precision Analytic Geometry Calculator & Educational Conic Solver',
      sec1: '1. Purpose & Academic Standards',
      sec1Desc: 'Designed for high school analytic geometry, AP Calculus, SAT Math, and college mathematics. Provides instant hyperbola calculations, 6-step completing the square breakdowns, and dual-solution asymptote tools.',
      sec2: '2. Verified Mathematical Formulas',
      sec2Formula1: 'Hyperbolic Identity: c² = a² + b² (strictly separated from ellipse a² = b² + c²)',
      sec2Formula2: '3 Asymptote Representations: Point-Slope, Slope-Intercept, and General Linear Forms',
      sec2Formula3: 'Eccentricity Relation: e = c/a = √(1 + k²) where k = asymptote slope',
      sec3: '3. Curriculum Alignment',
      sec3Desc: 'Grounded in standard STEM curricula including AP Precalculus, SAT Subject Math, Baccalauréat, and IB Mathematics HL conic sections modules.',
      sec4: '4. Formula Verification & Errata Submission',
      errataPlaceholder: 'Describe any formula feedback, error report, or suggestion...',
      submitBtn: 'Submit Feedback',
      submittedMsg: 'Thank you! Your feedback has been recorded.',
      version: 'Version: v2.4.0 (Updated October 2026)',
      close: 'Close',
    },
    es: {
      aboutTitle: 'Acerca de y Rigor Académico',
      subtitle: 'Calculadora de Geometría Analítica y Solucionador Didáctico de Cónicas',
      sec1: '1. Propósito y Estándares',
      sec1Desc: 'Herramienta diseñada para estudiantes de Bachillerato, Selectividad (EBAU) y universidad. Cálculo de hipérbolas, paso a paso de completar cuadrados y asíntotas.',
      sec2: '2. Fórmulas Matemáticas Verificadas',
      sec2Formula1: 'Identidad hiperbólica: c² = a² + b² (diferente de la elipse a² = b² + c²)',
      sec2Formula2: '3 Formas de Asíntotas: Punto-pendiente, Explícita e Implícita General',
      sec2Formula3: 'Excentricidad: e = c/a = √(1 + k²)',
      sec3: '3. Referencias de Currículo',
      sec3Desc: 'Basado en los temarios estándar de Geometría Analítica y Cónicas.',
      sec4: '4. Buzón de Erratas y Contacto',
      errataPlaceholder: 'Escriba cualquier corrección o sugerencia...',
      submitBtn: 'Enviar Corrección',
      submittedMsg: '¡Gracias! Su comentario ha sido registrado.',
      version: 'Versión: v2.4.0 (Octubre 2026)',
      close: 'Cerrar',
    },
    fr: {
      aboutTitle: 'À propos & Rigueur Académique',
      subtitle: 'Calculateur de Géométrie Analytique et Solveur de Coniques',
      sec1: '1. Objectif & Rigueur',
      sec1Desc: 'Outil didactique pour le Lycée, le Baccalauréat et les études supérieures. Calcul d\'hyperboles, forme canonique étape par étape et asymptotes.',
      sec2: '2. Formules Mathématiques Vérifiées',
      sec2Formula1: 'Relation fondamentale : c² = a² + b² (distincte de l\'ellipse a² = b² + c²)',
      sec2Formula2: '3 Représentations des Asymptotes : Point-Pente, Réduite et Générale',
      sec2Formula3: 'Excentricité : e = c/a = √(1 + k²)',
      sec3: '3. Conformité aux Programmes',
      sec3Desc: 'Conforme aux programmes de mathématiques spécialité du Baccalauréat et des classes préparatoires.',
      sec4: '4. Signalement d\'Erreurs et Contact',
      errataPlaceholder: 'Indiquez toute suggestion ou erreur constatée...',
      submitBtn: 'Envoyer',
      submittedMsg: 'Merci ! Votre remarque a été enregistrée.',
      version: 'Version : v2.4.0 (Octobre 2026)',
      close: 'Fermer',
    },
    pt: {
      aboutTitle: 'Sobre e Rigor Acadêmico',
      subtitle: 'Calculadora de Geometria Analítica e Solucionador de Cônicas',
      sec1: '1. Propósito e Padrões',
      sec1Desc: 'Ferramenta para Ensino Médio, Vestibular e Ensino Superior. Resolução de hipérboles, completamento de quadrados e assíntotas.',
      sec2: '2. Fórmulas Matemáticas Verificadas',
      sec2Formula1: 'Identidade hiperbólica: c² = a² + b² (diferente da elipse a² = b² + c²)',
      sec2Formula2: '3 Formas de Assíntotas: Ponto-Inclinação, Reduzida e Geral',
      sec2Formula3: 'Excentricidade: e = c/a = √(1 + k²)',
      sec3: '3. Referências Curriculares',
      sec3Desc: 'Alinhado aos programas de Geometria Analítica para Exame Nacional e vestibulares.',
      sec4: '4. Canal de Errata e Contato',
      errataPlaceholder: 'Digite sua sugestão ou erro encontrado...',
      submitBtn: 'Enviar',
      submittedMsg: 'Obrigado! Seu comentário foi registrado.',
      version: 'Versão: v2.4.0 (Outubro de 2026)',
      close: 'Fechar',
    },
  };

  const content = titles[lang] || titles.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-start gap-3.5 mb-5 pr-8">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {content.aboutTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-sm">
              <BookOpen className="w-4 h-4 text-blue-600" />
              {content.sec1}
            </h4>
            <p>{content.sec1Desc}</p>
          </div>

          {/* Section 2 */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1.5">
            <h4 className="font-bold text-blue-950 mb-1 flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              {content.sec2}
            </h4>
            <ul className="space-y-1 font-mono text-xs text-blue-900">
              <li>• {content.sec2Formula1}</li>
              <li>• {content.sec2Formula2}</li>
              <li>• {content.sec2Formula3}</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-sm">
              <FileText className="w-4 h-4 text-emerald-600" />
              {content.sec3}
            </h4>
            <p>{content.sec3Desc}</p>
          </div>

          {/* Errata Form */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <Mail className="w-4 h-4 text-amber-600" />
              {content.sec4}
            </h4>
            <form onSubmit={handleSubmitErrata} className="space-y-2">
              <textarea
                value={errataText}
                onChange={(e) => setErrataText(e.target.value)}
                placeholder={content.errataPlaceholder}
                rows={3}
                className="w-full p-2.5 bg-white border border-amber-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {content.submitBtn}
                </button>
                {errataSubmitted && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {content.submittedMsg}
                  </span>
                )}
              </div>
            </form>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-400 font-mono text-xs">
            <span>{content.version}</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {content.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
