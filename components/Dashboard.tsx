import React from 'react';
import { Screen } from '../types';
import { BookIcon, BrainIcon, PlayIcon, QuizIcon, SettingsIcon } from './Icons';
import Header from './Header';

interface DashboardProps {
  navigateTo: (screen: Screen) => void;
}

interface MenuItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, description, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`relative w-full text-left p-6 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 ${color}`}
  >
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
    <div className="absolute -right-4 -bottom-4 text-white/20 opacity-80 scale-125">
      {icon}
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="BUMARESWA" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Selamat Datang!</h2>
          <p className="text-slate-500 mt-1">Pilih menu untuk memulai petualanganmu.</p>
        </div>
        
        <div className="space-y-4">
          <MenuItem
            title="EduPack"
            description="Materi lengkap seputar burnout."
            icon={<BookIcon />}
            color="bg-sky-400"
            onClick={() => navigateTo(Screen.EDUPACK)}
          />
          <MenuItem
            title="Edu Balance"
            description="Tonton video untuk tenangkan pikiran."
            icon={<PlayIcon />}
            color="bg-amber-400"
            onClick={() => navigateTo(Screen.EDUBALANCE)}
          />
          <MenuItem
            title="Balance Quiz"
            description="Uji pemahamanmu tentang burnout."
            icon={<QuizIcon />}
            color="bg-rose-400"
            onClick={() => navigateTo(Screen.QUIZ)}
          />
          <MenuItem
            title="Brain Teaser"
            description="Asah otak dengan pencarian kata."
            icon={<BrainIcon />}
            color="bg-teal-400"
            onClick={() => navigateTo(Screen.BRAINTEASER)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
