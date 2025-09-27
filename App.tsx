import React, { useState, useCallback } from 'react';
import { Screen } from './types';
import Dashboard from './components/Dashboard';
import EduPack from './components/EduPack';
import EduBalance from './components/EduBalance';
import BalanceQuiz from './components/BalanceQuiz';
import BrainTeaser from './components/BrainTeaser';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);

  const navigateTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return <Dashboard navigateTo={navigateTo} />;
      case Screen.EDUPACK:
        return <EduPack onBack={() => navigateTo(Screen.DASHBOARD)} />;
      case Screen.EDUBALANCE:
        return <EduBalance onBack={() => navigateTo(Screen.DASHBOARD)} />;
      case Screen.QUIZ:
        return <BalanceQuiz onBack={() => navigateTo(Screen.DASHBOARD)} />;
      case Screen.BRAINTEASER:
        return <BrainTeaser onBack={() => navigateTo(Screen.DASHBOARD)} />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased">
      <main className="max-w-lg mx-auto bg-white min-h-screen shadow-2xl shadow-violet-200">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
