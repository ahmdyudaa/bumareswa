import React from 'react';
import Header from './Header';

const videos = [
  { id: 'aakMc6bOjdw', title: 'Cara Mengatasi Burnout pada Remaja' },
  { id: '9txi4xQMhY8', title: 'Teknik Manajemen Stres yang Efektif' },
  { id: 'WMfRHf5kjsE', title: 'Pentingnya Work-Life Balance untuk Kesehatan Mental' },
];

const EduBalance: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Edu Balance" onBack={onBack} />
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">Temukan Keseimbanganmu</h2>
            <p className="text-slate-500 mt-1">Tonton video inspiratif berikut ini.</p>
        </div>
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EduBalance;
