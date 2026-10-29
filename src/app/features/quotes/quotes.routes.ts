import { Routes } from '@angular/router';

export const quoteRoutes: Routes = [
  { path: '', loadComponent: () => import('./quote-list').then((m) => m.QuoteList) },
  { path: ':flowId', loadComponent: () => import('./quote-detail').then((m) => m.QuoteDetail) },
];
