export interface Product {
  slug: string;
  name: string;
  size?: string;        // short size shown on cards, e.g. '15 x 22 Inches'
  sizes?: string[];     // full size/specification list on the detail page
  desc?: string;        // description on the detail page
  features?: string[];  // feature bullets on the detail page
  care?: string[];      // care instructions (section hidden when empty)
  img?: string;         // main photo, file inside src/assets/images/products/
  images?: string[];    // extra gallery photos, same folder
}
export interface Group { slug: string; name?: string; items: Product[]; } // no name = plain list
export interface Category { slug: string; name: string; desc: string; img: string; groups: Group[]; wide?: boolean; }

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

type Extra = Partial<Omit<Product, 'slug' | 'name'>>;
const P = (name: string, extra: Extra = {}): Product => ({ slug: slugify(name), name, ...extra });
const G = (name: string | undefined, items: Product[]): Group => ({ slug: slugify(name ?? 'all'), name, items });

/*
 * EDIT HERE. Category -> (optional group) -> product.
 *   /products/<category>                 category page
 *   /products/<category>/<product>       product detail page
 * Add details to any product:  P('Dot Pillow', { size: '15 x 22 Inches', sizes: ['15 x 22 Inches'],
 *   desc: '...', features: ['...'], care: ['Dry in shade'], img: 'dot-pillow.jpg', images: ['dot-2.jpg'] })
 * Photos go in src/assets/images/products/. Products without img show the category photo.
 */
export const CATEGORIES: Category[] = [
  { slug: 'pillows', name: 'Pillows', img: 'pillow.jpg', desc: 'Comfortable and supportive pillows for a restful sleep.',
    groups: [
      G('Economy Pillows', [P('Liberty'), P('Dot Pillow'), P('Relax'), P('Sweet Dream'), P('White Pillow (3 types)'), P('Good Day'), P('Winner'), P('Lotus'), P('Classic'), P('Santro')]),
      G('Premium Pillows', [P('Feather Soft'), P('Quilt Pillow'), P('Comfy Pillow')]),
      G('Gift Set Pillows', [P('Gift Set Plain'), P('Enjoy Gift Set'), P('Wedding Gift Set')]),
      G('Ortho Pillows', [P('Memory Foam Pillow'), P('Ortho Pillow')])
    ] },
  { slug: 'beds-and-mats', name: 'Beds & Mats', img: 'bed.jpg', desc: 'Durable and comfortable beds and mats for every need.',
    groups: [G(undefined, [P('Travel Bed'), P('Hostel Bed'), P('Rolling Bed'), P('Spencer Bed'), P('Foam Bed'), P('Yoga Mat'), P('Baby Mat')])] },
  { slug: 'mattress-and-quilt', name: 'Mattress & Quilt', img: 'mattress.jpg', desc: 'Supportive mattresses and cosy quilts for ultimate comfort.',
    groups: [G(undefined, [P('Waterproof Protector'), P('Cotton Mattress Protector'), P('Quilted Special Mattress Protector'), P('Quilt'), P('Cotton Quilt'), P('Microfibre Comforter')])] },
  { slug: 'cushions-and-bolsters', name: 'Cushions & Bolsters', img: 'cushion.jpg', desc: 'Soft cushions and bolsters for added comfort and support.',
    groups: [G(undefined, [P('Cushion'), P('Photo Print Cushion'), P('Piles Cushion'), P('Bamboo Swing Cushion'), P('Bolster')])] },
  { slug: 'mom-and-baby', name: 'Mom & Baby', img: 'baby.jpg', desc: 'Safe and gentle bedding products for mothers and babies.', wide: true,
    groups: [G(undefined, [
      P('Maternity Pillow'), P('Nursing Pillow'), P('Baby Bed'), P('Baby Fabric'), P('Dresses'), P('Muslin Nappy'), P('Hosiery Nappy'), P('Towel'), P('Hood Towel'),
      P('Baby Pillow / Travel Pillow'), P('Baby Night Suit'), P('Dry Sheets'), P('Baby Massage Sheet'), P('Feeding Apron'), P('Cradle Cloth'), P('Baby Quilt'), P('Sleeping Bag')
    ])] }
];

export const totalProducts = (c: Category) => c.groups.reduce((n, g) => n + g.items.length, 0);
/** Items shown in the small list on the Products page card, each with its link */
export const listing = (c: Category): { name: string; link: string[] }[] =>
  c.groups.length > 1 || c.groups[0].name
    ? c.groups.map(g => ({ name: g.name!, link: ['/products', c.slug, g.slug] }))
    : c.groups[0].items.map(i => ({ name: i.name, link: ['/products', c.slug, i.slug] }));
