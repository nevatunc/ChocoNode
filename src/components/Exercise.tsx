import { useState } from "react";
import type { Exercise as ExerciseT } from "@/lib/types";

export function Exercise({ exercise, onResult }: { exercise: ExerciseT; onResult: (correct: boolean) => void }) {
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  // içeriğe özel yerel durum
  const [textAnswer, setTextAnswer] = useState("");
  const [choiceIndex, setChoiceIndex] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>(() =>
    exercise.type === "reorder-lines" ? exercise.shuffledLines.map((_, i) => i) : []
  );

  function submit(isCorrect: boolean) {
    setCorrect(isCorrect);
    setSubmitted(true);
    onResult(isCorrect);
  }

  function moveLine(index: number, dir: -1 | 1) {
    setOrder((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="choc-card drip-top p-4 flex flex-col gap-3">
      <p className="text-sm whitespace-pre-line font-medium">{exercise.prompt}</p>

      {exercise.type === "predict-output" && (
        <>
          <pre className="font-mono text-xs bg-cream dark:bg-cocoa-800 rounded-lg p-3 overflow-x-auto">{exercise.code}</pre>
          <input
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={submitted}
            placeholder="cevabın"
            className="px-3 py-2 rounded-lg border border-cocoa-300 dark:border-cocoa-500 bg-cream dark:bg-cocoa-800 text-sm"
          />
          {!submitted && (
            <button
              onClick={() => submit(textAnswer.trim() === exercise.answer)}
              className="choc-button-primary px-4 py-2 text-sm self-start"
            >
              Kontrol et
            </button>
          )}
        </>
      )}

      {exercise.type === "fill-blank" && (
        <>
          <pre className="font-mono text-xs bg-cream dark:bg-cocoa-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
            {exercise.codeBefore}
            {"\n>>> ___ <<<\n"}
            {exercise.codeAfter}
          </pre>
          <input
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={submitted}
            placeholder="eksik satır"
            className="px-3 py-2 rounded-lg border border-cocoa-300 dark:border-cocoa-500 bg-cream dark:bg-cocoa-800 text-sm font-mono"
          />
          {!submitted && (
            <button
              onClick={() => submit(textAnswer.trim().replace(/\s+/g, "") === exercise.answer.replace(/\s+/g, ""))}
              className="choc-button-primary px-4 py-2 text-sm self-start"
            >
              Kontrol et
            </button>
          )}
        </>
      )}

      {exercise.type === "find-bug" && (
        <>
          <pre className="font-mono text-xs bg-cream dark:bg-cocoa-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
            {exercise.buggyCode.split("\n").map((l, i) => (
              <div
                key={i}
                className={choiceIndex === i ? "bg-blush/40 rounded" : "cursor-pointer hover:bg-cocoa-200/50 dark:hover:bg-cocoa-600/50 rounded"}
                onClick={() => !submitted && setChoiceIndex(i)}
              >
                {i + 1}. {l}
              </div>
            ))}
          </pre>
          {!submitted && (
            <button
              onClick={() => submit(choiceIndex === exercise.buggyLine)}
              disabled={choiceIndex === null}
              className="choc-button-primary px-4 py-2 text-sm self-start disabled:opacity-40 disabled:saturate-50"
            >
              Bu satırı seç
            </button>
          )}
        </>
      )}

      {exercise.type === "reorder-lines" && (
        <>
          <div className="font-mono text-xs bg-cream dark:bg-cocoa-800 rounded-lg p-3 flex flex-col gap-1">
            {order.map((lineIdx, pos) => (
              <div key={lineIdx} className="flex items-center gap-2">
                <span className="flex-1">{exercise.shuffledLines[lineIdx]}</span>
                {!submitted && (
                  <span className="flex gap-1">
                    <button onClick={() => moveLine(pos, -1)} className="px-1.5 bg-cocoa-200 dark:bg-cocoa-600 rounded">↑</button>
                    <button onClick={() => moveLine(pos, 1)} className="px-1.5 bg-cocoa-200 dark:bg-cocoa-600 rounded">↓</button>
                  </span>
                )}
              </div>
            ))}
          </div>
          {!submitted && (
            <button
              onClick={() => submit(JSON.stringify(order) === JSON.stringify(exercise.correctOrder))}
              className="choc-button-primary px-4 py-2 text-sm self-start"
            >
              Sırayı onayla
            </button>
          )}
        </>
      )}

      {exercise.type === "multiple-choice" && (
        <>
          <div className="flex flex-col gap-2">
            {exercise.options.map((opt, i) => (
              <button
                key={i}
                disabled={submitted}
                onClick={() => setChoiceIndex(i)}
                className={`text-left px-3 py-2 rounded-lg border text-sm ${
                  choiceIndex === i ? "border-caramel bg-caramel/20" : "border-cocoa-300 dark:border-cocoa-500"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {!submitted && (
            <button
              onClick={() => submit(choiceIndex === exercise.correctIndex)}
              disabled={choiceIndex === null}
              className="choc-button-primary px-4 py-2 text-sm self-start disabled:opacity-40 disabled:saturate-50"
            >
              Kontrol et
            </button>
          )}
        </>
      )}

      {exercise.type === "bigo-match" && (
        <div className="flex flex-col gap-2 text-sm">
          {exercise.pairs.map((p) => (
            <div key={p.operation} className="flex justify-between bg-cream dark:bg-cocoa-800 rounded-lg px-3 py-2">
              <span>{p.operation}</span>
              <span className="font-mono text-caramel">{p.complexity}</span>
            </div>
          ))}
          {!submitted && (
            <button onClick={() => submit(true)} className="choc-button-primary px-4 py-2 text-sm self-start">
              Anladım, devam et
            </button>
          )}
        </div>
      )}

      {!submitted && (
        <button onClick={() => setShowHint((s) => !s)} className="text-xs text-caramel underline self-start">
          {showHint ? "İpucunu gizle" : "İpucu göster 🥢"}
        </button>
      )}
      {showHint && !submitted && <p className="text-xs italic text-cocoa-600 dark:text-cream/70">{exercise.hint}</p>}

      {submitted && (
        <p className={`text-sm rounded-lg p-3 ${correct ? "bg-mint/20 text-cocoa-800 dark:text-cream" : "bg-blush/20 text-cocoa-800 dark:text-cream"}`}>
          {correct ? exercise.explanationCorrect : exercise.explanationIncorrect}
        </p>
      )}
    </div>
  );
}
