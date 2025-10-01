import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { BookIcon, BrainIcon, PlayIcon, QuizIcon, SettingsIcon } from './Icons';
import Header from './Header';

// Add CSS for animations
const styles = `
  @keyframes backgroundShift {
    0% { background-position: 0% 0%, 100% 100%, 50% 50%, 0 0, 0 0; }
    25% { background-position: 15% 7%, 85% 93%, 45% 55%, 15px 15px, 15px 15px; }
    50% { background-position: 30% 15%, 70% 85%, 40% 60%, 30px 30px, 30px 30px; }
    75% { background-position: 15% 7%, 85% 93%, 45% 55%, 15px 15px, 15px 15px; }
    100% { background-position: 0% 0%, 100% 100%, 50% 50%, 0 0, 0 0; }
  }
  
  @keyframes pulse-slow {
    0% { opacity: 0.15; }
    50% { opacity: 0.25; }
    100% { opacity: 0.15; }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

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

// Function to convert text to sentence case
const toSentenceCase = (text: string): string => {
  // Convert to lowercase first
  let result = text.toLowerCase();
  
  // Capitalize the first letter of the entire string
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  // Capitalize the first letter after periods, exclamation marks, and question marks
  result = result.replace(/(\. |\! |\? )([a-z])/g, (match, punctuation, letter) => {
    return punctuation + letter.toUpperCase();
  });
  
  return result;
};

const quotes = [
  "Burnout bukan akhir cerita",
  "Lelah itu wajar, tapi menyerah bukan pilihan",
  "Hati tenang pikiran terang",
  "Hargai setiap pencapaian, sekecil apupun itu",
  "Bangkitlah dunia masih perlu versi terbaikmu",
  "Kamu lebih kuat dari lelah",
  "Terus maju tanpa ragu",
  "Tenang dulu, kuatkan langkahmu",
  "Setiap kesalahan adalah peluang untuk belajar dan berkembang",
  "Burnout bak hujan yang turun lalu reda",
  "Semangatmu lebih kuat dari segala rintangan",
  "Ketenangan adalah puncak kekuatan",
  "Stress hanyalah bayangan yang lewat",
  "Setiap mimpi butuh perjuangan, dan setiap perjuangan akan terbayar. Percaya pada prosesmu, karena langkah kecil hari ini bisa jadi lompatan besar di masa depan.",
  "Selama kamu masih berusaha, kesempatan itu selalu ada.",
  "Tambahkan jangan menyerah hanya karena perjalanan terasa berat. Jalan terjal justru membawa kita ke pemandangan yang paling indah"
];

// Image paths for the quote slider
const quoteImages = [
  "/assets/quote-1.jpeg",
  "/assets/quote-2.jpeg",
  "/assets/quote-3.jpeg",
  "/assets/quote-4.jpeg",
  "/assets/quote-5.jpeg",
  "/assets/quote-6.jpeg",
  "/assets/quote-7.jpeg",
  "/assets/quote-8.jpeg",
  "/assets/quote-9.jpeg",
  "/assets/quote-10.jpeg",
  "/assets/quote-11.jpeg",
  "/assets/quote-12.jpeg",
  "/assets/quote-13.jpeg",
  "/assets/quote-14.jpeg",
  "/assets/quote-15.jpeg",
  "/assets/quote-16.jpeg"
];

const ImageQuoteSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length);
  };

  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-xl h-64 md:h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation buttons - only show on hover */}
      <button 
        onClick={goToPrev}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-300 ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        } hover:bg-black/50`}
        aria-label="Previous quote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white transition-all duration-300 ${
          isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
        } hover:bg-black/50`}
        aria-label="Next quote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Image and quote container */}
      <div className="relative w-full h-full">
        {quoteImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Motivational quote ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay - only show on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>
            
            {/* Quote text - only show on hover */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <p className="text-white text-lg md:text-xl font-medium italic text-center">
                "{toSentenceCase(quotes[index])}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots - only show on hover */}
      <div className={`absolute top-4 right-4 flex space-x-2 z-20 transition-opacity duration-300 ${
        isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

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

const QuoteSlider: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 7000); // Change quote every 7 seconds for better readability

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setDirection('left');
    setCurrentQuoteIndex((prevIndex) => 
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection('right');
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 shadow-xl overflow-hidden">
      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow"
             style={{
               backgroundImage: `
                 radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 15%),
                 radial-gradient(circle at 90% 80%, rgba(255,255,255,0.15) 0%, transparent 15%),
                 radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 20%),
                 linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                 linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%)
               `,
               backgroundSize: '120px 120px, 180px 180px, 250px 250px, 50px 50px, 50px 50px',
               animation: 'backgroundShift 25s ease-in-out infinite'
             }}>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute top-1/4 right-10 w-4 h-4 rounded-full bg-white/20"></div>
      <div className="absolute bottom-1/4 left-10 w-6 h-6 rounded-full bg-white/20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Card carousel container - showing one card at a time */}
        <div className="relative h-64 flex items-center justify-center">
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white z-20 p-3 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Single card display */}
          <div className="w-full px-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 h-56 flex flex-col justify-center items-center shadow-lg border border-white/20 transform transition-all duration-700 ease-in-out hover:scale-[1.02]">
              <div className="text-white text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-white/60 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="italic text-lg md:text-xl font-medium leading-relaxed">
                  "{toSentenceCase(quotes[currentQuoteIndex])}"
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white z-20 p-3 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            aria-label="Next quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentQuoteIndex ? 'right' : 'left');
                setCurrentQuoteIndex(index);
              }}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === currentQuoteIndex ? 'bg-white w-8' : 'bg-white/40'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
          
          {/* Image-based Motivational Quote Slider - moved below Brain Teaser */}
          <div className="pt-4">
            <ImageQuoteSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;