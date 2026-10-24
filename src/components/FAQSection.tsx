import React, { useState } from 'react';
import { Language } from '../i18n/translations';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, CheckCircle } from 'lucide-react';
import { MathView } from './MathView';

interface FAQItem {
  question: string;
  answerHtml: string;
  mathFormula?: string;
  keyTakeaway: string;
}

const FAQS_BY_LANG: Record<
  Language,
  {
    title: string;
    subtitle: string;
    items: FAQItem[];
  }
> = {
  en: {
    title: 'Frequently Asked Questions (Google Search Reference Guide)',
    subtitle: 'Authoritative explanations for high-frequency exam questions and search queries regarding hyperbolas and conic sections.',
    items: [
      {
        question: 'How do you find the asymptotes of a hyperbola from its equation?',
        answerHtml:
          'The fastest and most reliable method is the "1 to 0 Replacement Trick". For any standard hyperbola centered at (h, k), replace the right-hand constant 1 with 0.',
        mathFormula:
          '\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 0 \\implies \\frac{y-k}{b} = \\pm \\frac{x-h}{a} \\implies y - k = \\pm \\frac{b}{a}(x - h)',
        keyTakeaway: 'For horizontal hyperbolas: slope is ±(b/a). For vertical hyperbolas: slope is ±(a/b).',
      },
      {
        question: 'Why does a hyperbola have two possible eccentricities when only the asymptote slope k is given?',
        answerHtml:
          'Because the problem statement does not specify whether the transverse axis is horizontal (along x) or vertical (along y). If horizontal, k = b/a and e = √(1 + k²). If vertical, k = a/b (so b/a = 1/k) and e = √(1 + 1/k²). Omitting one case is the single most common cause of lost points on exams!',
        mathFormula: 'e_x = \\sqrt{1 + k^2} \\quad \\text{vs} \\quad e_y = \\sqrt{1 + \\frac{1}{k^2}}',
        keyTakeaway: 'Always perform case-by-case discussion unless the focal axis orientation is explicitly stated.',
      },
      {
        question: 'What is the formula difference between a hyperbola and an ellipse?',
        answerHtml:
          'In an ellipse, a is the longest semi-axis (a > b and a > c), governed by the identity a² = b² + c² with 0 < e < 1. In a hyperbola, c (semi-focal distance) is the longest dimension, governed by c² = a² + b² with e > 1. Ellipses are closed curves without asymptotes; hyperbolas are open curves with two linear asymptotes.',
        mathFormula: '\\text{Ellipse: } a^2 = b^2 + c^2 \\quad \\big| \\quad \\text{Hyperbola: } c^2 = a^2 + b^2',
        keyTakeaway: 'Memory slogan: "In ellipses, a rules (a²=b²+c²); in hyperbolas, c reigns (c²=a²+b²)".',
      },
      {
        question: 'How do you convert general equation Ax² + Cy² + Dx + Ey + F = 0 to standard form by completing the square?',
        answerHtml:
          'For a hyperbola, A and C must have opposite signs (A · C < 0). Group x terms and y terms, factor out leading coefficients A and C, add (half the linear coefficient)² inside the brackets, add the corresponding weighted values to the right side, and divide through by the resulting constant.',
        mathFormula: 'A\\left(x + \\frac{D}{2A}\\right)^2 + C\\left(y + \\frac{E}{2C}\\right)^2 = -F + \\frac{D^2}{4A} + \\frac{E^2}{4C}',
        keyTakeaway: 'Always remember to multiply the term added inside brackets by the outside coefficient when balancing the right side!',
      },
      {
        question: 'What is an equilateral (rectangular) hyperbola, and why is its eccentricity always e = √2?',
        answerHtml:
          'An equilateral hyperbola has equal semi-axes (a = b). Its asymptotes are mutually perpendicular (slopes are ±1, intersecting at 90°). Substituting a = b into the eccentricity formula yields e = √(1 + b²/a²) = √(1 + 1) = √2 ≈ 1.414.',
        mathFormula: 'a = b \\implies k = \\pm 1 \\implies e = \\sqrt{1 + 1} = \\sqrt{2}',
        keyTakeaway: 'Equilateral hyperbola: a = b, asymptotes y = ±x (angle 90°), eccentricity e = √2.',
      },
    ],
  },
  es: {
    title: 'Preguntas Frecuentes y Guía de Geometría Analítica',
    subtitle: 'Respuestas detalladas a las dudas más buscadas sobre la hipérbola, asíntotas, excentricidad y elipse.',
    items: [
      {
        question: '¿Cómo hallar las asíntotas de una hipérbola a partir de su ecuación?',
        answerHtml:
          'El método más directo es sustituir la constante 1 del segundo miembro por 0 en la ecuación canónica.',
        mathFormula: '\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 0 \\implies y - k = \\pm \\frac{b}{a}(x - h)',
        keyTakeaway: 'Hipérbola horizontal: y = ±(b/a)x. Hipérbola vertical: y = ±(a/b)x.',
      },
      {
        question: '¿Por qué hay dos posibles excentricidades si solo se da la pendiente k de las asíntotas?',
        answerHtml:
          'Porque si el enunciado no aclara el eje focal, los focos pueden estar en el eje x (k = b/a ⇒ e = √(1+k²)) o en el eje y (k = a/b ⇒ e = √(1+1/k²)). No considerar ambos casos es el fallo más habitual en exámenes.',
        mathFormula: 'e_x = \\sqrt{1 + k^2} \\quad \\text{y} \\quad e_y = \\sqrt{1 + \\frac{1}{k^2}}',
        keyTakeaway: 'Discute siempre ambos casos cuando no se especifique el eje de simetría.',
      },
      {
        question: '¿Cuál es la diferencia fundamental entre la hipérbola y la elipse?',
        answerHtml:
          'En la elipse el semieje mayor a es el más largo y cumple a² = b² + c² (0 < e < 1). En la hipérbola, la distancia focal c es la más grande y cumple c² = a² + b² (e > 1). La elipse es cerrada y sin asíntotas; la hipérbola es abierta con dos asíntotas.',
        mathFormula: '\\text{Elipse: } a^2 = b^2 + c^2 \\quad \\big| \\quad \\text{Hipérbola: } c^2 = a^2 + b^2',
        keyTakeaway: 'Regla mnemotécnica: Elipse manda a; Hipérbola manda c.',
      },
      {
        question: '¿Cómo completar cuadrados para pasar de Ax² + Cy² + Dx + Ey + F = 0 a la forma canónica?',
        answerHtml:
          'Agrupa términos en x y en y, extrae como factor común los coeficientes cuadráticos A y C, completa el trinomio cuadrado perfecto dentro de cada paréntesis y compensa en el segundo miembro multiplicando por el coeficiente exterior.',
        mathFormula: 'A(x - h)^2 + C(y - k)^2 = M \\implies \\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1',
        keyTakeaway: 'Recuerda multiplicar el término añadido por el coeficiente que quedó fuera del paréntesis.',
      },
    ],
  },
  fr: {
    title: 'Foire Aux Questions & Guide de Synthèse sur l’Hyperbole',
    subtitle: 'Explications de référence pour le baccalauréat et les études supérieures.',
    items: [
      {
        question: 'Comment trouver immédiatement les asymptotes d’une hyperbole ?',
        answerHtml:
          'La méthode canonique consiste à remplacer le membre de droite 1 par 0 dans l’équation réduite.',
        mathFormula: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 0 \\implies y = \\pm \\frac{b}{a}x',
        keyTakeaway: 'Axe transverse horizontal : y = ±(b/a)x. Axe vertical : y = ±(a/b)x.',
      },
      {
        question: 'Quelle est la différence fondamentale entre l’hyperbole et l’ellipse ?',
        answerHtml:
          'Dans l’ellipse a est le plus grand demi-axe (a² = b² + c² et 0 < e < 1). Dans l’hyperbole, c est la plus grande distance (c² = a² + b² et e > 1). L’ellipse est fermée, l’hyperbole est ouverte avec deux asymptotes.',
        mathFormula: '\\text{Ellipse : } a^2 = b^2 + c^2 \\quad \\big| \\quad \\text{Hyperbole : } c^2 = a^2 + b^2',
        keyTakeaway: 'Ellipse : a² = b² + c² ; Hyperbole : c² = a² + b².',
      },
      {
        question: 'Pourquoi l’excentricité d’une hyperbole équilatère vaut-elle toujours √2 ?',
        answerHtml:
          'Pour une hyperbole équilatère, a = b. Donc e = √(1 + b²/a²) = √(1 + 1) = √2 ≈ 1,414. Les asymptotes se croisent à angle droit (90°).',
        mathFormula: 'a = b \\implies e = \\sqrt{1 + 1} = \\sqrt{2}',
        keyTakeaway: 'Hyperbole équilatère : asymptotes perpendiculaires et e = √2.',
      },
    ],
  },
  pt: {
    title: 'Perguntas Frequentes & Guia de Geometria Analítica',
    subtitle: 'Explicações detalhadas para vestibulares (ENEM/ITA/FUVEST) e exames de geometria.',
    items: [
      {
        question: 'Como encontrar as assíntotas de uma hipérbole a partir da equação?',
        answerHtml:
          'O método mais rápido é igualar a expressão canônica a 0 (trocar o 1 da direita por 0).',
        mathFormula: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 0 \\implies y = \\pm \\frac{b}{a}x',
        keyTakeaway: 'Eixo real horizontal: y = ±(b/a)x. Eixo vertical: y = ±(a/b)x.',
      },
      {
        question: 'Qual a diferença crucial entre as fórmulas da elipse e da hipérbole?',
        answerHtml:
          'Na elipse o semieixo maior a domina com a² = b² + c² (0 < e < 1). Na hipérbole a distância focal c domina com c² = a² + b² (e > 1). A elipse não possui assíntotas; a hipérbole possui duas assíntotas.',
        mathFormula: '\\text{Elipse: } a^2 = b^2 + c^2 \\quad \\big| \\quad \\text{Hipérbole: } c^2 = a^2 + b^2',
        keyTakeaway: 'Elipse: a² = b² + c². Hipérbole: c² = a² + b².',
      },
      {
        question: 'O que é uma hipérbole equilátera e qual sua excentricidade?',
        answerHtml:
          'É a hipérbole onde os semieixos são iguais (a = b). As assíntotas são perpendiculares (formam 90°) e sua excentricidade é sempre e = √2 ≈ 1,414.',
        mathFormula: 'a = b \\implies e = \\sqrt{1 + 1} = \\sqrt{2}',
        keyTakeaway: 'Hipérbole equilátera: a = b, assíntotas a 90° e e = √2.',
      },
    ],
  },
  zh: {
    title: '常见核心问题深度解答（高考与考研高频考点）',
    subtitle: '针对高中生与教师在圆锥曲线教学中搜索频率最高的核心难点进行权威答疑。',
    items: [
      {
        question: '如何根据双曲线方程秒求渐近线？（1 变 0 极速推导法）',
        answerHtml:
          '最快最稳妥的方法是「常数 1 变 0 法」：直接将双曲线标准方程等号右侧的 1 替换为 0，移项后两边开平方即可直接得出渐近线方程，完全无需死记 b/a 还是 a/b。',
        mathFormula: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 0 \\implies \\frac{y}{b} = \\pm \\frac{x}{a} \\implies y = \\pm \\frac{b}{a}x',
        keyTakeaway: '焦点在 x 轴：y = ±(b/a)x；焦点在 y 轴：y = ±(a/b)x。',
      },
      {
        question: '为什么已知渐近线斜率 k 求离心率 e 必须警惕双解漏判？',
        answerHtml:
          '因为题目若未注明焦点在哪个轴，双曲线既可以是横向的（此时 k = b/a ⇒ e = √(1+k²)），也可以是竖向的（此时 k = a/b ⇒ b/a = 1/k ⇒ e = √(1+1/k²)）。如果不分类讨论，必漏掉一种情况，直接丢掉大半分数！',
        mathFormula: 'e_x = \\sqrt{1 + k^2} \\quad \\text{或} \\quad e_y = \\sqrt{1 + \\frac{1}{k^2}}',
        keyTakeaway: '题中无明确焦点轴向时，必须分焦点在 x 轴与 y 轴两种情况分别计算！',
      },
      {
        question: '双曲线与椭圆的 a, b, c 关系到底该如何秒记不混淆？',
        answerHtml:
          '椭圆中长半轴 a 是最长的几何量，永远满足 a² = b² + c² (0 < e < 1)；而双曲线中焦点在曲线两侧最外边，半焦距 c 是最长的量，永远满足 c² = a² + b² (e > 1)。在双曲线中 a 与 b 谁大都可以，甚至允许 a = b（等轴双曲线）。',
        mathFormula: '\\text{椭圆: } a^2 = b^2 + c^2 \\quad \\big| \\quad \\text{双曲线: } c^2 = a^2 + b^2',
        keyTakeaway: '秒记口诀：“椭圆 a 当家 (a²=b²+c²)，双曲线 c 称霸 (c²=a²+b²)”。',
      },
      {
        question: '一般方程 Ax² + Cy² + Dx + Ey + F = 0 配方法六步怎么写才能拿满分？',
        answerHtml:
          '① 移常数项 F 到右边；② 提 x² 和 y² 前的系数 A 和 C；③ 括号内分别补充 (一次项系数一半)²；④ 等号右侧加上对应的补偿项 A·(D/2A)² + C·(E/2C)²；⑤ 两边除以右侧常数化为 1；⑥ 判定正负项与 a, b, c 参数。',
        mathFormula: 'A\\left(x + \\frac{D}{2A}\\right)^2 + C\\left(y + \\frac{E}{2C}\\right)^2 = -F + \\frac{D^2}{4A} + \\frac{E^2}{4C}',
        keyTakeaway: '特别注意右边加的值一定要乘以括号外的系数 A 和 C，负号切勿算错！',
      },
    ],
  },
};

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIndexes, setOpenIndexes] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });

  const faqData = FAQS_BY_LANG[lang] || FAQS_BY_LANG.en;

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section id="faq" className="scroll-mt-24 space-y-5">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {faqData.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {faqData.subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqData.items.map((item, idx) => {
          const isOpen = !!openIndexes[idx];
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold inline-flex items-center justify-center shrink-0">
                    Q{idx + 1}
                  </span>
                  <span>{item.question}</span>
                </span>
                <span className="text-slate-400 p-1 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 space-y-3.5 text-sm">
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                    {item.answerHtml}
                  </p>

                  {item.mathFormula && (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 font-mono text-sm text-blue-950 overflow-x-auto">
                      <MathView formula={item.mathFormula} />
                    </div>
                  )}

                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Key Rule:</strong> {item.keyTakeaway}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
