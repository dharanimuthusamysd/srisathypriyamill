import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SITE, img } from '../../site';
import { CATEGORIES, Category, listing } from './products.data';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  categories: Category[] = CATEGORIES;
  listing = listing;

  whyText = 'At SriSathy Priyaa Mill, we are committed to delivering high-quality, safe and hygienic bedding products that meet global standards. Our products are designed to give you comfort, support and long-lasting performance.';
  whyPoints = ['High-quality fibre fill products', 'Washable and long-lasting', 'Comfortable and breathable', 'Ideal for all age groups'];

}
