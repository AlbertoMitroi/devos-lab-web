import { Routes } from '@angular/router';

export const applicationRoutes: Routes = [
  { path: '', loadComponent: () => import('./application-list').then((m) => m.ApplicationList) },
  { path: ':flowId', loadComponent: () => import('./application-detail').then((m) => m.ApplicationDetail) },
];
