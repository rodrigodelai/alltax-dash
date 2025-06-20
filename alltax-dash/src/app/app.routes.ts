import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/containers/sales-dashboard/sales-dashboard.component')
                            .then(m => m.SalesDashboardComponent)
    }
];
