gsap.registerPlugin(ScrollTrigger);

(function () {
  // ==========================================================
  //  DOM
  // ==========================================================
  const hero          = document.querySelector('#hero');
  const heroBg        = document.querySelector('.hero-bg');
  const heroVignette  = document.querySelector('.hero-vignette');
  const heroContent   = document.querySelector('.hero-content');

  const breath        = document.querySelector('#breath');
  const breathBg      = document.querySelector('.breath-bg');
  const breathChapter = document.querySelector('.breath-chapter');
  const breathQuoteLines = document.querySelectorAll('.quote-line');
  const breathAttr    = document.querySelector('.breath-attribution');
  const breathCompass = document.querySelector('.breath-compass');
  const breathSides   = document.querySelectorAll('.breath-side');
  const breathCorners = document.querySelectorAll('.corner');
  const sealTL        = document.querySelector('.seal-tl');

  const rupture       = document.querySelector('#rupture');
  const ruptureBg     = document.querySelector('.rupture-bg');
  const ruptureMarker = document.querySelector('.rupture-marker');
  const strataScale   = document.querySelector('.strata-scale');
  const ruptureTimestamp = document.querySelector('.rupture-timestamp');
  const specimenTag   = document.querySelector('.specimen-tag');
  const rupturePoem   = document.querySelector('.rupture-poem');

  const scene         = document.querySelector('#chapter1');
  const sceneBg       = scene.querySelector('.scene-bg');
  const sceneRule     = scene.querySelector('.scene-rule');
  const sceneTitleLines = scene.querySelectorAll('.scene-title .title-row');
  const sceneText     = scene.querySelector('.scene-text');
  const sceneTags     = scene.querySelector('.scene-tags');
  const sceneMeta     = scene.querySelector('.scene-meta');
  const sceneAttr     = scene.querySelector('.scene-attribution');
  const sceneDataCards = scene.querySelectorAll('.data-card');
  const sceneCorner   = scene.querySelector('.scene-corner-mark');
  const sceneSig      = scene.querySelector('.scene-signature');

  // ==========================================================
  //  初始隐藏所有需要动画的元素
  // ==========================================================
  gsap.set(breathBg,         { scale: 1.18, filter: 'blur(8px) brightness(0.55) saturate(0.85)' });
  gsap.set(breathChapter,    { opacity: 0, y: 24 });
  gsap.set(breathQuoteLines, { opacity: 0, y: 24, filter: 'blur(6px)' });
  gsap.set(breathAttr,       { opacity: 0, y: 16 });
  gsap.set(breathCompass,    { opacity: 0, y: 20 });
  gsap.set(breathSides,      { opacity: 0, x: 0 });
  gsap.set(breathCorners,    { opacity: 0, scale: 0.6 });
  gsap.set(sealTL,           { opacity: 0, scale: 0.6, rotation: -28 });

  gsap.set(ruptureBg,        { opacity: 0, scale: 1.1, clipPath: 'inset(50% 0 50% 0)', filter: 'brightness(0.6) contrast(1.05)' });
  gsap.set(ruptureMarker,    { opacity: 0, scale: 0.85 });
  gsap.set(strataScale,      { opacity: 0, x: -20 });
  gsap.set(ruptureTimestamp, { opacity: 0, x: 20 });
  gsap.set(specimenTag,      { opacity: 0, y: 20 });
  gsap.set(rupturePoem,      { opacity: 0, y: 20 });

  gsap.set(sceneBg,          { scale: 1.18, filter: 'brightness(0.35) saturate(0.7) blur(4px)' });
  gsap.set(sceneRule,        { opacity: 0, y: -20 });
  gsap.set([sceneMeta, sceneTitleLines[0], sceneTitleLines[1], sceneText, sceneTags, sceneAttr, sceneCorner, sceneSig], {
    opacity: 0, y: 30,
  });
  gsap.set(sceneDataCards,   { opacity: 0, x: 40 });

  // ==========================================================
  //  每屏的进入动画工厂
  // ==========================================================

  // 屏 2 · 呼吸间隔
  function playBreath() {
    const tl = gsap.timeline();
    tl.to(breathBg, {
      scale: 1.05,
      filter: 'blur(0px) brightness(0.85) saturate(1)',
      ease: 'power2.out',
      duration: 1.8,
    }, 0)
    // 四角先弹出（建立古籍框架）
    .to(breathCorners, {
      opacity: 0.55, scale: 1,
      ease: 'back.out(2)',
      duration: 0.8,
      stagger: 0.06,
    }, 0.3)
    // 左右两侧注疏淡入
    .to(breathSides, {
      opacity: 1,
      ease: 'power2.out',
      duration: 1,
      stagger: 0.15,
    }, 0.5)
    .to(breathChapter, {
      opacity: 1, y: 0,
      ease: 'power2.out',
      duration: 1,
    }, 0.7)
    .to(breathQuoteLines[0], {
      opacity: 1, y: 0, filter: 'blur(0px)',
      ease: 'power3.out',
      duration: 1.4,
    }, 1.1)
    .to(breathAttr, {
      opacity: 1, y: 0,
      ease: 'power2.out',
      duration: 0.9,
    }, 2.3)
    .to(sealTL, {
      opacity: 0.92, scale: 1, rotation: -4,
      ease: 'back.out(2.6)',
      duration: 0.9,
    }, 2.6)
    .to(breathCompass, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1.1,
    }, 2.9);
    return tl;
  }

  function resetBreath() {
    gsap.set(breathBg,         { scale: 1.18, filter: 'blur(8px) brightness(0.55) saturate(0.85)' });
    gsap.set(breathChapter,    { opacity: 0, y: 24 });
    gsap.set(breathQuoteLines, { opacity: 0, y: 24, filter: 'blur(6px)' });
    gsap.set(breathAttr,       { opacity: 0, y: 16 });
    gsap.set(breathCompass,    { opacity: 0, y: 20 });
    gsap.set(breathSides,      { opacity: 0 });
    gsap.set(breathCorners,    { opacity: 0, scale: 0.6 });
    gsap.set(sealTL,           { opacity: 0, scale: 0.6, rotation: -28 });
  }

  // 屏 3 · 土壤裂开
  function playRupture() {
    const tl = gsap.timeline();
    tl.to(ruptureBg, {
      opacity: 1,
      clipPath: 'inset(0% 0 0% 0)',
      ease: 'power3.inOut',
      duration: 1.6,
    }, 0)
    .to(ruptureBg, {
      filter: 'brightness(0.95) contrast(1) saturate(0.95)',
      ease: 'power2.out',
      duration: 1.8,
    }, 0.4)
    // 四角装饰系统淡入
    .to(strataScale, {
      opacity: 1, x: 0,
      ease: 'power3.out',
      duration: 1.2,
    }, 0.8)
    .to(ruptureTimestamp, {
      opacity: 1, x: 0,
      ease: 'power3.out',
      duration: 1.2,
    }, 0.95)
    // 短暂震动
    .to(rupture, {
      keyframes: [
        { x: 4, y: -2, duration: 0.06 },
        { x: -3, y: 2, duration: 0.06 },
        { x: 2, y: -1, duration: 0.06 },
        { x: -2, y: 1, duration: 0.06 },
        { x: 1, y: 0, duration: 0.06 },
        { x: 0, y: 0, duration: 0.06 },
      ],
    }, 1.4)
    .fromTo(ruptureMarker, {
      opacity: 0, scale: 0.85, filter: 'blur(8px)',
    }, {
      opacity: 1, scale: 1, filter: 'blur(0px)',
      ease: 'power3.out',
      duration: 1.2,
    }, 1.8)
    .to(specimenTag, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1.2,
    }, 2.4)
    .to(rupturePoem, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1.2,
    }, 2.7);
    return tl;
  }

  function resetRupture() {
    gsap.set(ruptureBg,        { opacity: 0, scale: 1.1, clipPath: 'inset(50% 0 50% 0)', filter: 'brightness(0.6) contrast(1.05)' });
    gsap.set(ruptureMarker,    { opacity: 0, scale: 0.85 });
    gsap.set(strataScale,      { opacity: 0, x: -20 });
    gsap.set(ruptureTimestamp, { opacity: 0, x: 20 });
    gsap.set(specimenTag,      { opacity: 0, y: 20 });
    gsap.set(rupturePoem,      { opacity: 0, y: 20 });
    gsap.set(rupture,          { x: 0, y: 0 });
  }

  // 屏 4 · 地下世界
  function playScene() {
    const tl = gsap.timeline();
    tl.to(sceneBg, {
      scale: 1, filter: 'brightness(1) saturate(1) blur(0px)',
      ease: 'power2.out',
      duration: 2,
    }, 0)
    .to(sceneRule, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1.1,
    }, 0.4)
    .to(sceneMeta, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1,
    }, 0.7)
    .to(sceneTitleLines[0], {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1,
    }, 1.0)
    .to(sceneTitleLines[1], {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1,
    }, 1.3)
    .to(sceneText, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 1,
    }, 1.6)
    .to(sceneTags, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 0.9,
    }, 1.9)
    .to(sceneAttr, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 0.8,
    }, 2.2)
    // 数据卡组依次从右滑入
    .to(sceneDataCards, {
      opacity: 1, x: 0,
      ease: 'power3.out',
      duration: 1,
      stagger: 0.15,
    }, 1.4)
    .to(sceneCorner, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 0.8,
    }, 2.4)
    .to(sceneSig, {
      opacity: 1, y: 0,
      ease: 'power3.out',
      duration: 0.8,
    }, 2.6);
    return tl;
  }

  function resetScene() {
    gsap.set(sceneBg, { scale: 1.18, filter: 'brightness(0.35) saturate(0.7) blur(4px)' });
    gsap.set(sceneRule, { opacity: 0, y: -20 });
    gsap.set([sceneMeta, sceneTitleLines[0], sceneTitleLines[1], sceneText, sceneTags, sceneAttr, sceneCorner, sceneSig], {
      opacity: 0, y: 30,
    });
    gsap.set(sceneDataCards, { opacity: 0, x: 40 });
  }

  // ==========================================================
  //  屏 5 · 手工采挖
  // ==========================================================
  const harvest = document.querySelector('#harvest');
  const harvestEls = harvest && {
    bg: harvest.querySelector('.harvest-bg'),
    rule: harvest.querySelector('.harvest-rule'),
    meta: harvest.querySelector('.harvest-meta'),
    titleRows: harvest.querySelectorAll('.harvest-title .title-row'),
    text: harvest.querySelector('.harvest-text'),
    criteria: harvest.querySelectorAll('.harvest-criteria li'),
    card: harvest.querySelector('.harvest-card'),
    corner: harvest.querySelector('.harvest-corner'),
    sig: harvest.querySelector('.harvest-signature'),
  };

  function resetHarvest() {
    if (!harvestEls) return;
    gsap.set(harvestEls.bg, { scale: 1.15, filter: 'brightness(0.35) saturate(0.7) blur(4px)' });
    gsap.set([harvestEls.rule, harvestEls.meta, ...harvestEls.titleRows, harvestEls.text, harvestEls.corner, harvestEls.sig], { opacity: 0, y: 24 });
    gsap.set(harvestEls.criteria, { opacity: 0, x: -20 });
    gsap.set(harvestEls.card, { opacity: 0, x: 60 });
  }

  function playHarvest() {
    const tl = gsap.timeline();
    tl.to(harvestEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(harvestEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(harvestEls.meta, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.7)
      .to(harvestEls.titleRows[0], { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.0)
      .to(harvestEls.titleRows[1], { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.3)
      .to(harvestEls.text, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.6)
      .to(harvestEls.criteria, { opacity: 1, x: 0, ease: 'power3.out', duration: 0.8, stagger: 0.15 }, 1.9)
      .to(harvestEls.card, { opacity: 1, x: 0, ease: 'power3.out', duration: 1.2 }, 2.0)
      .to(harvestEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 2.6)
      .to(harvestEls.sig, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 2.7);
    return tl;
  }

  // ==========================================================
  //  屏 6 · 第二章卷首
  // ==========================================================
  const chapterIntro = document.querySelector('#chapter-intro-2');
  const ciEls = chapterIntro && {
    seal: chapterIntro.querySelector('.ci-seal'),
    enLine: chapterIntro.querySelector('.ci-en-line'),
    numeral: chapterIntro.querySelector('.ci-numeral'),
    chars: chapterIntro.querySelectorAll('.ci-char'),
    quote: chapterIntro.querySelector('.ci-quote'),
    divider: chapterIntro.querySelector('.ci-divider'),
    meta: chapterIntro.querySelector('.ci-meta'),
  };

  function resetChapterIntro() {
    if (!ciEls) return;
    gsap.set(ciEls.seal, { opacity: 0, scale: 0.5, rotation: -28 });
    gsap.set([ciEls.enLine, ciEls.quote, ciEls.divider, ciEls.meta], { opacity: 0, y: 20 });
    gsap.set(ciEls.numeral, { opacity: 0, scale: 0.8, filter: 'blur(20px)' });
    gsap.set(ciEls.chars, { opacity: 0, y: 40 });
  }

  function playChapterIntro() {
    const tl = gsap.timeline();
    tl.to(ciEls.enLine, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.2)
      .to(ciEls.numeral, {
        opacity: 1, scale: 1, filter: 'blur(0)',
        ease: 'power4.out', duration: 1.8,
      }, 0.4)
      .to(ciEls.chars, {
        opacity: 1, y: 0,
        ease: 'power3.out', duration: 1, stagger: 0.12,
      }, 1.4)
      .to(ciEls.seal, {
        opacity: 0.92, scale: 1, rotation: -8,
        ease: 'back.out(2.4)', duration: 1,
      }, 1.8)
      .to(ciEls.quote, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 2.4)
      .to(ciEls.divider, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 3.0)
      .to(ciEls.meta, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 3.3);
    return tl;
  }

  // ==========================================================
  //  屏 7 · 工坊清洗台
  // ==========================================================
  const wash = document.querySelector('#wash');
  const washEls = wash && {
    bg: wash.querySelector('.wash-bg'),
    wave: wash.querySelector('.wash-wave'),
    rule: wash.querySelector('.wash-rule'),
    meta: wash.querySelector('.wash-meta'),
    titleRows: wash.querySelectorAll('.wash-title .title-row'),
    text: wash.querySelector('.wash-text'),
    steps: wash.querySelectorAll('.step'),
    arrows: wash.querySelectorAll('.step-arrow'),
    compliance: wash.querySelector('.wash-compliance'),
    corner: wash.querySelector('.wash-corner'),
    sig: wash.querySelector('.wash-signature'),
  };

  function resetWash() {
    if (!washEls) return;
    gsap.set(washEls.bg, { scale: 1.15, filter: 'brightness(0.45) saturate(0.8) blur(4px)' });
    gsap.set([washEls.wave, washEls.rule, washEls.meta, ...washEls.titleRows, washEls.text, washEls.compliance, washEls.corner, washEls.sig], { opacity: 0, y: 24 });
    gsap.set(washEls.steps, { opacity: 0, y: 30 });
    gsap.set(washEls.arrows, { opacity: 0 });
  }

  function playWash() {
    const tl = gsap.timeline();
    tl.to(washEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(washEls.wave, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.4 }, 0.4)
      .to(washEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.5)
      .to(washEls.meta, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.8)
      .to(washEls.titleRows[0], { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.1)
      .to(washEls.titleRows[1], { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.4)
      .to(washEls.text, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.7)
      .to(washEls.steps, { opacity: 1, y: 0, ease: 'back.out(1.6)', duration: 0.8, stagger: 0.18 }, 2.0)
      .to(washEls.arrows, { opacity: 0.6, ease: 'power2.out', duration: 0.6, stagger: 0.18 }, 2.2)
      .to(washEls.compliance, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 2.8)
      .to(washEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.0)
      .to(washEls.sig, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.1);
    return tl;
  }

  // ==========================================================
  //  屏 8 · 切片烘干工艺时间线
  // ==========================================================
  const craft = document.querySelector('#craft');
  const craftEls = craft && {
    bg: craft.querySelector('.craft-bg'),
    rule: craft.querySelector('.craft-rule'),
    meta: craft.querySelector('.craft-meta'),
    title: craft.querySelector('.craft-title'),
    rail: craft.querySelector('.timeline-rail'),
    nodes: craft.querySelectorAll('.timeline-node'),
    steam: craft.querySelector('.steam'),
    corner: craft.querySelector('.craft-corner'),
    sig: craft.querySelector('.craft-signature'),
  };

  function resetCraft() {
    if (!craftEls) return;
    gsap.set(craftEls.bg, { scale: 1.15, filter: 'brightness(0.4) saturate(0.7) blur(4px)' });
    gsap.set([craftEls.rule, craftEls.meta, craftEls.title, craftEls.corner, craftEls.sig], { opacity: 0, y: 24 });
    gsap.set(craftEls.nodes, { opacity: 0, y: 30 });
    gsap.set(craftEls.rail, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
    gsap.set(craftEls.steam, { opacity: 0 });
    craftEls.nodes.forEach(n => n.classList.remove('is-active'));
  }

  function playCraft() {
    const tl = gsap.timeline();
    tl.to(craftEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(craftEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(craftEls.meta, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.7)
      .to(craftEls.title, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 1.0)
      .to(craftEls.rail, { opacity: 1, scaleX: 1, ease: 'power3.inOut', duration: 1.4 }, 1.4)
      .to(craftEls.nodes, {
        opacity: 1, y: 0,
        ease: 'back.out(1.5)', duration: 0.7, stagger: 0.25,
        onStart: () => {
          // 节点依次激活
          craftEls.nodes.forEach((node, i) => {
            setTimeout(() => node.classList.add('is-active'), i * 250 + 400);
          });
        }
      }, 1.7)
      .to(craftEls.steam, { opacity: 1, ease: 'power2.out', duration: 1.4 }, 2.4)
      .to(craftEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.4)
      .to(craftEls.sig, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.5);
    return tl;
  }

  // ==========================================================
  //  屏 9 · 超微粉碎对比 + 放大镜
  // ==========================================================
  const powder = document.querySelector('#powder');
  const powderEls = powder && {
    bg: powder.querySelector('.powder-bg'),
    rule: powder.querySelector('.powder-rule'),
    meta: powder.querySelector('.powder-meta'),
    title: powder.querySelector('.powder-title'),
    cmpL: powder.querySelector('.powder-compare-left'),
    cmpR: powder.querySelector('.powder-compare-right'),
    disclaimer: powder.querySelector('.powder-disclaimer'),
    corner: powder.querySelector('.powder-corner'),
    magnifier: document.querySelector('.magnifier'),
    magnifierImg: document.querySelector('.magnifier-img'),
  };

  function resetPowder() {
    if (!powderEls) return;
    gsap.set(powderEls.bg, { scale: 1.15, filter: 'brightness(0.4) saturate(0.7) blur(4px)' });
    gsap.set([powderEls.rule, powderEls.meta, powderEls.title, powderEls.disclaimer, powderEls.corner], { opacity: 0, y: 24 });
    gsap.set(powderEls.cmpL, { opacity: 0, x: -40 });
    gsap.set(powderEls.cmpR, { opacity: 0, x: 40 });
  }

  function playPowder() {
    const tl = gsap.timeline();
    tl.to(powderEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(powderEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(powderEls.meta, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.7)
      .to(powderEls.title, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 1.0)
      .to(powderEls.cmpL, { opacity: 1, x: 0, ease: 'power3.out', duration: 1 }, 1.4)
      .to(powderEls.cmpR, { opacity: 1, x: 0, ease: 'power3.out', duration: 1 }, 1.6)
      .to(powderEls.disclaimer, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 2.4)
      .to(powderEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 2.6);
    return tl;
  }

  // 放大镜 hover 跟随
  if (powder && powderEls.magnifier) {
    let magVisible = false;
    powder.addEventListener('mousemove', (e) => {
      const rect = powder.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) return;
      if (!magVisible) {
        gsap.to(powderEls.magnifier, { opacity: 1, duration: 0.3 });
        magVisible = true;
      }
      // 放大镜跟随鼠标
      gsap.to(powderEls.magnifier, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      // 放大镜内图片跟随：用负偏移让光标位置成为放大中心
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      // 图片放大 4 倍，反向偏移
      const imgX = -relX * (rect.width * 4 - 220) - relX * 220 + 110;
      const imgY = -relY * (rect.height * 4 - 220) - relY * 220 + 110;
      if (powderEls.magnifierImg) {
        powderEls.magnifierImg.style.transform = `translate(${imgX}px, ${imgY}px)`;
      }
    });
    powder.addEventListener('mouseleave', () => {
      gsap.to(powderEls.magnifier, { opacity: 0, duration: 0.3 });
      magVisible = false;
    });
  }

  // ==========================================================
  //  屏 10 · 月中桂烘焙车间
  // ==========================================================
  const atelier = document.querySelector('#atelier');
  const atelierEls = atelier && {
    bg: atelier.querySelector('.atelier-bg'),
    seal: atelier.querySelector('.atelier-seal'),
    rule: atelier.querySelector('.atelier-rule'),
    eyebrow: atelier.querySelector('.atelier-eyebrow'),
    numeral: atelier.querySelector('.atelier-numeral'),
    name: atelier.querySelector('.atelier-name'),
    quote: atelier.querySelector('.atelier-quote'),
    text: atelier.querySelector('.atelier-text'),
    creds: atelier.querySelector('.atelier-credentials'),
    corner: atelier.querySelector('.atelier-corner'),
  };

  function resetAtelier() {
    if (!atelierEls) return;
    gsap.set(atelierEls.bg, { scale: 1.18, filter: 'brightness(0.4) saturate(0.8) blur(4px)' });
    gsap.set([atelierEls.rule, atelierEls.eyebrow, atelierEls.numeral, atelierEls.name, atelierEls.quote, atelierEls.text, atelierEls.creds, atelierEls.corner], { opacity: 0, y: 24 });
    gsap.set(atelierEls.seal, { opacity: 0, scale: 0.4, rotation: -25 });
  }

  function playAtelier() {
    const tl = gsap.timeline();
    tl.to(atelierEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(atelierEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(atelierEls.eyebrow, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.7)
      .to(atelierEls.numeral, { opacity: 1, y: 0, ease: 'power4.out', duration: 1.4 }, 1.0)
      .to(atelierEls.name, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.6)
      .to(atelierEls.seal, { opacity: 0.92, scale: 1, rotation: -6, ease: 'back.out(2.4)', duration: 1 }, 1.9)
      .to(atelierEls.quote, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 2.1)
      .to(atelierEls.text, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 2.6)
      .to(atelierEls.creds, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 2.9)
      .to(atelierEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.4);
    return tl;
  }

  // ==========================================================
  //  屏 11 · 老师傅手作三联画
  // ==========================================================
  const craftsman = document.querySelector('#craftsman');
  const cmEls = craftsman && {
    bg: craftsman.querySelector('.craftsman-bg'),
    dividers: craftsman.querySelectorAll('.triptych-divider'),
    labels: craftsman.querySelectorAll('.triptych-label'),
    stamp: craftsman.querySelector('.craftsman-stamp'),
    petals: craftsman.querySelectorAll('.petal'),
    rule: craftsman.querySelector('.craftsman-rule'),
    title: craftsman.querySelector('.craftsman-title'),
    text: craftsman.querySelector('.craftsman-text'),
    mantra: craftsman.querySelector('.craftsman-mantra'),
    corner: craftsman.querySelector('.craftsman-corner'),
  };

  function resetCraftsman() {
    if (!cmEls) return;
    gsap.set(cmEls.bg, { scale: 1.15, filter: 'brightness(0.4) saturate(0.7) blur(4px)' });
    gsap.set([cmEls.rule, cmEls.title, cmEls.text, cmEls.mantra, cmEls.corner], { opacity: 0, y: 24 });
    gsap.set(cmEls.dividers, { opacity: 0, scaleY: 0, transformOrigin: 'center center' });
    gsap.set(cmEls.labels, { opacity: 0, y: 20 });
    gsap.set(cmEls.stamp, { opacity: 0, scale: 0.4, rotation: -25 });
    gsap.set(cmEls.petals, { opacity: 0, y: -20, x: 0, rotation: 0 });
  }

  function playCraftsman() {
    const tl = gsap.timeline();
    tl.to(cmEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(cmEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(cmEls.title, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 0.8)
      .to(cmEls.text, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.2)
      .to(cmEls.dividers, { opacity: 1, scaleY: 1, ease: 'power3.inOut', duration: 1.4, stagger: 0.2 }, 1.4)
      .to(cmEls.labels, { opacity: 1, y: 0, ease: 'power3.out', duration: 1, stagger: 0.25 }, 1.8)
      // 印章在第三幕"咣"地盖下
      .to(cmEls.stamp, {
        opacity: 0.95, scale: 1, rotation: -10,
        ease: 'back.out(3)', duration: 0.6,
      }, 3.0)
      .to(cmEls.stamp, {
        scale: 0.95, duration: 0.15, ease: 'power2.in', yoyo: true, repeat: 1,
      }, 3.6)
      // 花瓣依次飘落
      .to(cmEls.petals, {
        opacity: 0.85, y: 0, ease: 'power2.out', duration: 1, stagger: 0.3,
      }, 3.0)
      .to(cmEls.mantra, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 3.8)
      .to(cmEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 4.0);

    // 花瓣持续漂浮
    cmEls.petals.forEach((petal, i) => {
      gsap.to(petal, {
        y: '+=20',
        rotation: i % 2 === 0 ? 15 : -15,
        ease: 'sine.inOut',
        duration: 4 + i * 0.5,
        yoyo: true,
        repeat: -1,
        delay: 4 + i * 0.5,
      });
    });
    return tl;
  }

  // ==========================================================
  //  屏 12 · 烘焙出炉
  // ==========================================================
  const oven = document.querySelector('#oven');
  const ovenEls = oven && {
    bg: oven.querySelector('.oven-bg'),
    rule: oven.querySelector('.oven-rule'),
    meta: oven.querySelector('.oven-meta'),
    titleRows: oven.querySelectorAll('.oven-title .title-row'),
    text: oven.querySelector('.oven-text'),
    flavor: oven.querySelector('.flavor-card'),
    flavorBars: oven.querySelectorAll('.flavor-bar span'),
    corner: oven.querySelector('.oven-corner'),
  };

  function resetOven() {
    if (!ovenEls) return;
    gsap.set(ovenEls.bg, { scale: 1.15, filter: 'brightness(0.4) saturate(0.7) blur(4px)' });
    gsap.set([ovenEls.rule, ovenEls.meta, ...ovenEls.titleRows, ovenEls.text, ovenEls.corner], { opacity: 0, y: 24 });
    gsap.set(ovenEls.flavor, { opacity: 0, x: 60 });
    ovenEls.flavorBars.forEach(bar => bar.style.width = '0');
  }

  function playOven() {
    const tl = gsap.timeline();
    tl.to(ovenEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(ovenEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(ovenEls.meta, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.7)
      .to(ovenEls.titleRows[0], { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.0)
      .to(ovenEls.titleRows[1], { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.3)
      .to(ovenEls.text, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 1.6)
      .to(ovenEls.flavor, { opacity: 1, x: 0, ease: 'power3.out', duration: 1.2 }, 2.0)
      .add(() => {
        ovenEls.flavorBars.forEach(bar => {
          const fill = parseFloat(bar.dataset.fill) || 0.5;
          bar.style.width = (fill * 100) + '%';
        });
      }, 2.6)
      .to(ovenEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.0);
    return tl;
  }

  // ==========================================================
  //  屏 13 · 礼盒 + 四重信任
  // ==========================================================
  const trust = document.querySelector('#trust');
  const trustEls = trust && {
    bg: trust.querySelector('.trust-bg'),
    radar: trust.querySelector('.radar'),
    rule: trust.querySelector('.trust-rule'),
    eyebrow: trust.querySelector('.trust-eyebrow'),
    title: trust.querySelector('.trust-title'),
    tags: trust.querySelectorAll('.trust-tag'),
    corner: trust.querySelector('.trust-corner'),
  };

  function resetTrust() {
    if (!trustEls) return;
    gsap.set(trustEls.bg, { scale: 1.2, filter: 'brightness(0.4) saturate(0.6) blur(6px)' });
    gsap.set([trustEls.rule, trustEls.eyebrow, trustEls.title, trustEls.corner], { opacity: 0, y: 24 });
    gsap.set(trustEls.radar, { opacity: 0, scale: 0.8 });
    gsap.set(trustEls.tags, { opacity: 0, scale: 0.6 });
  }

  function playTrust() {
    const tl = gsap.timeline();
    tl.to(trustEls.bg, { scale: 1.05, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2.4 }, 0)
      .to(trustEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.5)
      .to(trustEls.eyebrow, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.9)
      .to(trustEls.title, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.4 }, 1.2)
      .to(trustEls.radar, { opacity: 1, scale: 1, ease: 'power3.out', duration: 1.6 }, 1.6)
      // 四个标签放射式弹出
      .to(trustEls.tags, {
        opacity: 1, scale: 1,
        ease: 'back.out(1.6)',
        duration: 0.9,
        stagger: 0.18,
      }, 2.4)
      .to(trustEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.6);
    return tl;
  }

  // ==========================================================
  //  屏 14 · 最终 CTA
  // ==========================================================
  const finale = document.querySelector('#finale');
  const finaleEls = finale && {
    bg: finale.querySelector('.finale-bg'),
    petals: finale.querySelectorAll('.finale-petal'),
    rule: finale.querySelector('.finale-rule'),
    map: finale.querySelector('.journey-map'),
    chars: finale.querySelectorAll('.finale-char'),
    divider: finale.querySelector('.finale-divider'),
    subtitle: finale.querySelector('.finale-subtitle'),
    btns: finale.querySelectorAll('.cta-btn'),
    disclaimer: finale.querySelector('.finale-disclaimer'),
    corner: finale.querySelector('.finale-corner'),
    sig: finale.querySelector('.finale-signature'),
  };

  function resetFinale() {
    if (!finaleEls) return;
    gsap.set(finaleEls.bg, { scale: 1.15, filter: 'brightness(0.5) saturate(0.7) blur(4px)' });
    gsap.set([finaleEls.rule, finaleEls.map, finaleEls.subtitle, finaleEls.disclaimer, finaleEls.corner, finaleEls.sig], { opacity: 0, y: 24 });
    gsap.set(finaleEls.chars, { opacity: 0, y: 30 });
    gsap.set(finaleEls.divider, { opacity: 0 });
    gsap.set(finaleEls.btns, { opacity: 0, y: 30 });
    gsap.set(finaleEls.petals, { opacity: 0, y: -20 });
  }

  function playFinale() {
    const tl = gsap.timeline();
    tl.to(finaleEls.bg, { scale: 1, filter: 'brightness(1) saturate(1) blur(0)', ease: 'power2.out', duration: 2 }, 0)
      .to(finaleEls.rule, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 0.4)
      .to(finaleEls.map, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 0.7)
      .to(finaleEls.chars, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.9, stagger: 0.06 }, 1.2)
      .to(finaleEls.divider, { opacity: 1, ease: 'power3.out', duration: 0.8 }, 1.5)
      .to(finaleEls.subtitle, { opacity: 1, y: 0, ease: 'power3.out', duration: 1.2 }, 2.2)
      .to(finaleEls.btns, {
        opacity: 1, y: 0,
        ease: 'back.out(1.4)',
        duration: 0.8,
        stagger: 0.15,
      }, 2.7)
      .to(finaleEls.petals, { opacity: 0.85, y: 0, ease: 'power3.out', duration: 1.4, stagger: 0.4 }, 1.8)
      .to(finaleEls.disclaimer, { opacity: 1, y: 0, ease: 'power3.out', duration: 1 }, 3.4)
      .to(finaleEls.corner, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.6)
      .to(finaleEls.sig, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.8 }, 3.7);

    // 花瓣循环漂浮
    finaleEls.petals.forEach((p, i) => {
      gsap.to(p, {
        y: '+=30',
        x: i % 2 === 0 ? 15 : -15,
        rotation: i % 2 === 0 ? 20 : -20,
        ease: 'sine.inOut',
        duration: 5 + i,
        yoyo: true,
        repeat: -1,
        delay: 4 + i,
      });
    });
    return tl;
  }

  // ==========================================================
  //  IntersectionObserver · 进入视口播放，离开重置
  // ==========================================================
  const sectionMap = new Map();
  sectionMap.set(breath,  { play: playBreath,  reset: resetBreath  });
  sectionMap.set(rupture, { play: playRupture, reset: resetRupture });
  sectionMap.set(scene,   { play: playScene,   reset: resetScene   });
  if (harvest)      sectionMap.set(harvest,      { play: playHarvest,      reset: resetHarvest      });
  if (chapterIntro) sectionMap.set(chapterIntro, { play: playChapterIntro, reset: resetChapterIntro });
  if (wash)         sectionMap.set(wash,         { play: playWash,         reset: resetWash         });
  if (craft)        sectionMap.set(craft,        { play: playCraft,        reset: resetCraft        });
  if (powder)       sectionMap.set(powder,       { play: playPowder,       reset: resetPowder       });
  if (atelier)      sectionMap.set(atelier,      { play: playAtelier,      reset: resetAtelier      });
  if (craftsman)    sectionMap.set(craftsman,    { play: playCraftsman,    reset: resetCraftsman    });
  if (oven)         sectionMap.set(oven,         { play: playOven,         reset: resetOven         });
  if (trust)        sectionMap.set(trust,        { play: playTrust,        reset: resetTrust        });
  if (finale)       sectionMap.set(finale,       { play: playFinale,       reset: resetFinale       });

  // 全部初始重置一次
  [resetHarvest, resetChapterIntro, resetWash, resetCraft, resetPowder,
   resetAtelier, resetCraftsman, resetOven, resetTrust, resetFinale].forEach(fn => fn && fn());

  // 给每个 section 维护当前播放状态
  const playState = new WeakMap();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const handlers = sectionMap.get(entry.target);

      // === rail 联动：哪屏中点最接近视口中心就高亮哪个章节 ===
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const idx = sections.indexOf(entry.target);
        if (idx >= 0) updateRail(idx);
      }

      if (!handlers) return;

      // 进入视口超过 50% 时播放
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const state = playState.get(entry.target);
        if (state === 'playing' || state === 'played') return;
        handlers.reset();
        const tl = handlers.play();
        playState.set(entry.target, 'playing');
        tl.eventCallback('onComplete', () => {
          playState.set(entry.target, 'played');
        });
      }
      // 完全离开视口时重置，方便下次回滚再次播放
      else if (!entry.isIntersecting) {
        playState.set(entry.target, 'reset');
        handlers.reset();
      }
    });
  }, {
    threshold: [0, 0.5, 0.8, 1],
  });

  if (hero) observer.observe(hero);
  observer.observe(breath);
  observer.observe(rupture);
  observer.observe(scene);
  if (harvest)      observer.observe(harvest);
  if (chapterIntro) observer.observe(chapterIntro);
  if (wash)         observer.observe(wash);
  if (craft)        observer.observe(craft);
  if (powder)       observer.observe(powder);
  if (atelier)      observer.observe(atelier);
  if (craftsman)    observer.observe(craftsman);
  if (oven)         observer.observe(oven);
  if (trust)        observer.observe(trust);
  if (finale)       observer.observe(finale);

  // ==========================================================
  //  屏切换幕布 · 在两屏过渡瞬间播放一次"墨色一闪"
  //  原理：监听 scroll 滚动 + 防抖判断切换发生
  // ==========================================================
  const snapVeil = document.querySelector('.snap-veil');
  const sections = [hero, breath, rupture, scene, harvest, chapterIntro, wash, craft, powder, atelier, craftsman, oven, trust, finale].filter(Boolean);

  // 每屏所属章节：0=壹深山采挖, 1=贰精细炮制, 2=叁百年手艺, 3=肆到你手中
  // sections 顺序：hero(0)/breath(1)/rupture(2)/scene(3)/harvest(4)/ci(5)/wash(6)/craft(7)/powder(8)/atelier(9)/craftsman(10)/oven(11)/trust(12)/finale(13)
  const sectionToChapter = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3];
  const railMarks = document.querySelectorAll('.rail-mark');

  function updateRail(idx) {
    const chapterIdx = sectionToChapter[idx] ?? 0;
    railMarks.forEach((m, i) => m.classList.toggle('is-active', i === chapterIdx));
  }
  updateRail(0);
  let lastIndex = 0;
  let scrollSettleTimer = null;
  let isPlayingVeil = false;

  function getCurrentIndex() {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportH = window.innerHeight;
    // 哪一屏中点最接近视口中心
    let bestIdx = 0;
    let bestDist = Infinity;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - viewportH / 2);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return bestIdx;
  }

  function playVeil() {
    if (isPlayingVeil) return;
    isPlayingVeil = true;
    snapVeil.classList.remove('is-active');
    // 强制重排重启动画
    void snapVeil.offsetWidth;
    snapVeil.classList.add('is-active');
    setTimeout(() => {
      snapVeil.classList.remove('is-active');
      isPlayingVeil = false;
    }, 720);
  }

  // 滚动停止后判断当前 index 变化 → 触发幕布
  // 用滚动开始时立即触发，覆盖切换的整个过程
  let scrollStartIdx = 0;
  let isScrolling = false;
  let scrollStartTimer = null;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      // 滚动开始
      scrollStartIdx = getCurrentIndex();
      isScrolling = true;
    }

    clearTimeout(scrollSettleTimer);
    scrollSettleTimer = setTimeout(() => {
      // 滚动停止
      const endIdx = getCurrentIndex();
      isScrolling = false;
      if (endIdx !== scrollStartIdx) {
        // 屏切换发生 — 但因为 snap 是即时吸附，幕布要在切换时同步触发
        // 这里其实已经晚了，下面用滚动方向预测的方式补一次
      }
      lastIndex = endIdx;
    }, 80);

    // 实时检测：只要当前 index 和上次记录不一致，立即播一次幕布
    const currentIdx = getCurrentIndex();
    if (currentIdx !== lastIndex) {
      playVeil();
      updateRail(currentIdx);
      lastIndex = currentIdx;
    }
  }, { passive: true });

  // 初始化 lastIndex
  lastIndex = getCurrentIndex();
  updateRail(lastIndex);

  // ==========================================================
  //  Hero · 首屏字符 hover 微动
  // ==========================================================
  document.querySelectorAll('.title-char').forEach(char => {
    char.addEventListener('mouseenter', () => {
      gsap.to(char, { y: -8, color: '#c8a96b', duration: 0.5, ease: 'power2.out' });
    });
    char.addEventListener('mouseleave', () => {
      gsap.to(char, { y: 0, color: '#f5efe2', duration: 0.6, ease: 'power2.out' });
    });
  });

  // ==========================================================
  //  鼠标视差 · 首屏内容层轻浮
  // ==========================================================
  const heroContentEl = hero.querySelector('.hero-content');
  let parallaxRAF;
  let parallaxX = 0, parallaxY = 0;
  let parallaxTX = 0, parallaxTY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    parallaxTX = cx * -10;
    parallaxTY = cy * -6;
    if (!parallaxRAF) parallaxLoop();
  });

  function parallaxLoop() {
    parallaxX += (parallaxTX - parallaxX) * 0.06;
    parallaxY += (parallaxTY - parallaxY) * 0.06;
    if (heroContentEl) {
      heroContentEl.style.transform = `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`;
    }
    parallaxRAF = requestAnimationFrame(parallaxLoop);
  }

})();
