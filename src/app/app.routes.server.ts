import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Routes with parameters must be Client or Server rendered
  // to avoid the getPrerenderParams error
  {
    path: 'details/:id/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'checkout', // If this has a :cartId in the future, keep it Client
    renderMode: RenderMode.Client
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client
  },
  {
    path: 'wishlist',
    renderMode: RenderMode.Client
  },
  {
    path: 'allorders',
    renderMode: RenderMode.Client
  },
  // All other static pages (Home, Shop, Login, etc.)
  // can be Prerendered for better performance
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
