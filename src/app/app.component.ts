import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FOOTER_PRODUCTS, NAV, SITE, img } from './site';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menuOpen = false;
  year = new Date().getFullYear();
  nav = NAV;
  site = SITE;
  footerProducts = FOOTER_PRODUCTS;
  img = img;
}
