export interface CodeLine {
  code: string;
  what: string; // bu satır ne yapar
  why: string; // neden böyle yazıldı
  commonMistake?: string; // yaygın hata
}

export interface CodeBlock {
  id: string;
  title: string;
  lines: CodeLine[];
}

export interface VisualizationStep {
  /** Kaynak koddaki vurgulanacak satır indeksi (0-based) */
  highlightLine: number;
  /** Sağ taraftaki yapının o andaki durumu (basit seri temsil, bileşen yorumlar) */
  structure: unknown;
  /** Alttaki açıklama metni (Türkçe) */
  explanation: string;
  /** Konsol çıktısı (varsa) */
  consoleOutput?: string;
}

export interface Trace {
  id: string;
  title: string;
  codeBlockId: string;
  steps: VisualizationStep[];
}

export type ExerciseType =
  | "predict-output"
  | "fill-blank"
  | "find-bug"
  | "reorder-lines"
  | "multiple-choice"
  | "bigo-match";

export interface ExerciseBase {
  id: string;
  type: ExerciseType;
  prompt: string;
  hint: string;
  explanationCorrect: string;
  explanationIncorrect: string;
}

export interface PredictOutputExercise extends ExerciseBase {
  type: "predict-output";
  code: string;
  answer: string;
}

export interface FillBlankExercise extends ExerciseBase {
  type: "fill-blank";
  codeBefore: string;
  codeAfter: string;
  answer: string;
}

export interface FindBugExercise extends ExerciseBase {
  type: "find-bug";
  buggyCode: string;
  buggyLine: number;
  fixedLine: string;
}

export interface ReorderLinesExercise extends ExerciseBase {
  type: "reorder-lines";
  shuffledLines: string[];
  correctOrder: number[];
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
}

export interface BigOMatchExercise extends ExerciseBase {
  type: "bigo-match";
  pairs: { operation: string; complexity: string }[];
}

export type Exercise =
  | PredictOutputExercise
  | FillBlankExercise
  | FindBugExercise
  | ReorderLinesExercise
  | MultipleChoiceExercise
  | BigOMatchExercise;

export interface MiniBossQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Görselleştirme/playground bileşeninin hangi türü kullanacağını belirler. */
export type StructureKind = "sequence" | "tree" | "hash" | "graph" | "none";

export interface PlaygroundConfig {
  kind: "sequence" | "none";
  /** Ekleme işleminin adı, ör. "push", "enqueue", "add" */
  addOp: string;
  /** Çıkarma işleminin adı, ör. "pop", "dequeue", "removeFirst" */
  removeOp: string;
  /** Ekleme hangi uca yapılır: yığın/array sonu mu, kuyruk önü mü */
  addSide: "end" | "front";
  removeSide: "end" | "front";
  /** Aktif uca etiket, ör. "top", "front", "head" */
  pointerLabel: string;
  initialItems: string[];
}

export interface Lesson {
  id: string;
  moduleNumber: number;
  title: string;
  isExamScope: boolean;
  chocolateAnalogy: {
    setup: string;
    whereItEnds: string;
  };
  intro: string;
  structureKind: StructureKind;
  codeBlocks: CodeBlock[];
  traces: Trace[];
  playground?: PlaygroundConfig;
  exercises: Exercise[];
  miniBoss: MiniBossQuestion[];
  summary: string[];
}
