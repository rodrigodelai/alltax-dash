import { Component, Input } from '@angular/core';
import { Brand } from '../../models/sales-data.interface';

@Component({
    selector: 'app-sales-chart',
    standalone: true,
    imports: [],
    templateUrl: './sales-chart.component.html',
    styleUrl: './sales-chart.component.css',
})
export class SalesChartComponent {
    @Input() currentBrand?: Brand;
}
