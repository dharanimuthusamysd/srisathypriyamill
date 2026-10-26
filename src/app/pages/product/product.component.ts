import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { SITE, img } from '../../site';
import { CATEGORIES, Category, Product } from '../products/products.data';

interface View { category: Category; product: Product; photos: string[]; related: Product[]; }

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private router = inject(Router);
  private title = inject(Title);
  site = SITE;
  img = img;
  active = 0;

  // shown when a product has no features of its own
  defaultFeatures = ['Washable & hygienic', 'No heat retention', 'Non allergic & safe', 'Premium fibre fill', 'Comfortable & durable'];

  view$ = inject(ActivatedRoute).paramMap.pipe(
    map((p): View | undefined => {
      const category = CATEGORIES.find(c => c.slug === p.get('slug'));
      const all = category?.groups.flatMap(g => g.items) ?? [];
      const product = all.find(i => i.slug === p.get('product'));
      if (!category || !product) return undefined;
      const files = [product.img, ...(product.images ?? [])].filter((f): f is string => !!f);
      return {
        category, product,
        photos: files.length ? files.map(f => img(`products/${f}`)) : [img(category.img)],
        related: all.filter(i => i.slug !== product.slug).slice(0, 4)
      };
    }),
    tap(v => {
      this.active = 0;
      if (!v) { this.router.navigateByUrl('/products'); return; }
      this.title.setTitle(`${v.product.name} | SriSathy Priyaa Mill`);
    })
  );

  relatedImg(p: Product, fallback: string) { return img(p.img ? `products/${p.img}` : fallback); }

  enquire(v: View) {
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I would like to enquire about: ${v.product.name} (${v.category.name})`)}`, '_blank');
  }
}
