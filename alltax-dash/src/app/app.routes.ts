import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/containers/sales-dashboard/sales-dashboard.component')
                .then((m) => m.SalesDashboardComponent,
            ),
        data: { title: 'Sales Report App' },
    },
        {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
];
