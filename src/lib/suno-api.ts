export interface SunoTrack {
  id: string;
  title: string;
  user_display_name?: string;
  audio_url: string;
  image_url?: string;
  created_at: string;
  play_count?: number;
  tags?: string;
  duration?: number;
  is_public?: boolean;
}

interface SunoScrapeResponse {
  tracks: SunoTrack[];
  scrapedCount: number;
  filteredCount: number;
  timestamp: string;
  error?: string;
  scrapingError?: string;
  debug?: {
    usedMockData: boolean;
    totalTracksFound: number;
    filteredTracksFound: number;
    errorType?: string;
  };
}

export class SunoApiClient {
  // Suno公式サイトスクレイピングAPIを叩く新メソッド
  async fetchScrapedTracks(): Promise<SunoTrack[]> {
    console.log('🔄 SunoApiClient: fetchScrapedTracks called');
    
    try {
      console.log('📡 Fetching from /api/suno-scrape...');
      const res = await fetch('/api/suno-scrape');
      
      console.log(`📊 Response status: ${res.status} ${res.statusText}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch scraped tracks: ${res.status} ${res.statusText}`);
      }
      
      const data: SunoScrapeResponse = await res.json();
      
      console.log('📦 Received data:', {
        tracksCount: data.tracks?.length || 0,
        scrapedCount: data.scrapedCount,
        filteredCount: data.filteredCount,
        hasError: !!data.error,
        hasScrapingError: !!data.scrapingError,
        debug: data.debug
      });
      
      console.log(`✅ スクレイピング結果: ${data.scrapedCount}件取得, ${data.filteredCount}件フィルタ済み`);
      
      if (data.error) {
        console.warn('⚠️ APIエラー:', data.error);
      }
      
      if (data.scrapingError) {
        console.warn('⚠️ スクレイピングエラー:', data.scrapingError);
      }
      
      if (data.debug?.usedMockData) {
        console.log('🎭 モックデータを使用中');
      }
      
      return data.tracks || [];
    } catch (e) {
      console.error('💥 スクレイピングAPI呼び出し失敗:', e);
      console.log('🔄 フォールバックデータを使用');
      return this.getFallbackTracks();
    }
  }

  // フォールバック用のモックデータ
  private getFallbackTracks(): SunoTrack[] {
    return [
      {
        id: 'fallback-1',
        title: 'Ethereal Waves',
        user_display_name: 'ShoegaZone AI',
        audio_url: '',
        image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        created_at: new Date().toISOString(),
        play_count: 1247,
        tags: 'shoegaze, dreamy, ethereal',
        duration: 245,
        is_public: true
      },
      {
        id: 'fallback-2',
        title: 'Distorted Dreams',
        user_display_name: 'Alternative Collective',
        audio_url: '',
        image_url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=300&fit=crop',
        created_at: new Date().toISOString(),
        play_count: 892,
        tags: 'alternative, noise rock, distorted',
        duration: 198,
        is_public: true
      }
    ];
  }

  // ジャンル別検索（スクレイピング版）
  async searchByGenre(genre: string): Promise<SunoTrack[]> {
    const allTracks = await this.fetchScrapedTracks();
    
    // ジャンルでフィルタリング
    const filteredTracks = allTracks.filter(track => {
      const tags = track.tags?.toLowerCase() || '';
      const title = track.title.toLowerCase();
      
      const genreKeywords = {
        shoegaze: ['shoegaze', 'dreamy', 'ethereal', 'reverb', 'atmospheric'],
        alternative: ['alternative', 'indie rock', 'grunge', 'post-punk', 'noise rock'],
        'dream-pop': ['dream pop', 'dreampop', 'ambient', 'celestial'],
        'noise-rock': ['noise rock', 'experimental', 'harsh', 'distorted']
      };
      
      const keywords = genreKeywords[genre as keyof typeof genreKeywords] || [genre];
      return keywords.some(keyword => tags.includes(keyword) || title.includes(keyword));
    });
    
    return filteredTracks.length > 0 ? filteredTracks : allTracks.slice(0, 8);
  }
}

export const sunoApi = new SunoApiClient();