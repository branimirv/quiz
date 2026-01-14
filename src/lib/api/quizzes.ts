import type { Question } from "@/lib/schemas/question.schema";
import type { CreateQuiz, Quiz, UpdateQuiz } from "@/lib/schemas/quiz.schema";
import { getStorageData, setStorageData } from "@/lib/storage/storage";
import type { ApiError } from "@/types/api.types";

const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /quizzes - get all quizzes
 */
export const getAllQuizzes = async (): Promise<Quiz[]> => {
  await delay();
  const data = getStorageData();
  return Object.values(data.quizzes);
};

/**
 * GET /quizzes/{id} - get single quiz
 */
export const getQuizById = async (id: number): Promise<Quiz> => {
  await delay();
  const data = getStorageData();
  const quiz = data.quizzes[id];

  if (!quiz) {
    throw new Error("Quiz not found") as ApiError;
  }

  return quiz;
};

/**
 * POST /quizzes - create new quiz
 */
export const createQuiz = async (quiz: CreateQuiz): Promise<Quiz> => {
  await delay();
  const data = getStorageData();

  const newQuiz: Quiz = {
    id: data.nextQuizId,
    name: quiz.name,
    questions: [],
  };

  // create new or recycle existing questions
  const processedQuestions: Question[] = [];

  for (const question of quiz.questions) {
    if (question.id !== undefined) {
      // recycle existing question
      const existingQuestion = data.questions[question.id];

      if (existingQuestion) {
        processedQuestions.push(existingQuestion);
      }
    } else {
      // creating new question
      const newQuestion: Question = {
        id: data.nextQuestionId,
        question: question.question,
        answer: question.answer,
      };

      data.questions[data.nextQuestionId] = newQuestion;
      data.nextQuestionId++;

      processedQuestions.push(newQuestion);
    }
  }

  newQuiz.questions = processedQuestions;

  // save quiz
  data.quizzes[newQuiz.id] = newQuiz;
  data.nextQuizId++;

  setStorageData(data);
  return newQuiz;
};

/**
 * PUT /quizzes/{id} - update quiz
 */
export const updateQuiz = async (
  id: number,
  quiz: UpdateQuiz
): Promise<Quiz> => {
  await delay();
  const data = getStorageData();

  if (!data.quizzes[id]) {
    throw new Error("Quiz not found") as ApiError;
  }

  const processedQuestions: Question[] = [];

  for (const question of quiz.questions) {
    if (question.id !== undefined) {
      const existingQuestion = data.questions[question.id];
      if (existingQuestion) {
        processedQuestions.push(existingQuestion);
      }
    } else {
      // create new question
      const newQuestion: Question = {
        id: data.nextQuestionId,
        question: question.question,
        answer: question.answer,
      };

      data.questions[data.nextQuestionId] = newQuestion;
      data.nextQuestionId++;

      processedQuestions.push(newQuestion);
    }
  }

  // update quiz
  const updatedQuiz: Quiz = {
    id,
    name: quiz.name,
    questions: processedQuestions,
  };

  data.quizzes[id] = updatedQuiz;
  setStorageData(data);

  return updatedQuiz;
};

/**
 * Delete /quizzes/{id} - delete quiz
 * Question remain in storage for recycling
 */
export const deleteQuiz = async (id: number): Promise<void> => {
  await delay();
  const data = getStorageData();

  if (!data.quizzes[id]) {
    throw new Error("Quiz not found") as ApiError;
  }

  // delete quiz but keep questions
  delete data.quizzes[id];
  setStorageData(data);
};
