import img1 from './assets/images/WhatsApp Image 2024-08-31 at 21.00.24_445cb595.jpg';
import img2 from './assets/images/WhatsApp Image 2024-08-31 at 21.00.25_335356ab.jpg';
import img3 from './assets/images/WhatsApp Image 2024-08-31 at 21.11.35_90b7a00c.jpg';
import img4 from './assets/images/WhatsApp Image 2024-08-31 at 21.11.35_bbbcb55c.jpg';
import img5 from './assets/images/WhatsApp Image 2024-08-31 at 21.11.36_cb8cda38.jpg';
import img6 from './assets/images/WhatsApp Image 2024-08-31 at 21.11.36_dd29a42e.jpg';
import img7 from './assets/images/WhatsApp Image 2024-08-31 at 21.11.36_f98aa72a.jpg';

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/news', label: 'News' },
  { to: '/brochures', label: 'Brochures' },
  { to: '/store', label: 'Store' },
  { to: '/donate', label: 'Donate' },
  { to: '/contact', label: 'Contact' },
];

export const WAYS = [
  { key: 'events', title: 'Community events', text: 'Join local events, meet new people and make a difference in your community.', to: '/news', cta: 'See events' },
  { key: 'volunteer', title: 'Volunteer opportunities', text: 'Give your time and skills to support local initiatives across Cape Town.', to: '/contact', cta: 'Get involved' },
  { key: 'shop', title: 'Shop for good', text: 'Buy from our store. Proceeds go back to local causes.', to: '/store', cta: 'Shop now' },
];

export const BROCHURES = [
  { id: 'understanding', img: img4, title: 'Understanding Homelessness in Cape Town', text: 'A comprehensive guide to understanding and showing empathy to homeless individuals.' },
  { id: 'mental-health', img: img6, title: 'Mental Health Support', text: 'Resources and information on mental health support for the homeless.' },
  { id: 'food-banks', img: img3, title: 'Accessing Food Banks', text: 'Guidelines and locations for accessing food banks in Cape Town.' },
  { id: 'pathways', img: img5, title: 'Pathways to Recovery', text: 'Addiction recovery resources and support available in Cape Town.', featured: true },
  { id: 'recovery', img: img7, title: 'Recovery is Possible', text: 'Stories and support for people rebuilding their lives after addiction.' },
];

export const GALLERY = [img1, img2, img3];

// Sample editorial copy. Replace with real stories before launch.
export const NEWS = [
  { slug: 'community-meal-weekend', cat: 'Events', date: '2026-10-12', img: img1, title: 'Community meal weekend brings neighbours together', excerpt: 'Volunteers, local businesses and residents shared food and conversation over two days.', body: ['Over one weekend, neighbours gathered to share meals and stories. The aim was simple: remove the distance between people who live a few streets apart yet rarely meet.', 'Volunteers prepared and served food while others helped with sign-ups, music and logistics. Several attendees asked how to keep helping, and we will share ways to get involved in the coming weeks.', 'Want to be part of the next one? Reach out through our contact page and tell us what you can offer.'] },
  { slug: 'new-brochure-series', cat: 'Resources', date: '2026-09-28', img: img5, title: 'New brochure series on recovery and support', excerpt: 'Free guides explaining where to find help, written in plain language.', body: ['Our newest brochures focus on recovery and the support available across Cape Town.', 'Each guide is short, practical and designed to be shared. Print them, send them to a friend, or leave a copy at your community centre.', 'Find the full series on the brochures page.'] },
  { slug: 'volunteer-orientation', cat: 'Volunteering', date: '2026-09-10', img: img2, title: 'Volunteer orientation: how to show up well', excerpt: 'A short session on listening, dignity and being reliable.', body: ['Good intentions go further with preparation. Our orientation covers how to listen, how to respect dignity and how to be consistent.', 'No experience is needed. If you can give a couple of hours a month, there is a role for you.'] },
  { slug: 'shop-for-good-launch', cat: 'Store', date: '2026-08-30', img: img3, title: 'Shop for Good: the store is open', excerpt: 'Everyday goods with a purpose. Proceeds go back to local causes.', body: ['Our store brings together simple, useful things you will actually use, each supporting community projects.', 'Browse the range on the store page and check back as we add more.'] },
];

// Placeholder catalogue: swap names, prices and photos for real stock.
export const PRODUCTS = [
  { id: 'tote', name: 'Connect tote bag', price: 120, tag: 'Bestseller', hue: 38, icon: 'bag' },
  { id: 'tee', name: 'Home is a verb tee', price: 249, tag: 'New', hue: 210, icon: 'shirt' },
  { id: 'mug', name: 'Warm welcome mug', price: 95, tag: '', hue: 12, icon: 'mug' },
  { id: 'beanie', name: 'Cape winter beanie', price: 160, tag: '', hue: 160, icon: 'hat' },
  { id: 'notebook', name: 'Notes for neighbours', price: 75, tag: '', hue: 280, icon: 'book' },
  { id: 'stickers', name: 'Sticker pack', price: 45, tag: 'Under R50', hue: 330, icon: 'star' },
];

export const GIFT_AMOUNTS = [50, 100, 250, 500];

export const formatRand = (n) =>
  'R' + Number(n).toLocaleString('en-ZA', { minimumFractionDigits: n % 1 ? 2 : 0 });

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
