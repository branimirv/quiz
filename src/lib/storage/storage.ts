import type { StorageData } from "@/types/api.types";

const STORAGE_KEY = "quiz-maker-data";

/**
 * Initialize storage with default empty data
 */
const getDefaultStorage = (): StorageData => ({
  quizzes: {},
  questions: {},
  nextQuizId: 1,
  nextQuestionId: 1,
});

/**
 * Get all data from LocalStorage
 */
export const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return getDefaultStorage();
    }
    return JSON.parse(data) as StorageData;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return getDefaultStorage();
  }
};

/**
 * Save all data to localStorage
 */
export const setStorageData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

/**
 * Clear all data from localStorage
 */
export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
