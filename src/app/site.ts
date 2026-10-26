export const img = (name: string) => `assets/images/${name}`;

export const SITE = {
  phones: ['99940 62225', '99940 92225', '0424 3553222'],
  email: 'srisathypriyamill@gmail.com',
  website: 'www.srisathypriyamill.com',
  address: 'Snooze Towers, 248 A - 248 B, Uzhavar Santhai Road, Sampath Nagar, Chinnamuthu Main Street, Edayankattuvalasu, Erode - 638011.',
  whatsapp: '919994062225'
};

export interface NavItem { label: string; route: string; fragment?: string; track?: boolean; }

export const NAV: NavItem[] = [
  { label: 'Home', route: '/', track: true },
  { label: 'About Us', route: '/about', track: true },
  { label: 'Products', route: '/products', track: true },

  { label: 'Contact Us', route: '/contact', track: true }
];

export const FOOTER_PRODUCTS = ['Pillows', 'Beds & Mats', 'Mattress & Quilt', 'Cushions & Bolsters', 'Mom & Baby'];
