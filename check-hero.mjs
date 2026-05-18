import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('=== Navigating to localhost:3000 ===');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000); // Wait for hydration/animation

  // 1. Screenshot the full hero section
  console.log('\n=== TAKING HERO SCREENSHOT ===');
  const hero = await page.$('section');
  if (hero) {
    await hero.screenshot({ path: '/home/z/my-project/hero-screenshot.png' });
    console.log('✅ Hero screenshot saved: hero-screenshot.png');
  } else {
    console.log('❌ No <section> element found');
  }

  // 2. Full page screenshot for context
  await page.screenshot({ path: '/home/z/my-project/fullpage-screenshot.png', fullPage: false });
  console.log('✅ Full viewport screenshot saved: fullpage-screenshot.png');

  // 3. Check h1 text visibility - get ALL h1 elements
  console.log('\n=== H1 ELEMENT ANALYSIS ===');
  const h1s = await page.$$('h1');
  console.log(`Found ${h1s.length} h1 element(s)`);

  for (let i = 0; i < h1s.length; i++) {
    const h1 = h1s[i];
    
    // Check if visible
    const isVisible = await h1.isVisible();
    console.log(`\n--- h1 #${i} ---`);
    console.log(`Is visible (Playwright): ${isVisible}`);
    
    // Get bounding box
    const box = await h1.boundingBox();
    console.log(`Bounding box: ${JSON.stringify(box)}`);
    
    // Get computed styles
    const computedStyles = await h1.evaluate(el => {
      const cs = window.getComputedStyle(el);
      return {
        color: cs.color,
        opacity: cs.opacity,
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        textShadow: cs.textShadow,
        transform: cs.transform,
        display: cs.display,
        visibility: cs.visibility,
        position: cs.position,
        zIndex: cs.zIndex,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        whiteSpace: cs.whiteSpace,
        overflow: cs.overflow,
        textContent: el.textContent,
        offsetWidth: el.offsetWidth,
        offsetHeight: el.offsetHeight,
        innerText: el.innerText,
        // Check parent styles
        parentDisplay: el.parentElement ? window.getComputedStyle(el.parentElement).display : null,
        parentOpacity: el.parentElement ? window.getComputedStyle(el.parentElement).opacity : null,
        parentTransform: el.parentElement ? window.getComputedStyle(el.parentElement).transform : null,
        parentVisibility: el.parentElement ? window.getComputedStyle(el.parentElement).visibility : null,
        parentZIndex: el.parentElement ? window.getComputedStyle(el.parentElement).zIndex : null,
        grandparentOpacity: el.parentElement?.parentElement ? window.getComputedStyle(el.parentElement.parentElement).opacity : null,
      };
    });
    console.log('Computed styles:', JSON.stringify(computedStyles, null, 2));
  }

  // 4. Check scroll indicator
  console.log('\n=== SCROLL INDICATOR CHECK ===');
  const scrollText = await page.$('text=SCROLL');
  if (scrollText) {
    const scrollVisible = await scrollText.isVisible();
    const scrollBox = await scrollText.boundingBox();
    const scrollStyles = await scrollText.evaluate(el => {
      const cs = window.getComputedStyle(el);
      return { color: cs.color, opacity: cs.opacity, fontSize: cs.fontSize, display: cs.display, transform: cs.transform };
    });
    console.log(`SCROLL text visible: ${scrollVisible}`);
    console.log(`SCROLL bounding box: ${JSON.stringify(scrollBox)}`);
    console.log(`SCROLL styles: ${JSON.stringify(scrollStyles)}`);
  } else {
    console.log('❌ SCROLL text not found');
  }

  // Check for SVG mouse icon
  const mouseSvg = await page.$('svg[aria-hidden="true"]');
  if (mouseSvg) {
    const svgVisible = await mouseSvg.isVisible();
    const svgBox = await mouseSvg.boundingBox();
    console.log(`Mouse SVG visible: ${svgVisible}`);
    console.log(`Mouse SVG bounding box: ${JSON.stringify(svgBox)}`);
  } else {
    console.log('❌ Mouse SVG not found');
  }

  // Check bounce animation
  const bounceEl = await page.$('[style*="heroBounce"]');
  if (!bounceEl) {
    // Try to find by evaluating styles
    const hasBounce = await page.evaluate(() => {
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        const cs = window.getComputedStyle(el);
        if (cs.animation && cs.animation.includes('heroBounce')) {
          return { animation: cs.animation, animationName: cs.animationName };
        }
      }
      return null;
    });
    console.log(`Bounce animation found: ${JSON.stringify(hasBounce)}`);
  }

  // 5. Check CSS keyframes exist
  console.log('\n=== CSS ANIMATION CHECK ===');
  const cssCheck = await page.evaluate(() => {
    const sheets = document.styleSheets;
    const animations = [];
    for (const sheet of sheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSKeyframesRule) {
            animations.push(rule.name);
          }
        }
      } catch (e) {
        // Cross-origin sheets will throw
      }
    }
    return animations;
  });
  console.log(`Found @keyframes: ${JSON.stringify(cssCheck)}`);

  // 6. Check CSS variables
  console.log('\n=== CSS VARIABLES ===');
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const cs = window.getComputedStyle(root);
    const vars = {};
    for (const prop of Array.from(cs)) {
      if (prop.startsWith('--font-')) {
        vars[prop] = cs.getPropertyValue(prop);
      }
    }
    return vars;
  });
  console.log(`Font CSS vars: ${JSON.stringify(cssVars)}`);

  // 7. Wait and check text rotation
  console.log('\n=== TEXT ROTATION CHECK ===');
  const firstText = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? h1.textContent : null;
  });
  console.log(`Initial h1 text: "${firstText}"`);
  console.log('Waiting 4 seconds for text rotation...');
  await page.waitForTimeout(4000);

  const secondText = await page.evaluate(() => {
    const h1s = document.querySelectorAll('h1');
    return Array.from(h1s).map(h => ({ text: h.textContent, visible: h.offsetWidth > 0 && h.offsetHeight > 0, opacity: window.getComputedStyle(h).opacity, transform: window.getComputedStyle(h).transform }));
  });
  console.log(`After 4s, h1 states: ${JSON.stringify(secondText, null, 2)}`);

  // Take another screenshot after rotation
  const hero2 = await page.$('section');
  if (hero2) {
    await hero2.screenshot({ path: '/home/z/my-project/hero-screenshot-after-rotation.png' });
    console.log('✅ Post-rotation hero screenshot saved');
  }

  // 8. Check for any CSS that might hide text
  console.log('\n=== POTENTIAL TEXT-HIDING CSS CHECK ===');
  const hidingCheck = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return 'No h1 found';
    
    // Walk up the DOM tree checking for anything that could hide text
    const checks = [];
    let el = h1;
    while (el) {
      const cs = window.getComputedStyle(el);
      const tag = el.tagName || 'root';
      const cls = el.className || '';
      checks.push({
        tag,
        cls: typeof cls === 'string' ? cls.substring(0, 100) : '',
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        overflow: cs.overflow,
        clip: cs.clip,
        clipPath: cs.clipPath,
        transform: cs.transform,
        color: cs.color,
        position: cs.position,
      });
      el = el.parentElement;
    }
    return checks;
  });
  console.log('DOM tree visibility check:');
  for (const c of hidingCheck) {
    console.log(`  <${c.tag}> class="${c.cls}" → display:${c.display} visibility:${c.visibility} opacity:${c.opacity} overflow:${c.overflow} clip:${c.clip} clipPath:${c.clipPath} color:${c.color} position:${c.position} transform:${c.transform}`);
  }

  // 9. Check if the background images loaded
  console.log('\n=== BACKGROUND IMAGE CHECK ===');
  const bgCheck = await page.evaluate(() => {
    const divs = document.querySelectorAll('div[style*="backgroundImage"]');
    return Array.from(divs).map((d, i) => {
      const cs = window.getComputedStyle(d);
      return { index: i, opacity: cs.opacity, bgImage: cs.backgroundImage.substring(0, 80) };
    });
  });
  console.log('Background layers:', JSON.stringify(bgCheck, null, 2));

  // 10. Check if animations are defined in globals.css
  console.log('\n=== CHECKING globals.css for keyframes ===');
  const styleContents = await page.evaluate(() => {
    const styleEls = document.querySelectorAll('style');
    const contents = [];
    styleEls.forEach((s, i) => {
      const text = s.textContent || '';
      if (text.includes('heroBounce') || text.includes('heroScroll') || text.includes('heroFade')) {
        contents.push({ index: i, text: text.substring(0, 500) });
      }
    });
    return contents;
  });
  console.log('Relevant <style> blocks:', JSON.stringify(styleContents, null, 2));

  await browser.close();
  console.log('\n=== DONE ===');
})();
