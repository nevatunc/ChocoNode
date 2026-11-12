import { useState } from "react";
import type { CodeBlock } from "@/lib/types";

export function CodeWalkthrough({ block }: { block: CodeBlock }) {
  const [active, setActive] = useState(0);
  const line = block.lines[active];

  return (
    <div className="grid md:grid-cols-2 gap-4 choc-card drip-top p-4">
      <div>
        <h4 className="font-display text-sm text-cocoa-500 dark:text-cream/70 mb-2">{block.title}</h4>
        <pre className="font-mono text-sm leading-7 overflow-x-auto">
          {block.lines.map((l, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`block w-full text-left px-2 rounded transition-colors ${
                i === active
                  ? "bg-caramel/30 dark:bg-caramel/40"
                  : "hover:bg-cocoa-200/50 dark:hover:bg-cocoa-600/50"
              }`}
              aria-current={i === active}
            >
              {l.code}
            </button>
          ))}
        </pre>
      </div>

      <div className="bg-cream dark:bg-cocoa-800 rounded-xl p-4 flex flex-col gap-3">
        <div>
          <span className="text-xs uppercase tracking-wide text-caramel font-semibold">Ne yapar?</span>
          <p className="text-sm mt-1">{line.what}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-mint font-semibold">Neden böyle?</span>
          <p className="text-sm mt-1">{line.why}</p>
        </div>
        {line.commonMistake && (
          <div>
            <span className="text-xs uppercase tracking-wide text-blush font-semibold">Yaygın hata</span>
            <p className="text-sm mt-1">{line.commonMistake}</p>
          </div>
        )}
        <div className="flex gap-2 mt-auto pt-2">
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="choc-button-secondary px-4 py-1.5 text-sm disabled:opacity-40"
          >
            ← Önceki satır
          </button>
          <button
            onClick={() => setActive((a) => Math.min(block.lines.length - 1, a + 1))}
            disabled={active === block.lines.length - 1}
            className="choc-button-primary px-4 py-1.5 text-sm disabled:opacity-40 disabled:saturate-50"
          >
            Sonraki satır →
          </button>
        </div>
      </div>
    </div>
  );
}
