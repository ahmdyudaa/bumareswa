export enum Screen {
  DASHBOARD,
  EDUPACK,
  EDUBALANCE,
  QUIZ,
  BRAINTEASER,
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Word {
  text: string;
  found: boolean;
}
