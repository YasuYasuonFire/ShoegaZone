// Core data types for ShoegaZone
export interface ShoegazeTrack {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  audioUrl: string;
  coverImageUrl?: string;
  coverUrl?: string; // Add this for backward compatibility
  sunoId: string;
  
  // ジャンル特化フィールド
  subGenre: 'shoegaze' | 'alternative' | 'dream-pop' | 'noise-rock';
  mood: Array<'dreamy' | 'melancholic' | 'ethereal' | 'distorted' | 'uplifting'>;
  bpm?: number;
  characteristics: string[]; // ['reverb-heavy', 'layered-guitars', 'soft-vocals']
  
  // プロンプト関連フィールド
  generationPrompt?: string; // 楽曲生成時に使用したプロンプト
  promptDetails?: {
    style?: string;
    mood?: string;
    instruments?: string;
    lyrics?: string;
    description?: string;
  };
  
  createdAt: Date;
  playCount: number;
  featured: boolean; // キュレーション用
}

export interface Playlist {
  id: string;
  name: string;
  tracks: ShoegazeTrack[];
  currentIndex: number;
  isShuffled: boolean;
  isRepeating: boolean;
}

export interface PlayerState {
  currentTrack: ShoegazeTrack | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Playlist | null;
}

// UI Component props
export interface TrackCardProps {
  track: ShoegazeTrack;
  onPlay: (track: ShoegazeTrack) => void;
  isCurrentTrack?: boolean;
  isPlaying?: boolean;
}

export interface PlayerControlsProps {
  playerState: PlayerState;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  mood?: ShoegazeTrack['mood'][0];
  subGenre?: ShoegazeTrack['subGenre'];
  bpmRange?: [number, number];
}

export interface SortOptions {
  field: 'createdAt' | 'playCount' | 'title' | 'random';
  direction: 'asc' | 'desc';
}

// API types
export interface ShoegazeApiClient {
  searchTracks(filters: SearchFilters & { limit?: number }): Promise<ShoegazeTrack[]>;
  getTracksByGenre(genres: string[]): Promise<ShoegazeTrack[]>;
  getFeaturedTracks(): Promise<ShoegazeTrack[]>;
  getRandomTracks(limit?: number): Promise<ShoegazeTrack[]>;
}

// Mood and genre constants
export const MOOD_CATEGORIES = {
  dreamy: 'Dreamy & Ethereal',
  melancholic: 'Melancholic & Introspective', 
  uplifting: 'Uplifting & Energetic',
  ethereal: 'Ethereal & Atmospheric',
  distorted: 'Distorted & Raw'
} as const;

export const SUBGENRE_LABELS = {
  'shoegaze': 'Shoegaze',
  'alternative': 'Alternative Rock',
  'dream-pop': 'Dream Pop',
  'noise-rock': 'Noise Rock'
} as const;

export const SHOEGAZE_KEYWORDS = [
  'shoegaze', 'dreamy', 'ethereal', 'reverb', 'distortion',
  'layered guitars', 'atmospheric', 'ambient', 'wall of sound',
  'my bloody valentine', 'slowdive', 'ride'
] as const;

export const ALTERNATIVE_KEYWORDS = [
  'alternative', 'indie rock', 'noise rock', 'grunge',
  'post-punk', '90s alternative', 'underground',
  'nirvana', 'sonic youth', 'pixies'
] as const;