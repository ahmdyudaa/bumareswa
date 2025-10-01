import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import { Word } from '../types';

// Updated words list from brainteser.md
const words = [
  'BURNOUT', 
  'WAKTU', 
  'STRES', 
  'FISIK', 
  'PSIKOLOGIS', 
  'SOSIAL', 
  'TERAPI', 
  'KONSELING', 
  'MOTIVASI', 
  'EMOSIONAL', 
  'ISTIRAHAT', 
  'SELFCARE', 
  'MEDITASI', 
  'BALANCE'
];
const gridSize = 15; // Increased grid size to accommodate longer words

// Define a type for word positions
interface WordPosition {
  word: string;
  positions: { row: number; col: number }[];
}

// Utility to generate the word search grid
const generateGrid = (wordsToPlace: string[], size: number): { grid: string[][], placedWords: string[], wordPositions: WordPosition[] } => {
    const grid = Array.from({ length: size }, () => Array(size).fill(''));
    const placedWords: string[] = [];
    const wordPositions: WordPosition[] = [];

    const directions = [
        { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, // Horizontal, Vertical, Diagonal down-right
        { x: -1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: -1 }, // Horizontal (R), Vertical (R), Diagonal up-left
        { x: 1, y: -1 }, { x: -1, y: 1 } // Diagonal up-right, Diagonal down-left
    ];

    wordsToPlace.forEach(word => {
        let placed = false;
        let attempts = 0;
        const positions: { row: number; col: number }[] = [];
        
        while (!placed && attempts < 100) {
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);

            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
                const newRow = row + i * dir.y;
                const newCol = col + i * dir.x;
                if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size || (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i])) {
                    canPlace = false;
                    break;
                }
            }

            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    const newRow = row + i * dir.y;
                    const newCol = col + i * dir.x;
                    grid[newRow][newCol] = word[i];
                    positions.push({ row: newRow, col: newCol });
                }
                placed = true;
                placedWords.push(word);
                wordPositions.push({ word, positions });
            }
            attempts++;
        }
    });
    
    // Fill empty cells
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    return { grid, placedWords, wordPositions };
};

