import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { SalesDataService } from '../../services/sales-data.service';
import { Brand, Category, Product } from '../../models/sales-data.interface';

@Component({
    selector: 'app-filter-dropdowns',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
    ],
    templateUrl: './filter-dropdowns.component.html',
    styleUrl: './filter-dropdowns.component.css'
})
export class FilterDropdownsComponent implements OnInit {

    selectedCategory?: Category;
    selectedProduct?: Product;
    selectedBrand?: Brand;

    categories: Category[] = [];
    products: Product[] = [];
    brands: Brand[] = [];

    @Output() filtersChanged = new EventEmitter<Brand>();

    constructor(private salesDataService: SalesDataService) { }

    ngOnInit(): void {
        this.loadCategories();
    }

    private loadCategories(): void {
        this.cleanFilters(true, true, true);

        this.salesDataService.getCategories().subscribe((data: Category[]) => {
            this.categories = data;
        });
    }

    private loadProducts(category?: Category): void {
        this.cleanFilters(false, true, true);

        if (!category) {
            this.emitFilters();
            return;
        }

        this.salesDataService.getProductsByCategory(category.categoryName).subscribe((data: Product[]) => {
            this.products = data;
        });
    }

    private loadBrands(category?: Category, product?: Product): void {
        this.cleanFilters(false, false, true);

        if (!category || !product) {
            this.emitFilters();
            return;
        }
        
        this.salesDataService.getBrandsByProduct(category.categoryName, product.productName).subscribe((data: Brand[]) => {
            this.brands = data;
            this.emitFilters();
        });
    }

    onCategoryChange(): void {
        this.loadProducts(this.selectedCategory);
    }

    onProductChange(): void {
        this.loadBrands(this.selectedCategory, this.selectedProduct);
    }

    onBrandChange(): void {
        this.emitFilters();
    }

    private emitFilters(): void {
        this.filtersChanged.emit(this.selectedBrand);
    }

    private cleanFilters(category: boolean, product: boolean, brand: boolean) {
        if (category) {
            this.categories = [];
            this.selectedCategory = undefined;
        }

        if (product) {
            this.products = [];
            this.selectedProduct = undefined;
        }

        if (brand) {
            this.brands = [];
            this.selectedBrand = undefined;
        }
    }
}