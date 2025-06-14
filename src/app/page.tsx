'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Search, Heart } from 'lucide-react';
import { ShoegazeTrack } from '@/types';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume] = useState(0.7);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTrack, setSelectedTrack] = useState<ShoegazeTrack | null>(null);

  // Mock data for demonstration
  const featuredTracks: ShoegazeTrack[] = [
    {
      id: "1",
      title: "Ethereal Dream",
      artist: "AI Composer",
      duration: 245,
      coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      coverImageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      audioUrl: "",
      sunoId: "track-1",
      mood: ['dreamy', 'ethereal'],
      subGenre: 'shoegaze',
      characteristics: ["dreamy", "ethereal"],
      createdAt: new Date(),
      playCount: 1247,
      featured: true
    },
    {
      id: "2",
      title: "Velvet Noise",
      artist: "Synthetic Waves",
      duration: 198,
      coverUrl: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=300&fit=crop",
      coverImageUrl: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=300&fit=crop",
      audioUrl: "",
      sunoId: "track-2",
      mood: ['distorted', 'melancholic'],
      subGenre: 'alternative',
      characteristics: ["distorted", "melancholic"],
      createdAt: new Date(),
      playCount: 892,
      featured: true
    },
    {
      id: "3",
      title: "Starlight Cascade",
      artist: "Neural Soundscapes",
      duration: 267,
      coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      coverImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      audioUrl: "",
      sunoId: "track-3",
      mood: ['uplifting', 'dreamy'],
      subGenre: 'dream-pop',
      characteristics: ["uplifting", "dreamy"],
      createdAt: new Date(),
      playCount: 1456,
      featured: true
    },
    {
      id: "4",
      title: "Lost in Reverb",
      artist: "Digital Ghosts",
      duration: 312,
      coverUrl: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=300&h=300&fit=crop",
      coverImageUrl: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=300&h=300&fit=crop",
      audioUrl: "",
      sunoId: "track-4",
      mood: ['melancholic'],
      subGenre: 'shoegaze',
      characteristics: ["melancholic", "nostalgic"],
      createdAt: new Date(),
      playCount: 743,
      featured: true
    }
  ];

  const recentTracks: ShoegazeTrack[] = [
    {
      id: "5",
      title: "Glittering Haze",
      artist: "AI Collective",
      duration: 223,
      coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      coverImageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      audioUrl: "",
      sunoId: "track-5",
      mood: ['ethereal'],
      subGenre: 'shoegaze',
      characteristics: ["ethereal"],
      createdAt: new Date(),
      playCount: 0,
      featured: false
    },
    {
      id: "6",
      title: "Suburban Melancholy",
      artist: "Synthetic Minds",
      duration: 189,
      coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      coverImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      audioUrl: "",
      sunoId: "track-6",
      mood: ['melancholic'],
      subGenre: 'alternative',
      characteristics: ["melancholic"],
      createdAt: new Date(),
      playCount: 0,
      featured: false
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (track: ShoegazeTrack) => {
    if (selectedTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedTrack.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedTrack]);

  const getMoodColors = (moods: string[]) => {
    const moodColorMap = {
      dreamy: 'bg-purple-400/20 text-purple-300',
      ethereal: 'bg-blue-400/20 text-blue-300',
      melancholic: 'bg-indigo-400/20 text-indigo-300',
      distorted: 'bg-red-400/20 text-red-300',
      uplifting: 'bg-pink-400/20 text-pink-300',
      dark: 'bg-gray-400/20 text-gray-300',
      nostalgic: 'bg-amber-400/20 text-amber-300'
    };
    return moods[0] ? moodColorMap[moods[0] as keyof typeof moodColorMap] || 'bg-gray-400/20 text-gray-300' : 'bg-gray-400/20 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="font-display text-2xl font-light bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                ShoegaZone
              </div>
              <div className="text-xs text-purple-300 font-light tracking-wider">shoegaze • alternative</div>
            </div>
            <nav className="hidden md:flex space-x-12">
              <button 
                onClick={() => setActiveTab('home')}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-light tracking-wide ${activeTab === 'home' ? 'bg-white/10 text-white shadow-lg' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
              >
                Discover
              </button>
              <button 
                onClick={() => setActiveTab('search')}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-light tracking-wide ${activeTab === 'search' ? 'bg-white/10 text-white shadow-lg' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
              >
                Search
              </button>
              <button 
                onClick={() => setActiveTab('player')}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-light tracking-wide ${activeTab === 'player' ? 'bg-white/10 text-white shadow-lg' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
              >
                Now Playing
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'home' && (
          <div className="space-y-20">
            {/* Hero Section */}
            <section className="text-center py-20">
              <h1 className="font-display text-5xl md:text-7xl font-extralight mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight leading-tight">
                Dreamscapes
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
                Immerse yourself in AI-crafted shoegaze and alternative soundscapes
              </p>
              <p className="text-sm text-white/40 mt-4 font-light tracking-widest uppercase">
                Curated • Atmospheric • Ethereal
              </p>
            </section>

            {/* Today's Pick */}
            <section>
              <h2 className="font-display text-3xl font-extralight mb-8 flex items-center tracking-wide">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Featured Tracks</span>
                <div className="ml-4 flex-1 h-px bg-gradient-to-r from-purple-400 via-pink-400 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredTracks.map((track) => (
                  <div key={track.id} className="group relative">
                    <div className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                      <div className="aspect-square relative">
                        <Image 
                          src={track.coverUrl!} 
                          alt={track.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <button 
                          onClick={() => handlePlayPause(track)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                            {isPlaying && selectedTrack?.id === track.id ? 
                              <Pause className="w-8 h-8 text-white" /> : 
                              <Play className="w-8 h-8 text-white ml-1" />
                            }
                          </div>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-light text-lg mb-1 truncate tracking-wide">{track.title}</h3>
                        <p className="text-white/50 text-sm mb-3 truncate font-light">{track.artist}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-light tracking-wider ${getMoodColors(track.mood)}`}>
                            {track.mood[0]}
                          </span>
                          <span className="text-xs text-white/30 font-light">{formatTime(track.duration)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/30 capitalize font-light tracking-wide">{track.subGenre}</span>
                          <span className="text-xs text-white/30 font-light">{track.playCount.toLocaleString()} plays</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recently Added */}
            <section>
              <h2 className="font-display text-3xl font-extralight mb-8 flex items-center tracking-wide">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Recent Additions</span>
                <div className="ml-4 flex-1 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentTracks.map((track) => (
                  <div key={track.id} className="group">
                    <div className="flex items-center space-x-5 p-6 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 hover:scale-[1.01]">
                      <div className="relative">
                        <Image 
                          src={track.coverUrl!} 
                          alt={track.title}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-lg object-cover opacity-80"
                        />
                        <button 
                          onClick={() => handlePlayPause(track)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg bg-black/40"
                        >
                          {isPlaying && selectedTrack?.id === track.id ? 
                            <Pause className="w-6 h-6 text-white" /> : 
                            <Play className="w-6 h-6 text-white ml-0.5" />
                          }
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-light text-lg truncate tracking-wide">{track.title}</h3>
                        <p className="text-white/50 text-sm truncate font-light">{track.artist}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-light tracking-wider ${getMoodColors(track.mood)}`}>
                            {track.mood[0]}
                          </span>
                          <span className="text-xs text-white/30 capitalize font-light tracking-wide">{track.subGenre}</span>
                        </div>
                      </div>
                      <div className="text-sm text-white/30 font-light">
                        {formatTime(track.duration)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-8">
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h2 className="font-display text-3xl font-extralight mb-6 tracking-wide">Explore Soundscapes</h2>
              <div className="max-w-md mx-auto">
                <input 
                  type="text" 
                  placeholder="Search tracks, moods, genres..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Dreamy', 'Melancholic', 'Ethereal', 'Distorted', 'Uplifting', 'Dark', 'Nostalgic', 'Shoegaze'].map((mood) => (
                <button key={mood} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 text-center hover:scale-105">
                  <div className="text-lg font-light tracking-wide">{mood}</div>
                  <div className="text-xs text-white/40 mt-2 font-light tracking-widest uppercase">mood</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'player' && selectedTrack && (
          <div className="max-w-2xl mx-auto text-center space-y-12">
            <div className="relative">
              <Image 
                src={selectedTrack.coverUrl!} 
                alt={selectedTrack.title}
                width={320}
                height={320}
                className="w-80 h-80 mx-auto rounded-3xl object-cover shadow-2xl shadow-purple-500/20"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-extralight tracking-wide">{selectedTrack.title}</h1>
              <p className="text-xl text-white/60 font-light tracking-wide">{selectedTrack.artist}</p>
              <div className="flex items-center justify-center space-x-4">
                <span className={`px-4 py-2 rounded-full text-sm font-light tracking-wider ${getMoodColors(selectedTrack.mood)}`}>
                  {selectedTrack.mood[0]}
                </span>
                <span className="text-sm text-white/30 capitalize font-light tracking-wide">{selectedTrack.subGenre}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / selectedTrack.duration) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-white/50 font-light">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(selectedTrack.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-8">
              <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
                <Shuffle className="w-6 h-6 text-white/60" />
              </button>
              <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-110 active:scale-95"
              >
                {isPlaying ? 
                  <Pause className="w-8 h-8" /> : 
                  <Play className="w-8 h-8 ml-1" />
                }
              </button>
              <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full hover:bg-white/10 transition-colors">
                <Repeat className="w-6 h-6 text-white/60" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center space-x-4">
              <Volume2 className="w-5 h-5 text-white/60" />
              <div className="w-32 bg-white/20 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Player Bar */}
      {selectedTrack && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-black/50 border-t border-white/5 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <Image 
                src={selectedTrack.coverUrl!} 
                alt={selectedTrack.title}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <h4 className="font-light text-lg truncate tracking-wide">{selectedTrack.title}</h4>
                <p className="text-sm text-white/50 truncate font-light">{selectedTrack.artist}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {isPlaying ? 
                  <Pause className="w-6 h-6" /> : 
                  <Play className="w-6 h-6 ml-0.5" />
                }
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95">
                <Heart className="w-5 h-5 text-white/60 hover:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}