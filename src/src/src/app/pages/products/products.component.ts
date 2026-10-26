import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE, img } from '../../site';

interface Category { name: string; desc: string; img: string; items: string[]; wide?: boolean; }

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  img = img;
  email = SITE.email;

  // image file names – change extension here if yours differ
  heroImg = 'products-hero.png';
  whyImg = 'sleeping.jpg';

  features = [
    { icon: 'water_drop', line1: 'Washable', line2: '& Hygienic' },
    { icon: 'air', line1: 'No Heat', line2: 'Retention' },
    { icon: 'eco', line1: 'Non Allergic', line2: '& Safe' },
    { icon: 'cloud', line1: 'Premium', line2: 'Fibre Fill' }
  ];

  categories: Category[] = [
    { name: 'Pillows', img: 'pillow.jpg', desc: 'Comfortable and supportive pillows for a restful sleep.',
      items: ['Economy Pillows', 'Premium Pillows', 'Gift Set Pillows', 'Ortho Pillows'] },
    { name: 'Beds & Mats', img: 'bed.jpg', desc: 'Durable and comfortable beds and mats for every need.',
      items: ['Travel Bed', 'Hostel Bed', 'Rolling Bed', 'Spencer Bed', 'Foam Bed', 'Yoga Mat', 'Baby Mat'] },
    { name: 'Mattress & Quilt', img: 'mattress.jpg', desc: 'Supportive mattresses and cosy quilts for ultimate comfort.',
      items: ['Waterproof Protector', 'Cotton Mattress Protector', 'Quilted Special Mattress Protector', 'Quilt', 'Cotton Quilt', 'Microfibre Comforter'] },
    { name: 'Cushions & Bolsters', img: 'cushion.jpg', desc: 'Soft cushions and bolsters for added comfort and support.',
      items: ['Cushion', 'Photo Print Cushion', 'Piles Cushion', 'Bamboo Swing Cushion', 'Bolster'] },
    { name: 'Mom & Baby', img: 'baby.jpg', desc: 'Safe and gentle bedding products for mothers and babies.', wide: true,
      items: ['Maternity Pillow', 'Nursing Pillow', 'Baby Bed', 'Baby Bolster', 'Hosiery Nappy', 'Hood Towel'] },
    { name: 'Gift Sets', img: 'gift-sets.jpg', desc: 'Thoughtful gift sets for special occasions.',
      items: ['Enjoy Gift Set', 'Gift Set Plain', 'Gift Set Wedding'] },
    { name: 'Special Collections', img: 'special.jpg', desc: 'Premium collections for every lifestyle and occasion.',
      items: ['Premium Collection', 'Luxury Collection', 'Everyday Comfort'] },
    { name: 'Baby Care Products', img: 'baby-care.jpg', desc: 'Gentle care for your little ones.',
      items: ['Baby Bed', 'Baby Quilt', 'Muslin Dress', 'Towel', 'Nappy', 'Dry Sheets', 'Feeding Apron', 'Cradle Cloth', 'Sleeping Bag'] }
  ];

  whyText = 'At Sri Sathy Priyaa Mill, we are committed to delivering high-quality, safe and hygienic bedding products that meet global standards. Our products are designed to give you comfort, support and long-lasting performance.';
  whyPoints = ['High-quality fibre fill products', 'Washable and long-lasting', 'Comfortable and breathable', 'Ideal for all age groups'];

  enquire(name: string) {
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi, I would like to see products in: ' + name)}`, '_blank');
  }
}