const BrainTeaser: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [grid, setGrid] = useState<string[][]>([]);
    const [wordsToFind, setWordsToFind] = useState<Word[]>([]);
    const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
    const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [foundWordPositions, setFoundWordPositions] = useState<{ row: number; col: number }[]>([]);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const initializeGame = useCallback(() => {
        const { grid, placedWords, wordPositions } = generateGrid(words, gridSize);
        setGrid(grid);
        setWordsToFind(placedWords.map(word => ({ text: word, found: false })));
        setWordPositions(wordPositions);
        setSelectedCells([]);
        setFoundWordPositions([]);
        setStartTime(Date.now()); // This will trigger the timer effect
        setElapsedTime(0);
        setGameCompleted(false);
    }, []); // Remove startTime from dependency array

    useEffect(() => {
        initializeGame();
        
        // Cleanup interval on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [initializeGame]);

    // Check if all words are found
    useEffect(() => {
        const allWordsFound = wordsToFind.length > 0 && wordsToFind.every(w => w.found);
        if (allWordsFound && !gameCompleted) {
            setGameCompleted(true);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [wordsToFind, gameCompleted]);

    // Fix the timer by updating it in a separate effect
    useEffect(() => {
        if (startTime) {
            // Clear any existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            
            // Start the timer
            intervalRef.current = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        
        // Cleanup interval on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [startTime]);

    const isCellSelected = (row: number, col: number) => selectedCells.some(c => c.row === row && c.col === col);
    
    const isCellFound = (row: number, col: number) => {
        return foundWordPositions.some(pos => pos.row === row && pos.col === col);
    };
    
    const allWordsFound = wordsToFind.length > 0 && wordsToFind.every(w => w.found);

    const handleCellMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        setSelectedCells([{ row, col }]);
    };

    const handleCellTouchStart = (row: number, col: number) => {
        setIsSelecting(true);
        setSelectedCells([{ row, col }]);
    };

    const handleCellMouseEnter = (row: number, col: number) => {
        if (!isSelecting || selectedCells.find(c => c.row === row && c.col === col)) return;
        
        const firstCell = selectedCells[0];
        const lastCell = selectedCells[selectedCells.length - 1];
        const dRow = Math.sign(row - firstCell.row);
        const dCol = Math.sign(col - firstCell.col);

        // Check for straight line
        if (Math.abs(row - firstCell.row) !== Math.abs(col - firstCell.col) && row - firstCell.row !== 0 && col - firstCell.col !== 0) {
            return;
        }

        const newSelection = [{...firstCell}];
        let currRow = firstCell.row + dRow;
        let currCol = firstCell.col + dCol;

        while(true) {
            newSelection.push({row: currRow, col: currCol});
            if (currRow === row && currCol === col) break;
            currRow += dRow;
            currCol += dCol;
        }
        setSelectedCells(newSelection);
    };

    const handleCellTouchMove = (e: React.TouchEvent, row: number, col: number) => {
        e.preventDefault(); // Prevent scrolling while selecting
        if (!isSelecting || selectedCells.find(c => c.row === row && c.col === col)) return;
        
        const firstCell = selectedCells[0];
        const lastCell = selectedCells[selectedCells.length - 1];
        const dRow = Math.sign(row - firstCell.row);
        const dCol = Math.sign(col - firstCell.col);

        // Check for straight line
        if (Math.abs(row - firstCell.row) !== Math.abs(col - firstCell.col) && row - firstCell.row !== 0 && col - firstCell.col !== 0) {
            return;
        }

        const newSelection = [{...firstCell}];
        let currRow = firstCell.row + dRow;
        let currCol = firstCell.col + dCol;

        while(true) {
            newSelection.push({row: currRow, col: currCol});
            if (currRow === row && currCol === col) break;
            currRow += dRow;
            currCol += dCol;
        }
        setSelectedCells(newSelection);
    };

    const handleMouseUp = () => {
        if (!isSelecting) return;
        setIsSelecting(false);

        const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
        const reversedWord = selectedWord.split('').reverse().join('');
        
        const foundWord = wordsToFind.find(w => !w.found && (w.text === selectedWord || w.text === reversedWord));

        if (foundWord) {
            setWordsToFind(prev => prev.map(w => w.text === foundWord.text ? { ...w, found: true } : w));
            // Add the positions of the found word to foundWordPositions
            const wordPos = wordPositions.find(wp => wp.word === foundWord.text);
            if (wordPos) {
                setFoundWordPositions(prev => [...prev, ...wordPos.positions]);
            }
        }
        setSelectedCells([]);
    };

    const handleTouchEnd = () => {
        if (!isSelecting) return;
        setIsSelecting(false);

        const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
        const reversedWord = selectedWord.split('').reverse().join('');
        
        const foundWord = wordsToFind.find(w => !w.found && (w.text === selectedWord || w.text === reversedWord));

        if (foundWord) {
            setWordsToFind(prev => prev.map(w => w.text === foundWord.text ? { ...w, found: true } : w));
            // Add the positions of the found word to foundWordPositions
            const wordPos = wordPositions.find(wp => wp.word === foundWord.text);
            if (wordPos) {
                setFoundWordPositions(prev => [...prev, ...wordPos.positions]);
            }
        }
        setSelectedCells([]);
    };

    // Format time for display (MM:SS)
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-screen" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <Header title="Brain Teaser" onBack={onBack} />
            <div className="flex-1 p-4 md:p-6 flex flex-col overflow-y-auto" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchEnd={handleTouchEnd}>
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Cari Kata Tersembunyi</h2>
                    <p className="text-slate-500 mt-1">Klik dan seret untuk memilih kata.</p>
                    {/* Timer display */}
                    <div className="mt-2 text-lg font-bold text-violet-600">
                        Waktu: {formatTime(elapsedTime)}
                    </div>
                </div>

                <div className="w-full aspect-square bg-violet-100 p-2 rounded-lg shadow-inner">
                    <div className="grid gap-1 w-full h-full" style={{ 
                        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
                        touchAction: 'none'
                    }}>
                        {grid.map((row, rowIndex) =>
                            row.map((letter, colIndex) => {
                                const isSelected = isCellSelected(rowIndex, colIndex);
                                const isFound = isCellFound(rowIndex, colIndex);
                                
                                let bgColor = 'bg-white';
                                if (isSelected) {
                                    bgColor = 'bg-amber-400';
                                } else if (isFound) {
                                    bgColor = 'bg-green-400';
                                }
                                
                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`flex items-center justify-center aspect-square text-sm md:text-base font-bold rounded-md transition-colors duration-100 select-none ${bgColor} ${isSelected ? 'text-white' : 'text-slate-800'}`}
                                        onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                                        onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                                        onTouchStart={() => handleCellTouchStart(rowIndex, colIndex)}
                                        onTouchMove={(e) => handleCellTouchMove(e, rowIndex, colIndex)}
                                    >
                                        {letter}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="mt-4 flex-1">
                    <h3 className="font-bold text-center text-slate-700 mb-2">Daftar Kata:</h3>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
                        {wordsToFind.map(word => (
                            <li key={word.text} className={`transition-all duration-300 ${word.found ? 'line-through text-slate-400' : ''}`}>
                                {word.text}
                            </li>
                        ))}
                    </ul>
                </div>
                 {allWordsFound && (
                    <div className="mt-4 text-center">
                        <p className="font-bold text-green-600">Selamat! Kamu menemukan semua kata!</p>
                        <p className="text-slate-700 mt-1">Waktu Selesai: {formatTime(elapsedTime)}</p>
                        <button onClick={initializeGame} className="mt-2 bg-violet-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-violet-600 transition-colors">
                            Main Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrainTeaser;