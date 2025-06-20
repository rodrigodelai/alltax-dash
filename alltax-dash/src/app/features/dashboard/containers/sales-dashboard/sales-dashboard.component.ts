import { Component } from '@angular/core';
import { FilterDropdownsComponent } from '../../components/filter-dropdowns/filter-dropdowns.component';
import { SalesChartComponent } from '../../components/sales-chart/sales-chart.component';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [FilterDropdownsComponent, SalesChartComponent],
  templateUrl: './sales-dashboard.component.html',
  styleUrl: './sales-dashboard.component.css'
})
export class SalesDashboardComponent {

}
