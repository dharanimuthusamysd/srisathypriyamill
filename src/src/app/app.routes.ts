import { Routes, UrlMatcher } from '@angular/router';
import { CATEGORIES } from './pages/products/products.data';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductsComponent } from './pages/products/products.component';

/** /products/<category>/<group>  e.g. /products/pillows/economy-pillows */
const groupMatcher: UrlMatcher = segments => {
  if (segments.length === 3 && segments[0].path === 'products') {
    const c = CATEGORIES.find(x => x.slug === segments[1].path);
    if (c?.groups.some(g => !!g.name && g.slug === segments[2].path)) {
      return { consumed: segments, posParams: { slug: segments[1], group: segments[2] } };
    }
  }
  return null;
};

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SriSathy Priyaa Mill | Sleep Re-Defined' },
  { path: 'about', component: AboutComponent, title: 'About Us | SriSathy Priyaa Mill' },
  { path: 'products', component: ProductsComponent, title: 'Our Products | SriSathy Priyaa Mill' },
  { matcher: groupMatcher, component: CategoryComponent },
  { path: 'products/:slug/:product', component: ProductComponent, title: 'Product | SriSathy Priyaa Mill' },
  { path: 'products/:slug', component: CategoryComponent, title: 'Products | SriSathy Priyaa Mill' },
  { path: 'contact', component: ContactComponent, title: 'Contact Us | SriSathy Priyaa Mill' },
  { path: '**', redirectTo: '' }
];
