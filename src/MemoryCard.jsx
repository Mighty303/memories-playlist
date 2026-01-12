import React, { useState, useRef, useEffect } from 'react';
import Playlist from './Playlist';
import MemoryCardView from './MemoryCardView';
import memoryImage0 from './assets/memories/memory0.jpeg';
import memoryImage from './assets/memories/memory1.jpeg';
import memoryImage2 from './assets/memories/memory2.jpeg';
import memoryImagePlaylist from './assets/memories/memoryCover.jpeg';
import memoryImage3 from './assets/memories/memory3.jpeg';
import memoryImage4 from './assets/memories/memory4.jpeg';
import memoryImage5 from './assets/memories/memory5.jpeg';
import memoryImage6 from './assets/memories/memory6.jpeg';
import memoryImage7 from './assets/memories/memory7.jpeg';
import memoryImage8 from './assets/memories/memory8.jpeg';
import memoryImage9 from './assets/memories/memory9.jpeg';
import playlistCover from './assets/playlistCover.jpeg';

// Import audio files
import WANTCHU from './assets/audio/WANTCHU.mp3';
import starlight from './assets/audio/星辰starlight.mp3';
import foreignfeelings from './assets/audio/foreign_feelings.mp3';
import GO_CORTIS from './assets/audio/GO.mp3';
import Trust from './assets/audio/Trust.mp3';
import suddenShower from './assets/audio/sudden_shower.mp3';
import how_do_you_dance from './assets/audio/how_do_you_dance.mp3';
import 我的驕傲 from './assets/audio/我的驕傲.mp3';
import zoo from './assets/audio/zoo.mp3';
import youandi from './assets/audio/you_and_i.mp3';
import monaLisa from './assets/audio/mona-lisa.mp3';

