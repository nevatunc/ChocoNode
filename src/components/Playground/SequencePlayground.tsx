import { useState } from "react";
import { Mascot } from "@/components/Mascot";
import type { PlaygroundConfig } from "@/lib/types";

type Prediction = { kind: "add"; value: string } | { kind: "remove" } | null;

/** Stack/queue/array gibi doğrusal yapılar için genel "kendin dene" bileşeni. */
export function SequencePlayground({ config }: { config: PlaygroundConfig }) {
  const [items, setItems] = useState<string[]>(config.initialItems);
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState<Prediction>(null);
  const [predictedValue, setPredictedValue] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const activeEnd = config.removeSide === "end" ? items[items.length - 1] : items[0];

  function askAdd() {
    if (!inputValue.trim()) return;
    setPrediction({ kind: "add", value: inputValue.trim() });
    setFeedback(null);
  }

  function askRemove() {
    if (items.length === 0) return;
    setPrediction({ kind: "remove" });
    setFeedback(null);
  }

  function confirmPrediction() {
    if (!prediction) return;
    if (prediction.kind === "add") {
      const correct = predictedValue.trim() === prediction.value;
      setFeedback(correct ? "correct" : "incorrect");
      setItems((prev) => (config.addSide === "end" ? [...prev, prediction.value] : [prediction.value, ...prev]));
      setInputValue("");
    } else {
      const correct = predictedValue.trim() === activeEnd;
      setFeedback(correct ? "correct" : "incorrect");
      setItems((prev) => (config.removeSide === "end" ? prev.slice(0, -1) : prev.slice(1)));
    }
    setPrediction(null);
    setPredictedValue("");
  }

  const display = config.removeSide === "end" ? [...items].reverse() : items;

  return (
    <div className="choc-card drip-top p-4">
      <h4 className="font-display text-sm text-cocoa-500 dark:text-cream/70 mb-3">Kendin Dene</h4>

      <div className="grid md:grid-cols-[1fr_200px] gap-4">
        <div>
          {!prediction ? (
            <div className="flex gap-2 flex-wrap">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ör. kakao"
                className="px-3 py-2 rounded-lg border border-cocoa-300 dark:border-cocoa-500 bg-cream dark:bg-cocoa-800 text-sm"
              />
              <button onClick={askAdd} className="choc-button-primary px-4 py-2 text-sm">
                {config.addOp}(item)
              </button>
              <button
                onClick={askRemove}
                disabled={items.length === 0}
                className="choc-button-secondary px-4 py-2 text-sm disabled:opacity-40"
              >
                {config.removeOp}()
              </button>
            </div>
          ) : (
            <div className="bg-blush/20 rounded-xl p-3 flex flex-col gap-2">
              <p className="text-sm">
                {prediction.kind === "add"
                  ? `${config.addOp}("${prediction.value}") sonrası ${config.pointerLabel} ne olacak?`
                  : `${config.removeOp}() çağrıldığında hangi değer dönecek, tahmin et:`}
              </p>
              <input
                value={predictedValue}
                onChange={(e) => setPredictedValue(e.target.value)}
                placeholder="tahminin"
                className="px-3 py-2 rounded-lg border border-cocoa-300 dark:border-cocoa-500 bg-cream dark:bg-cocoa-800 text-sm"
              />
              <button
                onClick={confirmPrediction}
                className="choc-button-mint px-4 py-2 text-sm self-start"
              >
                Tahminimi onayla
              </button>
            </div>
          )}

          {feedback && (
            <p className={`mt-3 text-sm font-semibold ${feedback === "correct" ? "text-mint" : "text-blush"}`}>
              {feedback === "correct" ? "Doğru! Harika tahmin. 🍫" : "Tam olarak değil — yapıyı tekrar incele, bir dahaki sefere olur!"}
            </p>
          )}

          <div className={`mt-4 flex gap-1 items-start ${config.removeSide === "end" ? "flex-col-reverse" : "flex-col"}`}>
            {display.map((item, i) => {
              const isActive = config.removeSide === "end" ? i === display.length - 1 : i === 0;
              return (
                <div
                  key={`${item}-${i}`}
                  className={`px-4 py-1.5 rounded-lg font-mono text-sm border-2 ${
                    isActive ? "border-caramel bg-caramel/20 font-bold" : "border-cocoa-300 dark:border-cocoa-500"
                  }`}
                >
                  {item}
                  {isActive && <span className="ml-2 text-xs text-caramel">← {config.pointerLabel}</span>}
                </div>
              );
            })}
            {items.length === 0 && <p className="text-sm text-cocoa-500 dark:text-cream/60">Yapı boş.</p>}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Mascot mood={feedback === "correct" ? "cheer" : prediction ? "thinking" : "idle"} className="w-24 h-24" />
        </div>
      </div>
    </div>
  );
}
