'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { PlayIcon, MagnifyingGlassIcon, SpeakerLoudIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ 
                background: [
                  "linear-gradient(135deg, #3b2f5f 0%, #4a3268 50%, #2d2d36 100%)",
                  "linear-gradient(135deg, #4a3268 0%, #3b2f5f 50%, #48485a 100%)",
                  "linear-gradient(135deg, #3b2f5f 0%, #4a3268 50%, #2d2d36 100%)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 mx-auto rounded-full mb-6 dreamy-glow"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-dream-purple/20 border-t-dream-purple"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-dream-purple via-dream-pink to-dream-blue bg-clip-text text-transparent">
              ShoegaZone
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-foreground-secondary mb-2"
          >
            シューゲイザー・オルタナティブロック特化音楽プラットフォーム
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-foreground-tertiary mb-12 max-w-2xl mx-auto"
          >
            Sunoで生成された夢幻的なシューゲイザーサウンドとオルタナティブロックの世界に浸ってください。
            <br />
            ジャンルに特化した深い音楽体験をお届けします。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-background px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <PlayIcon className="w-5 h-5" />
              音楽を聴く
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 glass-effect border border-border text-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-background-tertiary"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              楽曲を探す
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="py-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: SpeakerLoudIcon,
                title: "ジャンル特化",
                description: "シューゲイザーとオルタナティブロックに特化したキュレーション"
              },
              {
                icon: PlayIcon,
                title: "AI生成音楽",
                description: "Sunoで生成された高品質な楽曲を厳選してお届け"
              },
              {
                icon: MagnifyingGlassIcon,
                title: "深い発見",
                description: "ムードや特徴でフィルタリングして理想の楽曲を発見"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-effect p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:dreamy-glow transition-all duration-300"
                >
                  <feature.icon className="w-6 h-6 text-background" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coming Soon Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="py-20 text-center"
        >
          <motion.div
            animate={{ float: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-effect p-12 rounded-3xl border border-border max-w-2xl mx-auto"
          >
            <div className="text-4xl mb-6">🎵</div>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              まもなく開始
            </h2>
            <p className="text-foreground-secondary">
              現在、最高の音楽体験をお届けするため開発中です。
              <br />
              シューゲイザーの夢幻的な世界をお楽しみに。
            </p>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
