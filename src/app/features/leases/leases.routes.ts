import { Routes } from '@angular/router';

export const leaseRoutes: Routes = [
  { path: '', loadComponent: () => import('./lease-list').then((m) => m.LeaseList) },
  { path: ':flowId', loadComponent: () => import('./lease-detail').then((m) => m.LeaseDetail) },
];
