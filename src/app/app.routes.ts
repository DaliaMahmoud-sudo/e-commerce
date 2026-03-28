import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';


export const routes: Routes = [
   {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },

  // Feature Routes (Lazy Loaded)
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
    title: 'Shop'
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
    title: 'Categories'
  },
  {
    path: 'brands',
    loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent),
    title: 'Brands'
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    title: 'Your Cart',
     canActivate:[authGuard]
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
    title: 'Wishlist',
    canActivate:[authGuard]
  },
  {
    path: 'details/:id/:slug', // Note: Added parameter for product details
    loadComponent: () => import('./features/details/details.component').then(m => m.DetailsComponent),
    title: 'Product Details'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout',
     canActivate:[authGuard]
  },
  {
    path: 'allorders',
    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
    title: 'My Orders',
     canActivate:[authGuard]
  },

  // Auth Routes (Lazy Loaded)
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
    title: 'Register'
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./features/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
    title: 'Reset Password'
  },

  // Wildcard Route
  {
    path: '**',
    loadComponent: () => import('./features/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: '404 - Not Found'
  }
];
