/* ===========================================================================
 * UpNext Marketing — SITE CONTENT
 * ---------------------------------------------------------------------------
 * THIS IS THE ONLY FILE YOU NEED TO EDIT to change copy, swap placeholder
 * assets, update client logos/quotes/numbers, or change links.
 *
 * Anything marked `PLACEHOLDER` is not a real asset yet. Each one is a
 * single-line edit. Search this file for "PLACEHOLDER" to find them all.
 * =========================================================================== */

/* ---------------------------------------------------------------------------
 * 1. THEME
 * ------------------------------------------------------------------------- */
export const theme = {
  /**
   * Headline typeface. One-line swap:
   *   'clash'   — Clash Display (default; modern, characterful)
   *   'anton'   — Anton (condensed, closest to the logo's weight)
   *   'archivo' — Archivo Black/Expanded (bold, wide, neutral)
   */
  headlineFont: 'clash' as 'clash' | 'anton' | 'archivo',
};

/* ---------------------------------------------------------------------------
 * 2. SITE / BRAND
 * ------------------------------------------------------------------------- */
export const site = {
  name: 'UpNext Marketing',
  shortName: 'UpNext',
  tagline: 'Video-led marketing for local businesses.',
  description:
    'UpNext Marketing builds the structure, identity, and system behind local businesses in Los Angeles and Glendale. Video-led marketing that turns local businesses into the ones everyone notices.',
  location: 'Los Angeles / Glendale, CA',
  email: 'upnextmarketinggroup@gmail.com',
  // PLACEHOLDER — swap with the real business phone number, or delete to hide.
  phone: '',
  /**
   * Canonical domain, used for metadata/OpenGraph links. Safe to leave blank —
   * lib/site-url.ts falls back to VERCEL_URL and then to a default, so the
   * build never depends on this being filled in.
   */
  url: 'https://upnextmarketing.com',
};

export const nav = {
  links: [
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
  ],
  cta: { label: 'Free Marketing Audit', href: '/#audit' },
};

export const socials = {
  // PLACEHOLDER — swap with the real Instagram handle/URL.
  instagram: 'https://instagram.com/upnextmarketing',
  // PLACEHOLDER — GoHighLevel calendar/booking link. Leave '' to hide the link.
  bookACall: '',
};

/* ---------------------------------------------------------------------------
 * 3. MEDIA — reel + work clips
 * ---------------------------------------------------------------------------
 * Drop real files into /public/media/ and point these at them, e.g.
 *   src: '/media/upnext-reel.mp4', poster: '/media/upnext-reel-poster.jpg'
 * `src: ''` renders a branded motion placeholder instead — nothing breaks.
 * ------------------------------------------------------------------------- */
export const media = {
  /* PLACEHOLDER REEL — swap with client footage. */
  heroReel: {
    src: '',
    poster: '',
    label: 'PLACEHOLDER REEL — swap with client footage',
  },
  /* PLACEHOLDER — founder clip or photo for the About sections. */
  founder: {
    src: '',
    poster: '',
    label: 'PLACEHOLDER — founder photo / clip',
  },
};

/* ---------------------------------------------------------------------------
 * 4. HOMEPAGE
 * ------------------------------------------------------------------------- */
export const hero = {
  eyebrow: 'Los Angeles · Glendale',
  /* Rendered word-by-word. `accent: true` paints a word in cyan. */
  headline: [
    { text: 'Structure,' },
    { text: 'identity,' },
    { text: 'and' },
    { text: 'the' },
    { text: 'system' },
    { text: 'that' },
    { text: 'gets' },
    { text: 'you' },
    { text: 'customers.', accent: true },
  ],
  subhead:
    'Video-led marketing that turns local businesses into the ones everyone notices.',
  primaryCta: { label: 'Free Marketing Audit', href: '#audit' },
  secondaryCta: { label: 'See the work', href: '/work' },
  scrollHint: 'Scroll',
};

