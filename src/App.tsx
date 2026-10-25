import React, { useState, useEffect } from 'react';
import { HyperbolaStandardState } from './types/conic';
import { calculateHyperbolaProperties } from './utils/mathUtils';
import { Navbar } from './components/Navbar';
import { InteractiveGraph } from './components/InteractiveGraph';
import { StandardCalculator } from './components/StandardCalculator';
import { CompletingSquareSolver } from './components/CompletingSquareSolver';
import { EccentricityAsymptoteTool } from './components/EccentricityAsymptoteTool';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ClassicProblemsBank } from './components/ClassicProblemsBank';
import { FAQSection } from './components/FAQSection';
import { ShareAndTrafficModal } from './components/ShareAndTrafficModal';
import { Language, TRANSLATIONS } from './i18n/translations';
import { Sparkles, Compass, ArrowUpRight, TrendingUp } from 'lucide-react';

const getInitialLang = (): Language => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Language;
    if (langParam && ['en', 'es', 'fr', 'pt', 'zh'].includes(langParam)) {
      return langParam;
    }
  }
  return 'en';
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLang); // Default is English per requirements
  const [activeSection, setActiveSection] = useState<string>('calculator');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang];

  // Dynamically sync document title, html lang, canonical tag, and meta tags for high-ranking SEO
  useEffect(() => {
    document.title = t.meta.title;
    document.documentElement.lang = currentLang;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', t.meta.description);

    const kwMeta = document.querySelector('meta[name="keywords"]');
    if (kwMeta) kwMeta.setAttribute('content', t.meta.keywords);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t.meta.description);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute(
        'href',
        currentLang === 'en'
          ? 'https://hyperbola-asymptotes-calculator.formulacalckit.com/'
          : `https://hyperbola-asymptotes-calculator.formulacalckit.com/?lang=${currentLang}`
      );
    }

    if (typeof window !== 'undefined' && window.history?.replaceState) {
      const url = new URL(window.location.href);
      if (currentLang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', currentLang);
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [currentLang, t]);

  // Shared geometric state for the hyperbola
  const [standardState, setStandardState] = useState<HyperbolaStandardState>({
    axis: 'x',
    h: 0,
    k: 0,
    a: 3,
    b: 2,
  });

  const properties = calculateHyperbolaProperties(standardState);

  const handleReset = () => {
    setStandardState({
      axis: 'x',
      h: 0,
      k: 0,
      a: 3,
      b: 2,
    });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar with Language Switcher */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onReset={handleReset}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        t={t}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7 space-y-12">
        {/* Growth & Traffic Advisory Banner */}
        <div className="p-3.5 sm:p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-amber-950">
          <div className="flex items-center gap-2.5">
            <span className="font-bold bg-amber-200/90 text-amber-950 px-2.5 py-0.5 rounded-md text-xs whitespace-nowrap">
              {currentLang === 'zh' ? '增长指南' : 'Growth & Traffic Tip'}
            </span>
            <span className="text-xs sm:text-sm">
              {currentLang === 'zh'
                ? '冷启动诊断：新上线的工具如何快速获取自然搜索量与种子学生群口碑？'
                : 'Cold Start Diagnosis: Why do new math tools struggle for organic traffic and how to jumpstart user adoption?'}
            </span>
          </div>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900 underline whitespace-nowrap text-xs sm:text-sm cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            {t.nav.shareGuide}
          </button>
        </div>

        {/* Hero Section & Interactive Lab Zone */}
        <section id="calculator" className="space-y-7 scroll-mt-24">
          <div className="pb-5 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-2.5 flex-wrap">
              <span className="font-semibold text-blue-700">{t.hero.badge}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {t.hero.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => scrollToSection('completing-square')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  {t.hero.ctaCompletingSquare}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Feature Quick Navigation Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-5 pt-2">
              <button
                onClick={() => scrollToSection('calculator')}
                className="p-3.5 sm:p-4 bg-slate-50 hover:bg-blue-50/70 rounded-2xl border border-slate-200 hover:border-blue-300 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                  <span>{t.hero.card1Title}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {t.hero.card1Sub}
                </p>
              </button>

              <button
                onClick={() => scrollToSection('completing-square')}
                className="p-3.5 sm:p-4 bg-slate-50 hover:bg-blue-50/70 rounded-2xl border border-slate-200 hover:border-blue-300 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                  <span>{t.hero.card2Title}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {t.hero.card2Sub}
                </p>
              </button>

              <button
                onClick={() => scrollToSection('eccentricity-asymptote')}
                className="p-3.5 sm:p-4 bg-slate-50 hover:bg-blue-50/70 rounded-2xl border border-slate-200 hover:border-blue-300 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                  <span>{t.hero.card3Title}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {t.hero.card3Sub}
                </p>
              </button>

              <button
                onClick={() => scrollToSection('comparison')}
                className="p-3.5 sm:p-4 bg-slate-50 hover:bg-blue-50/70 rounded-2xl border border-slate-200 hover:border-blue-300 text-left transition-all group cursor-pointer"
              >
                <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 flex items-center justify-between">
                  <span>{t.hero.card4Title}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {t.hero.card4Sub}
                </p>
              </button>
            </div>
          </div>

          {/* Dual Zone: Left/Top Graph + Right/Bottom Standard Parameters */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-stretch">
            {/* Left 7 Columns: Interactive Coordinate Graph */}
            <div className="xl:col-span-7 flex flex-col">
              <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-600" />
                  {currentLang === 'zh' ? '动态直角坐标系几何画板' : 'Dynamic Coordinate Geometry Stage'}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-mono">
                  a={standardState.a} · b={standardState.b} · c={properties.c.toFixed(2)} · e={properties.eccentricity.toFixed(3)}
                </span>
              </div>
              <div className="flex-1 w-full min-h-[480px]">
                <InteractiveGraph properties={properties} t={t.canvas} />
              </div>
            </div>

            {/* Right 5 Columns: Standard Equation Parameter Controls */}
            <div className="xl:col-span-5 flex flex-col">
              <StandardCalculator
                state={standardState}
                onChange={setStandardState}
                t={t.calculator}
                lang={currentLang}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Completing the Square Step-by-Step Breakdown */}
        <section id="completing-square" className="scroll-mt-24">
          <CompletingSquareSolver
            onApplyToCanvas={(newState) => {
              setStandardState(newState);
              scrollToSection('calculator');
            }}
            t={t.completingSquare}
            lang={currentLang}
          />
        </section>

        {/* Section 3: Eccentricity & Asymptote Relationship Tool */}
        <section id="eccentricity-asymptote" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.eccentricityTool.coreRelationTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentLang === 'zh'
                ? '破解「由斜率求离心率」双解遗漏陷阱，掌握渐近线夹角与双曲线开阔度变化规律'
                : 'Solve dual-solution traps when determining eccentricity from asymptote slope, and visualize angular aperture.'}
            </p>
          </div>
          <EccentricityAsymptoteTool
            t={t.eccentricityTool}
            lang={currentLang}
            onApplyToCanvas={(newState) => {
              setStandardState(newState);
              scrollToSection('calculator');
            }}
          />
        </section>

        {/* Section 4: Hyperbola vs Ellipse Anti-Confusion Comparison */}
        <section id="comparison" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.comparison.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.comparison.desc}
            </p>
          </div>
          <ComparisonMatrix t={t.comparison} lang={currentLang} />
        </section>

        {/* Section 5: Classic Exam Problems & Practice Quiz Bank */}
        <section id="problems-bank" className="scroll-mt-24">
          <ClassicProblemsBank t={t.problems} lang={currentLang} />
        </section>

        {/* Section 6: Comprehensive Google Search & Educational FAQ Guide */}
        <FAQSection lang={currentLang} />
      </main>

      {/* Clean Pure White Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-10 text-center text-xs sm:text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">{t.nav.brand}</span>
            <span>·</span>
            <span>{t.hero.card1Title} & {t.hero.card3Title}</span>
          </div>
          <div className="text-slate-400 font-mono text-xs">
            c² = a² + b² · e = √(1 + b²/a²) &gt; 1 · y = ±(b/a)x
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Quick Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 md:hidden flex items-center justify-around text-xs font-medium text-slate-600 shadow-xl">
        <button
          onClick={() => scrollToSection('calculator')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
            activeSection === 'calculator' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <span>{t.nav.standard}</span>
        </button>
        <button
          onClick={() => scrollToSection('completing-square')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
            activeSection === 'completing-square' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <span>{t.nav.completingSquare}</span>
        </button>
        <button
          onClick={() => scrollToSection('eccentricity-asymptote')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
            activeSection === 'eccentricity-asymptote' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <span>{t.nav.eccentricity}</span>
        </button>
        <button
          onClick={() => scrollToSection('comparison')}
          className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
            activeSection === 'comparison' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <span>{t.nav.comparison}</span>
        </button>
      </div>

      {/* Traffic & Share Diagnostic Modal */}
      <ShareAndTrafficModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        t={t.modal}
        lang={currentLang}
      />
    </div>
  );
}
