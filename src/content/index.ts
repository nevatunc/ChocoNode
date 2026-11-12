import type { Lesson } from "@/lib/types";
import { javaRecapLesson } from "./lessons/java-recap";
import { bigOLesson } from "./lessons/big-o";
import { arrayLesson } from "./lessons/array";
import { linkedListLesson } from "./lessons/linked-list";
import { stackLesson } from "./lessons/stack";
import { queueLesson } from "./lessons/queue";
import { recursionLesson } from "./lessons/recursion";
import { unionFindLesson } from "./lessons/union-find";
import { treeLesson } from "./lessons/tree";
import { heapLesson } from "./lessons/heap";
import { hashTableLesson } from "./lessons/hash-table";
import { graphLesson } from "./lessons/graph";
import { sortingLesson } from "./lessons/sorting";

// Yeni ders eklemek için: src/content/lessons/<id>.ts dosyası oluştur, buraya kaydet.
// Sıra, müfredat sırasıyla (moduleNumber) aynı tutuluyor.
export const lessons: Lesson[] = [
  javaRecapLesson,
  bigOLesson,
  arrayLesson,
  linkedListLesson,
  stackLesson,
  queueLesson,
  recursionLesson,
  unionFindLesson,
  treeLesson,
  heapLesson,
  hashTableLesson,
  graphLesson,
  sortingLesson,
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
