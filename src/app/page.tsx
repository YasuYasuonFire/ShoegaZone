'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { sunoApi, SunoTrack } from '@/lib/suno-api';

export default function Home() {
  const [scrapedTracks, setScrapedTracks] = useState<SunoTrack[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log('🚀 Page: Loading scraped tracks...');
    setLoading(true);
    
    sunoApi.fetchScrapedTracks()
      .then(tracks => {
        console.log(`📦 Page: Received ${tracks.length} tracks`);
        setScrapedTracks(tracks);
        setLoading(false);
      })
      .catch(error => {
        console.error('💥 Page: Error loading tracks:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ShoegaZone
              </div>
              <div className="text-xs text-purple-300 font-light">shoegaze・alternative</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <div className="px-4 py-2 rounded-full bg-white/10 text-white">
                ホーム
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-light mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            夢の中の音楽
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            AIが織りなすシューゲイザー・オルタナティブサウンドの世界へ
          </p>
        </section>

        {/* Scraped Tracks Section */}
        <section>
          <h2 className="text-2xl font-light mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sunoから取得した楽曲
            </span>
            <div className="ml-3 w-12 h-px bg-gradient-to-r from-purple-400 to-transparent"></div>
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4 p-4 rounded-xl bg-white/5">
                  <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-2/3 mb-1"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scrapedTracks.map((track, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="relative">
                      {track.image_url ? (
                        <Image 
                          src={track.image_url} 
                          alt={track.title} 
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg opacity-80" 
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white/60" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-white/60 text-sm truncate">{track.user_display_name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {track.tags && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-purple-400/20 text-purple-300">
                            {track.tags.split(',')[0]?.trim()}
                          </span>
                        )}
                        <span className="text-xs text-white/40">
                          {track.play_count} plays
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-white/40">
                      {Math.floor(track.duration || 0 / 60)}:{String((track.duration || 0) % 60).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && scrapedTracks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-white/40 mb-4">楽曲が見つかりませんでした</div>
              <p className="text-sm text-white/60">
                Sunoサイトからの取得に失敗しました。しばらく時間をおいてお試しください。
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}