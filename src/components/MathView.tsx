import React from 'react';

interface MathViewProps {
  formula: string;
  className?: string;
  inline?: boolean;
}

/**
 * Clean mathematical typography renderer
 * Handles fractions, powers, subscripts, square roots, plus-minus, etc.
 * Supports nested LaTeX syntax without leaking raw \frac or \sqrt codes
 */
export const MathView: React.FC<MathViewProps> = ({ formula, className = '', inline = false }) => {
  const formatInlineText = (text: string): React.ReactNode => {
    let processed = text
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
      .replace(/\\pm/g, '±')
      .replace(/\\cdot/g, '·')
      .replace(/\\times/g, '×')
      .replace(/\\implies/g, '⇒')
      .replace(/\\quad/g, '  ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\cot/g, 'cot')
      .replace(/\\tan/g, 'tan')
      .replace(/\\triangle/g, '△')
      .replace(/\\angle/g, '∠')
      .replace(/\\circ/g, '°')
      .replace(/<=/g, ' ≤ ')
      .replace(/>=/g, ' ≥ ')
      .replace(/=>/g, ' ⇒ ');
    return processed;
  };

  const renderFormatted = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const parts: React.ReactNode[] = [];
      let remaining = line;
      let key = 0;

      while (remaining.length > 0) {
        const fracMatch = remaining.match(/\\frac\{([^}]+)\}\{([^}]+)\}/);
        const sqrtMatch = remaining.match(/\\sqrt\{([^}]+)\}/);

        let matchIndex = -1;
        let matchType: 'frac' | 'sqrt' | null = null;
        let matchLength = 0;

        if (fracMatch && fracMatch.index !== undefined) {
          matchIndex = fracMatch.index;
          matchType = 'frac';
          matchLength = fracMatch[0].length;
        }

        if (sqrtMatch && sqrtMatch.index !== undefined) {
          if (matchIndex === -1 || sqrtMatch.index < matchIndex) {
            matchIndex = sqrtMatch.index;
            matchType = 'sqrt';
            matchLength = sqrtMatch[0].length;
          }
        }

        if (matchIndex > 0) {
          parts.push(
            <span key={key++} className="font-mono">
              {formatInlineText(remaining.substring(0, matchIndex))}
            </span>
          );
          remaining = remaining.substring(matchIndex);
        } else if (matchIndex === 0) {
          if (matchType === 'frac' && fracMatch) {
            parts.push(
              <span
                key={key++}
                className="inline-flex flex-col items-center justify-center align-middle mx-1 px-0.5 text-[0.92em]"
              >
                <span className="border-b border-slate-700 dark:border-slate-300 pb-0.5 text-center px-1 font-mono leading-none">
                  {formatInlineText(fracMatch[1])}
                </span>
                <span className="pt-0.5 text-center px-1 font-mono leading-none">
                  {formatInlineText(fracMatch[2])}
                </span>
              </span>
            );
            remaining = remaining.substring(matchLength);
          } else if (matchType === 'sqrt' && sqrtMatch) {
            parts.push(
              <span key={key++} className="inline-flex items-center mx-0.5 font-mono">
                <span className="text-[1.1em] font-serif leading-none mr-0.5">√</span>
                <span className="border-t border-slate-700 dark:border-slate-300 px-0.5">
                  {formatInlineText(sqrtMatch[1])}
                </span>
              </span>
            );
            remaining = remaining.substring(matchLength);
          }
        } else {
          parts.push(
            <span key={key++} className="font-mono">
              {formatInlineText(remaining)}
            </span>
          );
          remaining = '';
        }
      }

      return (
        <div key={lineIdx} className={inline ? 'inline' : 'my-1'}>
          {parts}
        </div>
      );
    });
  };

  return (
    <div
      className={`tracking-normal text-slate-900 ${
        inline ? 'inline-block' : 'block'
      } ${className}`}
    >
      {renderFormatted(formula)}
    </div>
  );
};
