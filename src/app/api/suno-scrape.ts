import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://suno.ai/feed', { waitUntil: 'networkidle2' });

    // 楽曲情報をページから抽出
    const tracks = await page.evaluate(() => {
      // サイトの構造に応じて適宜修正
      const items = Array.from(document.querySelectorAll('[data-testid="TrackCard"]'));
      return items.map(item => {
        const title = item.querySelector('[data-testid="TrackTitle"]')?.textContent || '';
        const artist = item.querySelector('[data-testid="TrackArtist"]')?.textContent || '';
        const image = item.querySelector('img')?.getAttribute('src') || '';
        const createdAt = item.querySelector('[data-testid="TrackDate"]')?.textContent || '';
        return { title, artist, image, createdAt };
      });
    });

    await browser.close();
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape Suno', detail: String(error) });
  }
} 