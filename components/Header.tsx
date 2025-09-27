import React, { useState, useRef, useEffect } from 'react';
import { BackArrowIcon, SettingsIcon } from './Icons';

interface SettingsMenuProps {
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="absolute top-14 right-4 z-20 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1">
      <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-violet-50">My Profile</a>
      <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-violet-50">My Account</a>
      <div className="my-1 border-t border-slate-100"></div>
      <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-violet-50">Logout</a>
    </div>
  );
};

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between p-4 bg-violet-500 text-white rounded-b-3xl">
      <div className="flex-1">
        {onBack && (
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
            <BackArrowIcon />
          </button>
        )}
      </div>
      <h1 className="text-xl font-bold text-center flex-shrink-0">{title}</h1>
      <div className="flex-1 flex justify-end">
        <button onClick={() => setIsSettingsOpen(prev => !prev)} className="p-2 -mr-2 rounded-full hover:bg-white/20 transition-colors">
          <SettingsIcon />
        </button>
      </div>
      {isSettingsOpen && <SettingsMenu onClose={() => setIsSettingsOpen(false)} />}
    </header>
  );
};

export default Header;
