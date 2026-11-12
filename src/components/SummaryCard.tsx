interface Mistake {
  lessonId: string;
  exerciseId: string;
  prompt: string;
}

export function SummaryCard({ points, mistakes }: { points: string[]; mistakes: Mistake[] }) {
  return (
    <div className="choc-card drip-top p-4 flex flex-col gap-3">
      <h4 className="font-display text-sm text-cocoa-500 dark:text-cream/70">Bu derste öğrendiklerim</h4>
      <ul className="list-disc list-inside text-sm flex flex-col gap-1">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      {mistakes.length > 0 && (
        <div className="mt-2">
          <h5 className="font-display text-xs text-blush mb-1">Hata defteri</h5>
          <ul className="text-xs flex flex-col gap-1">
            {mistakes.map((m, i) => (
              <li key={i} className="truncate">
                • {m.prompt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
