import { useState } from "react";
import type { CodeBlock, Trace } from "@/lib/types";

interface SequenceStructure {
  nodes: string[];
  top: string;
  pending?: string;
  saved?: string;
}

/** Stack, queue, array, linked list, recursion call-stack gibi doğrusal (sıralı) yapılar için genel görselleştirici. */
export function SequenceVisualizer({
  trace,
  code,
  pointerLabel = "top",
}: {
  trace: Trace;
  code: CodeBlock;
  pointerLabel?: string;
}) {
  const [step, setStep] = useState(0);
  const current = trace.steps[step];
  const structure = current.structure as SequenceStructure;

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

        <div className="flex flex-col items-center justify-center bg-cream dark:bg-cocoa-800 rounded-xl p-4 min-h-[180px]">
          <div className="flex flex-col-reverse gap-1 items-center">
            {structure.nodes.map((n) => (
              <div
                key={n}
                className={`px-4 py-1.5 rounded-lg font-mono text-sm border-2 transition-all ${
                  n === structure.top
                    ? "border-caramel bg-caramel/20 font-bold"
                    : "border-cocoa-300 dark:border-cocoa-500"
                }`}
              >
                {n}
                {n === structure.top && <span className="ml-2 text-xs text-caramel">← {pointerLabel}</span>}
              </div>
            ))}
            {structure.pending && (
              <div className="px-4 py-1.5 rounded-lg font-mono text-sm border-2 border-dashed border-mint bg-mint/20">
                {structure.pending} <span className="text-xs">(hazırlanıyor)</span>
              </div>
            )}
          </div>
          {structure.saved && (
            <p className="mt-3 text-xs bg-blush/30 px-2 py-1 rounded">saklanan değer: {structure.saved}</p>
          )}
        </div>
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
