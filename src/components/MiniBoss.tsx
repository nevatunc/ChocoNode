import { useState } from "react";
import type { MiniBossQuestion } from "@/lib/types";
import { Mascot } from "@/components/Mascot";

export function MiniBoss({ questions, onComplete }: { questions: MiniBossQuestion[]; onComplete: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];

  function confirm() {
    if (selected === null) return;
    if (selected === q.correctIndex) setScore((s) => s + 1);
    setConfirmed(true);
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setDone(true);
      onComplete(score);
    }
  }

  if (done) {
    return (
      <div className="choc-card drip-top p-6 text-center flex flex-col items-center gap-3">
        <Mascot mood="cheer" className="w-20 h-20" />
        <h4 className="font-display text-lg">Mini Boss tamamlandı!</h4>
        <p className="text-sm">
          {score} / {questions.length} doğru. {score === questions.length ? "Mükemmel! 🍫" : "Tekrar gözden geçirmek ister misin?"}
        </p>
      </div>
    );
  }

  return (
    <div className="choc-card drip-top p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h4 className="font-display text-sm text-cocoa-500 dark:text-cream/70">Mini Boss</h4>
        <span className="text-xs">
          Soru {index + 1} / {questions.length}
        </span>
      </div>
      <p className="text-sm font-medium">{q.prompt}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            disabled={confirmed}
            onClick={() => setSelected(i)}
            className={`text-left px-3 py-2 rounded-lg border text-sm ${
              selected === i ? "border-caramel bg-caramel/20" : "border-cocoa-300 dark:border-cocoa-500"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {!confirmed && (
        <button
          onClick={confirm}
          disabled={selected === null}
          className="choc-button-primary px-4 py-2 text-sm self-start disabled:opacity-40 disabled:saturate-50"
        >
          Cevapla
        </button>
      )}

      {confirmed && (
        <>
          <p className="text-sm bg-cream dark:bg-cocoa-800 rounded-lg p-3">{q.explanation}</p>
          <button onClick={next} className="choc-button-mint px-4 py-2 text-sm self-start">
            {index + 1 < questions.length ? "Sonraki soru →" : "Bitir"}
          </button>
        </>
      )}
    </div>
  );
}
