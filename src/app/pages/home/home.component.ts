import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SITE, img } from '../../site';
import { DreamHeroComponent } from '../../dream-hero/dream-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
   imports: [CommonModule, RouterLink, DreamHeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  showDream = true;
  site = SITE;
  email = SITE.email;
  img = img;

  features = [
    { icon: 'water_drop', title: 'Washable', sub: '& Hygienic' },
    { icon: 'air', title: 'No Heat', sub: 'Retention' },
    { icon: 'eco', title: 'Non Allergic', sub: '& Safe' },
    { icon: 'cloud', title: 'Premium', sub: 'Fibre Fill' },
    { icon: 'verified_user', title: 'Comfortable', sub: '& Durable' }
  ];

  categories = [
    { name: 'Pillows', img: 'pillow.jpg', tags: ['Economy', 'Premium', 'Gift Set', 'Ortho'] },
    { name: 'Beds & Mats', img: 'bed.jpg', tags: ['Travel', 'Hostel', 'Rolling', 'Spencer', 'Foam'] },
    { name: 'Mattress & Quilt', img: 'mattress.jpg', tags: ['Waterproof', 'Cotton', 'Quilted', 'Special'] },
    { name: 'Cushions & Bolsters', img: 'cushion.jpg', tags: ['Cushion', 'Photo Print', 'Piles', 'Bamboo'] },
    { name: 'Mom & Baby', img: 'baby.jpg', tags: ['Maternity', 'Nursing', 'Baby', 'Cradle'] }
  ];

  aboutPoints = [
    { icon: 'target', label: 'Our Mission' },
    { icon: 'visibility', label: 'Our Vision' },
    { icon: 'star', label: 'Core Values' },
    { icon: 'verified_user', label: 'Quality Policy' }
  ];

  featured = [
    { name: 'DOT PILLOW', size: '15 x 22 Inches', img: 'dotpillow.jpg' },
    { name: 'TRAVEL BED', size: '36 x 75 Inches', img: 'travelbed.jpg' },
    { name: 'QUILT', size: '60 x 90 Inches', img: 'quilt.jpg' },
    { name: 'BABY BED', size: '30 x 48 Inches', img: 'babybed.jpg' }
  ];

  why = [
    'High-quality fibre fill products',
    'Washable and long-lasting',
    'Comfortable and breathable',
    'Ideal for all age groups'
  ];

  reviews = [
    { text: 'The pillow quality is excellent. It gives a very comfortable sleep and is easy to maintain. Highly recommended!', name: 'Ananya Sarkar', stars: 5 }
  ];

  perView = 4;
  start = 0;
  reviewIndex = 0;
  private timer?: any;

  ngOnInit() { this.setPerView(); this.timer = setInterval(() => this.nextReview(), 6000); }
  ngOnDestroy() { clearInterval(this.timer); }

  @HostListener('window:resize') setPerView() {
    const w = window.innerWidth;
    this.perView = w < 600 ? 1 : w < 900 ? 2 : w < 1100 ? 3 : 4;
    this.start = Math.min(this.start, this.maxStart);
  }
  get maxStart() { return Math.max(0, this.featured.length - this.perView); }
  get slideWidth() { return 100 / this.perView; }
  prev() { this.start = Math.max(0, this.start - 1); }
  next() { this.start = Math.min(this.maxStart, this.start + 1); }
  nextReview() { this.reviewIndex = (this.reviewIndex + 1) % this.reviews.length; }
  stars(n: number) { return Array(n).fill(0); }
  enquire(product: string) {
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi, I would like to enquire about: ' + product)}`, '_blank');
  }
}
