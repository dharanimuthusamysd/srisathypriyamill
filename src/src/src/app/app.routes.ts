import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SriSathy Priyaa Mill | Sleep Re-Defined' },
  { path: 'about', component: AboutComponent, title: 'About Us | SriSathy Priyaa Mill' },
  { path: 'products', component: ProductsComponent, title: 'Our Products | SriSathy Priyaa Mill' },
  { path: '**', redirectTo: '' }
];
