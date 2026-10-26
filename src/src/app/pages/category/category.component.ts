import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { SITE, img } from '../../site';
import { CATEGORIES, Category, Group, totalProducts } from '../products/products.data';

interface View { c: Category; group?: Group; shown: Group[]; }

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private router = inject(Router);
  private title = inject(Title);
  img = img;
  all = CATEGORIES;
  total = totalProducts;

  view$ = inject(ActivatedRoute).paramMap.pipe(
    map((p): View | undefined => {
      const c = CATEGORIES.find(x => x.slug === p.get('slug'));
      if (!c) return undefined;
      const gs = p.get('group');
      const group = gs ? c.groups.find(g => g.slug === gs) : undefined;
      if (gs && !group) return undefined;
      return { c, group, shown: group ? [group] : c.groups };
    }),
    tap(v => {
      if (!v) { this.router.navigateByUrl('/products'); return; }
      this.title.setTitle(`${v.group?.name ?? v.c.name} | SriSathy Priyaa Mill`);
    })
  );

  productImg(file: string | undefined, fallback: string) { return img(file ? `products/${file}` : fallback); }

  enquire(product: string, category: string) {
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I would like to enquire about: ${product} (${category})`)}`, '_blank');
  }
}
