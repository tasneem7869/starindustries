import { API_BASE_URL } from './src/services/apiClient.js';

export const ROUTE_PATHS = {
  Home: '/',
  About: '/about',
  Products: '/products',
  ProductDetail: '/product-detail',
  CustomerSegments: '/customer-segments',
  Contact: '/contact',
};

export function createPageUrl(target) {
  if (!target) {
    return '/';
  }

  const [pageKey, searchQuery] = target.split('?');
  const basePath = ROUTE_PATHS[pageKey] ?? `/${pageKey.toLowerCase()}`;

  if (!searchQuery) {
    return basePath;
  }

  return `${basePath}?${searchQuery}`;
}

export function resolveAssetPath(path) {
  if (!path) {
    return '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // For uploaded assets served by the API server (e.g. /uploads/123-file.jpg),
  // construct an absolute URL pointing at the API host (without the /api suffix).
  if (path.startsWith('/uploads')) {
    const apiOrigin = API_BASE_URL.replace(/\/api\/?$/, '');
    return `${apiOrigin}${path}`;
  }

  const normalized = path.replace(/^public[\\/]/i, '');
  return normalized.startsWith('/') ? normalized : `/${normalized}`;
}
