const KEY = "choconode-progress-v1";

export interface ProgressState {
  completedLessons: string[];
  cacaoBeans: number;
  chocolateSquares: number;
  streakDays: number;
  lastVisit: string | null;
  mistakes: { lessonId: string; exerciseId: string; prompt: string }[];
}

const defaultState: ProgressState = {
  completedLessons: [],
  cacaoBeans: 0,
  chocolateSquares: 0,
  streakDays: 0,
  lastVisit: null,
  mistakes: [],
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // localStorage kullanılamıyorsa (gizli mod vb.) sessizce yoksay
  }
}

export function resetProgress(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // yoksay
  }
}

export function exportProgress(): string {
  return JSON.stringify(loadProgress(), null, 2);
}

export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as ProgressState;
    saveProgress({ ...defaultState, ...parsed });
    return true;
  } catch {
    return false;
  }
}
