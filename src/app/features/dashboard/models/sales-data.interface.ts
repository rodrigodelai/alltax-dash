export interface MonthlySale {
    month: string;
    value: number;
}

export interface Brand {
    brandName: string;
    sales: MonthlySale[];
}

export interface Product {
    productName: string;
    brands: Brand[];
}

export interface Category {
    categoryName: string;
    products: Product[];
}