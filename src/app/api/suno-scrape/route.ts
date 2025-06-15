import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export interface ScrapedSunoTrack {
  id: string;
  title: string;
  user_display_name: string;
  audio_url: string;
  image_url: string;
  created_at: string;
  play_count: number;
  tags: string;
  duration: number;
  is_public: boolean;
}

async function scrapeSunoExplore(): Promise<ScrapedSunoTrack[]> {
  console.log('🕷️ Starting Suno scraping process...');
  
  try {
    console.log('📡 Fetching Suno explore page...');
    const response = await fetch('https://suno.com/explore', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    console.log(`📊 Response status: ${response.status} ${response.statusText}`);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error(`❌ HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`📄 HTML received, length: ${html.length} characters`);
    console.log('🔍 HTML preview (first 500 chars):', html.substring(0, 500));

    const $ = cheerio.load(html);
    const tracks: ScrapedSunoTrack[] = [];

    console.log('🎯 Looking for script tags...');
    const scriptTags = $('script');
    console.log(`📜 Found ${scriptTags.length} script tags`);

    // script タグ内のJSONデータを探す
    $('script').each((index, element) => {
      const scriptContent = $(element).html();
      if (scriptContent) {
        console.log(`📜 Script ${index} length: ${scriptContent.length}`);
        
        if (scriptContent.includes('window.__INITIAL_STATE__')) {
          console.log('🎯 Found window.__INITIAL_STATE__ in script tag!');
          try {
            // JavaScriptの初期状態からデータを抽出
            const jsonMatch = scriptContent.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/);
            if (jsonMatch) {
              console.log('✅ JSON match found in __INITIAL_STATE__');
              const initialState = JSON.parse(jsonMatch[1]);
              console.log('🗂️ Initial state keys:', Object.keys(initialState));
              
              // 楽曲データを抽出（構造はSunoの実装に依存）
              if (initialState.explore && initialState.explore.tracks) {
                console.log(`🎵 Found ${initialState.explore.tracks.length} tracks in explore data`);
                initialState.explore.tracks.forEach((track: Record<string, unknown>, trackIndex: number) => {
                  console.log(`🎵 Processing track ${trackIndex}:`, track);
                  if (track && track.id) {
                    tracks.push({
                      id: String(track.id),
                      title: String(track.title) || 'Unknown Title',
                      user_display_name: String(track.display_name || track.username) || 'Unknown Artist',
                      audio_url: String(track.audio_url || ''),
                      image_url: String(track.image_url || track.image_large_url || ''),
                      created_at: String(track.created_at) || new Date().toISOString(),
                      play_count: Number(track.play_count) || 0,
                      tags: String(track.tags || track.gpt_description_prompt || ''),
                      duration: Number(track.duration) || 0,
                      is_public: track.is_public !== false
                    });
                  }
                });
              } else {
                console.log('❌ No explore.tracks found in initial state');
                console.log('🗂️ Available paths in initialState:', JSON.stringify(initialState, null, 2).substring(0, 1000));
              }
            } else {
              console.log('❌ No JSON match found in __INITIAL_STATE__ script');
            }
          } catch (e) {
            console.error('❌ JSON parsing error:', e);
          }
        } else if (scriptContent.includes('tracks') || scriptContent.includes('music') || scriptContent.includes('song')) {
          console.log(`🎵 Found potential music-related script ${index} (${scriptContent.length} chars)`);
          console.log('🔍 Script preview:', scriptContent.substring(0, 200));
        }
      }
    });

    console.log(`🎵 Extracted ${tracks.length} tracks from scripts`);

    // フォールバック: HTMLから直接抽出を試行
    if (tracks.length === 0) {
      console.log('🔄 Attempting HTML fallback extraction...');
      
      // より広範囲のセレクタを試行
      const selectors = [
        '[data-testid*="track"]',
        '[class*="track"]', 
        '.song-item', 
        '.music-item',
        '[data-track]',
        '.playlist-item',
        '.song',
        '.track'
      ];
      
      selectors.forEach((selector, index) => {
        const elements = $(selector);
        console.log(`🎯 Selector "${selector}" found ${elements.length} elements`);
        
        elements.each((_, element) => {
          const $el = $(element);
          console.log(`🔍 Element ${index} HTML:`, $el.html()?.substring(0, 200));
          
          // タイトルを抽出
          const title = $el.find('h3, .title, [data-testid*="title"], .song-title').text().trim() ||
                       $el.attr('data-title') || 'Unknown Title';
          
          // アーティスト名を抽出
          const artist = $el.find('.artist, .username, [data-testid*="artist"], .song-artist').text().trim() ||
                        $el.attr('data-artist') || 'Unknown Artist';
          
          // 画像URLを抽出
          const imageUrl = $el.find('img').attr('src') || 
                          $el.find('[style*="background-image"]').css('background-image')?.match(/url\(["']?(.*?)["']?\)/)?.[1] ||
                          '';
          
          console.log(`🎵 Extracted: title="${title}", artist="${artist}", image="${imageUrl}"`);
          
          if (title && title !== 'Unknown Title' && title.length > 3) {
            tracks.push({
              id: `scraped-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title,
              user_display_name: artist,
              audio_url: '',
              image_url: imageUrl,
              created_at: new Date().toISOString(),
              play_count: Math.floor(Math.random() * 1000),
              tags: 'scraped, music',
              duration: 180 + Math.floor(Math.random() * 120),
              is_public: true
            });
          }
        });
      });
    }

    console.log(`✅ Scraping completed: ${tracks.length} tracks extracted`);
    return tracks;
  } catch (error) {
    console.error('❌ Scraping error:', error);
    throw error;
  }
}

