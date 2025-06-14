'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, HomeIcon, SpeakerLoudIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'ホーム', href: '/', icon: HomeIcon },
  { name: '検索', href: '/search', icon: MagnifyingGlassIcon },
  { name: '再生中', href: '/now-playing', icon: SpeakerLoudIcon },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dream-purple to-dream-pink dreamy-glow" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-8 h-8 rounded-full border-2 border-dream-blue/30 border-t-dream-blue"
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.h1
              className="text-xl font-display font-semibold text-foreground group-hover:text-dream-purple transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              ShoegaZone
            </motion.h1>
            <span className="text-xs text-foreground-tertiary -mt-1">
              シューゲイザー・オルタナティブ
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30 dreamy-glow"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background-tertiary"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background-tertiary"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}