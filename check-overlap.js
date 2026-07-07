const { chromium } = require('playwright');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch();
  const viewports = [
    { name: 'mobile_short', width: 375, height: 600, isMobile: true, hasTouch: true },
    { name: 'mobile_tall', width: 393, height: 852, isMobile: true, hasTouch: true },
    { name: 'tablet', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { name: 'desktop', width: 1440, height: 900, isMobile: false, hasTouch: false }
  ];

  let hasInconsistency = false;

  for (const vp of viewports) {
    console.log(`\nTesting ${vp.name}...`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000');
    
    await page.waitForSelector('#methodology');
    
    // Scroll to the 'final' state of the timeline
    // Timeline total duration is ~20.5s. The final hold state is around 15.25s.
    // 15.25 / 20.5 * 400% = ~2.97
    await page.evaluate(async () => {
      const el = document.getElementById('methodology');
      const rect = el.getBoundingClientRect();
      const scrollPos = window.scrollY + rect.top + (window.innerHeight * 2.97);
      window.scrollTo(0, scrollPos);
    });
    
    await page.waitForTimeout(3000);
    
    // Get bounding boxes of all important elements
    const boxes = await page.evaluate(() => {
      const getBox = (selector, name) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        
        // Ignore invisible elements
        const style = window.getComputedStyle(el);
        if (style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none') {
          return null;
        }
        
        const rect = el.getBoundingClientRect();
        return { name, top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
      };
      
      const elements = [
        getBox('.scale-header-container h2', 'Header'),
        getBox('.scale-annotation-S .scale-annotation-text', 'Scan'),
        getBox('.scale-annotation-C .scale-annotation-text', 'Compress'),
        getBox('.scale-annotation-A .scale-annotation-text', 'Architect'),
        getBox('.scale-annotation-L .scale-annotation-text', 'Launch'),
        getBox('.scale-annotation-E .scale-annotation-text', 'Embed')
      ];
      
      return elements.filter(e => e !== null);
    });
    
    // Check for overlaps
    const checkOverlap = (b1, b2) => {
      return !(b1.right < b2.left || 
               b1.left > b2.right || 
               b1.bottom < b2.top || 
               b1.top > b2.bottom);
    };
    
    for (let i = 0; i < boxes.length; i++) {
      // Check if off-screen vertically
      if (boxes[i].top < 0 || boxes[i].bottom > vp.height) {
        console.error(`❌ INCONSISTENCY: ${boxes[i].name} is off-screen on ${vp.name} (top: ${boxes[i].top}, bottom: ${boxes[i].bottom}, viewportHeight: ${vp.height})`);
        hasInconsistency = true;
      }
      
      for (let j = i + 1; j < boxes.length; j++) {
        if (checkOverlap(boxes[i], boxes[j])) {
          console.error(`❌ INCONSISTENCY: ${boxes[i].name} overlaps with ${boxes[j].name} on ${vp.name}`);
          console.log(`  ${boxes[i].name}: top=${boxes[i].top}, bottom=${boxes[i].bottom}, left=${boxes[i].left}, right=${boxes[i].right}`);
          console.log(`  ${boxes[j].name}: top=${boxes[j].top}, bottom=${boxes[j].bottom}, left=${boxes[j].left}, right=${boxes[j].right}`);
          hasInconsistency = true;
        }
      }
    }
    
    if (!hasInconsistency) {
      console.log(`✅ No overlaps found on ${vp.name}`);
    }
    
    await context.close();
  }
  
  await browser.close();
  if (hasInconsistency) {
    process.exit(1);
  }
}

run().catch(console.error);
