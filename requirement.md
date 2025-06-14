# ShoegaZone - シューゲイザー・オルタナティブロック特化音楽アプリ要件定義書

## 1. プロジェクト概要

### 1.1 プロジェクト名
**ShoegaZone** - シューゲイザー・オルタナティブロック特化音楽プラットフォーム

### 1.2 目的
Sunoで生成されたシューゲイザー・オルタナティブロック楽曲に特化した音楽発見・再生アプリケーションを開発する。ジャンルに特化することで、ターゲットユーザーに深く刺さる体験を提供し、ニッチな音楽コミュニティを形成する。

### 1.3 スコープ
- シューゲイザー・オルタナティブロック楽曲の発見・表示・再生
- ジャンル特化のキュレーション機能
- シンプルで直感的なユーザーインターフェース
- 音楽的な雰囲気を重視したビジュアルデザイン

### 1.4 ターゲットユーザー
- シューゲイザー、オルタナティブロックファン
- 新しい音楽を発見したいリスナー
- AIで生成された音楽に興味があるユーザー
- ニッチな音楽ジャンルを愛好する音楽愛好家

## 2. 技術調査結果

### 2.1 Suno API状況
- **公式API**: 現時点で公式のSuno APIは提供されていない
- **非公式API**: GitHubに非公式のsuno-api（gcui-art/suno-api）が存在
- **認証**: Cookie認証によるアクセス（ブラウザのCookieを使用）
- **サードパーティAPI**: API.boxなどのプロキシサービスが存在

### 2.2 ジャンル特化の課題と対策
- **ジャンル判定**: Sunoの楽曲からシューゲイザー・オルタナティブを識別
- **キーワード検索**: 楽曲タイトル、説明、タグでのフィルタリング
- **手動キュレーション**: 初期段階での楽曲選定とタグ付け

## 3. 機能要件

### 3.1 コア機能

#### 3.1.1 楽曲発見・表示機能
- **ジャンル特化楽曲一覧**
  - シューゲイザー・オルタナティブロック楽曲のみ表示
  - アルバムアート風のグリッド表示
  - 楽曲の雰囲気に合わせたビジュアル表現
  
- **楽曲詳細表示**
  - 楽曲メタデータ（タイトル、生成プロンプト、作成日時）
  - ジャンルタグ表示（Shoegaze, Alternative, Dream Pop等）
  - 音の特徴表示（Dreamy, Ethereal, Distorted等）

- **キュレーション機能**
  - "今日のピック" - 厳選された楽曲
  - "最近追加された楽曲"
  - "人気の楽曲"（再生数ベース）

#### 3.1.2 音楽再生機能
- **シンプルな音楽プレイヤー**
  - 基本的な再生/一時停止
  - シークバーと音量調整
  - 現在再生中の楽曲情報表示
  
- **再生リスト機能**
  - 自動的な次の楽曲再生
  - ランダム再生モード
  - リピート機能

#### 3.1.3 検索・フィルタリング
- **ジャンル内検索**
  - 楽曲タイトル検索
  - ムード検索（dreamy, melancholic, uplifting等）
  - BPM範囲指定
  
- **ソート機能**
  - 新着順
  - 人気順
  - ランダム

### 3.2 UI/UX要件

#### 3.2.1 デザインコンセプト
- **ジャンル特化デザイン**: シューゲイザーの夢幻的・幻想的な雰囲気
- **カラーパレット**: 
  - ダークベース: 深い紫、インディゴ、グレー
  - アクセント: ソフトピンク、ペールブルー、ウォームホワイト
- **視覚効果**: 
  - ガラスモーフィズム
  - グラデーション背景
  - ソフトブラー効果
  - サブトルなアニメーション

#### 3.2.2 レスポンシブデザイン
- モバイルファースト設計
- タブレット・デスクトップ対応
- ブレークポイント: 320px, 768px, 1024px

#### 3.2.3 ユーザビリティ
- **シンプルなナビゲーション**
  - ホーム
  - 検索
  - 再生中
- **直感的な操作**
  - ワンクリック再生
  - スワイプジェスチャー（モバイル）
  - キーボードショートカット

## 4. 非機能要件

### 4.1 パフォーマンス
- 初期ページロード時間: 2秒以内
- 楽曲再生開始: 1秒以内
- 画像最適化（WebP、AVIF対応）
- プリロード機能

### 4.2 互換性
- **ブラウザ対応**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)
- モバイルブラウザ対応

## 5. 技術仕様

### 5.1 フロントエンド技術スタック
- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + Framer Motion
- **状態管理**: Zustand（シンプルな状態管理）
- **音声ライブラリ**: Howler.js
- **UI コンポーネント**: Radix UI + shadcn/ui

### 5.2 バックエンド技術スタック（最小構成）
- **API**: Next.js API Routes
- **言語**: TypeScript
- **データ**: ローカルストレージ + Suno API連携
- **キャッシュ**: Redis（オプション）

### 5.3 インフラ・デプロイ
- **ホスティング**: Vercel
- **CDN**: Vercel Edge Network
- **監視**: Vercel Analytics

## 6. データ構造

### 6.1 楽曲データ型
```typescript
interface ShoegazeTrack {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  audioUrl: string;
  coverImageUrl?: string;
  sunoId: string;
  
  // ジャンル特化フィールド
  subGenre: 'shoegaze' | 'alternative' | 'dream-pop' | 'noise-rock';
  mood: Array<'dreamy' | 'melancholic' | 'ethereal' | 'distorted' | 'uplifting'>;
  bpm?: number;
  characteristics: string[]; // ['reverb-heavy', 'layered-guitars', 'soft-vocals']
  
  createdAt: Date;
  playCount: number;
  featured: boolean; // キュレーション用
}
```

