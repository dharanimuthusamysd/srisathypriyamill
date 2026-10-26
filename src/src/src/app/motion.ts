/**
 * Site-wide motion: scroll reveals, 3D card tilt, hero parallax, scroll progress bar.
 * It finds elements by CSS selector, so no page template needs editing.
 * Add a selector to REVEAL / TILT_SEL / HERO_SEL below to animate more things.
 */

// [selector, variant]  variants: up | left | right | zoom | wipe
const REVEAL: [string, string][] = [
  ['.section-title, .ab-h2', 'wipe'],
  ['.section-sub, .center-eyebrow, .ab-eyebrow, .ab-h3, .k-tabs, .k-group-title, .crumbs', 'up'],
  ['.cat-card, .k-card, .p-card, .r-card, .feature, .ab-value, .ab-why-item, .ab-mv-item, .about-points li, .p-feats > div, .c-row, .c-trust-in > div', 'up'],
  ['.about-text, .why-list, .review, .p-why-text, .p-why-list, .ab-quality-text, .ab-quality-list, .d-info, .c-form-card, .ab-who > div, .footer-in > div', 'up'],
  ['.about-img, .d-gallery, .c-details', 'left'],
  ['.c-map', 'right'],
  ['.carousel, .cta-in, .ab-cta, .p-cta-in, .k-cta-in, .d-cta-in', 'zoom']
];
// photos that get the curtain reveal (blur -> sharp) when scrolled into view
const IMG_REVEAL = '.cat-card img, .k-card img, .r-card img, .p-card-main img, .about-img img, .ab-who img, .ab-quality-img, .p-why > img, .why-img, .d-big';
// big photos that slowly pan inside their frame while you scroll
const IMG_PAN = '.about-img img, .ab-who img, .ab-quality-img, .p-why > img, .why-img';
const HOST_SEL = '.cat-card, .k-card, .r-card, .p-card';
const TILT_SEL = '.cat-card, .k-card, .p-card, .r-card, .prod-in';
const HERO_SEL = '.hero, .ab-hero, .p-hero, .c-hero, .k-hero';

export function initMotion(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---- scroll progress bar + header shadow + hero parallax (one throttled scroll handler)
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  let ticking = false;
  const onFrame = () => {
    ticking = false;
    const root = document.documentElement;
    const max = root.scrollHeight - window.innerHeight;
    bar.style.setProperty('--p', String(max > 0 ? Math.min(1, root.scrollTop / max) : 0));
    document.querySelector('.header')?.classList.toggle('scrolled', root.scrollTop > 20);

    if (!reduced) {
      document.querySelectorAll<HTMLElement>(IMG_PAN).forEach(im => {
        const r = im.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        im.style.objectPosition = `50% ${(25 + p * 50).toFixed(1)}%`;
      });
      document.querySelectorAll<HTMLElement>(HERO_SEL).forEach(h => {
        const r = h.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const p = Math.min(1, Math.max(0, -r.top / (r.height || 1)));
        h.style.backgroundPositionY = `${50 - p * 40}%`;
      });
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onFrame();

  if (reduced) return;

  // ---- reveal on scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('rv-in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    const prep = (el: Element, variant: string, sel: string) => {
      if (el.hasAttribute('data-rv')) return;
      el.setAttribute('data-rv', '1');
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.matches(sel)) : [];
      const i = Math.max(0, sibs.indexOf(el));
      (el as HTMLElement).style.setProperty('--i', String(Math.min(i, 6))); // stagger position inside grids (delay set in motion.scss)
      el.classList.add('rv', `rv-${variant}`);
      io.observe(el);
    };

    const prepImg = (el: Element) => {
      if (el.hasAttribute('data-rv')) return;
      el.setAttribute('data-rv', '1');
      const host = el.closest(HOST_SEL) ?? el;
      const sel = host === el ? IMG_REVEAL : HOST_SEL;
      const sibs = host.parentElement ? Array.from(host.parentElement.children).filter(c => c.matches(sel)) : [];
      (el as HTMLElement).style.setProperty('--i', String(Math.min(Math.max(0, sibs.indexOf(host)), 6)));
      el.classList.add('img-rv');
      io.observe(el);
    };

    const scan = (root: Element) => {
      if (root.matches(IMG_REVEAL)) prepImg(root);
      root.querySelectorAll(IMG_REVEAL).forEach(prepImg);
      for (const [sel, variant] of REVEAL) {
        if (root.matches(sel)) prep(root, variant, sel);
        root.querySelectorAll(sel).forEach(el => prep(el, variant, sel));
      }
    };

    new MutationObserver(muts => {
      for (const m of muts) m.addedNodes.forEach(n => { if (n.nodeType === 1) scan(n as Element); });
    }).observe(document.body, { childList: true, subtree: true });
    scan(document.body);
  }

  // ---- 3D tilt on cards (mouse only)
  if (finePointer) {
    let cur: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.style.transition = 'transform 1s cubic-bezier(.2,.7,.2,1)';
      el.style.transform = '';
    };
    document.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const t = (e.target as Element).closest?.(TILT_SEL) as HTMLElement | null;
      if (cur && cur !== t) { reset(cur); cur = null; }
      if (!t) return;
      cur = t;
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      t.style.transition = 'transform .28s ease-out';
      t.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => { if (cur) { reset(cur); cur = null; } });
  }
}