export default function SpotifyMemoryCard() {
    const [showPlaylist, setShowPlaylist] = useState(true);
    const audioRef = useRef(null);
    // Array of memory cards
    const memoryCards = [
        {
            id: 1,
            albumCover: memoryImage0,
            songTitle: "WANTCHU",
            artist: "Keshi",
            memoryText: "This song reminds me of the first time we met. I would constantly be playing this song on repeat while thinking of you. A photo of the silver tower bill is how I rmb",
            memoryDate: "August 10, 2025",
            audioSrc: WANTCHU
        },
        {
            id: 2,
            albumCover: memoryImagePlaylist,
            songTitle: "Mona Lisa",
            artist: "J-Hope",
            memoryText: "When I listen to this song, I rmb how you creating the 911 playlist and the night that we went to walk in the park and you sat on me :)",
            memoryDate: "September 16, 2025",
            audioSrc: monaLisa
        },
        {
            id: 3,
            albumCover: memoryImage2,
            songTitle: "Foreign Feelings",
            artist: "Fion",
            memoryText: "When I listen to this song, I think about the day we went to Fion's concert and after that, I just kept playing the song on repeat in my car.",
            memoryDate: "September 24, 2025",
            audioSrc: foreignfeelings
        },
        {
            id: 4,
            albumCover: memoryImage,
            songTitle: "星辰starlight",
            artist: " KeyKey & Loong-G龍吉",
            memoryText: "I remember you telling me how you really liked this song when I was driving to the Aberdeen park to watch a kdrama together.",
            memoryDate: "September 27, 2025",
            audioSrc: starlight
        },
        {
            id: 6,
            albumCover: memoryImage3,
            songTitle: "GO!",
            artist: "CORTIS",
            memoryText: "Whenever I hear this song, it reminds me of your tiktok of drmr's club. It also reminds of the day you bought me drmr's club and went to sfu just to give it to me.",
            memoryDate: "September 29, 2025",
            audioSrc: GO_CORTIS
        },
        {
            id: 7,
            albumCover: memoryImage5,
            songTitle: "Sudden Shower",
            artist: "ECLIPSE",
            memoryText: "I rmb you watched 3 episodes of lovely runner on the plane and I was super excited to pick u up and eventually watch the rest of the show together.",
            memoryDate: "October 6th, 2025",
            audioSrc: suddenShower
        },
        {
            id: 8,
            albumCover: memoryImage6,
            songTitle: "how do you dance?",
            artist: "yung kai",
            memoryText: "when I see this photo, I think about the day I ordered the medium spicy ramen at danbo and suffered. this song was playing on the drive back from chinatown.",
            memoryDate: "October 12th, 2025",
            audioSrc: how_do_you_dance
        },
        {
            id: 9,
            albumCover: memoryImage4,
            songTitle: "Trust",
            artist: "RIKI",
            memoryText: "I specifically rmb this song on the day we picked up matching maltese badminton shirts. I rmb us cuddling and this song playing on ur Google Home.",
            memoryDate: "November 15th, 2025",
            audioSrc: Trust
        },
        {
            id: 10,
            albumCover: memoryImage7,
            songTitle: "我的驕傲",
            artist: "joey yung",
            memoryText: "this song reminds me of the time you helped me write my draft for my persuasive paper. you played this song around 3am and it made me feel so nostalgic.",
            memoryDate: "November 12th, 2025",
            audioSrc: 我的驕傲
        },
        {
            id: 11,
            albumCover: memoryImage8,
            songTitle: "Zoo",
            artist: "Shakira",
            memoryText: "this song now always reminds me of the day u bought tix for zootopia 2. the final I had that day was horrible but watching the movie w u made it all better.",
            memoryDate: "December 10th, 2025",
            audioSrc: zoo
        },
        {
            id: 12,
            albumCover: memoryImage9,
            songTitle: "you and i",
            artist: "Fion",
            memoryText: "I rmb you playing this song after we ate steak at Elisa and tellng me how this she just released it and wanted me to hear it too. Hearing this reminds me of this timex",
            memoryDate: "December 12th, 2025",
            audioSrc: youandi
        },

        // Add more songs here
        // {
        //   id: 2,
        //   albumCover: "https://images.unsplash.com/photo-1...",
        //   songTitle: "Another Song",
        //   artist: "Another Artist",
        //   memoryText: "Another memory...",
        //   memoryDate: "August 20, 2023"
        // }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [songDurations, setSongDurations] = useState({});

    const currentCard = memoryCards[currentIndex];

    // Calculate total playlist duration
    const getTotalDuration = () => {
        const total = Object.values(songDurations).reduce((sum, dur) => sum + dur, 0);
        const hours = Math.floor(total / 3600);
        const minutes = Math.floor((total % 3600) / 60);
        return `${hours} hr ${minutes} min`;
    };

    // Load and play audio when song changes
    useEffect(() => {
        if (audioRef.current && currentCard.audioSrc) {
            // Reset time when changing songs
            setCurrentTime(0);
            setDuration(0);
            
            const audio = audioRef.current;
            audio.src = currentCard.audioSrc;
            audio.load();

            // Set up event listeners for this specific audio
            const updateDuration = () => {
                if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
                    console.log("Duration loaded:", audio.duration);
                    setDuration(audio.duration);
                    // Store duration for this song
                    setSongDurations(prev => ({
                        ...prev,
                        [currentIndex]: audio.duration
                    }));
                }
            };

            const updateTime = () => setCurrentTime(audio.currentTime);

            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('durationchange', updateDuration);
            audio.addEventListener('canplay', updateDuration);
            audio.addEventListener('loadeddata', updateDuration);
            audio.addEventListener('timeupdate', updateTime);
            
            if (isPlaying && !showPlaylist) {
                audio.play().catch(err => {
                    console.log("Playback prevented:", err);
                    setIsPlaying(false);
                });
            }

            return () => {
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('durationchange', updateDuration);
                audio.removeEventListener('canplay', updateDuration);
                audio.removeEventListener('loadeddata', updateDuration);
                audio.removeEventListener('timeupdate', updateTime);
            };
        }
    }, [currentIndex, currentCard.audioSrc, isPlaying, showPlaylist]);

    // Handle play/pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.log("Playback prevented:", err);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : memoryCards.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < memoryCards.length - 1 ? prev + 1 : 0));
    };

    const handleSongClick = (index) => {
        setCurrentIndex(index);
        setShowPlaylist(false);
        setIsPlaying(true);
    };

    const handlePlayClick = () => {
        setCurrentIndex(0);
        setShowPlaylist(false);
        setIsPlaying(true);
    };

    const handleBackToPlaylist = () => {
        setShowPlaylist(true);
    };

    const handleSeek = (newTime) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Playlist View
    if (showPlaylist) {
        return (
            <Playlist
                memoryCards={memoryCards}
                playlistCover={playlistCover}
                onSongClick={handleSongClick}
                onPlayClick={handlePlayClick}
                totalDuration={getTotalDuration()}
            />
        );
    }

    // Memory Card View
    return (
        <>
            <audio ref={audioRef} />
            <MemoryCardView
                currentCard={currentCard}
                currentIndex={currentIndex}
                totalCards={memoryCards.length}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onBack={handleBackToPlaylist}
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
            />
        </>
    );
}