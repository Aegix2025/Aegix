export interface SubItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    image: string;
    subitems: SubItem[];
}

export interface GenderCategory {
    name: string;
    products: Product[];
    children?: {
        name: string;
        products: Product[];
    }[];
}

export interface MainCategory {
    id: number;
    name: string;
    genders: any[];
}