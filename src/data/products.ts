import heroVerdantHarvest from '../assets/images/hero_verdant_harvest_1794581682098.jpg';
import storyFarmHarvest from '../assets/images/story_farm_harvest_1794581682512.jpg';

import imgAlphonsoMangoes from '../assets/images/prod_alphonso_mangoes_1794581684029.jpg';
import imgNilgiriStrawberries from '../assets/images/prod_nilgiri_strawberries_1794581683332.jpg';
import imgGalaApples from '../assets/images/prod_gala_apples_1794581683914.jpg';
import imgHeirloomTomatoes from '../assets/images/prod_heirloom_tomatoes_1794581684002.jpg';
import imgBabySpinachKale from '../assets/images/prod_baby_spinach_kale_1794581684573.jpg';
import imgPurpleCarrotsRadish from '../assets/images/prod_purple_carrots_radish_1794581686461.jpg';
import imgGirCowGhee from '../assets/images/prod_gir_cow_ghee_1794581685613.jpg';
import imgPastureEggs from '../assets/images/prod_pasture_eggs_1794581686374.jpg';
import imgArtisanalBurrata from '../assets/images/prod_artisanal_burrata_1794581684925.jpg';
import imgCountrySourdough from '../assets/images/prod_country_sourdough_1794581686505.jpg';
import imgButterCroissants from '../assets/images/prod_butter_croissants_1794581686776.jpg';
import imgSeededRyeLoaf from '../assets/images/prod_seeded_rye_loaf_1794581687335.jpg';
import imgRoastedAlmonds from '../assets/images/prod_roasted_almonds_1794581688245.jpg';
import imgDarkChocolateBark from '../assets/images/prod_dark_chocolate_bark_1794581686673.jpg';
import imgSpicedMakhana from '../assets/images/prod_spiced_makhana_1794581688292.jpg';
import imgDarjeelingTea from '../assets/images/prod_darjeeling_tea_1794581688304.jpg';
import imgOrangeGingerJuice from '../assets/images/prod_orange_ginger_juice_1794581777233.jpg';
import imgArabicaCoffee from '../assets/images/prod_arabica_coffee_1794581688550.jpg';
import imgOliveOil from '../assets/images/prod_olive_oil_1794581777239.jpg';
import imgBasmatiRice from '../assets/images/prod_basmati_rice_1794581693683.jpg';
import imgWildflowerHoney from '../assets/images/prod_wildflower_honey_1794581777145.jpg';
import imgEucalyptusCleaner from '../assets/images/prod_eucalyptus_cleaner_1794581780057.jpg';
import imgCastileDishwash from '../assets/images/prod_castile_dishwash_1794581779021.jpg';
import imgBeeswaxWraps from '../assets/images/prod_beeswax_wraps_1794581795137.jpg';

import { CategoryId, Product } from '../types';

export const HERO_IMAGE = heroVerdantHarvest;
export const STORY_IMAGE = storyFarmHarvest;

export interface CategoryMeta {
  id: CategoryId;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'Fresh Fruits',
    description: 'Orchard-picked seasonal harvests',
    image: imgAlphonsoMangoes,
  },
  {
    id: 'Vegetables',
    description: 'Morning-cut heirloom & leafy greens',
    image: imgHeirloomTomatoes,
  },
  {
    id: 'Dairy & Eggs',
    description: 'Pasture-raised & cultured small-batch',
    image: imgGirCowGhee,
  },
  {
    id: 'Bakery',
    description: 'Slow-fermented stone-hearth loaves',
    image: imgCountrySourdough,
  },
  {
    id: 'Snacks',
    description: 'Single-origin cacao & roasted nuts',
    image: imgDarkChocolateBark,
  },
  {
    id: 'Beverages',
    description: 'Single-estate teas, roasts & cold-press',
    image: imgDarjeelingTea,
  },
  {
    id: 'Pantry Essentials',
    description: 'Cold-pressed oils, honeys & aged grains',
    image: imgOliveOil,
  },
  {
    id: 'Household',
    description: 'Botanical care & reusable kitchen wraps',
    image: imgEucalyptusCleaner,
  },
];

