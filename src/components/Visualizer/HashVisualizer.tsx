import { useState } from "react";
import type { CodeBlock, Trace } from "@/lib/types";

interface HashStructure {
  buckets: string[][];
  highlightBucket?: number;
  pending?: string;
}

/** Hash table: bucket dizisi + chaining görselleştirici. */
export function HashVisualizer({ trace, code }: { trace: Trace; code: CodeBlock }) {
  const [step, setStep] = useState(0);
  const current = trace.steps[step];
  const structure = current.structure as HashStructure;

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

        <div className="bg-cream dark:bg-cocoa-800 rounded-xl p-3 flex flex-col gap-1.5 min-h-[180px]">
          {structure.buckets.map((bucket, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-mono ${
                i === structure.highlightBucket ? "bg-caramel/30" : ""
              }`}
            >
              <span className="w-6 text-right text-cocoa-500 dark:text-cream/60">{i}</span>
              <div className="flex gap-1 flex-wrap">
                {bucket.length === 0 ? (
                  <span className="text-cocoa-400 dark:text-cream/30 italic text-xs">boş çekmece</span>
                ) : (
                  bucket.map((item, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-cocoa-200 dark:bg-cocoa-600 border border-cocoa-300 dark:border-cocoa-500">
                      {item}
                    </span>
                  ))
                )}
                {i === structure.highlightBucket && structure.pending && (
                  <span className="px-2 py-0.5 rounded border-2 border-dashed border-mint bg-mint/20">
                    {structure.pending}
                  </span>
                )}
              </div>
            </div>
          ))}
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