### 6.2 プレイリストデータ型
```typescript
interface Playlist {
  id: string;
  name: string;
  tracks: ShoegazeTrack[];
  currentIndex: number;
  isShuffled: boolean;
  isRepeating: boolean;
}
```

### 6.3 プレイヤー状態型
```typescript
interface PlayerState {
  currentTrack: ShoegazeTrack | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Playlist | null;
}
```

## 7. API設計

### 7.1 Next.js API Routes
```
GET /api/tracks - ジャンル特化楽曲一覧取得
GET /api/tracks/featured - 今日のピック楽曲
GET /api/tracks/search?q={query}&mood={mood} - 楽曲検索
GET /api/tracks/random - ランダム楽曲取得
```

### 7.2 Suno API統合
```typescript
interface ShoegazeApiClient {
  searchTracks(query: {
    keywords: string[];
    limit?: number;
  }): Promise<ShoegazeTrack[]>;
  
  getTracksByGenre(genre: string[]): Promise<ShoegazeTrack[]>;
  
  getFeaturedTracks(): Promise<ShoegazeTrack[]>;
}
```

## 8. ジャンル特化仕様

### 8.1 楽曲キュレーション基準
- **シューゲイザー特徴**:
  - リバーブ/ディストーション重用
  - 重層的なギターサウンド
  - 夢幻的・幻想的な雰囲気
  
- **オルタナティブロック特徴**:
  - 非商業的・実験的サウンド
  - インディペンデントな音楽性
  - 90年代オルタナの要素

### 8.2 キーワード分類
```typescript
const SHOEGAZE_KEYWORDS = [
  'shoegaze', 'dreamy', 'ethereal', 'reverb', 'distortion',
  'layered guitars', 'atmospheric', 'ambient', 'wall of sound',
  'my bloody valentine', 'slowdive', 'ride'
];

const ALTERNATIVE_KEYWORDS = [
  'alternative', 'indie rock', 'noise rock', 'grunge',
  'post-punk', '90s alternative', 'underground',
  'nirvana', 'sonic youth', 'pixies'
];
```

### 8.3 ムード分類
```typescript
const MOOD_CATEGORIES = {
  dreamy: 'Dreamy & Ethereal',
  melancholic: 'Melancholic & Introspective', 
  uplifting: 'Uplifting & Energetic',
  dark: 'Dark & Brooding',
  nostalgic: 'Nostalgic & Wistful'
};
```

## 9. ユーザーストーリー

### 9.1 シューゲイザーファン
- 新しいシューゲイザー楽曲を発見したい
- 気分に合わせた楽曲を見つけたい
- お気に入りの楽曲をすぐに再生したい
- 似たような雰囲気の楽曲を連続再生したい

### 9.2 オルタナティブロックファン
- 90年代的なオルタナサウンドを探したい
- 実験的な楽曲を発見したい
- ランダムに楽曲を聴いて新しい発見をしたい

### 9.3 AI音楽愛好家
- AIが生成したクオリティの高いロック楽曲を聴きたい
- ジャンル特化のキュレーションを体験したい

## 10. 制約事項・リスク

### 10.1 技術的制約
- **ジャンル判定の精度**: Sunoの楽曲から正確にジャンルを識別する難しさ
- **楽曲数の限界**: 特化ジャンルのため楽曲数が限定される可能性
- **API依存**: 非公式APIの制限

### 10.2 運用上の課題
- **コンテンツ品質**: ジャンルに合わない楽曲の混入
- **楽曲の継続的な更新**: 新しいジャンル適合楽曲の継続的な発見
- **ユーザー期待**: ジャンル特化への高い期待値

## 11. 開発フェーズ

### Phase 1: 基本機能実装 (Week 1-2)
- プロジェクトセットアップ
- ジャンル特化UI/UX実装
- 基本的な楽曲表示・再生機能
- ダミーデータでのプロトタイプ

### Phase 2: Suno API統合 (Week 3)
- Suno API連携
- ジャンル特化検索・フィルタリング
- 楽曲キュレーション機能

### Phase 3: 機能強化・最適化 (Week 4)
- プレイリスト機能
- パフォーマンス最適化
- モバイル対応強化

## 12. 成功指標

### 12.1 技術指標
- ページロード時間 < 2秒
- 楽曲再生開始 < 1秒
- モバイル表示の最適化

### 12.2 ユーザー指標
- セッション継続時間
- 楽曲完全再生率
- リピート訪問率
- ジャンル適合度（ユーザーフィードバック）

## 13. 今後の展望

### 13.1 機能拡張
- **ジャンル拡張**: Post-rock、Math rock等の関連ジャンル
- **ソーシャル機能**: お気に入り共有、コメント機能
- **レコメンデーション**: 類似楽曲推薦機能
- **プレイリスト生成**: ムードベースの自動プレイリスト

### 13.2 コミュニティ機能
- ジャンル愛好家によるキュレーション
- 楽曲レビュー・評価システム
- アーティスト情報・背景ストーリー

---

**シンプル性重視**: このアプリケーションは複雑な機能よりも、ジャンル特化の深い体験とシンプルな使いやすさを重視します。ユーザーが音楽に集中できる環境を提供することが最優先目標です。