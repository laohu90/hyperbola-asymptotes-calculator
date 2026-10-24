import React, { useState } from 'react';
import { Share2, RotateCcw, Globe, ChevronDown } from 'lucide-react';
import { Language, TranslationDictionary } from '../i18n/translations';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReset: () => void;
  onOpenShareModal: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  t: TranslationDictionary;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onReset,
  onOpenShareModal,
  currentLang,
  onSelectLang,
  t,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand title, single line text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('calculator');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-600 transition-colors"
        >
          {t.nav.brand}
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeSection === 'calculator'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.nav.standard}
          </button>
          <button
            onClick={() => onNavigate('completing-square')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeSection === 'completing-square'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.nav.completingSquare}
          </button>
          <button
            onClick={() => onNavigate('eccentricity-asymptote')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeSection === 'eccentricity-asymptote'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.nav.eccentricity}
          </button>
          <button
            onClick={() => onNavigate('comparison')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeSection === 'comparison'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.nav.comparison}
          </button>
          <button
            onClick={() => onNavigate('problems-bank')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeSection === 'problems-bank'
                ? 'text-blue-600 border-blue-600 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.nav.quiz}
          </button>
        </nav>

        {/* Zone 3: Actions + Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Select Language / Cambiar Idioma / Changer de Langue / 选择语言"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{currentLangObj.flag} {currentLangObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setLangMenuOpen(false)}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentLang === lang.code
                        ? 'font-bold text-blue-600 bg-blue-50/50'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.flag} {lang.label}</span>
                    {currentLang === lang.code && <span className="text-blue-600 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onReset}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="Reset Canvas and Parameters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.nav.reset}
          </button>

          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.shareGuide}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
