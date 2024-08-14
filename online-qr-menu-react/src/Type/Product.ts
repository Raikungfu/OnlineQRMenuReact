export interface Product {
    menuItemId: number;
    name: string;
    image: string;
    description?: string;
    price: number;
    size?: string;
    type?: string;
    coffeeShopId: number;
    categoryId: number;
  }