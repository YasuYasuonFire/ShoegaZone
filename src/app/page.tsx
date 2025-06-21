'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Heart, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { ShoegazeTrack } from '@/types';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedTrack, setSelectedTrack] = useState<ShoegazeTrack | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

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
      generationPrompt: "Create a dreamy shoegaze track with ethereal vocals and reverb-heavy guitars, capturing the feeling of floating through clouds on a summer evening",
      promptDetails: {
        style: "Shoegaze, Dream Pop",
        mood: "Dreamy, Ethereal, Uplifting",
        instruments: "Electric guitars with heavy reverb, soft drums, synthesizers, atmospheric vocals",
        lyrics: "Abstract imagery about dreams and clouds",
        description: "A track that evokes the sensation of weightlessness and serenity"
      },
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
      generationPrompt: "Generate an alternative rock song with distorted guitars and melancholic vocals, reminiscent of 90s grunge but with a modern atmospheric touch",
      promptDetails: {
        style: "Alternative Rock, Grunge",
        mood: "Melancholic, Raw, Nostalgic",
        instruments: "Distorted electric guitars, driving bass, powerful drums, emotional vocals",
        lyrics: "Introspective themes about lost connections",
        description: "Raw emotion meets atmospheric production"
      },
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
      generationPrompt: "Compose an uplifting dream pop song with shimmering guitars and celestial atmosphere, like watching shooting stars on a clear night",
      promptDetails: {
        style: "Dream Pop, Indie Pop",
        mood: "Uplifting, Dreamy, Hopeful",
        instruments: "Jangly guitars, ethereal keyboards, light percussion, soaring vocals",
        lyrics: "Metaphors about stars and cosmic wonder",
        description: "Optimistic and inspiring with celestial themes"
      },
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
      generationPrompt: "Create a nostalgic shoegaze composition with layers of reverb-drenched guitars and whispered vocals, evoking memories of forgotten summers",
      promptDetails: {
        style: "Shoegaze, Post-Rock",
        mood: "Melancholic, Nostalgic, Introspective",
        instruments: "Multiple layered guitars with extensive reverb, subtle bass, ambient drums, hushed vocals",
        lyrics: "Nostalgic reflections on past memories",
        description: "A sonic journey through faded photographs and distant memories"
      },
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
      generationPrompt: "Generate an ethereal shoegaze track with glittery textures and floating melodies, like sunlight filtering through morning mist",
      promptDetails: {
        style: "Shoegaze, Ambient",
        mood: "Ethereal, Peaceful, Transcendent",
        instruments: "Ambient guitars, soft synthesizers, minimal drums, atmospheric vocals",
        lyrics: "Abstract imagery about light and mist",
        description: "Gentle and transcendent with sparkling textures"
      },
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
      generationPrompt: "Create a melancholic alternative song capturing the loneliness of suburban life with jangly guitars and introspective lyrics",
      promptDetails: {
        style: "Alternative Rock, Indie Rock",
        mood: "Melancholic, Lonely, Contemplative",
        instruments: "Clean jangly guitars, steady bass, simple drums, contemplative vocals",
        lyrics: "Observations about suburban isolation",
        description: "Reflective commentary on modern suburban existence"
      },
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
    }
  };

  const getMoodColors = (mood: string) => {
    const moodColorMap = {
      dreamy: 'bg-emerald-500/30 text-emerald-200',
      ethereal: 'bg-teal-500/30 text-teal-200',
      melancholic: 'bg-blue-500/30 text-blue-200',
      distorted: 'bg-red-500/30 text-red-200',
      uplifting: 'bg-green-500/30 text-green-200',
      dark: 'bg-gray-500/30 text-gray-200',
      nostalgic: 'bg-amber-500/30 text-amber-200'
    };
    return moodColorMap[mood as keyof typeof moodColorMap] || 'bg-gray-500/30 text-gray-200';
  };

  const filteredTracks = [...featuredTracks, ...recentTracks].filter(track => {
    if (activeFilter === 'All') return true;
    return track.mood.includes(activeFilter.toLowerCase() as 'dreamy' | 'melancholic' | 'ethereal' | 'distorted' | 'uplifting');
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white font-sans antialiased p-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#a8e6cf] to-[#98d6bf] bg-clip-text text-transparent">
              ShoegaZone
            </h1>
            <span className="text-sm text-gray-400 ml-1">shoegaze • alternative</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-2xl text-sm text-gray-300">
            {filteredTracks.length} tracks
          </div>
        </header>

        {/* Search Section */}
        <div className="mb-8">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks, artists, moods..."
            className="w-full p-4 text-base bg-white/[0.08] border-2 border-white/10 rounded-xl text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-[#a8e6cf] focus:bg-white/[0.12]"
          />
          <div className="flex gap-3 mt-4 flex-wrap">
            {['All', 'Dreamy', 'Melancholic', 'Ethereal', 'Uplifting'].map((filter) => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/15 hover:-translate-y-px ${
                  activeFilter === filter 
                    ? 'bg-gradient-to-r from-[#a8e6cf] to-[#98d6bf] border-transparent text-white' 
                    : 'bg-white/[0.08] border border-white/20 text-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Track List Container */}
        <div className="bg-white/[0.05] rounded-2xl p-5 backdrop-blur-[10px]">
          {filteredTracks.map((track) => (
            <div key={track.id} className="group">
              <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:bg-white/[0.08] hover:translate-x-1 mb-2 last:mb-0">
                {/* Album Art */}
                <div className="relative flex-shrink-0">
                  <Image 
                    src={track.coverUrl!} 
                    alt={track.title}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-lg object-cover shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  />
                  <button 
                    onClick={() => handlePlayPause(track)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#a8e6cf] to-[#98d6bf] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-[0_4px_12px_rgba(168,230,207,0.4)]">
                      {isPlaying && selectedTrack?.id === track.id ? 
                        <Pause className="w-5 h-5 text-white" /> : 
                        <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                      }
                    </div>
                  </button>
                </div>
                
                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1 truncate">{track.title}</h3>
                      <p className="text-sm text-gray-400 mb-1.5 truncate">{track.artist}</p>
                    </div>
                    {track.generationPrompt && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTrack(track);
                          setShowPrompt(true);
                        }}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors group/prompt"
                        title="生成プロンプトを表示"
                      >
                        <FileText className="w-4 h-4 text-gray-500 group-hover/prompt:text-[#a8e6cf]" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className={`px-2 py-1 rounded-xl text-xs font-medium ${getMoodColors(track.mood[0])}`}>
                      {track.mood[0]}
                    </span>
                    {track.featured && (
                      <span className={`px-2 py-1 rounded-xl text-xs font-medium ${getMoodColors('ethereal')}`}>
                        featured
                      </span>
                    )}
                    {track.generationPrompt && (
                      <span className="px-2 py-1 rounded-xl text-xs font-medium bg-purple-500/30 text-purple-200">
                        AI生成
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Duration & Play Button */}
                <div className="text-right mr-3 min-w-[40px]">
                  <span className="text-sm text-gray-400">{formatTime(track.duration)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Controls */}
        <div className="flex justify-between items-center mt-5 pt-5 border-t border-white/10">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-xs rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-[rgba(168,230,207,0.3)] border border-[#a8e6cf] text-white' 
                  : 'bg-white/[0.08] border border-white/20 text-gray-300 hover:bg-white/15'
              }`}
            >
              List
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-xs rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-[rgba(168,230,207,0.3)] border border-[#a8e6cf] text-white' 
                  : 'bg-white/[0.08] border border-white/20 text-gray-300 hover:bg-white/15'
              }`}
            >
              Grid
            </button>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white/[0.08] border border-white/20 rounded-lg text-gray-300 text-sm outline-none"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

        {selectedTrack && (
          <div className="max-w-2xl mx-auto text-center space-y-8 p-6">
            <div className="relative">
              <Image 
                src={selectedTrack.coverUrl!} 
                alt={selectedTrack.title}
                height={320}
                className="w-80 h-80 mx-auto rounded-2xl object-cover shadow-xl"
              />
            </div>
            
            {/* Track Info */}
            <div className="space-y-3">
              <h1 className="text-2xl font-medium">{selectedTrack.title}</h1>
              <p className="text-white/60">{selectedTrack.artist}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${getMoodColors(selectedTrack.mood[0])}`}>
                {selectedTrack.mood[0]}
              </span>
            </div>

            {/* Generation Prompt Section */}
            {selectedTrack.generationPrompt && (
              <div className="bg-white/5 rounded-xl p-4 text-left">
                <button 
                  onClick={() => setShowPrompt(!showPrompt)}
                  className="flex items-center gap-2 w-full text-left hover:text-[#a8e6cf] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">生成プロンプト</span>
                  {showPrompt ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
                </button>
                
                {showPrompt && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-2">メインプロンプト</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {selectedTrack.generationPrompt}
                      </p>
                    </div>
                    
                    {selectedTrack.promptDetails && (
                      <div className="grid grid-cols-1 gap-3">
                        {selectedTrack.promptDetails.style && (
                          <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-1">スタイル</h4>
                            <p className="text-sm text-gray-300">{selectedTrack.promptDetails.style}</p>
                          </div>
                        )}
                        {selectedTrack.promptDetails.mood && (
                          <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-1">ムード</h4>
                            <p className="text-sm text-gray-300">{selectedTrack.promptDetails.mood}</p>
                          </div>
                        )}
                        {selectedTrack.promptDetails.instruments && (
                          <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-1">楽器構成</h4>
                            <p className="text-sm text-gray-300">{selectedTrack.promptDetails.instruments}</p>
                          </div>
                        )}
                        {selectedTrack.promptDetails.description && (
                          <div className="bg-white/5 rounded-lg p-3">
                            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-1">説明</h4>
                            <p className="text-sm text-gray-300">{selectedTrack.promptDetails.description}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Simple Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 bg-primary hover:bg-primary-hover rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

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
