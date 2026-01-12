import React from 'react';
import { Play } from 'lucide-react';

export default function Playlist({ memoryCards, playlistCover, onSongClick, onPlayClick, totalDuration = "7 hr 59 min" }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#8B7E6A] via-[#5A5147] to-[#2A2520] pb-6">
            {/* Playlist Header */}
            <div className="px-4 md:px-8 pt-12 pb-6">
                {/* Mobile: Column (reverse) | Desktop: Row */}
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                    {/* Album Cover */}
                    <div className="w-56 h-56 md:w-64 md:h-64 flex-shrink-0 rounded-lg shadow-2xl overflow-hidden">
                        <img 
                            src={playlistCover} 
                            alt="Playlist Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    {/* Playlist Info */}
                    <div className="text-left md:text-left md:pb-4">
                        <p className="text-gray-200 text-sm mb-2 hidden md:block">Public Playlist</p>
                        <h1 className="text-white text-2xl md:text-8xl font-bold mb-4">911🧸</h1>
                        <p className="text-gray-200 text-base mb-4 md:px-0 max-w-md">
                            11 songs that remind us of our special moments together💗
                        </p>
                        <div className="text-gray-200 text-sm">
                            <span className="font-semibold">Rachelle Cheng and Martin</span>
                            <span className="mx-1">•</span>
                            <span>1 save</span>
                            <span className="mx-1">•</span>
                            <span>{memoryCards.length} songs, {totalDuration}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Play Button */}
            <div className="px-6 mb-6">
                <button
                    onClick={onPlayClick}
                    className="bg-[#1ED760] hover:bg-[#1FDF64] hover:scale-105 text-black rounded-full p-5 shadow-lg transition-all"
                >
                    <Play className="w-5 h-5 md:w-8 md:h-8" fill="black" />
                </button>
            </div>

            {/* Song List */}
            <div className="px-4">
                {/* Column Headers */}
                <div className="hidden md:flex items-center gap-3 px-3 py-2 border-b border-white/10 text-gray-300 text-sm mb-1">
                    <span className="w-6 text-center">#</span>
                    <span className="flex-1">Title</span>
                    <span className="w-32 text-right">Date added</span>
                    <span className="w-5"></span>
                </div>
                
                {/* Song Items */}
                {memoryCards.map((card, index) => (
                    <button
                        key={card.id}
                        onClick={() => onSongClick(index)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                        <span className="text-gray-300 text-sm w-6 text-center hidden md:block">{index + 1}</span>
                        <img 
                            src={card.albumCover} 
                            alt={card.songTitle}
                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 text-left min-w-0">
                            <h3 className="text-white text-base font-normal group-hover:underline truncate">{card.songTitle}</h3>
                            <p className="text-gray-300 text-sm truncate">{card.artist}</p>
                        </div>
                        <span className="text-gray-300 text-sm w-32 text-right whitespace-nowrap flex-shrink-0">{card.memoryDate}</span>
                        <Play className="w-5 h-5 text-gray-300 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </div>
        </div>
    );
}
