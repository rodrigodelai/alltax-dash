export interface Brand {
  brandName: string;
  sales: number;
}

export interface Product {
  productName: string;
  brands: Brand[];
}

export interface Category {
  categoryName: string;
  products: Product[];
}