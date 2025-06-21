import { chromium } from 'playwright';

(async () => {
  // 本日日付をYYYY-MM-DD形式で取得
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  // ブラウザ起動
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Googleにアクセス
  await page.goto('https://www.google.com');

  // 検索ボックス（inputまたはtextarea）に日付を入力して検索
  await page.fill('input[name="q"], textarea[name="q"]', dateStr);
  await page.keyboard.press('Enter');

  // 検索結果が表示されるまで待機
  await page.waitForSelector('#search');

  // 検索結果のタイトルをコンソールに出力
  const titles = await page.$$eval('h3', elements => elements.map(el => el.textContent));
  console.log('検索結果タイトル:', titles);

  // ブラウザを閉じる
  await browser.close();
})(); 