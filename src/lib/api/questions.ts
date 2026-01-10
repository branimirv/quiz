import type { Question } from "../schemas/question.schema";
import { getStorageData } from "../storage/storage";

const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /questions - get all questions
 */
export const getAllQuestions = async (): Promise<Question[]> => {
  await delay();
  const data = getStorageData();
  return Object.values(data.questions);
};
