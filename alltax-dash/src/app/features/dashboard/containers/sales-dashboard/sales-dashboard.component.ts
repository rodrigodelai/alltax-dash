import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterDropdownsComponent } from '../../components/filter-dropdowns/filter-dropdowns.component';
import { SalesChartComponent } from '../../components/sales-chart/sales-chart.component';
import { Brand } from '../../models/sales-data.interface';

@Component({
    selector: 'app-sales-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        FilterDropdownsComponent,
        SalesChartComponent,
    ],
    templateUrl: './sales-dashboard.component.html',
    styleUrl: './sales-dashboard.component.css'
})
export class SalesDashboardComponent {
    currentBrand?: Brand = undefined;

    constructor() { }

    onFiltersChanged(brand: Brand): void {
        if (brand) this.currentBrand = brand;
    }
}