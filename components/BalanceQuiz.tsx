import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import Header from './Header';
import { CheckCircleIcon, XCircleIcon } from './Icons';

// Load quiz questions from JSON file
import quizData from '../quizData.json';

// Utility function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BalanceQuiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize quiz with shuffled questions
  useEffect(() => {
    const shuffledQuestions = shuffleArray(quizData.questions).map(question => ({
      ...question,
      options: shuffleArray([...question.options]) // Shuffle options for each question
    }));
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || questions.length === 0) return;

    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  const restartQuiz = () => {
    const shuffledQuestions = shuffleArray(quizData.questions).map(question => ({
      ...question,
      options: shuffleArray([...question.options]) // Shuffle options for each question
    }));
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer || questions.length === 0) return 'bg-white hover:bg-violet-50';
    if (option === selectedAnswer) {
      return feedback === 'correct' ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white';
    }
    if (option === questions[currentQuestionIndex].correctAnswer) {
      return 'bg-green-500 border-green-500 text-white';
    }
    return 'bg-slate-100 text-slate-500 border-slate-100';
  };

  // Show loading state while questions are being shuffled
  if (questions.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Balance Quiz" onBack={onBack} />
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <p className="text-slate-500">Memuat soal quiz...</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col h-screen">
        <Header title="Balance Quiz" onBack={onBack} />
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Selesai!</h2>
          <p className="text-slate-500 mb-4">Skor akhir kamu adalah:</p>
          <div className="text-6xl font-bold text-violet-500 mb-8">{score}</div>
          <button onClick={restartQuiz} className="bg-violet-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-600 transition-colors">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-screen">
      <Header title="Balance Quiz" onBack={onBack} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <p className="text-sm text-slate-500 mb-1">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</p>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-violet-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex-shrink-0">{currentQuestion.question}</h2>
        <div className="space-y-3 flex-1 overflow-y-auto">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${getButtonClass(option)}`}
            >
              <span className="font-medium">{option}</span>
              {selectedAnswer && option === selectedAnswer && feedback === 'correct' && <CheckCircleIcon />}
              {selectedAnswer && option === selectedAnswer && feedback === 'incorrect' && <XCircleIcon />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalanceQuiz;