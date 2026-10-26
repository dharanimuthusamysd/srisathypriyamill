export interface Variant { name: string; size?: string; note?: string; }
export interface Product {
  slug: string;
  name: string;
  size?: string;        // short size shown on cards, e.g. '15 x 22 Inches'
  sizes?: string[];     // simple size list on the detail page (use when there are no variations)
  variants?: Variant[]; // different types/variations, each with its own size (shown as a table with Enquire buttons)
  desc?: string;        // description on the detail page
  features?: string[];  // feature bullets on the detail page
  care?: string[];      // care instructions (section hidden when empty)
  img?: string;         // main photo, file inside src/assets/images/products/
  images?: string[];    // extra gallery photos, same folder
}
export interface Group { slug: string; name?: string; items: Product[]; img?: string; } // img = optional banner photo for the sub-category page (file in src/assets/images/)
export interface Category { slug: string; name: string; desc: string; img: string; groups: Group[]; wide?: boolean; }

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

type Extra = Partial<Omit<Product, 'slug' | 'name'>>;
const P = (name: string, img: string, extra: Extra = {}): Product => ({
  slug: slugify(name), name,
  img,                                                           // photo file in src/assets/images/products/  (change the name here)
  size: extra.sizes?.length === 1 ? extra.sizes[0] : undefined, // single size shows on the card automatically
  ...extra
});
const inch = (...s: string[]): Extra => ({ sizes: s.map(x => `${x} Inches`) });
const feet = (...s: string[]): Extra => ({ sizes: s.map(x => `${x} Feet`) });
const G = (name: string | undefined, items: Product[], img?: string): Group => ({ slug: slugify(name ?? 'all'), name, items, img });

/*
 * EDIT HERE. Category -> (optional group) -> product.
 *   /products/<category>                 category page
 *   /products/<category>/<product>       product detail page
 * P('Name', 'photo-file.jpg', { sizes, desc ... })   <- 2nd value is the photo file (src/assets/images/products/). Change it to use another photo.
 * Variations example:  P('White Pillow', 'white-pillow.jpg', { variants: [ { name: 'Type 1', size: '16 x 24 Inches' }, { name: 'Type 2', size: '17 x 27 Inches', note: 'Extra soft' } ] })
 * Add details to any product:  P('Dot Pillow', 'dot-pillow.jpg', { sizes: ['15 x 22 Inches'],
 *   desc: '...', features: ['...'], care: ['Dry in shade'], images: ['dot-2.jpg'] })
 * Photos go in src/assets/images/products/ and are named after the product (second value of each P(...) below). If a photo is missing, the category photo shows instead.
 * Sub-category banner (optional): G('Economy Pillows', [...], 'economy-pillows.jpg')  -> file in src/assets/images/
 */
