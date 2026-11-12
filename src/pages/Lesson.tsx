import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLesson } from "@/content";
import { CodeWalkthrough } from "@/components/CodeWalkthrough";
import { SequenceVisualizer } from "@/components/Visualizer/SequenceVisualizer";
import { TreeVisualizer } from "@/components/Visualizer/TreeVisualizer";
import { HashVisualizer } from "@/components/Visualizer/HashVisualizer";
import { GraphVisualizer } from "@/components/Visualizer/GraphVisualizer";
import { SequencePlayground } from "@/components/Playground/SequencePlayground";
import { Exercise } from "@/components/Exercise";
import { MiniBoss } from "@/components/MiniBoss";
import { SummaryCard } from "@/components/SummaryCard";
import { Mascot } from "@/components/Mascot";
import { loadProgress, saveProgress } from "@/lib/storage";
import type { Trace, CodeBlock } from "@/lib/types";

function renderTrace(structureKind: string, trace: Trace, block: CodeBlock) {
  switch (structureKind) {
    case "tree":
      return <TreeVisualizer key={trace.id} trace={trace} code={block} />;
    case "hash":
      return <HashVisualizer key={trace.id} trace={trace} code={block} />;
    case "graph":
      return <GraphVisualizer key={trace.id} trace={trace} code={block} />;
    default:
      return <SequenceVisualizer key={trace.id} trace={trace} code={block} />;
  }
}

export function Lesson() {
  const { id } = useParams();
  const lesson = id ? getLesson(id) : undefined;
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});

  if (!lesson) {
    return (
      <div className="p-10 text-center">
        <p>Ders bulunamadı.</p>
        <Link to="/" className="text-caramel underline">
          Haritaya dön
        </Link>
      </div>
    );
  }

  function handleExerciseResult(exerciseId: string, correct: boolean) {
    setExerciseResults((prev) => ({ ...prev, [exerciseId]: correct }));
    const progress = loadProgress();
    if (correct) {
      progress.chocolateSquares += 1;
    } else {
      const ex = lesson!.exercises.find((e) => e.id === exerciseId);
      if (ex) progress.mistakes.push({ lessonId: lesson!.id, exerciseId, prompt: ex.prompt });
    }
    saveProgress(progress);
  }

  function handleMiniBossComplete(score: number) {
    const progress = loadProgress();
    progress.cacaoBeans += score;
    if (!progress.completedLessons.includes(lesson!.id)) {
      progress.completedLessons.push(lesson!.id);
    }
    saveProgress(progress);
  }

  const mistakes = loadProgress().mistakes.filter((m) => m.lessonId === lesson.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
      <Link to="/" className="text-sm text-caramel self-start">
        ← Dükkân haritasına dön
      </Link>

      <header className="flex items-center gap-4">
        <Mascot mood="idle" className="w-16 h-16" />
        <div>
          <span className="text-xs text-caramel font-semibold">Modül {lesson.moduleNumber}</span>
          <h1 className="font-display text-2xl">{lesson.title}</h1>
        </div>
      </header>

      <section className="bg-blush/10 rounded-2xl p-4 text-sm">
        <p>{lesson.chocolateAnalogy.setup}</p>
        <p className="mt-2 italic text-cocoa-600 dark:text-cream/70">{lesson.chocolateAnalogy.whereItEnds}</p>
      </section>

      <p>{lesson.intro}</p>

      {lesson.codeBlocks.map((block) => (
        <CodeWalkthrough key={block.id} block={block} />
      ))}

      {lesson.traces.length > 0 && (
        <>
          <h2 className="font-display text-xl">Görselleştirme</h2>
          {lesson.traces.map((trace) => {
            const block = lesson.codeBlocks.find((b) => b.id === trace.codeBlockId)!;
            return renderTrace(lesson.structureKind, trace, block);
          })}
        </>
      )}

      {lesson.playground && (
        <>
          <h2 className="font-display text-xl">Kendin Dene</h2>
          <SequencePlayground config={lesson.playground} />
        </>
      )}

      <h2 className="font-display text-xl">Alıştırmalar</h2>
      {lesson.exercises.map((ex) => (
        <Exercise key={ex.id} exercise={ex} onResult={(c) => handleExerciseResult(ex.id, c)} />
      ))}

      <h2 className="font-display text-xl">Mini Boss</h2>
      <MiniBoss questions={lesson.miniBoss} onComplete={handleMiniBossComplete} />

      <h2 className="font-display text-xl">Özet</h2>
      <SummaryCard points={lesson.summary} mistakes={mistakes} />

      <p className="text-xs text-cocoa-500 dark:text-cream/50 text-center">
        {Object.values(exerciseResults).filter(Boolean).length} / {lesson.exercises.length} alıştırma doğru
      </p>
    </div>
  );
}
