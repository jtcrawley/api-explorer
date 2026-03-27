"use client";

import { supabase, isSupabaseConfigured } from "./supabase";

const STORAGE_KEY = "api-explorer-progress";

export interface ChapterProgress {
  chapterId: string;
  completed: boolean;
  completedAt: string | null;
}

function getLocalProgress(): Record<string, ChapterProgress> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveLocalProgress(progress: Record<string, ChapterProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export async function markChapterComplete(chapterId: string): Promise<void> {
  const progress = getLocalProgress();
  progress[chapterId] = {
    chapterId,
    completed: true,
    completedAt: new Date().toISOString(),
  };
  saveLocalProgress(progress);

  if (isSupabaseConfigured() && supabase) {
    await supabase.from("user_progress").upsert({
      chapter_id: chapterId,
      completed: true,
      completed_at: new Date().toISOString(),
    });
  }
}

export function isChapterComplete(chapterId: string): boolean {
  const progress = getLocalProgress();
  return progress[chapterId]?.completed ?? false;
}

export function getCompletedCount(): number {
  const progress = getLocalProgress();
  return Object.values(progress).filter((p) => p.completed).length;
}

export function getCompletedChapterIds(): string[] {
  const progress = getLocalProgress();
  return Object.values(progress)
    .filter((p) => p.completed)
    .map((p) => p.chapterId);
}
