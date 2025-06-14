import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ShoegazeTrack, PlayerState, Playlist } from '@/types';
import { shuffleArray } from '@/lib/utils';

interface PlayerStore extends PlayerState {
  // Actions
  setCurrentTrack: (track: ShoegazeTrack | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlaylist: (playlist: Playlist | null) => void;
  
  // Player controls
  playTrack: (track: ShoegazeTrack) => void;
  pauseTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  
  // Playlist controls
  createPlaylistFromTracks: (tracks: ShoegazeTrack[], startIndex?: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  
  // Queue management
  addToQueue: (track: ShoegazeTrack) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentTrack: null,
      isPlaying: false,
      volume: 0.8,
      currentTime: 0,
      duration: 0,
      playlist: null,

      // Basic setters
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setPlaylist: (playlist) => set({ playlist }),

      // Player controls
      playTrack: (track) => {
        const { playlist } = get();
        
        // If track is not in current playlist, create new playlist
        if (!playlist || !playlist.tracks.find(t => t.id === track.id)) {
          set({
            currentTrack: track,
            isPlaying: true,
            playlist: {
              id: `single-${track.id}`,
              name: `Playing: ${track.title}`,
              tracks: [track],
              currentIndex: 0,
              isShuffled: false,
              isRepeating: false
            }
          });
        } else {
          // Find track in current playlist
          const trackIndex = playlist.tracks.findIndex(t => t.id === track.id);
          set({
            currentTrack: track,
            isPlaying: true,
            playlist: {
              ...playlist,
              currentIndex: trackIndex
            }
          });
        }
      },

      pauseTrack: () => set({ isPlaying: false }),

      nextTrack: () => {
        const { playlist } = get();
        if (!playlist || playlist.tracks.length === 0) return;

        let nextIndex = playlist.currentIndex + 1;
        
        // Handle repeat and end of playlist
        if (nextIndex >= playlist.tracks.length) {
          if (playlist.isRepeating) {
            nextIndex = 0;
          } else {
            // End of playlist
            set({ isPlaying: false });
            return;
          }
        }

        const nextTrack = playlist.tracks[nextIndex];
        set({
          currentTrack: nextTrack,
          playlist: {
            ...playlist,
            currentIndex: nextIndex
          }
        });
      },

      previousTrack: () => {
        const { playlist, currentTime } = get();
        if (!playlist || playlist.tracks.length === 0) return;

        // If more than 3 seconds played, restart current track
        if (currentTime > 3) {
          set({ currentTime: 0 });
          return;
        }

        let prevIndex = playlist.currentIndex - 1;
        
        // Handle beginning of playlist
        if (prevIndex < 0) {
          if (playlist.isRepeating) {
            prevIndex = playlist.tracks.length - 1;
          } else {
            prevIndex = 0;
          }
        }

        const prevTrack = playlist.tracks[prevIndex];
        set({
          currentTrack: prevTrack,
          playlist: {
            ...playlist,
            currentIndex: prevIndex
          }
        });
      },

      seekTo: (time) => {
        const { duration } = get();
        const clampedTime = Math.max(0, Math.min(time, duration));
        set({ currentTime: clampedTime });
      },

      // Playlist controls
      createPlaylistFromTracks: (tracks, startIndex = 0) => {
        if (tracks.length === 0) return;

        const playlist: Playlist = {
          id: `playlist-${Date.now()}`,
          name: 'Current Queue',
          tracks,
          currentIndex: Math.max(0, Math.min(startIndex, tracks.length - 1)),
          isShuffled: false,
          isRepeating: false
        };

        set({
          playlist,
          currentTrack: tracks[playlist.currentIndex],
          isPlaying: true
        });
      },

      toggleShuffle: () => {
        const { playlist, currentTrack } = get();
        if (!playlist) return;

        const newShuffled = !playlist.isShuffled;
        let newTracks = [...playlist.tracks];
        let newCurrentIndex = 0;

        if (newShuffled) {
          // Shuffle tracks, keeping current track at index 0
          const otherTracks = newTracks.filter(t => t.id !== currentTrack?.id);
          const shuffledOthers = shuffleArray(otherTracks);
          newTracks = currentTrack ? [currentTrack, ...shuffledOthers] : shuffledOthers;
          newCurrentIndex = 0;
        } else {
          // Restore original order
          newTracks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          newCurrentIndex = currentTrack ? newTracks.findIndex(t => t.id === currentTrack.id) : 0;
        }

        set({
          playlist: {
            ...playlist,
            tracks: newTracks,
            currentIndex: Math.max(0, newCurrentIndex),
            isShuffled: newShuffled
          }
        });
      },

      toggleRepeat: () => {
        const { playlist } = get();
        if (!playlist) return;

        set({
          playlist: {
            ...playlist,
            isRepeating: !playlist.isRepeating
          }
        });
      },

      // Queue management
      addToQueue: (track) => {
        const { playlist } = get();
        
        if (!playlist) {
          // Create new playlist with this track
          get().createPlaylistFromTracks([track]);
          return;
        }

        // Add to end of current playlist
        set({
          playlist: {
            ...playlist,
            tracks: [...playlist.tracks, track]
          }
        });
      },

      removeFromQueue: (trackId) => {
        const { playlist, currentTrack } = get();
        if (!playlist) return;

        const newTracks = playlist.tracks.filter(t => t.id !== trackId);
        let newCurrentIndex = playlist.currentIndex;

        // Adjust current index if needed
        const removedIndex = playlist.tracks.findIndex(t => t.id === trackId);
        if (removedIndex <= playlist.currentIndex && playlist.currentIndex > 0) {
          newCurrentIndex = playlist.currentIndex - 1;
        }

        // If removing current track, move to next
        if (currentTrack?.id === trackId) {
          const nextTrack = newTracks[newCurrentIndex] || newTracks[0] || null;
          set({
            currentTrack: nextTrack,
            playlist: {
              ...playlist,
              tracks: newTracks,
              currentIndex: nextTrack ? Math.max(0, newCurrentIndex) : 0
            }
          });
        } else {
          set({
            playlist: {
              ...playlist,
              tracks: newTracks,
              currentIndex: newCurrentIndex
            }
          });
        }
      },

      clearQueue: () => {
        set({
          playlist: null,
          currentTrack: null,
          isPlaying: false,
          currentTime: 0,
          duration: 0
        });
      }
    }),
    {
      name: 'player-store'
    }
  )
);