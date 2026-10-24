# Hyperbola Asymptotes & Eccentricity Visual Solver

> High-precision analytic geometry calculator & visual solver for conic sections: instant hyperbola asymptotes, eccentricity calculations, step-by-step completing the square, hyperbola vs. ellipse comparison matrix, and dynamic interactive coordinate geometry canvas.

[![Live Website](https://img.shields.io/badge/Live%20Demo-hyperbola--asymptotes--calculator.formulacalckit.com-2563eb?style=flat-square&logo=google-chrome)](https://hyperbola-asymptotes-calculator.formulacalckit.com)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)](https://tailwindcss.com/)

> 🌐 **Production URL**: [https://hyperbola-asymptotes-calculator.formulacalckit.com](https://hyperbola-asymptotes-calculator.formulacalckit.com)

---

## 🌟 Key Features

1. **Hyperbola Asymptotes Calculator & Formula Solver**
   - Instant calculation of asymptotes $y - k = \pm \frac{b}{a}(x - h)$ (horizontal) or $y - k = \pm \frac{a}{b}(x - h)$ (vertical).
   - "Replace 1 with 0" shortcut demonstration with animated bounding rectangle.

2. **Step-by-Step Completing the Square Breakdown**
   - Converts any general quadratic conic equation $Ax^2 + Cy^2 + Dx + Ey + F = 0$ into standard form.
   - 6-step rigorous algebraic breakdown with highlight notes, balancing coefficients, and exam scoring checkpoints.
   - Natural equation string parser: paste equations like `4x^2 - 9y^2 - 16x - 18y - 29 = 0` directly.

3. **Eccentricity & Asymptotes Dual-Direction Tool**
   - Solves the common exam trap: Given asymptote slope $k$, calculates the two possible eccentricities ($e_x = \sqrt{1 + k^2}$ vs $e_y = \sqrt{1 + \frac{1}{k^2}}$).
   - Dynamic angular aperture calculation $\theta = 2\arctan(b/a)$ and rectangular hyperbola detection ($e = \sqrt{2}, \theta = 90^\circ$).

4. **Hyperbola vs. Ellipse Comprehensive Comparison Matrix**
   - 7-dimension side-by-side contrast ($c^2 = a^2 + b^2$ vs $a^2 = b^2 + c^2$, axis determination rules, eccentricity bounds, asymptotes, focal triangle areas).
   - Anti-confusion mnemonics and top 3 trap scenarios.

5. **Dynamic 60fps Interactive Coordinate Geometry Canvas**
   - Smooth pan & zoom, full mobile touch gesture support (`touch-none`).
   - Real-time rendering of hyperbola branches, bounding feature box, vertices, foci, and optional confocal ellipse comparison.

6. **International Multilingual Support (5 Languages)**
   - English (Default), Spanish (`es`), French (`fr`), Portuguese (`pt`), and Simplified Chinese (`zh`).
   - Dynamic document title, meta tags, and structured data sync for maximum search engine reach.

7. **Production SEO & Google Search Snippet Optimization**
   - Pre-configured `sitemap.xml`, `robots.txt`, OpenGraph & Twitter cards.
   - Validated Schema.org structured data (`WebApplication` + `FAQPage` rich snippets).

---

## 📐 Core Formulas

| Metric | Horizontal Hyperbola ($x$-axis) | Vertical Hyperbola ($y$-axis) |
| :--- | :--- | :--- |
| **Standard Equation** | $\frac{(x-h)^2}{a^2} - \frac{(y-k)^2}{b^2} = 1$ | $\frac{(y-k)^2}{a^2} - \frac{(x-h)^2}{b^2} = 1$ |
| **Pythagorean Identity** | $c^2 = a^2 + b^2$ | $c^2 = a^2 + b^2$ |
| **Eccentricity** | $e = \frac{c}{a} = \sqrt{1 + \left(\frac{b}{a}\right)^2} > 1$ | $e = \frac{c}{a} = \sqrt{1 + \left(\frac{b}{a}\right)^2} > 1$ |
| **Asymptotes** | $y - k = \pm \frac{b}{a}(x - h)$ | $y - k = \pm \frac{a}{b}(x - h)$ |
| **Focal Triangle Area** | $S = b^2 \cot(\theta/2)$ | $S = b^2 \cot(\theta/2)$ |

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/laohu90/hyperbola-asymptotes-calculator.git

# Navigate into directory
cd hyperbola-asymptotes-calculator

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Math Formatting**: Custom LaTeX / TeX MathView
- **SEO**: Schema.org JSON-LD (WebApplication & FAQPage)

---

## 📄 License

Apache License 2.0. Open for educational and academic use.