export const workShowcase = {
  eyebrow: 'The work',
  headline: 'Look like the best option in town.',
  intro:
    'Real footage for real local businesses — shot, cut and placed where their customers already are.',
  cta: { label: 'See all work', href: '/work' },
  /* PLACEHOLDER CLIPS — swap `src`/`poster` with client footage. */
  items: [
    {
      title: 'Papas Meat & Seafood',
      kind: 'Brand film',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
      featured: true,
    },
    {
      title: 'Dr. Amir Orthodontics',
      kind: 'Patient story',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Local service business',
      kind: 'Social reel',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Retail storefront',
      kind: 'Paid ad creative',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
  ],
};

/* The respectful proof pattern: logo + quote in their words + one real number.
 * Nothing more. Two slots to start. */
export const proof = {
  eyebrow: 'Proof',
  headline: 'The results speak quietly. The work speaks first.',
  items: [
    {
      client: 'Papas Meat & Seafood',
      /* PLACEHOLDER LOGO — drop a file in /public/logos/ and set e.g. '/logos/papas.svg' */
      logo: '',
      /* PLACEHOLDER QUOTE — pull from testimonial video. */
      quote: '[CLIENT QUOTE — pull from testimonial video]',
      metric: {
        /* PLACEHOLDER NUMBER — replace `value` with the real figure. */
        value: 0,
        prefix: '',
        suffix: '',
        label: '[REAL RESULT]',
        /* Shown until a real number is entered above. */
        placeholder: true,
      },
    },
    {
      client: 'Dr. Amir Orthodontics',
      logo: '',
      quote: '[CLIENT QUOTE — pull from testimonial video]',
      metric: {
        value: 0,
        prefix: '',
        suffix: '',
        label: '[REAL RESULT]',
        placeholder: true,
      },
    },
  ],
};

/* Logo row / marquee. Add clients here as they come in. */
export const clientLogos = {
  label: 'Trusted by local businesses across LA',
  /* PLACEHOLDER LOGOS — set `logo` to an image path to replace the label box. */
  items: [
    { name: 'Papas Meat & Seafood', logo: '' },
    { name: 'Dr. Amir Orthodontics', logo: '' },
  ],
};

/* Services — named by the OUTCOME they drive, never the mechanism (§7). */
export const services = {
  eyebrow: 'What you get',
  headline: 'Four ways we make you the obvious choice.',
  intro:
    'Every piece is built to do one thing: put you in front of the right local customers and make them pick you.',
  cta: { label: 'Explore services', href: '/services' },
  items: [
    {
      slug: 'video-production',
      name: 'Video Production',
      outcome: 'Scroll-stopping content that makes people stop and look.',
      detail:
        'Footage that makes your business look like the best option in town — shot, lit and cut so it holds attention in the first two seconds.',
      /* Outcome-first detail for the Services page. No mechanics. No pricing. */
      points: [
        'Brand films that make a first impression you control',
        'Short-form reels built for how people actually scroll',
        'Customer and testimonial stories in their own words',
        'Ad creative made to perform, not just to look pretty',
      ],
    },
    {
      slug: 'paid-ads',
      name: 'Paid Ads (Meta & Google)',
      outcome: 'Get in front of the right local customers.',
      detail:
        'Your budget spent on the people most likely to walk in, call, or book — in your neighbourhood, not the whole internet.',
      points: [
        'Reach the customers inside your service area',
        'Spend that follows what is working, not guesses',
        'Creative and targeting built as one thing',
        'Clear reporting on what came back',
      ],
    },
    {
      slug: 'social-media',
      name: 'Social Media',
      outcome: 'Show up everywhere your customers already are.',
      detail:
        'A consistent presence that keeps you familiar, so that when someone needs what you sell, you are already the name they know.',
      points: [
        'A steady stream of content you never have to think about',
        'A feed that looks like a business people trust',
        'Comments and messages answered like a real person',
        'Momentum that compounds month after month',
      ],
    },
    {
      slug: 'growth-system',
      name: 'The Growth System',
      outcome: 'We turn attention into booked customers.',
      detail:
        'Attention is the easy half. Our system takes it from there and turns interest into people on your calendar — quietly, automatically, and without you chasing anyone. How it works stays ours. What it does is yours.',
      points: [
        'Every enquiry answered fast, day or night',
        'No lead forgotten, no follow-up missed',
        'Interest turned into booked appointments',
        'You do the work you are good at; the system does the rest',
      ],
      featured: true,
    },
  ],
};

/* One tight block on the homepage. Full story on /about. */
export const miniAbout = {
  eyebrow: 'Who we are',
  headline: 'A local team that shoots, builds, and answers the phone.',
  /* PLACEHOLDER COPY — replace with the founder's own words. */
  body: [
    'UpNext Marketing is a video-led agency in the Los Angeles area, built on a simple idea: the businesses that look the best are the ones people choose.',
    'We are not a niche shop. We have built the structure, identity and system behind restaurants, medical practices, service businesses and retail — because good marketing is the same craft, pointed at a different customer.',
  ],
  cta: { label: 'Read our story', href: '/about' },
};

export const finalCta = {
  eyebrow: 'Free marketing audit',
  headline: "Tell us what's holding your marketing back.",
  subhead:
    'Two quick steps. We look at where you are, tell you what we would do, and you decide from there.',
  reassurance: [
    'No obligation, no pitch deck',
    'A real person reviews your business',
    'You hear back the same day',
  ],
};

export const footer = {
  blurb: 'Video-led marketing for local businesses in Los Angeles and Glendale.',
  columns: [
    {
      title: 'Site',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
      ],
    },
    {
      title: 'Start',
      links: [
        { label: 'Free Marketing Audit', href: '/#audit' },
        { label: 'Scan / Links', href: '/start' },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * 5. WORK PAGE
 * ------------------------------------------------------------------------- */
export const workPage = {
  eyebrow: 'Work',
  headline: 'The footage does the arguing.',
  intro:
    'A look at what we have made for local businesses — restaurants, practices, service companies and storefronts.',
  /* PLACEHOLDER CLIPS — swap with real client footage. */
  projects: [
    {
      title: 'Papas Meat & Seafood',
      kind: 'Brand film · Social reels · Paid creative',
      blurb:
        'A neighbourhood butcher and seafood counter, shot to look like the best in the city.',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Dr. Amir Orthodontics',
      kind: 'Patient stories · Paid creative',
      blurb:
        'Real patients, real words — the kind of proof a practice cannot buy.',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Local service business',
      kind: 'Social reels',
      blurb: 'Short-form content built for the way people scroll.',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Retail storefront',
      kind: 'Brand film · Paid creative',
      blurb: 'Making a small shop look like a destination.',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Restaurant launch',
      kind: 'Launch campaign',
      blurb: 'Opening week, filled by people who already knew the name.',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
    {
      title: 'Medical practice',
      kind: 'Brand film',
      blurb: 'A practice that feels as careful on screen as it is in person.',
      src: '',
      poster: '',
      label: 'PLACEHOLDER CLIP — swap with client footage',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * 6. SERVICES PAGE
 * ------------------------------------------------------------------------- */
export const servicesPage = {
  eyebrow: 'Services',
  headline: 'Sold by what it does for you.',
  intro:
    'Everything below is described by the result. If you want to know how it works under the hood, that is what the call is for.',
  closer: {
    headline: 'Not sure which one you need?',
    body: 'Most owners are not. That is what the free audit is for — we look at your business and tell you where the gap actually is.',
  },
};

/* ---------------------------------------------------------------------------
 * 7. ABOUT PAGE
 * ------------------------------------------------------------------------- */
export const aboutPage = {
  eyebrow: 'About',
  headline: 'Built by someone who grew up around local business.',
  /* PLACEHOLDER COPY — replace all of this with the founder's real story. */
  lead:
    '[PLACEHOLDER — founder story lead paragraph. One or two sentences on why UpNext exists, in the founder\'s own voice.]',
  body: [
    '[PLACEHOLDER — where the founder is from and what they noticed about local businesses in the LA / Glendale area.]',
    '[PLACEHOLDER — how UpNext started, and the first clients who took a chance on it.]',
    '[PLACEHOLDER — what the team believes about craft, and why the work looks the way it does.]',
  ],
  founder: {
    /* PLACEHOLDER — founder name and role. */
    name: '[FOUNDER NAME]',
    role: 'Founder, UpNext Marketing',
  },
  values: [
    {
      title: 'Craft first',
      body: 'If the work does not look excellent, nothing else matters. Quality is the argument.',
    },
    {
      title: 'Local, actually',
      body: 'We are in your city. We shoot in your shop. We know your customers because they are ours too.',
    },
    {
      title: 'Plain answers',
      body: 'No jargon, no dashboards nobody reads. We tell you what we did and what it produced.',
    },
    {
      title: 'One team, whole picture',
      body: 'Structure, identity and system in one place — so nothing falls between vendors.',
    },
  ],
  behindTheScenes: {
    headline: 'Behind the scenes',
    /* PLACEHOLDER — behind-the-scenes stills or clips. */
    items: [
      { label: 'PLACEHOLDER — BTS still', src: '' },
      { label: 'PLACEHOLDER — BTS still', src: '' },
      { label: 'PLACEHOLDER — BTS still', src: '' },
    ],
  },
};

/* ---------------------------------------------------------------------------
 * 8. /start — QR code + t-shirt landing page
 * ------------------------------------------------------------------------- */
export const startPage = {
  greeting: "Scanned my shirt? Let's grow your business.",
  subhead:
    'One free look at your marketing, from a local team that does this every day.',
  primary: { label: 'Get a Free Marketing Audit', href: '/#audit' },
  secondary: [
    { label: 'See our work', href: '/work' },
    { label: 'Watch the reel', href: '/work#reel' },
    { label: 'Instagram', href: 'INSTAGRAM' },   // 'INSTAGRAM' resolves to socials.instagram
    { label: 'Book a call', href: 'BOOK_A_CALL' }, // resolves to socials.bookACall; hidden if empty
  ],
  footnote: 'Los Angeles · Glendale',
};

/* ---------------------------------------------------------------------------
 * 9. LEAD FORM
 * ------------------------------------------------------------------------- */
export const leadForm = {
  step1: {
    title: 'First, the basics.',
    hint: 'Takes 10 seconds.',
    fields: {
      name: { label: 'Your name', placeholder: 'Jane Alvarez' },
      business: { label: 'Business name', placeholder: 'Papas Meat & Seafood' },
    },
    submitLabel: 'Continue',
  },
  step2: {
    title: 'Now the part that helps us help you.',
    hint: 'Last step.',
    fields: {
      industry: {
        label: 'Business type',
        placeholder: 'Select your industry',
        options: [
          'Restaurant / Food & Beverage',
          'Medical / Dental',
          'Home & Trade Services',
          'Retail / Storefront',
          'Beauty / Wellness',
          'Real Estate',
          'Automotive',
          'Fitness',
          'Professional Services',
          'Other',
        ],
      },
      phone: { label: 'Phone', placeholder: '(818) 555-0134' },
      email: { label: 'Email', placeholder: 'you@yourbusiness.com' },
      challenge: {
        label: "What's limiting your business marketing right now?",
        placeholder:
          'In your own words — the more honest, the more useful the audit.',
      },
      budget: {
        label: 'Monthly marketing budget',
        placeholder: 'Select a range',
        options: [
          'Under $1,000 / month',
          '$1,000 – $2,500 / month',
          '$2,500 – $5,000 / month',
          '$5,000 – $10,000 / month',
          '$10,000+ / month',
          'Not sure yet',
        ],
      },
    },
    backLabel: 'Back',
    submitLabel: 'Get my free audit',
  },
  success: {
    title: "Got it. You're on the list.",
    body: 'We are looking at your business now — expect a text or email from us shortly with what we found.',
    secondary: 'In the meantime, have a look at the work.',
    secondaryCta: { label: 'See our work', href: '/work' },
  },
  errors: {
    generic: 'Something went wrong sending that. Please try again in a moment.',
    required: 'This one is required.',
    email: 'That email does not look right.',
    phone: 'That phone number does not look right.',
  },
};
