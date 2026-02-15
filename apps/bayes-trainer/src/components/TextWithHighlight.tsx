import React from 'react';

interface TextWithHighlightProps {
  text: string;
  replacements: Record<string, string | number>;
}

export const TextWithHighlight: React.FC<TextWithHighlightProps> = ({ text, replacements }) => {
  // Split by {key}
  const parts = text.split(/(\{[^}]+\})/g);
  
  return (
    <span>
      {parts.map((part, index) => {
        const match = part.match(/\{([^}]+)\}/);
        if (match) {
          const key = match[1];
          if (key in replacements) {
            return <strong key={index}>{replacements[key]}</strong>;
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