export const CATEGORIES: Category[] = [
  { slug: 'pillows', name: 'Pillows', img: 'pillow.jpg', desc: 'Comfortable and supportive pillows for a restful sleep.',
    groups: [
      G('Economy Pillows', [
        P('Liberty', 'liberty.jpg', inch('17 x 26')),
        P('Dot Pillow', 'dotpillow.jpeg', inch('15 x 22')),
        P('Relax', 'relax.jpeg', inch('17 x 26')),
        P('Sweet Dream', 'sweetdream.jpeg', inch('16 x 24')),
        P('White Stripes Pillow', 'whitestripe.jpeg', inch('18 x 27')),
        P('White Pillow', 'white.jpeg', inch('18 x 26')),
        P('White Pillow 1+1', 'oneplus.jpeg', inch('17 x 25')),
        P('Good Day', 'good.jpeg', inch('18 x 26')),
        P('Winner', 'winner.jpeg', inch('18 x 26')),
        P('Lotus', 'lotus.jpeg', inch('15 x 24')),
        P('Classic', 'classic.jpeg', inch('17 x 26')),
        P('Santro', 'santro.jpeg', inch('17 x 26'))
      ]),
      G('Premium Pillows', [
        P('Feather Pillow', 'feather.jpeg', inch('17 x 28')),
        P('Feather Soft', 'soft.jpeg', inch('19 x 28')),
        P('Quilt Pillow', 'quilt.jpeg', inch('19 x 28')),
        P('Comfy Pillow', 'comfy.jpeg', inch('19 x 29'))
      ]),
      G('Gift Set Pillows', [
        P('Gift Set Plain', 'giftset.jpeg', inch('18 x 27')),
        P('Enjoy Gift Set', 'enjoy.jpeg', inch('16 x 24')),
        P('Wedding Gift Set', 'wedding.jpeg', inch('18 x 29'))
      ]),
      G('Ortho Pillows', [P('Memory Foam Pillow', 'memory.jpeg'), P('Ortho Pillow', 'ortho.jpeg')])
    ] },
  { slug: 'beds-and-mats', name: 'Beds & Mats', img: 'bed.jpg', desc: 'Durable and comfortable beds and mats for every need.',
    groups: [G(undefined, [
      P('Travel Bed', 'travel.jpeg', feet('2½ x 6', '3 x 6', '4 x 6', '6 x 6')),
      P('Hostel Bed', 'hostel.jpeg', feet('2½ x 6', '3 x 6', '4 x 6', '5 x 6')),
      P('Rolling Bed', 'rolling.jpeg', { sizes: ['30 x 75 (2½ x 6¼ )Feet', '36 x 75 Feet', '36 x 75 (3 x 6¼) Feet', '48 x 75 (4 x 6¼) Feet'] }),
      P('Spencer Bed', 'spencer.jpeg', { sizes: [
        '30 x 75 Inches (2½ x 6¼ Feet)', '36 x 75 Inches (3 x 6¼ Feet)', '48 x 75 Inches (4 x 6¼ Feet)',
        '60 x 75 Inches (5 x 6¼ Feet)', '72 x 75 Inches (6 x 6¼ Feet)', '72 x 78 Inches (6 x 6½ Feet)'
      ] }),
      P('Foam Bed', 'foam.jpeg', feet('2.5 x 6', '3 x 6', '4 x 6')),
      P('Yoga Mat', 'yoga.jpeg', feet('3 x 6', '4 x 6')),
      P('Baby Mat', 'baby.jpeg', feet('3 x 6', '4 x 6'))
    ])] },
  { slug: 'mattress-and-quilt', name: 'Mattress & Quilt', img: 'mattress.jpg', desc: 'Supportive mattresses and cosy quilts for ultimate comfort.',
    groups: [G(undefined, [
      P('Waterproof Protector', 'water.jpeg'),
      P('Cotton Mattress Protector', 'cottonprotec.jpeg'),
      P('Quilted Special Mattress Protector', 'quiltspecial.jpeg', inch('36 x 78', '48 x 78', '60 x 78', '72 x 78')),
      P('Quilt', 'quilt.jpeg'),
      P('Cotton Quilt', 'cottonquilt.jpeg', inch('60 x 90', '90 x 100')),
      P('Microfibre Comforter', 'micro.jpeg', inch('60 x 90', '90 x 100'))
    ])] },
  { slug: 'cushions-and-bolsters', name: 'Cushions & Bolsters', img: 'cushion.jpg', desc: 'Soft cushions and bolsters for added comfort and support.',
    groups: [G(undefined, [
      P('Cotton Cushion', 'cotton.jpeg', { ...inch('18 x 18', '16 x 16'), size: '18 x 18, 16 x 16 Inches' }),
      P('Satin Cushion', 'satin.jpeg', { ...inch('18 x 18', '16 x 16'), size: '18 x 18, 16 x 16 Inches' }),
      P('Photo Print Cushion', 'photo.jpeg', inch('18 x 18')),
      P('Piles Cushion', 'piles.jpeg'),
      P('Bamboo Swing Cushion', 'bamboo.jpeg'),
      P('Bolster', 'bolster.jpeg', { sizes: ['Length 28 Inches, Dia 33 Inches'] })
    ])] },
  { slug: 'mom-and-baby', name: 'Mom & Baby', img: 'baby.jpg', desc: 'Safe and gentle bedding products for mothers and babies.', wide: true,
    groups: [G(undefined, [
      P('Maternity Pillow', 'maternity.jpeg'), P('Nursing Pillow', 'nurshing.jpeg'), P('Baby Bed', 'babies.jpeg'),
       P('Baby Fabric', 'babyfabric.jpeg'), P('Dresses', 'dresses.jpeg'),
       P('Muslin Nappy', 'mn.jpeg'), P('Hosiery Nappy', 'hp.jpeg'), P('Towel', 'towel.jpeg'), P('Hood Towel',
         'hood.jpeg'),
      P('Baby Pillow / Travel Pillow', 'babytravel.jpeg'), P('Baby Night Suit', 'babynight.jpeg'),
       P('Dry Sheets', 'drysheet.jpeg'), P('Baby Massage Sheet', 'babymassage.jpeg'), 
       P('Feeding Apron', 'feedingapron.jpeg'), P('Cradle Cloth', 'cradle.jpeg'), 
       P('Baby Quilt', 'babyquilt.jpeg'), P('Sleeping Bag', 'sleepingbag.jpeg')
    ])] }
];

export const totalProducts = (c: Category) => c.groups.reduce((n, g) => n + g.items.length, 0);
/** Items shown in the small list on the Products page card, each with its link */
export const listing = (c: Category): { name: string; link: string[] }[] =>
  c.groups.length > 1 || c.groups[0].name
    ? c.groups.map(g => ({ name: g.name!, link: ['/products', c.slug, g.slug] }))
    : c.groups[0].items.map(i => ({ name: i.name, link: ['/products', c.slug, i.slug] }));