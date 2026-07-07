const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = '/home/santhoshmk/.gemini/antigravity/brain/2110ad1b-b9df-4346-884e-0ba51f27ac06/scratch';

async function run() {
  const browser = await chromium.launch();
  const viewports = [
    { name: 'mobile', width: 375, height: 812, isMobile: true, hasTouch: true },
    { name: 'tablet', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false }
  ];

  const mapping = [];

  for (const vp of viewports) {
    console.log(`Testing ${vp.name}...`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000');
    
    // Wait for the methodology section to exist
    await page.waitForSelector('#methodology');
    
    // Scroll to the end of the pinned section's timeline
    // The ScrollTrigger adds "+=800%"
    await page.evaluate(async () => {
      const el = document.getElementById('methodology');
      const rect = el.getBoundingClientRect();
      const scrollPos = window.scrollY + rect.top + (window.innerHeight * 7.5);
      window.scrollTo(0, scrollPos);
    });
    
    // Wait for GSAP animation to settle
    await page.waitForTimeout(3000);
    
    const screenshotPath = path.join(outDir, `screenshot_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    
    mapping.push({
      device: vp.name,
      width: vp.width,
      height: vp.height,
      imagePath: screenshotPath
    });
    
    await context.close();
  }
  
  await browser.close();
  
  fs.writeFileSync(path.join(outDir, 'mapping.json'), JSON.stringify(mapping, null, 2));
  console.log('Done!');
}

run().catch(console.error);
