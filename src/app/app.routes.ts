import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'applications' },
  { path: 'applications', loadChildren: () => import('./features/applications/applications.routes').then((m) => m.applicationRoutes) },
  { path: 'assessments', loadComponent: () => import('./features/assessments/assessment-list').then((m) => m.AssessmentList) },
  { path: 'quotes', loadChildren: () => import('./features/quotes/quotes.routes').then((m) => m.quoteRoutes) },
  { path: 'leases', loadChildren: () => import('./features/leases/leases.routes').then((m) => m.leaseRoutes) },
  { path: 'admin/portfolio', loadComponent: () => import('./features/admin/portfolio').then((m) => m.Portfolio) },
];
