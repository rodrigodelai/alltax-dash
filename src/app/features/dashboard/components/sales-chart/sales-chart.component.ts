import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { Brand } from '../../models/sales-data.interface';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective
  ],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.css'
})
export class SalesChartComponent implements OnInit, OnChanges {

    @Input() currentBrand?: Brand = undefined;

    public lineChartType: ChartType = 'bar';

    public lineChartData: ChartData<'line'> = {
        datasets: [
            {
                data: [],
                label: 'Vendas',
                borderColor: 'rgba(77,83,96,1)',
                backgroundColor: 'rgba(77,83,96,0.2)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)',
                fill: 'origin',
                tension: 0,
                pointRadius: 4,
                pointHoverRadius: 7,
            }
        ],
        labels: []
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            bar: {
                backgroundColor: '#4d5360',
                borderColor: '#4d5360',
                borderWidth: 3
            },
            line: {
                tension: 0
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Unidades'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Mês'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Vendas: ${context.parsed.y}`
                }
            }
        }
    };

    constructor() {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.updateChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentBrand'] && changes['currentBrand'].currentValue) {
            this.updateChart();
        } 
    }

    private updateChart(): void {
        const salesData = this.currentBrand?.sales || [];
        const labels = salesData.map(sale => sale.month);
        const values = salesData.map(sale => sale.value);

        this.lineChartData.labels = labels;

        if (this.lineChartData.datasets && this.lineChartData.datasets.length > 0) {
            this.lineChartData.datasets[0].data = values;
        }
    }

    toggleChartType(): void {
        this.lineChartType = this.lineChartType === 'bar' ? 'line' : 'bar';
    }
}