const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PORT = 3001; // Assuming port 3001 based on previous logs, fallback to 3000 if needed
const BASE_URL = `http://localhost:${PORT}`;

const pagesToCapture = [
  { name: 'home_page', path: '/' },
  { name: 'crm_app', path: '/crm-valid' },
  { name: 'hr_portal', path: '/hr-portal' },
  { name: 'analytics_app', path: '/analytics' },
  { name: 'inventory_app', path: '/inventory' },
  { name: 'broken_config', path: '/broken-config' },
  { name: 'empty_canvas', path: '/empty-canvas' },
  { name: 'live_builder', path: '/builder' }
];

async function captureScreenshots() {
  const screenshotsDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });

  for (const target of pagesToCapture) {
    const url = `${BASE_URL}${target.path}`;
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
      
      const screenshotPath = path.join(screenshotsDir, `${target.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Saved screenshot to ${screenshotPath}`);
    } catch (error) {
      console.error(`Failed to capture ${url}: ${error.message}`);
      // Try fallback to port 3000 just in case
      if (PORT === 3001) {
        console.log(`Attempting fallback to port 3000 for ${target.name}...`);
        try {
          const fallbackUrl = `http://localhost:3000${target.path}`;
          await page.goto(fallbackUrl, { waitUntil: 'networkidle0', timeout: 10000 });
          const screenshotPath = path.join(screenshotsDir, `${target.name}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`Saved screenshot to ${screenshotPath}`);
        } catch (e) {
          console.error(`Fallback failed: ${e.message}`);
        }
      }
    }
  }

  await browser.close();
  console.log('Done capturing screenshots.');
}

captureScreenshots();
