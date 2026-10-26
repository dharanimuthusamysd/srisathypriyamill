import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { img } from '../site';

/**
 * "Falling dreamer" scroll scene.
 * As you scroll through this section it stays pinned on screen while
 * the girl falls DOWN and the bed rises UP; feathers drift and move at different speeds.
 * Photos: src/assets/images/dream/  (falling-girl.png, bed.png, feather-1.png, feather-2.png)
 */
@Component({
  selector: 'app-dream-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dream-hero.component.html',
  styleUrl: './dream-hero.component.scss'
})
export class DreamHeroComponent implements AfterViewInit, OnDestroy {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private zone = inject(NgZone);
  img = img;

  // file names inside src/assets/images/dream/  (change here if your files are named differently)
  girl = 'dream/falling-girl.png';
  bed = 'dream/bed.png';
  feather1 = 'dream/feather-1.png';
  feather2 = 'dream/feather-2.png';

  private target = 0;
  private cur = 0;
  private raf = 0;
  private onScroll?: () => void;

  hide(e: Event) { (e.target as HTMLElement).style.display = 'none'; } // missing photo -> just hide it

  ngAfterViewInit() {
    const root = this.host.nativeElement.querySelector('.dream') as HTMLElement;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const apply = () => root.style.setProperty('--p', this.cur.toFixed(4));
    const HEADER = 70; // sticky header height

    const measure = () => {
      const r = root.getBoundingClientRect();
      const stage = window.innerHeight - HEADER;
      return clamp((HEADER - r.top) / Math.max(1, r.height - stage));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.cur = 0.8; apply(); return; // no motion: show the finished picture
    }

    // follows the speed knob (--slow) in motion.scss: bigger = slower, floatier
    const slow = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slow')) || 1.7;
    const ease = Math.min(0.2, 0.12 / slow);

    const tick = () => {
      this.cur += (this.target - this.cur) * ease;
      if (Math.abs(this.target - this.cur) < 0.0007) this.cur = this.target;
      apply();
      this.raf = this.cur === this.target ? 0 : requestAnimationFrame(tick);
    };
    this.onScroll = () => { this.target = measure(); if (!this.raf) this.raf = requestAnimationFrame(tick); };

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll!, { passive: true });
      window.addEventListener('resize', this.onScroll!, { passive: true });
    });
    this.target = this.cur = measure();
    apply();
  }

  ngOnDestroy() {
    if (this.onScroll) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    }
    cancelAnimationFrame(this.raf);
  }
}
