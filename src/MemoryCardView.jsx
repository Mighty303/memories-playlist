import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, ChevronDown } from 'lucide-react';

export default function MemoryCardView({ 
    currentCard, 
    isPlaying, 
    setIsPlaying,
    isLiked,
    setIsLiked,
    onPrevious, 
    onNext, 
    onBack,
    currentTime = 0,
    duration = 0,
    onSeek
}) {
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleProgressClick = (e) => {
        if (!onSeek || !duration) return;
        
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * duration;
        
        onSeek(newTime);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black">
            {/* Header with Back Button and Playlist Name */}
            <div className="flex items-center p-4 md:hidden">
                <button
                    onClick={onBack}
                    className="text-white hover:text-gray-300 transition-colors"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
                <h1 className="flex-1 text-center text-white text-sm font-bold pr-6">911🧸</h1>
            </div>

            {/* Desktop Back Button */}
            <div className="hidden md:block p-4">
                <button
                    onClick={onBack}
                    className="text-white hover:text-gray-300 transition-colors"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col px-6 pb-6">

                {/* Album Cover */}
                <div className="w-full aspect-square max-w-sm md:max-w-lg mx-auto mb-6 rounded-lg overflow-hidden shadow-2xl">
                    <img 
                        src={currentCard.albumCover}
                        alt={currentCard.songTitle}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Song Details */}
                <div className="mb-6">
                    <h2 className="text-white text-3xl font-bold mb-1">{currentCard.songTitle}</h2>
                    <p className="text-gray-400 text-base">{currentCard.artist}</p>
                </div>

                {/* Memory Text */}
                <div className="bg-zinc-800/50 rounded-2xl p-6 mb-8 flex-shrink-0">
                    <p className="text-gray-300 text-base leading-relaxed italic lowercase mb-4">
                        "{currentCard.memoryText}"
                    </p>
                    <p className="text-gray-500 text-sm text-right">
                        {currentCard.memoryDate}
                    </p>
                </div>

                {/* Spacer to push controls to bottom */}
                <div className="flex-1"></div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div 
                        onClick={handleProgressClick}
                        className="w-full bg-gray-700 rounded-full h-1 cursor-pointer hover:h-1.5 transition-all group mb-2"
                    >
                        <div 
                            className="bg-white rounded-full h-1 group-hover:h-1.5 group-hover:bg-green-500 transition-all duration-300" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <Heart 
                            className={`w-7 h-7 ${isLiked ? 'fill-green-500 text-green-500' : ''}`}
                        />
                    </button>

                    <div className="flex items-center gap-8">
                        <button 
                            onClick={onPrevious}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <SkipBack className="w-8 h-8" />
                        </button>
                        
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="bg-white rounded-full p-4 hover:scale-105 transition-transform shadow-xl"
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 text-black" fill="black" />
                            ) : (
                                <Play className="w-8 h-8 text-black ml-0.5" fill="black" />
                            )}
                        </button>

                        <button 
                            onClick={onNext}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <SkipForward className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="w-7"></div>
                </div>
            </div>
        </div>
    );
}
