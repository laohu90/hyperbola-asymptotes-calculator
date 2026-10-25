import React, { useState } from 'react';
import { TranslationDictionary, Language } from '../i18n/translations';
import { MathView } from './MathView';
import {
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  FileText,
  Lightbulb,
} from 'lucide-react';

interface ExamProblem {
  id: string;
  category: string;
  source: string;
  title: string;
  question: string;
  trapAlert: string;
  steps: { stepTitle: string; math: string; detail: string }[];
}

interface QuizItem {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  trapWarning: string;
  detailedSteps: string[];
}

const getLocalizedProblems = (lang: Language): ExamProblem[] => {
  switch (lang) {
    case 'es':
      return [
        {
          id: 'p1',
          category: 'Excentricidad y trampa de doble solución',
          source: 'Examen de Selectividad / Bachillerato',
          title: 'Dada la ecuación de la asíntota, hallar la excentricidad e',
          question: 'Dada una hipérbola con asíntota y = (√3/3)x, calcula su excentricidad e.',
          trapAlert: '¡No se especifica si los focos están en el eje x o en el eje y! Es obligatorio discutir ambos casos para no perder la mitad de la puntuación.',
          steps: [
            {
              stepTitle: 'Paso 1: Clasificación según el eje focal',
              math: '|k| = \\frac{\\sqrt{3}}{3}',
              detail: 'Como solo se da la pendiente, la hipérbola puede ser horizontal o vertical.',
            },
            {
              stepTitle: 'Caso 1: Focos en el eje x',
              math: '\\frac{b}{a} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b^2}{a^2} = \\frac{1}{3} \n e^2 = 1 + \\frac{b^2}{a^2} = 1 + \\frac{1}{3} = \\frac{4}{3} \\implies e = \\frac{2\\sqrt{3}}{3}',
              detail: 'El eje transverso está en el eje x, por lo que la pendiente es b/a.',
            },
            {
              stepTitle: 'Caso 2: Focos en el eje y',
              math: '\\frac{a}{b} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b}{a} = \\sqrt{3} \\implies \\frac{b^2}{a^2} = 3 \n e^2 = 1 + \\frac{b^2}{a^2} = 1 + 3 = 4 \\implies e = 2',
              detail: 'El eje transverso está en el eje y, por lo que la pendiente es a/b.',
            },
            {
              stepTitle: 'Conclusión',
              math: 'e = \\frac{2\\sqrt{3}}{3} \\quad \\text{o} \\quad e = 2',
              detail: 'Existen dos soluciones válidas.',
            },
          ],
        },
        {
          id: 'p2',
          category: 'Área del triángulo focal',
          source: 'Problema clásico de geometría analítica',
          title: 'Fórmula rápida del triángulo focal',
          question: 'Dada la hipérbola x²/4 - y²/12 = 1 con focos F₁ y F₂, y un punto P tal que ∠F₁PF₂ = 60°, calcula el área de △F₁PF₂.',
          trapAlert: '¡Evita resolver sistemas complejos! Usa la fórmula rápida S = b² · cot(θ/2).',
          steps: [
            {
              stepTitle: 'Paso 1: Extraer parámetros geométricos',
              math: 'a^2 = 4, \\quad b^2 = 12, \\quad c^2 = a^2 + b^2 = 16 \\implies c = 4',
              detail: 'De la ecuación canónica leemos a² = 4 y b² = 12.',
            },
            {
              stepTitle: 'Paso 2: Aplicar la fórmula del área',
              math: 'S = b^2 \\cdot \\cot\\left(\\frac{60^\\circ}{2}\\right) = 12 \\cdot \\cot(30^\\circ)',
              detail: 'En la hipérbola, el área focal utiliza cotangente del semiángulo.',
            },
            {
              stepTitle: 'Paso 3: Cálculo numérico',
              math: '\\cot(30^\\circ) = \\sqrt{3} \\implies S = 12\\sqrt{3}',
              detail: 'El área exacta es 12√3.',
            },
          ],
        },
        {
          id: 'p3',
          category: 'Familia de hipérbolas con mismas asíntotas',
          source: 'Geometría analítica avanzada',
          title: 'Ecuación del haz con asíntotas comunes',
          question: 'Halla la ecuación de la hipérbola con las mismas asíntotas que x²/9 - y²/16 = 1 y que pasa por P(3√2, 4).',
          trapAlert: 'No calcules las asíntotas por separado. Plantea directamente la familia con el parámetro λ.',
          steps: [
            {
              stepTitle: 'Paso 1: Plantear la familia de hipérbolas',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = \\lambda \\quad (\\lambda \\neq 0)',
              detail: 'Cualquier hipérbola que comparta las asíntotas cumple esta forma.',
            },
            {
              stepTitle: 'Paso 2: Sustituir el punto P(3√2, 4)',
              math: '\\frac{(3\\sqrt{2})^2}{9} - \\frac{4^2}{16} = \\lambda \\implies 2 - 1 = \\lambda \\implies \\lambda = 1',
              detail: 'Obtenemos λ = 1 > 0, los focos están en el eje x.',
            },
            {
              stepTitle: 'Paso 3: Ecuación y excentricidad',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = 1, \\quad c = 5, \\quad e = \\frac{5}{3}',
              detail: 'La excentricidad es e = 5/3.',
            },
          ],
        },
      ];

    case 'fr':
      return [
        {
          id: 'p1',
          category: 'Excentricité & Piège de la double solution',
          source: 'Baccalauréat & Concours Prépa',
          title: 'Déterminer l’excentricité connaissant une asymptote',
          question: 'Une hyperbole admet pour asymptote la droite y = (√3/3)x. Déterminer son excentricité e.',
          trapAlert: 'L’axe focal n’est pas précisé (axe Ox ou Oy). La discussion des deux cas est indispensable !',
          steps: [
            {
              stepTitle: 'Étape 1 : Discussion selon l’axe focal',
              math: '|k| = \\frac{\\sqrt{3}}{3}',
              detail: 'L’hyperbole peut être orientée horizontalement ou verticalement.',
            },
            {
              stepTitle: 'Cas 1 : Foyers sur l’axe Ox',
              math: '\\frac{b}{a} = \\frac{\\sqrt{3}}{3} \\implies e^2 = 1 + \\frac{1}{3} = \\frac{4}{3} \\implies e = \\frac{2\\sqrt{3}}{3}',
              detail: 'L’axe transverse est Ox, donc la pente vaut b/a.',
            },
            {
              stepTitle: 'Cas 2 : Foyers sur l’axe Oy',
              math: '\\frac{a}{b} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b}{a} = \\sqrt{3} \\implies e^2 = 1 + 3 = 4 \\implies e = 2',
              detail: 'L’axe transverse est Oy, donc la pente vaut a/b.',
            },
            {
              stepTitle: 'Conclusion',
              math: 'e = \\frac{2\\sqrt{3}}{3} \\quad \\text{ou} \\quad e = 2',
              detail: 'Deux valeurs distinctes de l’excentricité.',
            },
          ],
        },
        {
          id: 'p2',
          category: 'Aire du triangle focal',
          source: 'Géométrie analytique classique',
          title: 'Formule rapide de l’aire du triangle focal',
          question: 'Soit l’hyperbole x²/4 - y²/12 = 1 de foyers F₁ et F₂. Pour un point P tel que ∠F₁PF₂ = 60°, calculer l’aire de △F₁PF₂.',
          trapAlert: 'Retenez la formule directe S = b² · cot(θ/2) !',
          steps: [
            {
              stepTitle: 'Étape 1 : Paramètres géométriques',
              math: 'a^2 = 4, \\quad b^2 = 12, \\quad c = 4',
              detail: 'Identification immédiate depuis l’équation réduite.',
            },
            {
              stepTitle: 'Étape 2 : Formule de l’aire',
              math: 'S = b^2 \\cdot \\cot(30^\\circ) = 12 \\cdot \\sqrt{3} = 12\\sqrt{3}',
              detail: 'Utilisation de la cotangente du demi-angle.',
            },
            {
              stepTitle: 'Étape 3 : Résultat final',
              math: 'S = 12\\sqrt{3}',
              detail: 'L’aire vaut exactement 12√3.',
            },
          ],
        },
        {
          id: 'p3',
          category: 'Faisceau d’hyperboles asymptotiques',
          source: 'Problème de synthèse',
          title: 'Équation du faisceau d’hyperboles homothétiques',
          question: 'Trouver l’équation de l’hyperbole ayant les mêmes asymptotes que x²/9 - y²/16 = 1 et passant par P(3√2, 4).',
          trapAlert: 'Posez directement l’équation avec le paramètre λ.',
          steps: [
            {
              stepTitle: 'Étape 1 : Poser le faisceau',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = \\lambda \\quad (\\lambda \\neq 0)',
              detail: 'Cette équation caractérise toutes les hyperboles de mêmes asymptotes.',
            },
            {
              stepTitle: 'Étape 2 : Déterminer λ',
              math: '\\frac{18}{9} - \\frac{16}{16} = 2 - 1 = 1 \\implies \\lambda = 1',
              detail: 'λ = 1 > 0, les foyers sont bien sur Ox.',
            },
            {
              stepTitle: 'Étape 3 : Excentricité',
              math: 'e = \\frac{c}{a} = \\frac{5}{3}',
              detail: 'On retrouve e = 5/3.',
            },
          ],
        },
      ];

    case 'pt':
      return [
        {
          id: 'p1',
          category: 'Excentricidade e armadilha de dupla solução',
          source: 'ENEM / Vestibulares Tradicionais',
          title: 'Dada a assíntota, determinar a excentricidade e',
          question: 'Dada uma hipérbole com assíntota y = (√3/3)x, calcule sua excentricidade e.',
          trapAlert: 'Atenção: o enunciado não especifica se os focos estão no eixo x ou y! É necessário discutir ambos os casos.',
          steps: [
            {
              stepTitle: 'Passo 1: Discutir a posição dos focos',
              math: '|k| = \\frac{\\sqrt{3}}{3}',
              detail: 'A hipérbole pode ter eixo real horizontal ou vertical.',
            },
            {
              stepTitle: 'Caso 1: Focos no eixo x',
              math: '\\frac{b}{a} = \\frac{\\sqrt{3}}{3} \\implies e^2 = 1 + \\frac{1}{3} = \\frac{4}{3} \\implies e = \\frac{2\\sqrt{3}}{3}',
              detail: 'O eixo real está em x, portanto k = b/a.',
            },
            {
              stepTitle: 'Caso 2: Focos no eixo y',
              math: '\\frac{a}{b} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b}{a} = \\sqrt{3} \\implies e^2 = 1 + 3 = 4 \\implies e = 2',
              detail: 'O eixo real está em y, portanto k = a/b.',
            },
            {
              stepTitle: 'Conclusão',
              math: 'e = \\frac{2\\sqrt{3}}{3} \\quad \\text{ou} \\quad e = 2',
              detail: 'O problema possui duas soluções legítimas.',
            },
          ],
        },
        {
          id: 'p2',
          category: 'Área do triângulo focal',
          source: 'Geometria Analítica Cônica',
          title: 'Fórmula direta da área do triângulo focal',
          question: 'Para a hipérbole x²/4 - y²/12 = 1 com focos F₁, F₂ e ponto P com ∠F₁PF₂ = 60°, calcule a área de △F₁PF₂.',
          trapAlert: 'Evite cálculos longos com a lei dos cossenos; memorize S = b² · cot(θ/2).',
          steps: [
            {
              stepTitle: 'Passo 1: Parâmetros geométricos',
              math: 'a^2 = 4, \\quad b^2 = 12, \\quad c = 4',
              detail: 'Leitura direta da equação padrão.',
            },
            {
              stepTitle: 'Passo 2: Fórmula da área',
              math: 'S = b^2 \\cdot \\cot(30^\\circ) = 12 \\cdot \\sqrt{3} = 12\\sqrt{3}',
              detail: 'A cotangente de 30° vale √3.',
            },
            {
              stepTitle: 'Passo 3: Resultado',
              math: 'S = 12\\sqrt{3}',
              detail: 'Área obtida instantaneamente.',
            },
          ],
        },
        {
          id: 'p3',
          category: 'Família de hipérboles com mesmas assíntotas',
          source: 'Vestibulares Militares (ITA / IME)',
          title: 'Equação da família assintótica',
          question: 'Encontre a equação da hipérbole com as mesmas assíntotas de x²/9 - y²/16 = 1 passando por P(3√2, 4).',
          trapAlert: 'Defina diretamente a equação da família com o parâmetro λ.',
          steps: [
            {
              stepTitle: 'Passo 1: Equação da família',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = \\lambda \\quad (\\lambda \\neq 0)',
              detail: 'Todas as hipérboles com essas assíntotas têm essa forma.',
            },
            {
              stepTitle: 'Passo 2: Substituir o ponto P',
              math: '\\frac{18}{9} - \\frac{16}{16} = 2 - 1 = 1 \\implies \\lambda = 1',
              detail: 'Como λ = 1 > 0, os focos permanecem no eixo x.',
            },
            {
              stepTitle: 'Passo 3: Excentricidade',
              math: 'e = \\frac{c}{a} = \\frac{5}{3}',
              detail: 'Excentricidade final e = 5/3.',
            },
          ],
        },
      ];

    case 'zh':
      return [
        {
          id: 'p1',
          category: '离心率与双解陷阱',
          source: '高考全国卷经典考题',
          title: '已知渐近线方程求离心率（警惕单解漏判）',
          question: '已知双曲线的一条渐近线方程为 y = (√3/3)x，求该双曲线的离心率 e。',
          trapAlert: '题目未注明焦点是在 x 轴还是 y 轴，必须分类讨论！很多学生只算 x 轴导致直接丢失一半分数。',
          steps: [
            {
              stepTitle: '第一步：分类讨论焦点所在位置',
              math: '渐近线斜率绝对值 k = \\frac{\\sqrt{3}}{3}',
              detail: '因为方程只给出渐近线斜率，双曲线可以横放也可以竖放，两种情况对应的离心率完全不同。',
            },
            {
              stepTitle: '情况一：当焦点在 x 轴上时',
              math: '\\frac{b}{a} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b^2}{a^2} = \\frac{1}{3} \n e^2 = 1 + \\frac{b^2}{a^2} = 1 + \\frac{1}{3} = \\frac{4}{3} \\implies e = \\frac{2\\sqrt{3}}{3}',
              detail: '此时实半轴在 x 轴，渐近线斜率对应 b/a。',
            },
            {
              stepTitle: '情况二：当焦点在 y 轴上时',
              math: '\\frac{a}{b} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b}{a} = \\sqrt{3} \\implies \\frac{b^2}{a^2} = 3 \n e^2 = 1 + \\frac{b^2}{a^2} = 1 + 3 = 4 \\implies e = 2',
              detail: '此时实半轴在 y 轴，渐近线斜率对应 a/b，故 b/a = √3。',
            },
            {
              stepTitle: '结论汇总结案',
              math: 'e = \\frac{2\\sqrt{3}}{3} \\text{ 或 } e = 2',
              detail: '此题双解，离心率分别为 (2√3)/3 或 2。',
            },
          ],
        },
        {
          id: 'p2',
          category: '焦点三角形面积',
          source: '高二期末 & 高考必考题',
          title: '双曲线焦点三角形公式秒杀',
          question:
            '已知双曲线 x²/4 - y²/12 = 1 的两焦点为 F₁、F₂，点 P 为双曲线上一点，且 ∠F₁PF₂ = 60°，求 △F₁PF₂ 的面积。',
          trapAlert: '常规解法联立余弦定理和定义差计算量大易算错，牢记焦点三角形面积秒杀公式 S = b² · cot(θ/2)！',
          steps: [
            {
              stepTitle: '第一步：提取双曲线几何参数',
              math: 'a^2 = 4, \\quad b^2 = 12, \\quad c^2 = a^2 + b^2 = 16 \\implies c = 4',
              detail: '由标准方程直接读出 a² = 4, b² = 12。',
            },
            {
              stepTitle: '第二步：运用焦点三角形面积公式',
              math: 'S_{\\triangle F_1 P F_2} = \\frac{b^2}{\\tan(\\theta/2)} = b^2 \\cdot \\cot\\left(\\frac{60^\\circ}{2}\\right) = b^2 \\cdot \\cot(30^\\circ)',
              detail: '双曲线的焦点三角形面积中，分母为半角的正切值（等价于乘以半角余切值）。',
            },
            {
              stepTitle: '第三步：代入计算',
              math: '\\cot(30^\\circ) = \\sqrt{3} \n S = 12 \\times \\sqrt{3} = 12\\sqrt{3}',
              detail: '计算得面积 S = 12√3。',
            },
          ],
        },
        {
          id: 'p3',
          category: '共渐近线双曲线系',
          source: '解析几何高频大题设法',
          title: '巧妙利用双曲线系方程设解',
          question:
            '求与双曲线 x²/9 - y²/16 = 1 具有相同渐近线，且经过点 P(3√2, 4) 的双曲线标准方程及离心率。',
          trapAlert: '不要去单独求渐近线后再设斜率解方程！直接设待定常数 λ，一步解出。',
          steps: [
            {
              stepTitle: '第一步：设共渐近线双曲线系方程',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = \\lambda \\quad (\\lambda \\neq 0)',
              detail: '凡是与 x²/a² - y²/b² = 1 共渐近线的双曲线，均可直接设为此方程！',
            },
            {
              stepTitle: '第二步：代入已知点 P(3√2, 4) 求解 λ',
              math: '\\frac{(3\\sqrt{2})^2}{9} - \\frac{4^2}{16} = \\lambda \\implies 2 - 1 = \\lambda \\implies \\lambda = 1',
              detail: '因为 λ = 1 > 0，所以新双曲线焦点同样在 x 轴上。',
            },
            {
              stepTitle: '第三步：确定标准方程与离心率',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = 1 \n c = 5, \\quad e = \\frac{5}{3}',
              detail: '求得离心率为 5/3。',
            },
          ],
        },
      ];

    case 'en':
    default:
      return [
        {
          id: 'p1',
          category: 'Eccentricity & Dual-Solution Trap',
          source: 'Standard Analytic Geometry Exam Question',
          title: 'Find Eccentricity e Given Asymptote Equation',
          question: 'Given a hyperbola with one of its asymptotes y = (√3/3)x, find its eccentricity e.',
          trapAlert: 'The problem does not specify whether the foci lie on the x-axis or y-axis! You MUST consider both orientations.',
          steps: [
            {
              stepTitle: 'Step 1: Orientations based on focal axis',
              math: '|k| = \\frac{\\sqrt{3}}{3}',
              detail: 'Since only the asymptote slope is given, the transverse axis can be horizontal or vertical.',
            },
            {
              stepTitle: 'Case 1: Foci on the x-axis',
              math: '\\frac{b}{a} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b^2}{a^2} = \\frac{1}{3} \n e^2 = 1 + \\frac{b^2}{a^2} = 1 + \\frac{1}{3} = \\frac{4}{3} \\implies e = \\frac{2\\sqrt{3}}{3}',
              detail: 'When the transverse axis is on the x-axis, the slope is b/a.',
            },
            {
              stepTitle: 'Case 2: Foci on the y-axis',
              math: '\\frac{a}{b} = \\frac{\\sqrt{3}}{3} \\implies \\frac{b}{a} = \\sqrt{3} \\implies \\frac{b^2}{a^2} = 3 \n e^2 = 1 + 3 = 4 \\implies e = 2',
              detail: 'When the transverse axis is on the y-axis, the slope is a/b, so b/a = √3.',
            },
            {
              stepTitle: 'Conclusion Summary',
              math: 'e = \\frac{2\\sqrt{3}}{3} \\quad \\text{or} \\quad e = 2',
              detail: 'Both solutions are valid.',
            },
          ],
        },
        {
          id: 'p2',
          category: 'Focal Triangle Area',
          source: 'Classic Conic Sections Exam Problem',
          title: 'Focal Triangle Area Shortcut Formula',
          question: 'Given the hyperbola x²/4 - y²/12 = 1 with foci F₁, F₂ and point P on the hyperbola with ∠F₁PF₂ = 60°, find the area of △F₁PF₂.',
          trapAlert: 'Avoid tedious systems of equations with the law of cosines! Use the shortcut formula S = b² · cot(θ/2).',
          steps: [
            {
              stepTitle: 'Step 1: Extract geometric parameters',
              math: 'a^2 = 4, \\quad b^2 = 12, \\quad c^2 = a^2 + b^2 = 16 \\implies c = 4',
              detail: 'Directly read from standard form.',
            },
            {
              stepTitle: 'Step 2: Apply focal triangle area formula',
              math: 'S = b^2 \\cdot \\cot\\left(\\frac{60^\\circ}{2}\\right) = 12 \\cdot \\cot(30^\\circ)',
              detail: 'For hyperbolas, the formula uses cotangent of half the vertex angle.',
            },
            {
              stepTitle: 'Step 3: Numerical calculation',
              math: '\\cot(30^\\circ) = \\sqrt{3} \\implies S = 12\\sqrt{3}',
              detail: 'The area is 12√3.',
            },
          ],
        },
        {
          id: 'p3',
          category: 'Family of Asymptotic Hyperbolas',
          source: 'Analytic Geometry Techniques',
          title: 'Exploiting Confocal & Asymptotic Families',
          question: 'Find the standard equation and eccentricity of the hyperbola sharing asymptotes with x²/9 - y²/16 = 1 and passing through P(3√2, 4).',
          trapAlert: 'Do not solve for asymptotes separately. Set up the parameter λ directly.',
          steps: [
            {
              stepTitle: 'Step 1: Set up the asymptotic family',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = \\lambda \\quad (\\lambda \\neq 0)',
              detail: 'Every hyperbola sharing these asymptotes can be written in this form.',
            },
            {
              stepTitle: 'Step 2: Substitute point P(3√2, 4)',
              math: '\\frac{18}{9} - \\frac{16}{16} = \\lambda \\implies 2 - 1 = \\lambda \\implies \\lambda = 1',
              detail: 'Since λ = 1 > 0, the foci remain on the x-axis.',
            },
            {
              stepTitle: 'Step 3: Equation & eccentricity',
              math: '\\frac{x^2}{9} - \\frac{y^2}{16} = 1, \\quad c = 5, \\quad e = \\frac{5}{3}',
              detail: 'The eccentricity is e = 5/3.',
            },
          ],
        },
      ];
  }
};

const getLocalizedQuiz = (lang: Language): QuizItem[] => {
  switch (lang) {
    case 'es':
      return [
        {
          id: 'q1',
          title: 'Excentricidad y apertura',
          question: 'Para una hipérbola, ¿cuál de las siguientes afirmaciones sobre la excentricidad e es correcta?',
          options: [
            'Cuanto mayor es e, más aplanada está la hipérbola y más se aproxima a un círculo',
            'Cuanto mayor es e, mayor es la pendiente de las asíntotas y más abiertas son las ramas',
            'El rango de valores de e para una hipérbola es (0, 1)',
            'La excentricidad de una hipérbola equilátera es 1',
          ],
          correctIndex: 1,
          trapWarning: '¡No confundir con la elipse! En la elipse 0 < e < 1. En la hipérbola e > 1, y cuanto mayor es e, más abiertas son las ramas.',
          detailedSteps: [
            '1. En la hipérbola e = c/a = √(1 + b²/a²).',
            '2. Al aumentar e, la razón b/a crece y las ramas se abren más.',
            '3. Para hipérbolas equiláteras a = b, por lo que e = √2.',
          ],
        },
        {
          id: 'q2',
          title: 'Asíntotas en hipérbola vertical',
          question: 'Las asíntotas de la hipérbola y²/16 - x²/9 = 1 son:',
          options: [
            'y = ± (3/4)x',
            'y = ± (4/3)x',
            'y = ± (16/9)x',
            'y = ± (9/16)x',
          ],
          correctIndex: 1,
          trapWarning: 'El término positivo es y². Igualando a 0: y²/16 = x²/9 ⇒ y/4 = ± x/3 ⇒ y = ± (4/3)x.',
          detailedSteps: [
            '1. Regla rápida: sustituir 1 por 0 en la ecuación canónica.',
            '2. y²/16 = x²/9.',
            '3. Tomando raíces: y = ± (4/3)x.',
          ],
        },
        {
          id: 'q3',
          title: 'Distancia semifocal c',
          question: 'En la hipérbola x²/16 - y²/9 = 1, el valor de c es:',
          options: [
            'c = √7 (porque 16 - 9 = 7)',
            'c = 5 (porque 16 + 9 = 25)',
            'c = 4',
            'c = 3',
          ],
          correctIndex: 1,
          trapWarning: '¡c = √7 es el cálculo para una elipse! En la hipérbola c² = a² + b² = 25 ⇒ c = 5.',
          detailedSteps: [
            '1. Elipse: a² = b² + c².',
            '2. Hipérbola: c² = a² + b² = 16 + 9 = 25.',
            '3. Por lo tanto c = 5.',
          ],
        },
        {
          id: 'q4',
          title: 'Compensación al completar el cuadrado',
          question: 'Al completar cuadrados en 4x² - 9y² - 16x - 18y - 29 = 0, ¿qué valores deben sumarse al miembro derecho para equilibrar?',
          options: [
            'Sumar 4 y 1',
            'Sumar 16 y 9',
            'Sumar 4×4 = 16 y (-9)×1 = -9',
            'Sumar 4×2 y 9×1',
          ],
          correctIndex: 2,
          trapWarning: 'El valor sumado dentro del paréntesis debe multiplicarse por el coeficiente exterior: 4×4=16 y (-9)×1=-9.',
          detailedSteps: [
            '1. Factor común: 4(x² - 4x) - 9(y² + 2y) = 29.',
            '2. Para x sumamos 4, sumando 4×4=16 a la derecha.',
            '3. Para y sumamos 1, sumando (-9)×1=-9 a la derecha.',
          ],
        },
      ];

    case 'fr':
      return [
        {
          id: 'q1',
          title: 'Excentricité et ouverture',
          question: 'Pour une hyperbole, quelle affirmation concernant l’excentricité e est vraie ?',
          options: [
            'Plus e est grand, plus l’hyperbole est aplatie et ressemble à un cercle',
            'Plus e est grand, plus la pente des asymptotes est forte et les branches ouvertes',
            'L’excentricité d’une hyperbole appartient à l’intervalle (0, 1)',
            'L’excentricité d’une hyperbole équilatère est égale à 1',
          ],
          correctIndex: 1,
          trapWarning: 'Ne pas confondre avec l’ellipse ! Pour l’ellipse 0 < e < 1. Pour l’hyperbole e > 1, et plus e est grand, plus les branches sont évasées.',
          detailedSteps: [
            '1. e = c/a = √(1 + b²/a²).',
            '2. Lorsque e grandit, le rapport b/a augmente.',
            '3. Pour une hyperbole équilatère, e = √2.',
          ],
        },
        {
          id: 'q2',
          title: 'Asymptotes d’hyperbole verticale',
          question: 'Les asymptotes de l’hyperbole y²/16 - x²/9 = 1 sont :',
          options: [
            'y = ± (3/4)x',
            'y = ± (4/3)x',
            'y = ± (16/9)x',
            'y = ± (9/16)x',
          ],
          correctIndex: 1,
          trapWarning: 'Le terme positif est en y². En remplaçant 1 par 0 : y²/16 = x²/9 ⇒ y = ± (4/3)x.',
          detailedSteps: [
            '1. Remplacer 1 par 0 dans l’équation réduite.',
            '2. y²/16 = x²/9.',
            '3. y = ± (4/3)x.',
          ],
        },
        {
          id: 'q3',
          title: 'Distance focale c',
          question: 'Dans l’hyperbole x²/16 - y²/9 = 1, la distance focale c vaut :',
          options: [
            'c = √7 (car 16 - 9 = 7)',
            'c = 5 (car 16 + 9 = 25)',
            'c = 4',
            'c = 3',
          ],
          correctIndex: 1,
          trapWarning: 'Attention : c = √7 est la formule de l’ellipse ! Pour l’hyperbole c² = a² + b² = 25 ⇒ c = 5.',
          detailedSteps: [
            '1. Ellipse : a² = b² + c².',
            '2. Hyperbole : c² = a² + b² = 16 + 9 = 25.',
            '3. Donc c = 5.',
          ],
        },
        {
          id: 'q4',
          title: 'Équilibrage de la forme canonique',
          question: 'Pour 4x² - 9y² - 16x - 18y - 29 = 0, que faut-il ajouter au membre de droite pour équilibrer ?',
          options: [
            'Ajouter 4 et 1',
            'Ajouter 16 et 9',
            'Ajouter 4×4 = 16 et (-9)×1 = -9',
            'Ajouter 4×2 et 9×1',
          ],
          correctIndex: 2,
          trapWarning: 'N’oubliez pas de multiplier le terme ajouté par le coefficient devant la parenthèse !',
          detailedSteps: [
            '1. 4(x² - 4x) - 9(y² + 2y) = 29.',
            '2. x : ajouter 4, soit 4×4 = +16.',
            '3. y : ajouter 1, soit (-9)×1 = -9.',
          ],
        },
      ];

    case 'pt':
      return [
        {
          id: 'q1',
          title: 'Excentricidade e abertura',
          question: 'Para uma hipérbole, qual das afirmativas sobre a excentricidade e é verdadeira?',
          options: [
            'Quanto maior for e, mais achatada é a hipérbole e mais próxima de um círculo',
            'Quanto maior for e, maior o módulo da inclinação das assíntotas e mais abertos os ramos',
            'A excentricidade da hipérbole pertence ao intervalo (0, 1)',
            'A excentricidade de uma hipérbole equilátera é igual a 1',
          ],
          correctIndex: 1,
          trapWarning: 'Cuidado para não confundir com a elipse! Na hipérbole e > 1, e quanto maior e, mais abertos são os ramos.',
          detailedSteps: [
            '1. e = c/a = √(1 + b²/a²).',
            '2. Maior e significa maior razão b/a.',
            '3. Hipérbole equilátera tem e = √2.',
          ],
        },
        {
          id: 'q2',
          title: 'Assíntotas de hipérbole vertical',
          question: 'As assíntotas da hipérbole y²/16 - x²/9 = 1 são dadas por:',
          options: [
            'y = ± (3/4)x',
            'y = ± (4/3)x',
            'y = ± (16/9)x',
            'y = ± (9/16)x',
          ],
          correctIndex: 1,
          trapWarning: 'O termo positivo é y². Substituindo 1 por 0: y²/16 = x²/9 ⇒ y = ± (4/3)x.',
          detailedSteps: [
            '1. Troque 1 por 0 na equação.',
            '2. y²/16 = x²/9.',
            '3. y = ± (4/3)x.',
          ],
        },
        {
          id: 'q3',
          title: 'Parâmetro c na hipérbole',
          question: 'Na hipérbole x²/16 - y²/9 = 1, o semieixo focal c vale:',
          options: [
            'c = √7 (pois 16 - 9 = 7)',
            'c = 5 (pois 16 + 9 = 25)',
            'c = 4',
            'c = 3',
          ],
          correctIndex: 1,
          trapWarning: 'c = √7 é para elipse! Na hipérbole c² = a² + b² = 16 + 9 = 25 ⇒ c = 5.',
          detailedSteps: [
            '1. Elipse: a² = b² + c².',
            '2. Hipérbole: c² = a² + b² = 25.',
            '3. Logo, c = 5.',
          ],
        },
        {
          id: 'q4',
          title: 'Compensação ao completar quadrados',
          question: 'Ao completar quadrados em 4x² - 9y² - 16x - 18y - 29 = 0, quais valores somamos ao membro direito?',
          options: [
            'Somar 4 e 1',
            'Somar 16 e 9',
            'Somar 4×4 = 16 e (-9)×1 = -9',
            'Somar 4×2 e 9×1',
          ],
          correctIndex: 2,
          trapWarning: 'O termo adicionado no parêntese deve ser multiplicado pelo coeficiente externo: 4×4=16 e (-9)×1=-9.',
          detailedSteps: [
            '1. Fatorando: 4(x² - 4x) - 9(y² + 2y) = 29.',
            '2. x ganha 4 (contribui com +16).',
            '3. y ganha 1 (contribui com -9).',
          ],
        },
      ];

    case 'zh':
      return [
        {
          id: 'q1',
          title: '离心率与开阔度理解',
          question: '对于双曲线而言，关于离心率 e 的说法，下列哪一项是正确的？',
          options: [
            'e 越大，双曲线越扁平，形状越接近圆',
            'e 越大，渐近线斜率绝对值越大，双曲线两支张开的开口越开阔',
            '双曲线的离心率取值范围是 (0, 1)',
            '等轴双曲线的离心率取值为 1',
          ],
          correctIndex: 1,
          trapWarning: '别和椭圆混淆！椭圆 0 < e < 1 且 e 越大越扁；双曲线 e > 1，且 e 越大两支开口越开阔！等轴双曲线 e = √2。',
          detailedSteps: [
            '1. 双曲线中 e = c/a = √(1 + b²/a²)。',
            '2. 当 e 增大时，b/a 随之增大，渐近线张角变大，曲线更开阔。',
            '3. 等轴双曲线 a = b，故 e = √(1+1) = √2。',
          ],
        },
        {
          id: 'q2',
          title: '焦点在 y 轴的渐近线斜率',
          question: '双曲线 y²/16 - x²/9 = 1 的渐近线方程是：',
          options: [
            'y = ± (3/4)x',
            'y = ± (4/3)x',
            'y = ± (16/9)x',
            'y = ± (9/16)x',
          ],
          correctIndex: 1,
          trapWarning: '最常错的倒置错误！正项是 y²，令右边 1 变为 0：y²/16 = x²/9 ⇒ y/4 = ± x/3 ⇒ y = ± (4/3)x。',
          detailedSteps: [
            '1. 运用「1 变 0」渐近线速求法：y²/16 - x²/9 = 0。',
            '2. 移项得到 y²/16 = x²/9。',
            '3. 开平方得到 y/4 = ± x/3，因此 y = ± (4/3)x。',
          ],
        },
        {
          id: 'q3',
          title: '几何参数 a, b, c 辨析',
          question: '在双曲线 x²/16 - y²/9 = 1 中，半焦距 c 的值是：',
          options: [
            'c = √7 (因为 16 - 9 = 7)',
            'c = 5 (因为 16 + 9 = 25)',
            'c = 4',
            'c = 3',
          ],
          correctIndex: 1,
          trapWarning: '严重警告：c = √7 是椭圆的算法！双曲线必须用 c² = a² + b² = 16 + 9 = 25 ⇒ c = 5。',
          detailedSteps: [
            '1. 椭圆中 a² = b² + c² ⇒ c = √(a² - b²)。',
            '2. 双曲线中 c² = a² + b² ⇒ c = √(a² + b²)。',
            '3. 代入 a² = 16, b² = 9 得 c² = 25 ⇒ c = 5。',
          ],
        },
        {
          id: 'q4',
          title: '配方法中常数项补偿判定',
          question: '在对 4x² - 9y² - 16x - 18y - 29 = 0 进行配方时，等号右侧为了配平，需要加上哪些数值？',
          options: [
            '加上 4 和 1',
            '加上 16 和 9',
            '加上 4×4 = 16 与 (-9)×1 = -9',
            '加上 4×2 与 9×1',
          ],
          correctIndex: 2,
          trapWarning: '右边加的项必须乘以括号外的系数！x 括号外是 4，内补 4 故加 16；y 括号外是 -9，内补 1 故加 -9！',
          detailedSteps: [
            '1. 提公因数后：4(x² - 4x) - 9(y² + 2y) = 29。',
            '2. x 项补 (4/2)² = 4，实际等号左边增加了 4 × 4 = 16。',
            '3. y 项补 (2/2)² = 1，实际等号左边增加了 (-9) × 1 = -9。',
            '4. 故等号右侧为 29 + 16 - 9 = 36。',
          ],
        },
      ];

    case 'en':
    default:
      return [
        {
          id: 'q1',
          title: 'Eccentricity & Opening Width',
          question: 'For a hyperbola, which statement regarding eccentricity e is true?',
          options: [
            'As e increases, the hyperbola becomes flatter and more circle-like',
            'As e increases, the asymptote slopes increase in magnitude and the branches open wider',
            'The range of e for a hyperbola is (0, 1)',
            'The eccentricity of an equilateral (rectangular) hyperbola is 1',
          ],
          correctIndex: 1,
          trapWarning: 'Do not confuse with ellipses! For ellipses, 0 < e < 1. For hyperbolas, e > 1, and larger e means wider opening branches.',
          detailedSteps: [
            '1. e = c/a = √(1 + b²/a²).',
            '2. Higher e implies larger b/a ratio, widening the angle between asymptotes.',
            '3. For rectangular hyperbolas a = b, yielding e = √2.',
          ],
        },
        {
          id: 'q2',
          title: 'Asymptotes of Vertical Hyperbola',
          question: 'The asymptotes of the hyperbola y²/16 - x²/9 = 1 are:',
          options: [
            'y = ± (3/4)x',
            'y = ± (4/3)x',
            'y = ± (16/9)x',
            'y = ± (9/16)x',
          ],
          correctIndex: 1,
          trapWarning: 'The positive term is y². Setting right-hand side to 0: y²/16 = x²/9 ⇒ y = ± (4/3)x.',
          detailedSteps: [
            '1. Replace 1 with 0: y²/16 - x²/9 = 0.',
            '2. Rearrange: y²/16 = x²/9.',
            '3. Take square root: y = ± (4/3)x.',
          ],
        },
        {
          id: 'q3',
          title: 'Semi-Focal Distance c',
          question: 'In the hyperbola x²/16 - y²/9 = 1, the value of c is:',
          options: [
            'c = √7 (because 16 - 9 = 7)',
            'c = 5 (because 16 + 9 = 25)',
            'c = 4',
            'c = 3',
          ],
          correctIndex: 1,
          trapWarning: 'c = √7 is for ellipses! For hyperbolas c² = a² + b² = 16 + 9 = 25 ⇒ c = 5.',
          detailedSteps: [
            '1. Ellipse: a² = b² + c².',
            '2. Hyperbola: c² = a² + b² = 25.',
            '3. Therefore, c = 5.',
          ],
        },
        {
          id: 'q4',
          title: 'Completing Square Right-Side Balance',
          question: 'When completing the square for 4x² - 9y² - 16x - 18y - 29 = 0, what values must be added to the right side to maintain equality?',
          options: [
            'Add 4 and 1',
            'Add 16 and 9',
            'Add 4×4 = 16 and (-9)×1 = -9',
            'Add 4×2 and 9×1',
          ],
          correctIndex: 2,
          trapWarning: 'Always multiply the term inside parenthesis by the leading coefficient outside: 4×4=16 and (-9)×1=-9.',
          detailedSteps: [
            '1. Factoring: 4(x² - 4x) - 9(y² + 2y) = 29.',
            '2. x group adds 4, contributing 4×4 = 16 to the right.',
            '3. y group adds 1, contributing (-9)×1 = -9 to the right.',
          ],
        },
      ];
  }
};

interface ClassicProblemsBankProps {
  t: TranslationDictionary['problems'];
  lang: Language;
}

export const ClassicProblemsBank: React.FC<ClassicProblemsBankProps> = ({ t, lang }) => {
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'quiz'>('walkthrough');
  const [expandedProblem, setExpandedProblem] = useState<string>('p1');

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState<{ [qId: string]: boolean }>({});

  const problems = getLocalizedProblems(lang);
  const quiz = getLocalizedQuiz(lang);

  const handleSelectOption = (qId: string, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowQuizResults((prev) => ({ ...prev, [qId]: true }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowQuizResults({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Bar Switch */}
      <div className="px-6 py-4.5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('walkthrough')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'walkthrough'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabWalkthrough}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabQuiz}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Tab 1: Detailed Walkthrough */}
        {activeTab === 'walkthrough' && (
          <div className="space-y-4">
            {problems.map((problem) => {
              const isExpanded = expandedProblem === problem.id;
              return (
                <div
                  key={problem.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() =>
                      setExpandedProblem(isExpanded ? '' : problem.id)
                    }
                    className="w-full text-left px-5 py-4 sm:py-4.5 flex items-start justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                          {problem.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{problem.source}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {problem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {problem.question}
                      </p>
                    </div>

                    <div className="shrink-0 p-1 text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                      {/* Trap Banner */}
                      <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>{t.trapAlert}：</strong>
                          {problem.trapAlert}
                        </div>
                      </div>

                      {/* Steps List */}
                      <div className="space-y-3">
                        {problem.steps.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50"
                          >
                            <span className="text-xs sm:text-sm font-bold text-slate-800 block mb-1.5">
                              {st.stepTitle}
                            </span>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 font-mono text-sm text-blue-950 my-2 overflow-x-auto">
                              <MathView formula={st.math} />
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {st.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Interactive Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
              <span className="text-xs sm:text-sm text-slate-500">
                {t.quizIntro}
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                {t.resetQuiz}
              </button>
            </div>

            <div className="space-y-6">
              {quiz.map((q, qIndex) => {
                const selected = userAnswers[q.id];
                const isAnswered = showQuizResults[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white space-y-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {t.questionWord} {qIndex + 1}: {q.question}
                      </span>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2.5 mt-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle =
                          'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold';
                          } else if (optIdx === selected) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold';
                          } else {
                            btnStyle = 'border-slate-100 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span>
                              <span className="font-mono font-bold mr-2 text-slate-900">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              {opt}
                            </span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                            {isAnswered &&
                              optIdx === selected &&
                              optIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                              )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback and Trap Note */}
                    {isAnswered && (
                      <div
                        className={`p-4 rounded-xl border text-xs sm:text-sm mt-3 ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/80 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-1.5">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              {t.correctFeedback}
                            </>
                          ) : (
                            <>
                              <AlertOctagon className="w-4 h-4 text-rose-600" />
                              {t.wrongFeedback}
                            </>
                          )}
                        </div>

                        <p className="mt-1 text-slate-800 leading-relaxed">
                          <strong>💡 {t.trapAnalysis}:</strong> {q.trapWarning}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 space-y-1 font-mono text-xs text-slate-600">
                          {q.detailedSteps.map((s, idx) => (
                            <div key={idx} className="my-0.5">
                              <MathView formula={s} inline />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
