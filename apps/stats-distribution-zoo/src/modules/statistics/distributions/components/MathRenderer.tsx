import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
    formula: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ formula }) => {
    const html = useMemo(() => {
        try {
            return katex.renderToString(formula, {
                throwOnError: false,
                displayMode: true, // Display mode for block equations
            });
        } catch (e) {
            console.error("KaTeX rendering error:", e);
            return formula;
        }
    }, [formula]);

    return (
        <div
            className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto shadow-inner my-2 flex justify-center"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