// モックデータを生成する関数
function generateMockTracks(): ScrapedSunoTrack[] {
  const mockTracks: ScrapedSunoTrack[] = [
    {
      id: 'mock-1',
      title: 'Ethereal Dreamscape',
      user_display_name: 'ShoegaZone AI',
      audio_url: '',
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      created_at: new Date().toISOString(),
      play_count: 1247,
      tags: 'shoegaze, dreamy, ethereal, atmospheric',
      duration: 245,
      is_public: true
    },
    {
      id: 'mock-2',
      title: 'Velvet Noise Wall',
      user_display_name: 'Alternative AI',
      audio_url: '',
      image_url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=300&h=300&fit=crop',
      created_at: new Date().toISOString(),
      play_count: 892,
      tags: 'alternative, noise rock, distorted, grunge',
      duration: 198,
      is_public: true
    },
    {
      id: 'mock-3',
      title: 'Starlight Cascade',
      user_display_name: 'Dream Pop Creator',
      audio_url: '',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      created_at: new Date().toISOString(),
      play_count: 1456,
      tags: 'dream pop, uplifting, celestial, ambient',
      duration: 267,
      is_public: true
    },
    {
      id: 'mock-4',
      title: 'Lost in Reverb',
      user_display_name: 'Sonic Landscape',
      audio_url: '',
      image_url: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=300&h=300&fit=crop',
      created_at: new Date().toISOString(),
      play_count: 743,
      tags: 'shoegaze, melancholic, reverb, wall of sound',
      duration: 312,
      is_public: true
    },
    {
      id: 'mock-5',
      title: 'Glittering Haze',
      user_display_name: 'Atmospheric Collective',
      audio_url: '',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      created_at: new Date().toISOString(),
      play_count: 234,
      tags: 'ethereal, ambient, shoegaze, dreamy',
      duration: 223,
      is_public: true
    }
  ];

  return mockTracks;
}

export async function GET() {
  console.log('🚀 API /api/suno-scrape called');
  
  try {
    // まずスクレイピングを試行
    let tracks: ScrapedSunoTrack[] = [];
    let scrapingError: string | null = null;
    
    try {
      console.log('🕷️ Attempting to scrape Suno...');
      tracks = await scrapeSunoExplore();
      console.log(`✅ Successfully scraped ${tracks.length} tracks from Suno`);
    } catch (error) {
      console.error('❌ Scraping failed:', error);
      scrapingError = error instanceof Error ? error.message : 'Unknown scraping error';
      console.log('🔄 Falling back to mock data due to scraping failure');
      tracks = generateMockTracks();
    }

    // スクレイピングが成功しなかった場合はモックデータを使用
    if (tracks.length === 0) {
      console.log('⚠️ No tracks found from scraping, using mock data');
      tracks = generateMockTracks();
      scrapingError = scrapingError || 'No tracks found in scraped content';
    }

    console.log(`📊 Total tracks before filtering: ${tracks.length}`);

    // ショーゲイズ・オルタナティブ系楽曲をフィルタリング
    const filteredTracks = tracks.filter(track => {
      const tags = track.tags.toLowerCase();
      const title = track.title.toLowerCase();
      
      const shoegazeKeywords = ['shoegaze', 'dreamy', 'ethereal', 'reverb', 'atmospheric', 'wall of sound'];
      const alternativeKeywords = ['alternative', 'indie rock', 'grunge', 'post-punk', 'noise rock', 'dream pop'];
      
      const isMatch = shoegazeKeywords.some(keyword => tags.includes(keyword) || title.includes(keyword)) ||
                     alternativeKeywords.some(keyword => tags.includes(keyword) || title.includes(keyword));
      
      if (isMatch) {
        console.log(`🎯 Track "${track.title}" matches genre filter`);
      }
      
      return isMatch;
    });

    console.log(`🎵 Filtered tracks: ${filteredTracks.length}`);

    const result = {
      tracks: filteredTracks.length > 0 ? filteredTracks : tracks,
      scrapedCount: tracks.length,
      filteredCount: filteredTracks.length,
      timestamp: new Date().toISOString(),
      scrapingError,
      debug: {
        usedMockData: scrapingError !== null,
        totalTracksFound: tracks.length,
        filteredTracksFound: filteredTracks.length
      }
    };

    console.log('📤 Returning API response:', {
      tracksCount: result.tracks.length,
      scrapedCount: result.scrapedCount,
      filteredCount: result.filteredCount,
      hasError: !!result.scrapingError
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('💥 API error:', error);
    
    // エラー時はモックデータを返す
    const mockTracks = generateMockTracks();
    
    const errorResult = {
      tracks: mockTracks,
      scrapedCount: 0,
      filteredCount: mockTracks.length,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown API error',
      debug: {
        usedMockData: true,
        totalTracksFound: 0,
        filteredTracksFound: 0,
        errorType: 'API_ERROR'
      }
    };

    console.log('📤 Returning error response with mock data:', errorResult);
    
    return NextResponse.json(errorResult);
  }
}