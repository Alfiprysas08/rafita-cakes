import { db } from './firebase-config.js';
import { get, ref } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js';

export function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(Number(value || 0));
}

export function getCart() {
  return JSON.parse(sessionStorage.getItem('rafita_cart') || '[]');
}

export function saveCart(cart) {
  sessionStorage.setItem('rafita_cart', JSON.stringify(cart));
}

export function getCartTotalQty() {
  return getCart().reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

export function updateCartBadge() {
  const badge = document.getElementById('cartBadge');

  if (!badge) return;

  const totalItems = getCartTotalQty();

  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeImageUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';

  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  const driveIdMatch = url.match(/[?&]id=([^&]+)/);
  const driveId = driveFileMatch?.[1] || driveIdMatch?.[1];

  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`;
  }

  return url;
}

export async function loadCatalog() {
  const snapshot = await get(ref(db));
  const data = snapshot.val() || {};

  return {
    categories: data.categories || {},
    products: data.products || {},
    productVariants: data.product_variants || {},
    customCakeTypes: data.custom_cake_types || {},
    customCakeTemplates: data.custom_cake_templates || {}
  };
}

export function toArray(collection) {
  return Object.entries(collection || {}).map(([id, item]) => ({
    id,
    ...item
  }));
}

export function getLowestVariant(variants) {
  return toArray(variants)
    .filter((variant) => variant.active !== false)
    .sort((a, b) => Number(a.price || 0) - Number(b.price || 0))[0];
}
