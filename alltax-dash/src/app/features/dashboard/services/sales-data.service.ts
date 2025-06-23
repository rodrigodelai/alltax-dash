import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as mockData from '../../../../assets/data/mock-data.json';

import { Category, Product, Brand } from '../models/sales-data.interface';

@Injectable({
    providedIn: 'root'
})
export class SalesDataService {
    
    private readonly allCategories: Category[] = [];

    constructor() {
        this.allCategories = (mockData as any).default as Category[];
    }

    getCategories(): Observable<Category[]> {
        return of(this.allCategories);
    }

    getProductsByCategory(categoryName: string): Observable<Product[]> {
        const category = this.allCategories.find(category => category.categoryName === categoryName);
        return of(category ? category.products : []);
    }

    getBrandsByProduct(categoryName: string, productName: string): Observable<Brand[]> {
        const category = this.allCategories.find(category => category.categoryName === categoryName);

        if (category) {
            const product = category.products.find(product => product.productName === productName);
            return of(product ? product.brands : []);
        }

        return of([]);
    }

}