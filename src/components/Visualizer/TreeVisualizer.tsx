import { useState } from "react";
import type { CodeBlock, Trace } from "@/lib/types";

interface TreeNode {
  id: string;
  value: string;
  x: number;
  y: number;
}

interface TreeStructure {
  treeNodes: TreeNode[];
  edges: [string, string][];
  highlight?: string;
  found?: string;
}

/** Binary tree / BST için basit SVG görselleştirici. */
export function TreeVisualizer({ trace, code }: { trace: Trace; code: CodeBlock }) {
  const [step, setStep] = useState(0);
  const current = trace.steps[step];
  const structure = current.structure as TreeStructure;

  function nodeById(id: string) {
    return structure.treeNodes.find((n) => n.id === id)!;
  }

  return (
    <div className="choc-card drip-top p-4">
      <h4 className="font-display text-sm text-cocoa-500 dark:text-cream/70 mb-3">{trace.title}</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <pre className="font-mono text-sm leading-7 bg-cream dark:bg-cocoa-800 rounded-xl p-3 overflow-x-auto">
          {code.lines.map((l, i) => (
            <div key={i} className={`px-2 rounded ${i === current.highlightLine ? "bg-caramel/40" : ""}`}>
              {l.code}
            </div>
          ))}
        </pre>

        <svg viewBox="0 0 280 180" className="bg-cream dark:bg-cocoa-800 rounded-xl p-2 w-full min-h-[180px]">
          {structure.edges.map(([a, b]) => {
            const na = nodeById(a);
            const nb = nodeById(b);
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="currentColor"
                className="text-cocoa-400 dark:text-cocoa-400"
                strokeWidth={2}
              />
            );
          })}
          {structure.treeNodes.map((n) => {
            const isHighlight = n.id === structure.highlight;
            const isFound = n.id === structure.found;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={18}
                  className={
                    isFound
                      ? "fill-mint"
                      : isHighlight
                        ? "fill-caramel"
                        : "fill-cocoa-200 dark:fill-cocoa-500"
                  }
                />
                <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" className="fill-cocoa-900 font-mono font-bold">
                  {n.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-3 text-sm bg-cream dark:bg-cocoa-800 rounded-lg p-3">{current.explanation}</p>
      {current.consoleOutput && (
        <pre className="mt-2 text-xs font-mono bg-cocoa-800 text-mint rounded-lg p-2 dark:bg-black/40">
          {current.consoleOutput}
        </pre>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="choc-button-secondary px-4 py-1.5 text-sm disabled:opacity-40"
        >
          ← Geri
        </button>
        <button
          onClick={() => setStep((s) => Math.min(trace.steps.length - 1, s + 1))}
          disabled={step === trace.steps.length - 1}
          className="choc-button-primary px-4 py-1.5 text-sm disabled:opacity-40 disabled:saturate-50"
        >
          İleri →
        </button>
        <span className="ml-auto text-xs self-center text-cocoa-500 dark:text-cream/60">
          Adım {step + 1} / {trace.steps.length}
        </span>
      </div>
    </div>
  );
}
