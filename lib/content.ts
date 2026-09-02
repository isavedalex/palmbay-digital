/**
 * Static homepage content. Sanity's `home` document overrides the hero fields
 * (heading / subheading / body / ctaLabel / ctaUrl) when populated; everything
 * else is served from here so the site is complete with an empty dataset.
 */

export const site = {
  name: "Palm Bay Digital",
  email: "alex@palmbay.digital",
  location: "Margate, Kent",
  tagline: "Websites for small businesses that want to be found.",
};

export const nav = {
  links: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Let’s talk", href: "#contact" },
};

export const hero = {
  heading: "Websites for small businesses that want to be found.",
  subheading: "Web design studio in Margate, Kent",
  body: "We design and build fast, good-looking websites for local businesses, then host them, keep them updated and make sure Google can find them. One simple monthly subscription, no agency runaround.",
  ctaLabel: "Let’s talk",
  ctaUrl: "#contact",
  secondaryLabel: "See our work",
  secondaryUrl: "#work",
};

export interface WorkItem {
  name: string;
  description: string;
  url: string;
  image: string;
  alt: string;
}

export const work: WorkItem[] = [
  {
    name: "Ellwood Studio",
    description: "Private one-to-one personal training in Cliftonville. Bold, dark and built to book consultations.",
    url: "https://ellwood.studio",
    image: "/images/work/ellwood-studio.jpg",
    alt: "Ellwood Studio homepage",
  },
  {
    name: "Cork & Capture",
    description: "Portable CO₂ recovery for breweries and wineries. Five-language site with a blog that posts itself to Google.",
    url: "https://www.corkandcapture.com",
    image: "/images/work/cork-and-capture.jpg",
    alt: "Cork & Capture homepage",
  },
  {
    name: "Minnow",
    description: "A clean-infrastructure investment fund. Animated, editorial and hosted in the EU to suit the client.",
    url: "https://minnow.eco",
    image: "/images/work/minnow.jpg",
    alt: "Minnow homepage",
  },
  {
    name: "Palms Build.Co",
    description: "Landscapers and builders across Thanet. Built to win quote requests from Google searches.",
    url: "https://www.palmsbuild.co",
    image: "/images/work/palms-build.jpg",
    alt: "Palms Build.Co homepage",
  },
  {
    name: "Your Bold Birth",
    description: "Antenatal courses and doula services in East Kent. Warm, illustrated and easy to book.",
    url: "https://www.yourboldbirth.co.uk",
    image: "/images/work/your-bold-birth.jpg",
    alt: "Your Bold Birth homepage",
  },
];

export interface Service {
  title: string;
  description: string;
  icon: "design" | "host" | "search";
}

export const services: Service[] = [
  {
    icon: "design",
    title: "Design & build",
    description:
      "A bespoke website designed around your business, not a template with your logo dropped in. Fast, mobile-first and built on modern tech that stays quick as it grows.",
  },
  {
    icon: "host",
    title: "Hosting, updates & support",
    description:
      "We host it, secure it, connect your domain and keep it running. You get a simple editor to change words and pictures yourself, and we’re a message away when you need a hand.",
  },
  {
    icon: "search",
    title: "Found on Google",
    description:
      "Every site ships with the technical groundwork search engines expect, plus a Google Business Profile set up properly, so local customers actually find you.",
  },
];

export const process = {
  heading: "A simple process, from first chat to live site",
  intro:
    "No long briefs, no six-week timelines. We keep things moving and keep you in the loop.",
  steps: [
    {
      title: "Chat",
      description: "A quick call or email about what you do, who your customers are and what you need the site to do.",
    },
    {
      title: "Preview",
      description: "We build a real, working preview of your site. You see it in your browser, not a mock-up.",
    },
    {
      title: "Refine",
      description: "Tell us what to change. Copy, photos, colours, pages. We tweak until it feels like yours.",
    },
    {
      title: "Go live",
      description: "Domain connected, Google set up, and you’re live within days of saying yes.",
    },
  ],
};

export const marquee = ["Built in Margate, Kent", "Simple, fast, findable", "Websites that earn their keep"];

export const statement = {
  heading: "Small businesses deserve websites as good as the big ones.",
  body: "We started Palm Bay Digital because too many great local businesses were stuck with slow, dated sites or none at all. Good design, quick loading and being findable on Google shouldn’t be reserved for companies with a marketing department.",
};

export const clients = {
  heading: "Who we work with",
  intro: "From sole traders to funded start-ups, mostly across Kent and the UK.",
  groups: [
    {
      title: "Trades & services",
      description: "Builders, plumbers, landscapers, movers and cleaners who need quote requests, not vanity metrics.",
    },
    {
      title: "Hospitality & food",
      description: "Restaurants, pizzerias, bars, campers for hire and wine makers who want bookings and a site that looks the part.",
    },
    {
      title: "Independent professionals",
      description: "Therapists, doulas, photographers and consultants whose website is the first impression.",
    },
  ],
};

export const contact = {
  heading: "Let’s talk",
  body: "Tell us a little about your business and what you’re after. We’ll reply within a working day, usually with a few ideas and a plan for a preview.",
  email: site.email,
  location: "Margate, Kent CT9",
};