export const PRODUCTS: Product[] = [
  // 1. Fresh Fruits
  {
    id: 'vm-fruit-01',
    slug: 'ratnagiri-alphonso-mangoes',
    name: 'Ratnagiri Alphonso Mangoes',
    category: 'Fresh Fruits',
    price: 680,
    originalPrice: 780,
    unit: '1 kg (4–5 pcs)',
    origin: 'Ratnagiri, Maharashtra',
    availability: 'Seasonal Harvest',
    inStock: true,
    bestseller: true,
    seasonal: true,
    specialOffer: true,
    image: imgAlphonsoMangoes,
    shortDescription: 'Naturally hay-ripened coastal Alphonso mangoes prized for their saffron-hued pulp and floral aroma.',
    tastingNotes: 'Rich honeyed nectar, velvety fibre-free flesh, subtle citrus finish.',
    storageGuide: 'Keep at room temperature away from direct sun until fragrant; chill 2 hours before slicing.',
    harvestWindow: 'Picked 36 hours prior to dispatch',
  },
  {
    id: 'vm-fruit-02',
    slug: 'nilgiri-highland-strawberries',
    name: 'Nilgiri Highland Strawberries',
    category: 'Fresh Fruits',
    price: 295,
    originalPrice: 340,
    unit: '250 g punnet',
    origin: 'Coonoor, Tamil Nadu',
    availability: 'In Stock',
    inStock: true,
    seasonal: true,
    specialOffer: true,
    image: imgNilgiriStrawberries,
    shortDescription: 'Dew-kissed hill-grown berries harvested at peak crimson sweetness with zero synthetic wax.',
    tastingNotes: 'Bright berry acidity balanced with jammy sweetness and fragrant aroma.',
    storageGuide: 'Refrigerate unwashed at 2–4°C; rinse gently in cool water just before serving.',
    harvestWindow: 'Morning mountain harvest',
  },
  {
    id: 'vm-fruit-03',
    slug: 'kinnaur-royal-gala-apples',
    name: 'Kinnaur Royal Gala Apples',
    category: 'Fresh Fruits',
    price: 340,
    unit: '1 kg (6 pcs)',
    origin: 'Kinnaur, Himachal Pradesh',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    image: imgGalaApples,
    shortDescription: 'Crisp high-altitude orchard apples grown in mineral-rich Himalayan soil for an unmistakable snap.',
    tastingNotes: 'Crisp floral honey sweetness with a clean, refreshing crunch.',
    storageGuide: 'Store in the refrigerator crisper drawer to maintain crispness for up to 14 days.',
    harvestWindow: 'Cold-stored mountain lot',
  },

  // 2. Vegetables
  {
    id: 'vm-veg-01',
    slug: 'heirloom-vine-tomatoes',
    name: 'Heirloom Vine Tomatoes',
    category: 'Vegetables',
    price: 165,
    originalPrice: 195,
    unit: '500 g',
    origin: 'Nandi Hills, Karnataka',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    specialOffer: true,
    image: imgHeirloomTomatoes,
    shortDescription: 'Sun-ripened ruby and amber heirloom tomatoes left on the vine for concentrated sweetness.',
    tastingNotes: 'Balanced umami depth, bright acidity, thin skin and aromatic calyx.',
    storageGuide: 'Store stem-side up at cool room temperature; avoid refrigeration for peak flavour.',
    harvestWindow: 'Cut daily at sunrise',
  },
  {
    id: 'vm-veg-02',
    slug: 'baby-spinach-curly-kale-mix',
    name: 'Baby Spinach & Curly Kale Mix',
    category: 'Vegetables',
    price: 140,
    unit: '200 g bunch',
    origin: 'Mulshi Valley, Maharashtra',
    availability: 'In Stock',
    inStock: true,
    seasonal: true,
    image: imgBabySpinachKale,
    shortDescription: 'Triple-washed tender baby spinach and crisp curly kale leaves harvested from pesticide-free beds.',
    tastingNotes: 'Mild earthy sweetness with delicate crunch and zero bitterness.',
    storageGuide: 'Wrap loosely in a damp linen cloth inside the refrigerator crisper; use within 4 days.',
    harvestWindow: 'Picked 18 hours prior',
  },
  {
    id: 'vm-veg-03',
    slug: 'ooty-purple-carrots-pink-radish',
    name: 'Ooty Purple Carrots & Radish',
    category: 'Vegetables',
    price: 155,
    unit: '500 g bundle',
    origin: 'Ooty, Tamil Nadu',
    availability: 'Seasonal Harvest',
    inStock: true,
    seasonal: true,
    image: imgPurpleCarrotsRadish,
    shortDescription: 'Earthy anthocyanin-rich purple carrots paired with peppery pink radishes, still with fresh tops.',
    tastingNotes: 'Sweet, nutty roasted notes in the carrots; crisp peppery bite in the radish.',
    storageGuide: 'Trim leafy tops (save for pesto) and refrigerate roots in an airtight container.',
    harvestWindow: 'Small-batch highland harvest',
  },

  // 3. Dairy & Eggs
  {
    id: 'vm-dairy-01',
    slug: 'a2-gir-cow-cultured-ghee',
    name: 'A2 Gir Cow Cultured Ghee',
    category: 'Dairy & Eggs',
    price: 960,
    originalPrice: 1120,
    unit: '500 ml jar',
    origin: 'Junagadh, Gujarat',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    specialOffer: true,
    image: imgGirCowGhee,
    shortDescription: 'Slow-churned bilona cultured ghee crafted from free-grazing Gir cows and clarified in small brass vessels.',
    tastingNotes: 'Warm toasted hazelnut aroma, granular golden texture, rich lingering finish.',
    storageGuide: 'Keep tightly sealed in a cool pantry cabinet; always use a dry spoon.',
    harvestWindow: 'Churned weekly in small batches',
  },
  {
    id: 'vm-dairy-02',
    slug: 'pasture-raised-brown-eggs',
    name: 'Free-Range Pasture Eggs',
    category: 'Dairy & Eggs',
    price: 285,
    unit: 'Pack of 12',
    origin: 'Kanakapura, Karnataka',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    image: imgPastureEggs,
    shortDescription: 'Deep-amber yolked eggs from heritage hens foraging freely on clover, herbs, and organic grain.',
    tastingNotes: 'Creamy, rich custard-like yolks and firm whites ideal for poaching.',
    storageGuide: 'Refrigerate in original molded fiber carton at 4°C; best within 21 days.',
    harvestWindow: 'Collected daily',
  },
  {
    id: 'vm-dairy-03',
    slug: 'artisanal-hand-spun-burrata',
    name: 'Artisanal Hand-Spun Burrata',
    category: 'Dairy & Eggs',
    price: 420,
    unit: '150 g pouch',
    origin: 'Panchgani Creamery, Maharashtra',
    availability: 'Low Stock',
    inStock: true,
    seasonal: true,
    image: imgArtisanalBurrata,
    shortDescription: 'Delicate stretched-curd mozzarella shell filled with silky stracciatella and fresh sweet cream.',
    tastingNotes: 'Milky, subtly salted, cloud-soft interior that melts over warm sourdough or tomatoes.',
    storageGuide: 'Keep submerged in whey at 2–4°C; bring to room temperature 20 minutes before serving.',
    harvestWindow: 'Spun every Tuesday & Friday',
  },

  // 4. Bakery
  {
    id: 'vm-bake-01',
    slug: 'country-fermented-sourdough',
    name: '48-Hour Country Sourdough',
    category: 'Bakery',
    price: 260,
    unit: '600 g boule',
    origin: 'Verdant Hearth Bakery',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    image: imgCountrySourdough,
    shortDescription: 'Naturally leavened stone-milled wheat boule fermented for 48 hours for deep aroma and open crumb.',
    tastingNotes: 'Caramelized blistered crust, gentle lactic tang, pillowy hydrated interior.',
    storageGuide: 'Wrap in linen or beeswax wrap for 3 days; slice and freeze for up to 1 month.',
    harvestWindow: 'Baked fresh every 6:00 AM',
  },
  {
    id: 'vm-bake-02',
    slug: 'cultured-butter-croissants',
    name: 'French Cultured Butter Croissants',
    category: 'Bakery',
    price: 380,
    originalPrice: 440,
    unit: 'Box of 4',
    origin: 'Verdant Hearth Bakery',
    availability: 'In Stock',
    inStock: true,
    specialOffer: true,
    image: imgButterCroissants,
    shortDescription: 'Twenty-seven flaky laminated layers made with Normandy-style cultured butter and unbleached flour.',
    tastingNotes: 'Crisp shattering golden shell with honeycomb cultured-butter crumb.',
    storageGuide: 'Warm at 175°C for 4 minutes before serving to restore bakery crispness.',
    harvestWindow: 'Morning bake dispatch',
  },
  {
    id: 'vm-bake-03',
    slug: 'wholegrain-seeded-rye-loaf',
    name: 'Wholegrain Seeded Rye Loaf',
    category: 'Bakery',
    price: 290,
    unit: '500 g loaf',
    origin: 'Verdant Hearth Bakery',
    availability: 'In Stock',
    inStock: true,
    image: imgSeededRyeLoaf,
    shortDescription: 'Dense, nourishing dark rye tin loaf crusted with toasted pumpkin, sunflower, and flax seeds.',
    tastingNotes: 'Malty cocoa undertones, nutty toasted seed crunch, moist lasting crumb.',
    storageGuide: 'Keep wrapped in paper or airtight tin for up to 5 days; ideal toasted thin.',
    harvestWindow: 'Baked daily',
  },

  // 5. Snacks
  {
    id: 'vm-snack-01',
    slug: 'roasted-kashmiri-almonds-sea-salt',
    name: 'Roasted Kashmiri Almonds & Sea Salt',
    category: 'Snacks',
    price: 495,
    originalPrice: 560,
    unit: '200 g',
    origin: 'Pampore, Kashmir',
    availability: 'In Stock',
    inStock: true,
    specialOffer: true,
    image: imgRoastedAlmonds,
    shortDescription: 'High-oil heirloom Mamra & Kashmiri almonds slow-roasted dry and finished with coastal flaky sea salt.',
    tastingNotes: 'Intensely nutty, crisp snap, balanced mineral salinity.',
    storageGuide: 'Reseal pouch tightly after opening; store in a cool dry cupboard.',
    harvestWindow: 'Roasted weekly',
  },
  {
    id: 'vm-snack-02',
    slug: 'idukki-dark-chocolate-bark',
    name: '72% Idukki Dark Chocolate Bark',
    category: 'Snacks',
    price: 450,
    unit: '150 g box',
    origin: 'Idukki, Kerala',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    image: imgDarkChocolateBark,
    shortDescription: 'Single-origin Malabar cacao stone-ground for 48 hours and studded with roasted pistachios and sea salt.',
    tastingNotes: 'Deep roasted cacao, notes of dried fig and espresso, crisp pistachio crunch.',
    storageGuide: 'Keep below 22°C away from humidity; avoid fridge condensation.',
    harvestWindow: 'Crafted in micro-batches',
  },
  {
    id: 'vm-snack-03',
    slug: 'herb-pepper-roasted-makhana',
    name: 'Cracked Pepper & Herb Makhana',
    category: 'Snacks',
    price: 215,
    unit: '100 g',
    origin: 'Mithila, Bihar',
    availability: 'In Stock',
    inStock: true,
    image: imgSpicedMakhana,
    shortDescription: 'Light, crisp popped lotus seeds tumbled in olive oil, Tellicherry black pepper, and garden rosemary.',
    tastingNotes: 'Airy crunch, warm peppery spice, aromatic rosemary finish.',
    storageGuide: 'Store airtight in a cool cupboard to retain crisp texture.',
    harvestWindow: 'Freshly popped weekly',
  },

  // 6. Beverages
  {
    id: 'vm-bev-01',
    slug: 'darjeeling-first-flush-tea',
    name: 'Darjeeling First Flush Whole Leaf',
    category: 'Beverages',
    price: 620,
    unit: '100 g caddy',
    origin: 'Kurseong Estate, West Bengal',
    availability: 'Seasonal Harvest',
    inStock: true,
    seasonal: true,
    bestseller: true,
    image: imgDarjeelingTea,
    shortDescription: 'Spring-plucked silvery tips yielding a luminous pale-gold infusion with unmistakable muscatel fragrance.',
    tastingNotes: 'Spring jasmine blossoms, crisp white peach, delicate brisk finish.',
    storageGuide: 'Store in the airtight caddy away from light and strong kitchen aromas.',
    harvestWindow: 'Spring 2026 First Flush',
  },
  {
    id: 'vm-bev-02',
    slug: 'cold-pressed-orange-ginger',
    name: 'Cold-Pressed Valencia Orange & Ginger',
    category: 'Beverages',
    price: 185,
    unit: '300 ml glass bottle',
    origin: 'Pressed at Verdant Kitchen',
    availability: 'In Stock',
    inStock: true,
    image: imgOrangeGingerJuice,
    shortDescription: 'Unpasteurized hydraulic cold-pressed citrus layered with bright heirloom ginger root—zero added sugar.',
    tastingNotes: 'Zesty sun-sweet citrus followed by a clean, warming ginger kick.',
    storageGuide: 'Keep refrigerated at 2–4°C; shake gently and consume within 48 hours.',
    harvestWindow: 'Pressed every morning',
  },
  {
    id: 'vm-bev-03',
    slug: 'chikmagalur-arabica-whole-bean',
    name: 'Chikmagalur Estate Arabica Beans',
    category: 'Beverages',
    price: 540,
    originalPrice: 610,
    unit: '250 g bag',
    origin: 'Baba Budangiri, Karnataka',
    availability: 'In Stock',
    inStock: true,
    specialOffer: true,
    image: imgArabicaCoffee,
    shortDescription: 'Shade-grown single-estate washed Arabica roasted medium-light for pour-over, AeroPress, and filter.',
    tastingNotes: 'Toasted cacao nibs, caramelised cane sugar, bright mandarin acidity.',
    storageGuide: 'Keep in the one-way valve bag in a dark cupboard; grind right before brewing.',
    harvestWindow: 'Roasted every Wednesday',
  },

  // 7. Pantry Essentials
  {
    id: 'vm-pantry-01',
    slug: 'cold-pressed-extra-virgin-olive-oil',
    name: 'Cold-Pressed Extra Virgin Olive Oil',
    category: 'Pantry Essentials',
    price: 1180,
    originalPrice: 1350,
    unit: '500 ml dark glass',
    origin: 'Single-Grove Harvest',
    availability: 'In Stock',
    inStock: true,
    bestseller: true,
    specialOffer: true,
    image: imgOliveOil,
    shortDescription: 'First-press unfiltered olive oil bottled in UV-protective dark glass to preserve vibrant polyphenols.',
    tastingNotes: 'Fresh cut grass, green almond, balanced peppery finish.',
    storageGuide: 'Store in a cool dark cupboard away from stove heat.',
    harvestWindow: 'Early harvest cold extraction',
  },
  {
    id: 'vm-pantry-02',
    slug: 'aged-himalayan-basmati-rice',
    name: '24-Month Aged Himalayan Basmati',
    category: 'Pantry Essentials',
    price: 360,
    unit: '1 kg linen pouch',
    origin: 'Dehradun Foothills, Uttarakhand',
    availability: 'In Stock',
    inStock: true,
    image: imgBasmatiRice,
    shortDescription: 'Traditional snow-fed foothill basmati aged two full years for extraordinary grain elongation and fragrance.',
    tastingNotes: 'Delicate pandan-like aroma, slender non-sticky fluffy grains.',
    storageGuide: 'Keep sealed in a dry pantry; soak 30 minutes before steaming.',
    harvestWindow: '24-month cellar-aged lot',
  },
  {
    id: 'vm-pantry-03',
    slug: 'raw-wildflower-forest-honey',
    name: 'Raw Wildflower Forest Honey',
    category: 'Pantry Essentials',
    price: 480,
    unit: '350 g glass jar',
    origin: 'Coorg, Karnataka',
    availability: 'In Stock',
    inStock: true,
    seasonal: true,
    image: imgWildflowerHoney,
    shortDescription: 'Unheated, coarsely strained multifloral honey ethically gathered from biodiverse Western Ghats canopies.',
    tastingNotes: 'Warm cardamom blossom, toasted amber, subtle herbal depth.',
    storageGuide: 'Store at ambient room temperature; natural crystallization indicates raw purity.',
    harvestWindow: 'Seasonal forest harvest',
  },

  // 8. Household
  {
    id: 'vm-home-01',
    slug: 'botanical-eucalyptus-surface-spray',
    name: 'Botanical Eucalyptus Surface Mist',
    category: 'Household',
    price: 390,
    unit: '500 ml amber glass',
    origin: 'Nilgiri Essential Oils',
    availability: 'In Stock',
    inStock: true,
    image: imgEucalyptusCleaner,
    shortDescription: 'Plant-derived biodegradable counter cleaner scented purely with steam-distilled Nilgiri eucalyptus.',
    tastingNotes: 'Crisp woodland eucalyptus and crushed mint leaf aroma; safe on marble & wood.',
    storageGuide: 'Store upright at room temperature; refillable amber glass bottle.',
    harvestWindow: 'Small-batch botanical blend',
  },
  {
    id: 'vm-home-02',
    slug: 'castile-botanical-dish-wash',
    name: 'Cold-Pressed Castile Dish Wash',
    category: 'Household',
    price: 440,
    originalPrice: 510,
    unit: '500 ml ceramic pump',
    origin: 'Crafted in Puducherry',
    availability: 'In Stock',
    inStock: true,
    specialOffer: true,
    image: imgCastileDishwash,
    shortDescription: 'Gentle olive-and-coconut castile formula that cuts kitchen grease effortlessly without drying hands.',
    tastingNotes: 'Light lemon verbena and sage botanical scent; greywater safe.',
    storageGuide: 'Refill ceramic dispenser from compostable pouches; keep out of frost.',
    harvestWindow: 'Cold-process saponified',
  },
  {
    id: 'vm-home-03',
    slug: 'unbleached-beeswax-food-wraps',
    name: 'Unbleached Beeswax Food Wraps',
    category: 'Household',
    price: 520,
    unit: 'Set of 3 (S, M, L)',
    origin: 'Jaipur Craft Collective',
    availability: 'In Stock',
    inStock: true,
    image: imgBeeswaxWraps,
    shortDescription: 'Organic GOTS-certified cotton infused with pure forest beeswax and tree resin to replace single-use plastic.',
    tastingNotes: 'Subtle natural honey-wax warmth; molds smoothly around bowls, bread, and herbs.',
    storageGuide: 'Rinse with cool water and mild soap; air dry flat and reuse for up to 12 months.',
    harvestWindow: 'Hand-coated in small runs',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  quote: string;
  outcome: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Deshmukh',
    role: 'Culinary Director, Atelier Spice',
    city: 'Mumbai',
    quote:
      'Switching our test kitchen produce to Verdant Market transformed how we prep. The heirloom vine tomatoes arrive with intact stems and genuine sun-ripened fragrance—not cold-storage wateriness.',
    outcome: 'Weekly chef pantry & produce standing order since 2025',
  },
  {
    id: 't2',
    name: 'Rohan & Meera Kulkarni',
    role: 'Architects & Home Cooks',
    city: 'Bengaluru',
    quote:
      'Before Verdant Market, finding 48-hour fermented sourdough, pasture eggs, and A2 bilona ghee in one calm, reliable delivery meant three separate errands. Now our weekend table comes in a single chilled crate.',
    outcome: 'Saved 3+ hours every weekend across 40+ deliveries',
  },
  {
    id: 't3',
    name: 'Dr. Kavita Subramanian',
    role: 'Nutritionist & Author',
    city: 'Chennai',
    quote:
      'Their transparency on harvest windows and farm origins sets a rare benchmark. Every leaf in the spinach and kale bundle stays crisp for days without plastic clam-shells.',
    outcome: '100% plastic-free fresh produce transition',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Sourcing' | 'Delivery' | 'Orders & Demo';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Sourcing',
    question: 'How close to delivery is your fresh produce harvested?',
    answer:
      'Leafy greens, vine tomatoes, and highland berries are harvested between 18 and 36 hours before arriving at your kitchen. Rather than sitting in central warehouses for a week, orders are routed directly from partner farms through our temperature-controlled sorting hubs.',
  },
  {
    id: 'faq-2',
    category: 'Sourcing',
    question: 'Are your fruits and vegetables certified organic or residue-free?',
    answer:
      'Every farm partner grows using regenerative, chemical-free, or certified organic practices. We publish the exact region and harvest window on every product page and conduct periodic soil and residue audits.',
  },
  {
    id: 'faq-3',
    category: 'Delivery',
    question: 'How is the delivery fee calculated?',
    answer:
      'Orders of ₹999 or more qualify for complimentary chilled doorstep delivery. For baskets under ₹999, a flat ₹60 insulated cold-chain delivery fee applies to keep dairy, bakery, and produce at optimal temperature.',
  },
  {
    id: 'faq-4',
    category: 'Delivery',
    question: 'What packaging does VERDANT MARKET use?',
    answer:
      'We pack orders in returnable insulated crates, breathable unbleached paper bags, and molded fiber egg cartons—eliminating single-use plastic cling film wherever possible.',
  },
  {
    id: 'faq-5',
    category: 'Orders & Demo',
    question: 'Is this a real checkout or a demonstration storefront?',
    answer:
      'This website is an interactive e-commerce demonstration for VERDANT MARKET. Your shopping bag, saved wishlist, and completed demo orders are stored locally in your browser so you can test the full storefront experience without entering real payment credentials.',
  },
  {
    id: 'faq-6',
    category: 'Orders & Demo',
    question: 'What is your Freshness Guarantee?',
    answer:
      'If any fruit, loaf, or dairy item ever arrives below our harvest standard, our customer care team issues an instant credit or same-day replacement—no lengthy forms required.',
  },
];
